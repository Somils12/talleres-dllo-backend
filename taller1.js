//point 1
function convertidorTemp(c) {
    return c * 9 / 5 + 32;
}


//point 2
function resolvedor(a, b, c, negative) {
    if (a === 0) {
        return "Not a quadratic equation (a cannot be 0)";
    }

    const discriminant = b ** 2 - 4 * a * c;
    if (discriminant < 0) {
        return "No real roots"
    }

    if (negative) {
        return (-b - Math.sqrt(discriminant)) / (2 * a);
    } else {
        return (-b + Math.sqrt(discriminant)) / (2 * a);
    }
}


//point 3
function mejorParidad(num) {
    if (num % 2 == 0) {
        return true;
    } else {
        return false;
    }
}


//point 4
function peorParidad(num) {
    let currentlyPair = 0;
    let currentlyImpar = 0;
    for (let i = 0; i <= 5; i++) {
        currentlyPair = 2 * i;
        currentlyImpar = 2 * i + 1;
        if ((currentlyPair == num)&& (currentlyImpar != num)) {
            if ((num == 0) || (num == 2) || (num == 4) || (num == 6) || (num == 8) || (num == 10)) {
                if (num % 2 == 0) {
                    return true;
                }
            }
        }
    }
    return false;
}