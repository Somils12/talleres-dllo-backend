//punto 1
function desglosarString(palabra, seleccion) {
    if (seleccion === "vocales") {
        const vocales = ['a', 'e', 'i', 'o', 'u'];
        return palabra
            .toLowerCase()
            .split("")
            .filter(letra => vocales.includes(letra))
            .length;
    } else if (seleccion === "consonantes") {
        const consonantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
        return palabra
            .toLowerCase()
            .split("")
            .filter(letra => consonantes.includes(letra))
            .length;
    }
}

//punto 2
function twoSum(lista, numero) {
    for (let i=0; i<lista.length-1; i++) {
        for (let j=i+1; j<lista.length; j++) {
            if (lista[i] + lista[j] === numero) {
                return [i, j];
            }
        }
    }
    return []; 
}

//punto 3
function conversionRomana(numeroRomano) {
    const romanos = new Map([  
        ['I', 1], ['V', 5], ['X', 10], ['L', 50],
        ['C', 100], ['D', 500], ['M', 1000]
    ]);

    return numeroRomano
        .split('')                    
        .map(letra => romanos.get(letra)) 
        .reduce((acumulado, actual, i, array) => { 
            return actual < (array[i + 1] ?? 0) 
                ? acumulado - actual 
                : acumulado + actual;
        }, 0);
} 