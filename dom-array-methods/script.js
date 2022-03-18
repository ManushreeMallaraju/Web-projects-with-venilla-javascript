const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = []; // Array of objects

getRandomUser()
getRandomUser()
getRandomUser()
// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    // get user's first and last name from api response
    const user = data.results[0]; //returns an object of values

    // construct a new user and attach money to it
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    }

    //pass it to the function to add this generated new user
    addData(newUser);
}

// Add new obj to data array
function addData(userObject) {
    data.push(userObject);
    console.log(data);
}