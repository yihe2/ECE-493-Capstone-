const { register, log_in } = require("../controllers/AuthControllers");
const { checkUser } = require("../middleware/authMiddleware");
const router = require("express").Router();
const { insertHealthInformation, updateHealthInformation, getHealthInformation, insertFinancialInformation, updateFinancialInformation, getFinancialInformation } = require("../mongo");


router.get('/', (req, res) => {
    res.send('Poppin here');
});

router.post('/create-account', register);
router.post("/login", log_in);
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
      sleepTime
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
    await updateHealthInformation(updates.email, updates)
    res.status(202)
  } catch {
    res.status(500).json({error: "Something wrong"})   
  }
})

router.get("/get-health-info", async (req, res) => {
  try {
    const {email} = req.query
    const result = await getHealthInformation(email)
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
      debt
    )
    
    res.status(201)
  } catch {
    res.status(500).json({ error: 'Error' });
  }
});


router.put("/update-fin-info", async (req, res) => {
  try {
    const updates = req.body
    await updateFinancialInformation(updates.email, updates)
    res.status(200)
  } catch {
    res.status(500).json({error: "Something wrong"})   
  }
})

router.get("/get-fin-info", async (req, res) => {
  try {
    const {email} = req.query
    console.log(email)
    const result = await getFinancialInformation(email)
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



router.post("/testpost", async (req, res) => {
    try {
        console.log("here")
        const data = req.body; // Assuming you're sending data in the request body
        // await account.insertUser("test@email.com", "passwardo", 10); // filler
        res.status(200).json({ message: 'Data written to MongoDB successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

module.exports = router;