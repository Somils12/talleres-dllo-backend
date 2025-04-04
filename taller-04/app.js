const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

//cargamos los datos del json
const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '24-taller-04-datos.json'), 'utf8'));

app.get('/', (req, res) => {
    res.send('Taller 4');
});


//punto1
// http://localhost:3000/users/hobby?hobby=lectura
// curl "http://localhost:3000/users/hobby?hobby=lectura"
app.get('/users/hobby', (req, res) => {
    const hobby = req.query.hobby;
    
    if (!hobby) {
        return res.status(400).json({ error: 'Debes dar un hobby como parametro de consulta' });
    }
    
    //filtramos de acuerdo al hobby
    const filteredUsers = usersData.filter(user => 
        user.hobbies.includes(hobby.toLowerCase())
    );
    
    res.json(filteredUsers);
});

//punto2
// http://localhost:3000/users/exists?code=200150365
// curl "http://localhost:3000/users/exists?code=200150365"
app.get('/users/exists', (req, res) => {
    const code = req.query.code;
    
    if (!code) {
        return res.status(400).json({ error: 'Debes proporcionar un codigo como parametro de consulta' });
    }
    
    //verificamos si el usuario existe con el codigo
    const userExists = usersData.some(user => user.codigo === code);
    
    res.json({ exists: userExists });
});

//punto3
// http://localhost:3000/users/hobby/count?hobby=lectura
// curl "http://localhost:3000/users/hobby/count?hobby=lectura"
app.get('/users/hobby/count', (req, res) => {
    const hobby = req.query.hobby;
    
    if (!hobby) {
        return res.status(400).json({ error: 'Debes dar un hobby como parametro para poder consultar' });
    }
    
    //usuarios que tienen un hobbi determinando y cuantos
    const count = usersData.filter(user => 
        user.hobbies.includes(hobby.toLowerCase())
    ).length;
    
    res.json({ hobby: hobby, count: count });
});

//punto4
// http://localhost:3000/users/is-free
// curl "http://localhost:3000/users/is-free"
app.get('/users/is-free', (req, res) => {
    //usuarios que tienen menos de 3 hobbies
    const usersWithFreeTime = usersData.filter(user => 
        user.hobbies.length < 3
    );
    
    res.json(usersWithFreeTime);
});

// punto5
// http://localhost:3000/users/suggest?code=200150365&hobby=lectura
// curl "http://localhost:3000/users/suggest?code=200150365&hobby=lectura"
app.get('/users/suggest', (req, res) => {
    const code = req.query.code;
    const hobby = req.query.hobby;
    
    if (!code || !hobby) {
        return res.status(400).json({ error: 'Debes dar un codigo de usuario y un hobby como parametros de consulta' });
    }
    
    //se busca en los datos usuarios el que tiene el codigo
    const userIndex = usersData.findIndex(user => user.codigo === code);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const user = usersData[userIndex];
    
    //condional para verificar si el usuario tiene < 3 hobbies
    if (user.hobbies.length >= 3) {
        return res.status(400).json({ 
            error: 'No se puede agregar mas hobbies', 
            message: 'El usuario ya tiene 3 hobbies', 
            user: user 
        });
    }
    
    //condional si el hobbi ya existe (no agregar)
    if (user.hobbies.includes(hobby.toLowerCase())) {
        return res.status(400).json({ 
            error: 'Hobby duplicado', 
            message: 'El usuario ya tiene este hobby', 
            user: user 
        });
    }
    
    //si todo bien se agrega el hobbi
    user.hobbies.push(hobby.toLowerCase());
    
    res.json({ 
        success: true, 
        message: 'Hobby agregado correctamente', 
        user: user 
    });
});

//punto6
/* 

curl -X POST http://localhost:3000/users `
  -H "Content-Type: application/json" `
  -d '{"codigo": "007", "nombre": "Juan", "apellido": "Pérez", "hobbies": ["leer", "nadar"]}'

*/
app.use(express.json());

app.post('/users', (req, res) => {
    const { codigo, nombre, apellido, hobbies } = req.body;
    
    //verificamos que esten todos los campos 
    if (!codigo || !nombre || !apellido || !hobbies) {
        return res.status(400).json({ 
            error: 'Datos incompletos', 
            message: 'Debe proporcionar código, nombre, apellido y hobbies' 
        });
    }
    
    //el usuario tiene que tener al menos dos hobbies
    if (!Array.isArray(hobbies) || hobbies.length < 2) {
        return res.status(400).json({ 
            error: 'Hobbies insuficientes', 
            message: 'El usuario debe tener al menos dos hobbies' 
        });
    }
    
    //condicional para verificar codigo repetidos
    const userExists = usersData.some(user => user.codigo === codigo);
    if (userExists) {
        return res.status(400).json({ 
            error: 'Código duplicado', 
            message: 'Ya existe un usuario con este código' 
        });
    }
    
    //creacoin del nuevo usuario
    const newUser = {
        codigo,
        nombre,
        apellido,
        hobbies: hobbies.map(hobby => hobby.toLowerCase())
    };
    
    // Agregar el nuevo usuario al array
    usersData.push(newUser);
    
    //se escribe en el json
    fs.writeFileSync(path.join(__dirname, '24-taller-04-datos.json'), JSON.stringify(usersData, null, 2));
    
    res.status(201).json({ 
        success: true, 
        message: 'Usuario registrado correctamente', 
        user: newUser 
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});