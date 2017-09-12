const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const pug = require('pug');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let idCounter = 2;
let users = [{
    id: 1,
    name: 'Tim',
    email: 'tim@test.com',
    age: 35
}];

let sess = {
    secret: 'keyboard cat',
    cookie: {}
};

app.use(session(sess));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.render('index', {
    title: 'This is a title!'
});
});

app.get('/createuser', (req, res) => {

    res.render('createuser', {
    user: {}
});

});

app.get('/createuser/:id', (req, res) => {

    getUser(req.params.id).then((user)=>{
    removeUser(req.params.id);
res.render('createuser', {
    user: user
})
});
});

app.get('/users', (req, res) => {
    res.render('users', {
    users: users
});
});

app.get('/delete/:id', (req, res) => {
    console.log('Deleting user id: ' + req.params.id);
removeUser(req.params.id);
res.redirect('/users');
});

app.post('/createuser', (req, res) => {

    let userObject = {
        id: idCounter,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };

users.push(userObject);
idCounter++;

res.redirect('/users');
});


app.listen(3000);

function removeUser(id) {
    users.forEach((user, index)=>{
        if (id == user.id) {
        users.splice(index, 1);
    }
})
}

function getUser(id) {
    return new Promise(executor);
    function executor(resolve, reject) {
        users.forEach((user)=>{
            if (id == user.id) {
            resolve(user);
        }
    })}
}




