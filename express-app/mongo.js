const { MongoClient, ServerApiVersion } = require("mongodb");
const axios = require("axios");
const uri =
'mongodb+srv://sahusnai:YzhMRa0cjsrJEVhd@cluster0.nrkocdu.mongodb.net/';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const database = client.db("test2");

    // Access the collection (replace 'users' with your desired collection name)
    const collection = database.collection("users");

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

// Function for inserting Health Information
async function insertHealthInformation(
  email,
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
  BMI,
  PhysicalHealth,
  MentalHealth,
  SleepTime
) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const collection = database.collection("HealthInformation");

    const healthInfoDocument = {
      email: email,
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
      BMI: BMI,
      physicalHealth: PhysicalHealth,
      MentalHealth: MentalHealth,
      sleepTime: SleepTime,
    };

    const result = await collection.insertOne(healthInfoDocument);
    console.log(`Health information inserted with ID: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

// Function for injecting Financial Information
async function insertFinancialInformation(
  email,
  income,
  expense,
  savings,
  investments,
  debt
) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const collection = database.collection("FinancialInformation");

    const financialInfoDocument = {
      email: email,
      income: income,
      expense: expense,
      savings: savings,
      investments: investments,
      debt: debt,
    };

    const result = await collection.insertOne(financialInfoDocument);
    console.log(`Financial information inserted with ID: ${result.insertedId}`);
  } finally {
    await client.close();
  }
  sendNewUser(email, 1);
}

// Send to backend using this
async function sendNewUser(email, mode) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const healthCollection = database.collection("HealthInformation");
    const financialCollection = database.collection("FinancialInformation");

    const health = await healthCollection.findOne({ email: email });
    if (!health) {
      throw new Error("Health information not found for this email.");
    }

    const financial = await financialCollection.findOne({ email: email });
    if (!financial) {
      throw new Error("Health information not found for this email.");
    }
    // Send to backend
    const doc = {
      email: email,
      mode: mode,
      health_information: {
        BMI: health.BMI,
        PhysicalHealth: health.physicalHealth,
        MentalHealth: health.MentalHealth,
        SleepTime: health.sleepTime,
        Smoking: health.smoking,
        AlcoholDrinking: health.alcoholConsumption,
        Stroke: health.stroke,
        DiffWalking: health.difficultyWalking,
        Sex: health.sex,
        AgeCategory: health.age,
        Race: health.race,
        Diabetic: health.diabetic,
        PhysicalActivity: health.physicalActivity,
        GenHealth: health.generalHealth,
        Asthma: health.asthma,
        KidneyDisease: health.kidneyDisease,
        SkinCancer: health.skinCancer,
      },
      financial_information: financial,
      future_risk_level: 0.25,
    };

    delete doc.financial_information._id;

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recieve/newuser",
        doc
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  } finally {
    await client.close();
  }
}
// Updating Functions
async function updateHealthInformation(email, updates) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const collection = database.collection("HealthInformation");

    const filter = { email: email };
    const updateDoc = {
      $set: updates,
    };

    const result = await collection.updateOne(filter, updateDoc);

    if (result.matchedCount && result.modifiedCount) {
      console.log(
        `Successfully updated the health information for patient with ID: ${email}`
      );
    } else {
      console.log(
        "No matching document found or no new data provided to update."
      );
    }
  } finally {
    await client.close();
  }
}

async function updateFinancialInformation(email, updates) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const collection = database.collection("FinancialInformation");

    const filter = { email: email };
    const updateDoc = {
      $set: updates,
    };

    const result = await collection.updateOne(filter, updateDoc);

    if (result.matchedCount && result.modifiedCount) {
      console.log(
        `Successfully updated the financial information for user with ID: ${email}`
      );
    } else {
      console.log(
        "No matching document found or no new data provided to update."
      );
    }
  } finally {
    await client.close();
  }
}

async function updateUserInformation(email, updates) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const collection = database.collection("users");

    const filter = { email: email };
    const updateDoc = {
      $set: updates,
    };

    const result = await collection.updateOne(filter, updateDoc);
    if (result.matchedCount && result.modifiedCount) {
      console.log(
        `Successfully updated the user info for user with email: ${email}`
      );
    } else {
      console.log(
        "No matching document found or no new data provided to update."
      );
    }
  } finally {
    await client.close();
  }
}

// Code for deletinng collections
async function deleteUser(email) {
  try {
    await client.connect();

    const database = client.db("test2");
    const collection = database.collection("users");

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

async function deleteHealthInformation(email) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const collection = database.collection("HealthInformation");

    const result = await collection.deleteOne({ email: email });

    if (result.deletedCount === 1) {
      console.log(
        `Successfully deleted the health information for patient with ID: ${email}`
      );
    } else {
      console.log("No health information found with that ID.");
    }
  } finally {
    await client.close();
  }
}

async function deleteFinancialInformation(email) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test2");
    const collection = database.collection("FinancialInformation");

    const result = await collection.deleteOne({ email: email });

    if (result.deletedCount === 1) {
      console.log(
        `Successfully deleted the financial information for user with ID: ${email}`
      );
    } else {
      console.log("No financial information found with that ID.");
    }
  } finally {
    await client.close();
  }
}

/*
  // Example usage
  const username = 'test2user';
  const password = 'pass';

  insertUser(username, password);

  // Example usage for Health Information
  const email = 'test2user';
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
  const BMI = 22.1;
  const physicalhealth = 5;
  const MentalHealth = 3;
  const sleeptime = 6;

  insertHealthInformation(
    email,
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
    heartDisease,
    BMI,
    physicalhealth,
    MentalHealth,
    sleeptime
  );

  // Example usage for Financial Information
  const income = 75000; // annual income in dollars
  const savings = 15000; // savings in dollars
  const investments = [
    { type: 'Stocks', value: 20000 },
    { type: 'Bonds', value: 5000 }
  ];
  const debt = 20000;

  insertFinancialInformation(
    email,
    income,
    savings,
    investments,
    debt
  );

const patientIdToUpdate = 'test2user';
const healthUpdates = {
  smoking: 'Occasionally',
  generalHealth: 'Fair',
  physicalActivity: 'None'
};

updateHealthInformation(patientIdToUpdate, healthUpdates);

const patientIdToDelete = 'test2user';
deleteHealthInformation(patientIdToDelete);
*/

const username = "yo";
const password = "pass";

insertUser(username, password);

// Example usage for Health Information
const email = "yo";
const smoking = "No";
const alcoholConsumption = "Yes";
const sex = "Female";
const age = 28;
const race = "Asian";
const difficultyWalking = "No";
const diabetic = "No";
const physicalActivity = "Yes";
const generalHealth = "Good";
const asthma = "No";
const kidneyDisease = "No";
const skinCancer = "No";
const stroke = "No";
const BMI = 22.1;
const physicalhealth = 5;
const MentalHealth = 3;
const sleeptime = 6;

insertHealthInformation(
  email,
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
  BMI,
  physicalhealth,
  MentalHealth,
  sleeptime
);

const income = 75000; // annual income in dollars
const expense = 50000;
const savings = 15000; // savings in dollars
const investments = [{ type: "Stocks", value: 20000 }];
const debt = 20000;

module.exports = {
  run,
  insertUser,
  insertHealthInformation,
  insertFinancialInformation,
  sendNewUser,
  updateHealthInformation,
  updateFinancialInformation,
  updateUserInformation,
  deleteUser,
  deleteHealthInformation,
  deleteFinancialInformation
};
