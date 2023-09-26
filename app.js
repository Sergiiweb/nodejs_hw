const express = require('express');
const fsService = require('./fs.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 5001;

app.get('/users', async (req, res) => {
    const users = await fsService.reader();

    res.json(users);
})

app.post('/users', async (req, res) => {
    try {
        const {name, email, age, gender} = req.body;

        if (!name || name.length < 2) {
            throw new Error('Wrong name!');
        }
        if (!email || !email.includes('@')) {
            throw new Error('Wrong email!');
        }
        if (!age || age < 0 || age > 199) {
            throw new Error('Wrong age!');
        }
        if (!gender || gender.length < 2) {
            throw new Error('Wrong gender!');
        }

        const users = await fsService.reader();
        const lastId = users[users.length - 1].id;
        const newUser = {name, email, age, gender, id: lastId + 1};
        users.push(newUser);
        await fsService.writer(users);

        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json(e.message);
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const users = await fsService.reader();
        const user = users.find((user) => user.id === Number(id));
        if (!user) {
            throw new Error('User not exist');
        }
        res.json(user);
    } catch (e) {
        res.status(404).json(e.message);
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const users = await fsService.reader();

        const index = users.findIndex((user) => user.id === Number(id));
        if (index === -1) {
            throw new Error('User not exist');
        }
        users.splice(index, 1);

        await fsService.writer(users);

        res.sendStatus(204);
    } catch (e) {
        res.status(404).json(e.message);
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, age, gender} = req.body;

        if (!name || name.length < 2) {
            throw new Error('Wrong name!');
        }
        if (!email || !email.includes('@')) {
            throw new Error('Wrong email!');
        }
        if (!age || age < 0 || age > 199) {
            throw new Error('Wrong age!');
        }
        if (!gender || gender.length < 2) {
            throw new Error('Wrong gender!');
        }

        const users = await fsService.reader();

        const user = users.find((user) => user.id === Number(id));
        if (!user) {
            throw new Error('User not exist');
        }
        user.name = name;
        user.email = email;
        user.age = age;
        user.gender = gender;

        await fsService.writer(users);

        res.sendStatus(204);
    } catch (e) {
        res.status(404).json(e.message);
    }
})

app.listen(PORT, () => {
    console.log(`server on ${PORT} port`)
})