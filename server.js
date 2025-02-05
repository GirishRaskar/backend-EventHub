const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/api');
const port = 10000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

app.listen(port, function(){
    console.log("Marvellous Innfosystems : Server running on localhost:" + port);
});


/////////////////////////////////////////
//////////////////Database/////////////////////

// const {MongoClient} = require("mongodb");
const { MongoClient, ObjectId } = require('mongodb');
const URL = "mongodb+srv://Girish:<MypassionBusi23%40>%40cluster0.3nug5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(URL);

async function GetConnection()
{
	let result = await client.connect();
	let db = result.db("Admissions")
	return db.collection("generalEvents");
}

async function GetConnection1()
{
	let result = await client.connect();
	let db = result.db("Admissions")
	return db.collection("specialEvents");
}
//////////////////////////
app.post('/postData', async (req, res) => {
	try {
	  const collection = await GetConnection();
	  const data = req.body; // Extract the data from the incoming request body
  
	  // Insert the data into MongoDB collection
	  const result = await collection.insertOne(data);
	  console.log('Data inserted into database:', result);
  
	  // Send a success response with inserted data
	  res.status(201).json({
		message: 'Data inserted successfully!',
		insertedId: result.insertedId, // Return the inserted ID
		insertedData: data, // Send back the inserted data
	  });
	} catch (err) {
	  console.error('Error inserting data:', err);
	  res.status(500).send('Internal Server Error'); // Handle error if insertion fails
	}
  });
  //

  app.get('/getData', async (req, res) => {
	try {
	  const collection = await GetConnection();
	  const data = await collection.find().toArray(); // Fetch all documents from the collection
	  console.log('Data retrieved from database:', data);
	  res.json(data); // Send the data as JSON response
	} catch (err) {
	  console.error('Error retrieving data:', err);
	  res.status(500).send('Internal Server Error'); // Handle error if fetching fails
	}
  });
  ///

  app.post('/postDataS', async (req, res) => {
	try {
	  const collection = await GetConnection1();
	  const data = req.body; // Extract the data from the incoming request body
  
	  // Insert the data into MongoDB collection
	  const result = await collection.insertOne(data);
	  console.log('Data inserted into database:', result);
  
	  // Send a success response with inserted data
	  res.status(201).json({
		message: 'Data inserted successfully!',
		insertedId: result.insertedId, // Return the inserted ID
		insertedData: data, // Send back the inserted data
	  });
	} catch (err) {
	  console.error('Error inserting data:', err);
	  res.status(500).send('Internal Server Error'); // Handle error if insertion fails
	}
  });
  //

  app.get('/getDataS', async (req, res) => {
	try {
	  const collection = await GetConnection1();
	  const data = await collection.find().toArray(); // Fetch all documents from the collection
	  console.log('Data retrieved from database:', data);
	  res.json(data); // Send the data as JSON response
	} catch (err) {
	  console.error('Error retrieving data:', err);
	  res.status(500).send('Internal Server Error'); // Handle error if fetching fails
	}
  });
  ///


