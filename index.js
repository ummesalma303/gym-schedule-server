const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express()

const port = process.env.PORT || 5000

/* ------------------------------- middleware ------------------------------- */
app.use(express.json())
app.use(cors())


// gym-schedule
// vV1m24m9TeAe46zS


const uri = "mongodb+srv://gym-schedule:vV1m24m9TeAe46zS@cluster0.ot76b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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




      app.post('/schedule', async(req, res) => {
        //   const user = req.body;
        // //   console.log(user)
          //   const result = await gymSchedule.insertOne(user)
          


        //   const user = req.body;
          // //   console.log(user)
            const result = await gymSchedule.insertOne({user:'ffff',age:24})
          //   const result= await
          console.log(result)
          console.log(req)
          res.send(result)
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