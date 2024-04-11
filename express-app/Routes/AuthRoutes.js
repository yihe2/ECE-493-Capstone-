const { MongoClient, ServerApiVersion } = require("mongodb");
const { register, log_in, changePassword, changeEmail } = require("../controllers/AuthControllers");
const { checkUser } = require("../middleware/authMiddleware");
const router = require("express").Router();
const { insertHealthInformation, updateHealthInformation, getHealthInformation, insertFinancialInformation, updateFinancialInformation, getFinancialInformation, sendNewUser, deleteUser, deleteAllInformation } = require("../mongo");

const uri = "mongodb+srv://mehta1:4Y8d1Y2uADwpzaWE@cluster0.w4dfpbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


client.connect().then(() => {
  console.log("DB Connection Successful from authroutes")
}).catch(err => {
  console.log(err.message)
})

// test get route
router.get('/', (req, res) => {
    res.send('Poppin here');
});

// FR1
router.post('/create-account', register);

//FR5
router.post("/login", log_in);

//FR10
router.put("/change-password", changePassword);

//FR7
router.put("/change-email", changeEmail)

//FR6
router.post("/secret", checkUser)

//FR15
router.post("/insert-health-info",  async (req, res) => {
  try {
    const {
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
      physicalHealth,
      mentalHealth,
      sleepTime,
    } = req.body;


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
      physicalHealth,
      mentalHealth, 
      sleepTime,
      client
    )

    res.status(201)
  } catch {
    res.status(500).json({ error: 'Error' });
  }
});

// FR17
router.put("/update-health-info", async (req, res) => {
  try {
    const updates = req.body
    console.log("updates::")
    console.log(updates.email)
    await updateHealthInformation(updates.email, updates, client)
    res.status(202)
  } catch {
    res.status(500).json({error: "Something wrong"})   
  }
})

//FR 25
router.get("/get-health-info", async (req, res) => {
  try {
    const {email} = req.query
    const result = await getHealthInformation(email, client)
    if (result) {
      res.status(200).json(result)
    }
    else {
      console.log("get health info not found")
      console.log(result)
      res.status(202).json(result)
    }
    
  }
  catch {
    res.status(500).json({error: "Something wrong"})
  }
})

//FR28
router.post("/insert-fin-info",  async (req, res) => {
  try {
    const {
      email,
      income,
      expense,
      savings,
      investments,
      debt

    } = req.body;
     // should work
    insertFinancialInformation(
      email,
      income,
      expense,
      savings,
      investments,
      debt,
      client
    )
    
    res.status(201)
  } catch {
    res.status(500).json({ error: 'Error' });
  }
});

//FR 33
router.put("/update-fin-info", async (req, res) => {
  try {
    const updates = req.body
    await updateFinancialInformation(updates.email, updates, client)
    res.status(200)
  } catch {
    res.status(500).json({error: "Something wrong"})   
  }
})

//FR28
router.get("/get-fin-info", async (req, res) => {
  try {
    const {email} = req.query
    console.log(email)
    const result = await getFinancialInformation(email, client)
    if (result) {
      res.status(200).json(result)
    }
    else {
      console.log(result)
      res.status(202).json(result)
    }
    
  }
  catch {
    res.status(500).json({error: "Something wrong"})
  }
})

//FR26
router.get("/score-predict", async (req, res) => {
  try {
    const {email, riskLevel, mode} = req.query
    console.log(email)
    console.log(mode)
    console.log(riskLevel)
    const result = await sendNewUser(email, riskLevel, mode, client)
    console.log("result from score-predict")
    console.log(result)
    res.status(200).json(result)

  } catch (e){
    console.log(e)
    res.status(500).json({error: e})
  }
})

//FR12
router.put("/delete-user", async (req, res) => {
  try {
    const data = req.body;
    const result = await deleteUser(data.email, client);
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({error: e})
  }
});

//FR11
router.put("/delete-all", async (req, res) => {
  try {
    const data = req.body;
    const result = await deleteAllInformation(data.email, client);
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({error: e})
  }
});


module.exports = router;