//point1
let c;

function convertidorTemp(c) {
    return c * 9/5 + 32;
}


//point2
let x1;
negative = false; 

function resolvedor(a, b, c, negative ) {
    if (negative) {
        return (-b + (b**2-4*a*c))/2*a
    } else {
        return (-b - (b**2-4*a*c))/2*a
    }
}


//point3
function mejorParidad(num) {
    if (num % 2 == 0) {
        return true;
    } else {
        return false;
    }
}


//point4
function peorParida(num) {
 if ((num == 2) || (num == 4) || (num == 6)|| (num == 8)) {
    if (num % 2 == 0) {
        return true;
    }
 } else {
    return false;
 }
}
