const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
//signup
router.post("/sign-up", async (req, res) => {
    try {
        const { username, password, email, address, mobile, role } = req.body;
        //validate
        if (!username || !password || !email || !address || !mobile) {
            return res.status(400).json({ mssg: "All fields are required" });
        }
        //if user exist,email
        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            return res.status(409).json({ mssg: "User with this email or mobile already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            address,
            mobile,
            role: role || "buyer"   // Default role is 'buyer'
        });

        await newUser.save();

        res.status(200).json({
            mssg: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });


    } catch (error) {
        res.status(500).json({mssg : "Internal Serve Error"});
    }
})

//signin
router.post("/sign-in", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const existuser = await User.findOne({ email });
        
        // Check user existence and password validity
        if (!existuser || !(await bcrypt.compare(password, existuser.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Define authentication claims
        const authClaims = {
            userId: existuser._id,
            name: existuser.username,

        };

        // Generate JWT token with proper options
        const token = jwt.sign(
            authClaims,
            "Latex123", // Secret key (should be in env variable)
            { expiresIn: "2h" } // Correct expiresIn syntax (2 hours)
        );

        // Send response
        res.status(200).json({
            id: existuser._id, // Changed to _id assuming MongoDB
            token: token,
            message: "Sign-in successful"
        });

    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; 

        const user = await User.findById(userId).select("username email role");

        if (!user) {
            return res.status(404).json({ mssg: "User not found" });
        }

        res.status(200).json({
            mssg: "User information retrieved successfully",
            user
        });

    } catch (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ mssg: "Internal Server Error" });
    }
});

//update user info
router.put("/update-user", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;  // Extract user ID from the token

        const { username, email, address, mobile } = req.body;

        if (!username && !email && !address && !mobile) {
            return res.status(400).json({ mssg: "At least one field is required to update" });
        }

        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (address) updateFields.address = address;
        if (mobile) updateFields.mobile = mobile;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");  

        if (!updatedUser) {
            return res.status(404).json({ mssg: "User not found" });
        }

        res.status(200).json({
            mssg: "User information updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error updating user information:", error);
        res.status(500).json({ mssg: "Internal Server Error" });
    }
});

//getuser
router.get("/get-merchants", async (req, res) => {
    try {
      // Find all users with the role of 'merchant'
      const merchants = await User.find({ role: 'merchant' });
  
      // If no merchants are found
      if (merchants.length === 0) {
        return res.status(404).json({ message: 'No merchants found' });
      }
  
      // Remove sensitive information (id, password) from each merchant object
      const merchantsWithoutSensitiveInfo = merchants.map(merchant => {
        const { _id, password, ...merchantDetails } = merchant.toObject(); // exclude _id and password
        return merchantDetails;
      });
  
      // Send back the filtered list of merchants
      res.status(200).json(merchantsWithoutSensitiveInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

module.exports = router;