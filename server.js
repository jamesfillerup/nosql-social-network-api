const express = require('express');
const mongoose = require('mongoose');
// const { addFriend } = require('./controllers/user-controller');
// const { post } = require('./models/Reaction');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nosql-social-network-api', {
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));


// TO DO ON PROJECT

//INSOMNIA
  //USER
    // GET ALL ---------WORKING----------
    // GET ID ---------WORKING----------
    // post ---------WORKING----------
    // PUT ---------WORKING----------
    // DEL ---------WORKING----------
    // POST addFriend
    // DEL FRIEND

  //THOUGHT
    //GET ALL THOUGHTS
    //GET ID
    //POST
    //PUT
    //DEL
    //PUT REACTION
    //DEL REACTION

// HOW DO I TEST FRIEND

//HOW DO THE REACTION INTERACT WITH THE THOUGHT MODEL?

// NEED TO FINISH METHODS IN CONTROLLERS
//NEED TO ADD THE METHODS IN THOUGHT-ROUTES
//POST 13 VIDEO ON YOUTUBE