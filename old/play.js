let name = 'Max';
let age = 29;
let hasHobbies = true;

const summarizeUser = (userName, userAge, userHasHobby) => {
    return ('Name is ' +
     userName +
    ', age is ' +
    age +
     ' and the user has hobbies: ' + userHasHobby);
}

console.log(summarizeUser(name, age, hasHobbies));