const express = require('express');
const app = express();
const cors = require('cors');
const mongoose= require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/login');
  console.log('db connected')
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema); // A model is a class with which we construct documents

app.use(cors()); // Adding middleware
app.use(express.json()); // Built-in body-parser middleware


// create
app.post('/demo', async (req, res) => {
    let user= new User();
    user.username= req.body.username;
    user.password= req.body.password;
    const doc= await user.save();

    console.log(doc);
    res.json(req.body);
});

// read
app.get('/demo', async (req, res) =>{
    const docs= await User.find({});
    res.json(docs);
})

app.listen(3000, () => {
    console.log("server running");
});