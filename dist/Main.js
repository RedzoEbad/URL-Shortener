const express = require('express');
const server = express();
const PORT = 8080;
const path = require('path');
const connectDB = require('./Connection');
const Router = require('./Routes/Routes');

server.use(express.json());
server.use(express.urlencoded({extended : true}))
server.set('view engine', 'ejs');
server.set('views', path.resolve('./View'));
server.use('/' , Router);
connectDB();
server.get('/', (req, res) => {
    return res.render('Home' , {
        shortUrl : null
    });
})
server.listen(PORT, () => {
    console.log(`Your server has started on port ${PORT}`);
});
