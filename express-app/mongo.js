const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mehta1:<password>@cluster0.w4dfpbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  async function insertUser(email, password) {
    // Connection URI
    // const uri = 'mongodb://localhost:27017/your-database-name';
  
    // Create a new MongoClient
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      // Access the database
      const database = client.db();
  
      // Access the collection (replace 'users' with your desired collection name)
      const collection = database.collection('email');
  
      // Create a document to insert
      const userDocument = {
        email: email,
        password: password,
      };
  
      // Insert the document
      const result = await collection.insertOne(userDocument);
  
      console.log(`User inserted with ID: ${result.insertedId}`);
    } finally {
      // Close the client connection
      await client.close();
    }
  }
  
  // Example usage
  const username = 'mehta1@ualberta.ca';
  const password = 'balls';

  insertUser(username, password);