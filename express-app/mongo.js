const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "placeholder until I can get secrets working";

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

  

  // METHODS NEEDED:
  // --------------
  // - check if account exists
  // - create account
  // - delete account
  // - login -> how tf does that work innit???

  async function checkUser(email, password) {
    try {
        await client.connect();

        const database = client.db();
        const collection = database.collection('accounts');

        const user = await collection.findOne({ email: email, password: password });

        if (user) {
            console.log("User exists!");
            return true;
        } else {
            console.log("User not found.");
            return false;
        }
    } finally {
        await client.close();
    }
}

async function deleteUser(email) {
    try {
        await client.connect();

        const database = client.db();
        const collection = database.collection('accounts');

        const result = await collection.deleteOne({ email: email });

        if (result.deletedCount === 1) {
            console.log("User deleted successfully.");
            return true;
        } else {
            console.log("User not found or deletion failed.");
            return false;
        }
    } finally {
        await client.close();
    }
}


async function insertUser(email, password, salt) {
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
    const collection = database.collection('accounts');

    // Create a document to insert
    const userDocument = {
      email: email,
      password: password,
      salt: salt,
    };

    // Insert the document
    const result = await collection.insertOne(userDocument);

    console.log(`User inserted with ID: ${result.insertedId}`);
  } finally {
    // Close the client connection
    await client.close();
  }
}

