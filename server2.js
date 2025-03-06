const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Failed:", err));
// ✅ Define Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    txt: String,
    add: String,
    flrarea: Number,
    idate: Date
});
const User = mongoose.model("User", userSchema);
module.exports=User

// ✅ Handle Form Submission
app.post("/submit-form", async (req, res) => {
    try {
        const newUser = new User(req.body);
        console.log("Inside SERVER2---> ", req.body)
        await newUser.save();
        res.json({ message: "✅ Data saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Error saving data", error });
    }
});
// ✅ Start the Server
const PORT = 5002;
app.listen(PORT,()=> console.log(`🚀 Server running on http://localhost:${PORT}`));