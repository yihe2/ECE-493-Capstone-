const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sahusnai:IO1dd2GW5RBX81bU@cluster0.nrkocdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

  async function insertUser(email, password, salt) {
    // Connection URI
    // const uri = 'mongodb://localhost:27017/your-database-name';
  
    // Create a new MongoClient
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      // Access the database
      const database = client.db('test');
  
      // Access the collection (replace 'users' with your desired collection name)
      const collection = database.collection('users');
  
      // Create a document to insert
      const userDocument = {
        email: email,
        password: password,
        salt:salt
      };
  
      // Insert the document
      const result = await collection.insertOne(userDocument);
  
      console.log(`User inserted with ID: ${result.insertedId}`);
    } finally {
      // Close the client connection
      await client.close();
    }
  }
  
  // Function for inserting Health Information
  async function insertHealthInformation(patientId, smoking, alcoholConsumption, sex, age, race, difficultyWalking, diabetic, physicalActivity, generalHealth, asthma, kidneyDisease, skinCancer, stroke, heartDisease) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('HealthInformation');
  
      const healthInfoDocument = {
        patientId: patientId,
        smoking: smoking,
        alcoholConsumption: alcoholConsumption,
        sex: sex,
        age: age,
        race: race,
        difficultyWalking: difficultyWalking,
        diabetic: diabetic,
        physicalActivity: physicalActivity,
        generalHealth: generalHealth,
        asthma: asthma,
        kidneyDisease: kidneyDisease,
        skinCancer: skinCancer,
        stroke: stroke,
        heartDisease: heartDisease
      };
  
      const result = await collection.insertOne(healthInfoDocument);
      console.log(`Health information inserted with ID: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }

  // Function for injecting Financial Information 
  async function insertFinancialInformation(userId, income, savings, investments, debt) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('FinancialInformation');
  
      const financialInfoDocument = {
        userId: userId,
        income: income,
        savings: savings,
        investments: investments,
        debt: debt
      };
  
      const result = await collection.insertOne(financialInfoDocument);
      console.log(`Financial information inserted with ID: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }

  // Updating Functions
  async function updateHealthInformation(patientId, updates) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('HealthInformation');
  
      const filter = { patientId: patientId };
      const updateDoc = {
        $set: updates
      };
  
      const result = await collection.updateOne(filter, updateDoc);
  
      if (result.matchedCount && result.modifiedCount) {
        console.log(`Successfully updated the health information for patient with ID: ${patientId}`);
      } else {
        console.log('No matching document found or no new data provided to update.');
      }
    } finally {
      await client.close();
    }
  }

  async function updateFinancialInformation(userId, updates) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('FinancialInformation');
  
      const filter = { userId: userId };
      const updateDoc = {
        $set: updates
      };
  
      const result = await collection.updateOne(filter, updateDoc);
  
      if (result.matchedCount && result.modifiedCount) {
        console.log(`Successfully updated the financial information for user with ID: ${userId}`);
      } else {
        console.log('No matching document found or no new data provided to update.');
      }
    } finally {
      await client.close();
    }
  }
  
  async function updateUserInformation(email, updates) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('users');

      const filter = {email:email};
      const updateDoc = {
        $set:updates
      };

      const result = await collection.updateOne(filter, updateDoc);
      if (result.matchedCount && result.modifiedCount) {
        console.log(`Successfully updated the user info for user with email: ${email}`);
      } else {
        console.log('No matching document found or no new data provided to update.');
      }
    } finally {
      await client.close();
    }

  }

  // Code for deletinng collections 
  async function deleteUser(email) {
    try {
        await client.connect();

        const database = client.db('test');
        const collection = database.collection('users');

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
  
async function deleteHealthInformation(patientId) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('HealthInformation');

    const result = await collection.deleteOne({ patientId: patientId });

    if (result.deletedCount === 1) {
      console.log(`Successfully deleted the health information for patient with ID: ${patientId}`);
    } else {
      console.log('No health information found with that ID.');
    }
  } finally {
    await client.close();
  }
}

async function deleteFinancialInformation(userId) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('FinancialInformation');

    const result = await collection.deleteOne({ userId: userId });

    if (result.deletedCount === 1) {
      console.log(`Successfully deleted the financial information for user with ID: ${userId}`);
    } else {
      console.log('No financial information found with that ID.');
    }
  } finally {
    await client.close();
  }
}


  
  /** 
  // Example usage
  const username = 'GOAT';
  const password = 'balls';

  insertUser(username, password);

  // Example usage for Health Information
  const patientId = '12345';
  const smoking = 'Never';
  const alcoholConsumption = 'Occasional';
  const sex = 'Female';
  const age = 28;
  const race = 'Asian';
  const difficultyWalking = 'No';
  const diabetic = 'No';
  const physicalActivity = 'Regular';
  const generalHealth = 'Good';
  const asthma = 'No';
  const kidneyDisease = 'No';
  const skinCancer = 'No';
  const stroke = 'No';
  const heartDisease = 'No';

  insertHealthInformation(
    patientId,
    smoking,
    alcoholConsumption,
    sex,
    age,
    race,
    difficultyWalking,
    diabetic,
    physicalActivity,
    generalHealth,
    asthma,
    kidneyDisease,
    skinCancer,
    stroke,
    heartDisease
  );

  // Example usage for Financial Information
  const userId = '67890';
  const income = 75000; // annual income in dollars
  const savings = 15000; // savings in dollars
  const investments = [
    { type: 'Stocks', value: 20000 },
    { type: 'Bonds', value: 5000 }
  ];
  const debt = 20000;

  insertFinancialInformation(
    userId,
    income,
    savings,
    investments,
    debt
  );

const patientIdToUpdate = '12345';
const healthUpdates = {
  smoking: 'Occasionally',
  generalHealth: 'Fair',
  physicalActivity: 'None'
};

updateHealthInformation(patientIdToUpdate, healthUpdates);

const patientIdToDelete = '12345';
deleteHealthInformation(patientIdToDelete);
*/

