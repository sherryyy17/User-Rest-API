let users = require('../data/users')
const { writeDataToFile } = require('../utils')

function create(user) {
    return new Promise((resolve,reject) => {
        const newUser = {...user};
        users.push(newUser);
        writeDataToFile('./data/users.json', users)
        resolve(newUser);
    })
}

function search(username) {
    return new Promise((resolve,reject) => {
        const filteredUser = users.filter(
            item => item.username === username
        );
        resolve(filteredUser);    
    })
}

module.exports = {
    create,
    search
};