const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users=[];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', (req, res)=>{
    if (!req.body.name || !req.body.email){
        return res.status(400).send('Name or Email is missing');
    }

    const user={
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(user);
    return res.status(201).send(user);
})

app.get('/users/:id', (req, res) => {
    const user=users.find(u=>u.id===req.params.id);

    if (!user){
        return res.status(404).send('User does not exist')
    }

    return res.status(200).send(user);
});

app.put('/users/:id', (req, res)=>{
    const user=users.find(u=>u.id===req.params.id);
    if (!user){
        return res.status(404).send('User does not exist')
    }

    if (!req.body.name || !req.body.email){
        return res.status(400).send('Name or Email is missing');
    }

    user.name=req.body.name;
    user.email=req.body.email;
    return res.status(200).send(user);
});

app.delete('/users/:id', (req, res)=>{
    const user=users.find(u=>u.id===req.params.id);
    if (!user){
        return res.status(404).send('User does not exist')
    }

    const index=users.indexOf(user);
    users.splice(index, 1);
    return res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing