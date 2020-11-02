const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true });
const port = 8000;

//define mongose schema
const contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Adderess: String,
    Desc: String
});

const contact = mongoose.model('contact', contactSchema);


//EXPRESS SPECIFIC STUFF 
app.use('/static', express.static('static'))// for serving static file
app.use(express.urlencoded())

//PUG SP[ECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname, 'views'))//set the view directory

//END POINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('Home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to data base")
    }).catch(() => {
        res.status(400).send("Item was not saved to the data base")
    });

    // res.status(200).render('contact.pug');
});



//START THE SERVER
app.listen(port, () => {
    console.log(`The application started sucessfully on port ${port}`);
});
