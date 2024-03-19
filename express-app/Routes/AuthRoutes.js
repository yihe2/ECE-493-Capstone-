const { register, login } = require("../controllers/AuthControllers");
const { checkUser } = require("../middleware/authMiddleware");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const router = require("express").Router();


router.get('/', (req, res) => {
    console.log("works")
    res.send('Poppin here');
});

router.post('/create-account', register);
router.post("/login", login);
router.post("/secret", checkUser)





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