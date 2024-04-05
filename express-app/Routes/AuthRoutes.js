const { MongoClient, ServerApiVersion } = require("mongodb");
const { register, log_in, changePassword } = require("../controllers/AuthControllers");
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
// TODO: Change such that it presents message on successful connect
console.log("Reached here???")
client.connect().then(() => {
  console.log("DB Connection Successful from authroutes")
}).catch(err => {
  console.log(err.message)
})


router.get('/', (req, res) => {
    res.send('Poppin here');
});

router.post('/create-account', register);
router.post("/login", log_in);
router.put("/change-password", changePassword);
router.post("/secret", checkUser)
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
     // should work
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


router.put("/update-fin-info", async (req, res) => {
  try {
    const updates = req.body
    await updateFinancialInformation(updates.email, updates, client)
    res.status(200)
  } catch {
    res.status(500).json({error: "Something wrong"})   
  }
})

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

router.put("/delete-user", async (req, res) => {
  try {
    const data = req.body;
    const result = await deleteUser(data.email, client);
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({error: e})
  }
});

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