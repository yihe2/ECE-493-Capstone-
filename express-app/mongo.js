const { MongoClient, ServerApiVersion } = require("mongodb");
const axios = require("axios");
const { response } = require("express");
const uri =
// 'mongodb+srv://sahusnai:YzhMRa0cjsrJEVhd@cluster0.nrkocdu.mongodb.net/';
"mongodb+srv://mehta1:4Y8d1Y2uADwpzaWE@cluster0.w4dfpbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});




// Function for inserting Health Information
// FR15
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
  SleepTime,
  client
) {

  try {
    // await client.connect();
    const database = client.db("test");
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
    // await client.close();
  }
}

// Function for injecting Financial Information
// FR28 and FR30
async function insertFinancialInformation(
  email,
  income,
  expense,
  savings,
  investments,
  debt,
  client
) {

  try {
    // await client.connect();
    const database = client.db("test");
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
    // await client.close();
  }
}

// Send to backend using this
// Builds towards FR25
async function sendNewUser(email, riskLevel, mode, client) {

  try {
    // await client.connect();
    const database = client.db("test");
    const healthCollection = database.collection("HealthInformation");
    const financialCollection = database.collection("FinancialInformation");

    const health = await healthCollection.findOne({ email: email });
    console.log(email)
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
      future_risk_level: parseFloat(riskLevel), 
    };

    delete doc.financial_information._id;

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recieve/newuser",
        doc
      );
      console.log("from newuser func")
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error);
    }
  } finally {
  }
}
// Updating Functions
// FR 16 and FR 17
async function updateHealthInformation(email, updates, client) {
  
  try {
    // await client.connect();
    const database = client.db("test");
    console.log("From updates:")
    console.log(updates)
    const collection = database.collection("HealthInformation");

    // remove ID from update
    delete updates._id

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
  
  } catch (e) {
    console.log(e)
  } finally {
  }
}

async function getHealthInformation(email, client) {


  try {
    const database = client.db("test");
    const collection = database.collection("HealthInformation");
    console.log(email)
    const filter = { email: email };
    const result = await collection.findOne(filter);
    console.log(result)

    if (result) {
      console.log(`Found health information for patient with email: ${email}`);
      return result;
    } else {
      console.log("No health information found for the specified email.");
      return null; 
    }
  } catch (error) {
    console.error("An error occurred while fetching health information:", error);
    throw error; 
  } finally {
  }
}

async function getFinancialInformation(email, client) {

  try {
    const database = client.db("test");
    const collection = database.collection("FinancialInformation");
    console.log(email)
    const filter = { email: email };
    const result = await collection.findOne(filter);
    console.log(result)

    if (result) {
      console.log(`Found financial information for patient with email: ${email}`);
      return result;
    } else {
      console.log("No financial information found for the specified email.");
      return null; 
    }
  } catch (error) {
    console.error("An error occurred while fetching health information:", error);
    throw error; 
  } finally {
  }
}

// FR 33 and FR34
async function updateFinancialInformation(email, updates, client) {

  try {
    const database = client.db("test");
    const collection = database.collection("FinancialInformation");

    delete updates._id

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
  }
}

async function updateUserInformation(email, updates, client) {

  try {
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
  }
}

// Code for deletinng collections, FR12
async function deleteUser(email, client) {
  try {

    const database = client.db("test");
    const collection = database.collection("users");

    const result = await collection.deleteOne({ email: email });

    if (result.deletedCount === 1) {
      console.log("User deleted successfully.");
      return true;
    } else {
      console.log("User not found or deletion failed.");
      return false;
    }
  } catch (e) {
    console.error(e)
    throw e;
  } finally {
  }
}

// FR 11 Complete Removal of all info
async function deleteHealthInformation(email, client) {
  try {
    // await client.connect();
    const database = client.db("test");
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
    // await client.close();
  }
}

// FR 11 Complete Removal of all info
async function deleteFinancialInformation(email, client) {
  try {
    const database = client.db("test");
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
    // await client.close();
  }
}

// FR 11 Complete Removal of all info
async function deleteAllInformation(email, client) {
  try {
    const database = client.db("test");
    const healthCollection = database.collection("HealthInformation");
    const financialCollection = database.collection("FinancialInformation");
    const accCollection = database.collection("users");

    
    const healthResult = await healthCollection.deleteOne({ email: email });
    const finResult = await financialCollection.deleteOne({ email: email });
    const accResult = await accCollection.deleteOne({ email: email });

    if (healthResult.deletedCount === 1) {
      console.log(
        `Successfully deleted the health information for user with ID: ${email}`
      );
    } else {
      console.log("No health information found with that ID.");
    }

    if (finResult.deletedCount === 1) {
      console.log(
        `Successfully deleted the financial information for user with ID: ${email}`
      );
    } else {
      console.log("No financial information found with that ID.");
    }

    if (accResult.deletedCount === 1) {
      console.log(
        `Successfully deleted the user information for user with ID: ${email}`
      );
    } else {
      console.log("No user information found with that ID.");
    }


  } catch (e) {
    console.error(e)
    throw e;
  } finally {
  }
}



module.exports = {
  insertHealthInformation,
  insertFinancialInformation,
  sendNewUser,
  updateHealthInformation,
  updateFinancialInformation,
  updateUserInformation,
  deleteUser,
  deleteHealthInformation,
  deleteFinancialInformation,
  deleteAllInformation,
  getHealthInformation,
  getFinancialInformation
};
