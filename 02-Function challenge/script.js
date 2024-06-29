function isValidPassword(password, userName) {
    if (password.length < 8) {
        return false;
    }
    if (password.indexOf(' ') !== -1) {
        return false;
    }
    if (password.indexOf(userName) !== -1) {
        return false;
    }
    return true;
}

//kraći način
function isValidPassword(password, userName) {
    if (
        password.length < 8 ||
        password.indexOf(' ') !== -1 ||
        password.indexOf(userName) !== -1
    ) {
        return false;
    }
    return true;
}

//još kraći način
function isValidPassword(password, userName) {
    const tooShort = password.length < 8;
    const hasSpace = password.indexOf(' ') !== -1;
    const tooSimilar = password.indexOf(userName) !== -1;

    if (tooShort || hasSpace || tooSimilar) return false;

    return true;   
}

//Novi primjer
//Write a function to find the average value in an array of numbers

function average([]) {
    const divide = average([]) / average([]).length;
}