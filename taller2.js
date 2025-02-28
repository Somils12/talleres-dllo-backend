// punto1
function findMax(numbers = []) {
    if (numbers.length === 0) return undefined;
    let max = numbers[0];
    for (const num of numbers) {
        if (num > max) max = num;
    }
    return max;
}

//punto2
function includes(list = [], num) {
    for (const item of list) {
        if (item === num) return true;
    }
    return false;
}

//punto3
function sum(numbers = []) {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}

//punto4    
function missingNumbers(numbers = []) {
    if (numbers.length === 0) return [];
    
    let min = numbers[0];
    let max = numbers[0];
    const numSet = new Set();
    
    for (const num of numbers) {
        if (num < min) min = num;
        if (num > max) max = num;
        numSet.add(num);
    }
    
    const missing = [];
    for (let i = min; i <= max; i++) {
        if (!numSet.has(i)) {
            missing.push(i);
        }
    }
    return missing;
}
