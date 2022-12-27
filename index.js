const express = require('express');
 
const app = express();
const jwt = require('jsonwebtoken')

const cors = require('cors');
 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
 
const port = process.env.PORT || 5000;
 
 
 
require('dotenv').config()

 
 
 
 
// middleware
app.use(cors());
app.use(express.json());
 
// name : practice11
// pass : hHnOaHHHkBNKMynj
 
 
 
 
 
const uri = "mongodb+srv://practice11:hHnOaHHHkBNKMynj@cluster0.rnvlhry.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
 
 
 
const run = async () => {
    
    try {


        const homesCollection = client.db('arcn').collection('homes')

      const userCollection = client.db('arcn').collection('arcnUser');
      const bookingsCollection = client.db('arcn').collection('bookings');

     
      app.put('/user/:email', async (req, res) => {
        const email = req.params.email
        const user = req.body
        const filter = { email: email }
        const options = { upsert: true }
        const updateDoc = {
          $set: user,
        }
        const result = await userCollection.updateOne(filter, updateDoc, options)
        console.log(result)
      
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d',
        })
        console.log(token)
        res.send({ result, token })
      });

      app.post('/booings', async (req, res) => {
        const bookingData = req.body;
        const result = await bookingsCollection.insertOne(bookingData);
        console.log(result);
        res.send(result);
        



      })
      
     
       
    }
 
 
    finally {
       
 
 
    }
   
}
 
run().catch(err => console.log(err));
 
 
 
 
 
 
 
 
 
app.get('/', (req, res) => {
   
    res.send('Arcn project start')
});
app.listen(port, () => {
   
    console.log(`Arcn project running on port ${port}`)
})
 
 
 
