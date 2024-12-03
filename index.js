const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express()

const port = process.env.PORT || 5000

/* ------------------------------- middleware ------------------------------- */
app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ot76b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      

      const gymSchedule = client.db("gym-schedule").collection("schedule");



/* -------------------------------- get single data -------------------------------- */

app.get('/schedule/:id', async(req, res) => {
  const id = req.params
  const result = await gymSchedule.findOne({ _id: new ObjectId(id) });
  res.send(result)
 
})



/* -------------------------------- get data -------------------------------- */
app.get('/schedule', async(req, res) => {
          // const scheduleData = req.body;

          const {searchParams}=req.query
          console.log(searchParams)
          let option={}

          if (searchParams) {
           option = { title: { $regex: searchParams, $options: "i" }}
            
          }

          const cursor = await gymSchedule.find(option).toArray()
          // const result = await gymSchedule.insertOne(scheduleData)
          console.log(cursor)
          res.send(cursor)
})


/* -------------------------------- post data ------------------------------- */
      app.post('/schedule', async(req, res) => {
          const scheduleData = req.body;
          
          const result = await gymSchedule.insertOne(scheduleData)
          res.send(result)
})

/* --------------------------------- delete --------------------------------- */
app.delete('/schedule/:id', async(req, res) => {
          const id = req.params
          const result = await gymSchedule.deleteOne({ _id: new ObjectId(id) });
          res.send(result)
         
})

/* --------------------------------- patch --------------------------------- */

app.patch('/schedule/:id', async(req, res) => {
          const id = req.params
          // const data =req.body
          const query = { _id: new ObjectId(id) }
          // const updateDoc={
          //   $set:{
          //     title: data.title,
          //     date: data.date,
          //     day: data.day,
          //     day: data.day,
          //   }
          // }
          const updateDoc={
            $set:req.body
          }
          const result = await gymSchedule.updateOne(query,updateDoc);
          res.send(result)
          console.log(result)
})


/* --------------------------------- patch for update one doc --------------------------------- */

app.patch('/status/:id', async(req, res) => {
          const id = req.params
          const data =req.body
          const query = { _id: new ObjectId(id) }

          const updateDoc={
            $set:{
              isCompleted:true
            }
          }
          const result = await gymSchedule.updateOne(query,updateDoc);
          res.send(result)
          console.log(result)
})

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    console.log('server is running')
    res.send('GYM SCHEDULE')
})

app.listen(port, () => {
   console.log(`SERVER IS RUNNING PORT:${port}`)
})