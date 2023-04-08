const {PrismaClient} = require('@prisma/client')

const session = require('express-session');
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const prisma = new PrismaClient()

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true }
}));

app.get('/checkUserRegistered', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.query.username
        }
    });
    if (user) {
        return res.json({"Code": 302, "Message": "User already exists!"})
    }
    return res.sendStatus(200).json({"Code": 200, "Message": "Authorized"});
});

app.post('/checkEmailRegistered', async (req, res) => {
    const email = await prisma.user.findFirstOrThrow({
        where: {
            email: req.body.email
        }
    });
    if (email) {
        return res.json({"Code": 302, "Message": "Email already registered!"})
    }
    return res.sendStatus(200).json({"Code": 200, "Message": "Authorized"});
})

app.post('/RegisterUser', async (req, res) => {

    const checkUser = await fetch(`/checkUserRegistered?username=${req.body.username}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "GET"
    });

    if(checkUser.status !== 200){
        return res.sendStatus(401).json({"Code": 401, "Message": "Unauthorized"});
    }

    const checkEmail = await fetch('/checkEmailRegistered', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "email": req.body.email
        })
    });

    if(checkEmail.status !== 200){
        return res.sendStatus(401).json({"Code": 401, "Message": "Unauthorized"});
    }

    await prisma.user.create({
        data: {
            username: req.body.username,
            displayName: req.body.displayName,
            email: req.body.email,
            password: req.body.password
        }
    }).catch(err => {
        console.error(err);
        return res.sendStatus(500).json({
            "Code": 500,
            "Message": "An internal error occurred."
        });
    });
    return res.sendStatus(200).json({
        "Code": 200,
        "Message": "User registered successfully."
    });
})

app.post('/PasswordMatches', (req, res) => {

})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})