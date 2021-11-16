let User = require('../modals/userModal');

async function createUser(req,res) {
    try{
        let body=''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const { firstName,lastName, username, password } = JSON.parse(body);

            const user = {
                firstName,
                lastName, 
                username, 
                password
            }
            const newUser = await User.create(user);
            res.writeHeader(201, { 'Content-Type' : 'application/json' });
            return res.end(JSON.stringify(newUser));
        })

    } catch (error) {
        console.log(error)
    }
}

async function searchUser(req,res,name) {
    try{
            const filterUser = await User.search(name);
            if(!filterUser) {
                res.writeHeader(404, { 'Content-Type' : 'application/json' });
                return res.end(JSON.stringify({ message: 'User not Found'}));
            } else {
                res.writeHeader(201, { 'Content-Type' : 'application/json' });
                return res.end(JSON.stringify(filterUser));
            }
            

    } catch (error) {
        console.log(error)
    }
}


module.exports = { createUser, searchUser };