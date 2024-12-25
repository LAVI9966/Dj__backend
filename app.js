import express from "express";
// import { sendEmail } from "./utils/sendmail.js";

import { MusicTrack } from "./models/musicTrack.js";
import nodemailer from "nodemailer";
import cors from "cors";
import "./db/connection.js";
import { Order } from "./models/order.js";
import multer from "multer";
import cloudinary from "cloudinary";
import { otpModel } from "./models/otp.js";
import { User } from "./models/user.js";
import { FavSong } from "./models/favsong.js";
import path from 'path'
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage });
const link = "https://www.pornhat.one/video/winning-jennifer-white-at-curvy-smut/";
const link2 = "https://www.naughtymachinima.com/video/89837/natural-wildness-dual-sub-futa-1080h-radroachhd";
const app = express();
//ye mera wala config he
// cloudinary.config({
//     cloud_name: "dggtmwjwt",
//     api_key: "981491236798984",
//     api_secret: "xjN3m0VHyofvLVyO4WhkgBC7tfk"
// });
cloudinary.config({
    cloud_name: "dxvhzvf5j",
    api_key: "446619714517729",
    api_secret: "lXdQ1v__1-Kg7CA86C6efludBws"
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());

app.use(express.static(path.join(__dirname, '/dist')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});


// Add songs
app.get("/fetchallsongs", async (req, res) => {
    try {
        const response = await MusicTrack.find();
        return res.status(200).send(response);
    } catch (error) {
        console.error("Error saving track:", error);
        res.status(500).json({ message: "Error saving track", error });
    }
});

app.post("/addproduct", async (req, res) => {
    try {
        const musicTrack = new MusicTrack(req.body);
        const savedTrack = await musicTrack.save();
        res.status(201).json(savedTrack);
    } catch (error) {
        console.error("Error saving track:", error);
        res.status(500).json({ message: "Error saving track", error });
    }
});

app.post("/orders", async (req, res) => {
    const orderInfo = req.body;
    console.log("order se he ye ", orderInfo);
    try {
        const saveOrder = new Order(orderInfo);
        const saveOrderInfo = await saveOrder.save();
        res.status(201).json(saveOrderInfo);
    } catch (error) {
        console.error("Error saving Order:", error);
        res.status(500).json({ message: "Error saving Order", error });
    }
});

const deleteLinks = async (public_Id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_Id);
    } catch (error) {
        console.log(error);
    }
};

app.delete("/deletefile", async (req, res) => {
    try {
        const { item } = req.body;
        await deleteLinks(item.image.publicId);
        await deleteLinks(item.mp3File.publicId);
        const response = await MusicTrack.findByIdAndDelete({ _id: item._id });
        res.status(200).send("deleted");
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).send({ message: "Error deleting file", error });
    }
});

app.get("/fetchOrders", async (req, res) => {
    const { userid } = req.query;
    console.log(userid);
    try {
        const response = await Order.find({ userid });
        res.status(200).send({ response });
    } catch (error) {
        console.log("error ", error);
        res.status(500).send({ message: "Error fetching orders", error });
    }
});

app.get("/allorders", async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders from MongoDB
        res.status(200).json(orders); // Send orders as JSON
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get("/fethcdoc", async (req, res) => {
    const { email } = req.query;
    console.log("ghghg ", email);
    try {
        const orders = await Order.find({ email: email }); // Fetch all orders from MongoDB
        res.status(200).json(orders); // Send orders as JSON
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "lavishgehlod@gmail.com",
        pass: "ntvjgguhsntpzspt"
    }
});

export const sendEmail = async (to, subject, text, html, attachment) => {
    const mailOptions = {
        from: "lavishgehlod@gmail.com",
        to,
        subject,
        text,
        html,
        attachments: [
            {
                filename: attachment.originalname,
                content: attachment.buffer,
                contentType: attachment.mimetype,
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.log("Error:", error);
    }
};
app.post("/send_email", upload.single("attachment"), async (req, res) => {
    const { to, subject, text, html } = req.body;
    const attachment = req.file;
    console.log("yaha tak agay hu ", req.body)
    try {
        await sendEmail(to, subject, text, html, attachment);
        res.status(200).send("Email sent successfully!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});
export const sendotpEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: "lavishgehlod@gmail.com",
        to,
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.log("Error:", error);
    }
};
app.post("/send_otp_email", async (req, res) => {

    const { email } = req.body;

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();
    console.log("email is ", email);
    const otp = generateOtp();
    console.log(otp)
    const to = email
    const subject = "Verify Your Email Address"
    const text = `Dear User,

Thank you for signing up for Dursh!

To complete your registration, please verify your email address by entering the following one-time code:

${otp}

This code is valid for 5 Minutes.

If you did not request this verification code, please ignore this email.

Sincerely,
The Dursh Team

`
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #3a86ff;
            margin: 0;
        }
        .content {
            margin-bottom: 20px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #3a86ff;
            padding: 10px 0;
            border-radius: 4px;
            background-color: #f1f1f1;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Dursh!</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Thank you for signing up for Dursh!</p>
            <p>To complete your registration, please verify your email address by entering the following one-time code:</p>
            <div class="otp">${otp}</div>
            <p>This code is valid for <strong>5 minutes</strong>.</p>
            <p>If you did not request this verification code, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Sincerely,<br>The Dursh Team</p>
        </div>
    </div>
</body>
</html>
`

    try {
        await sendotpEmail(to, subject, text, html);
        const otpdata = new otpModel({ email, otp });
        const saveotp = await otpdata.save();
        console.log("OTP email sent to:", email);
        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ message: "Error sending OTP email", error });
    }
});

app.post('/verifyotp', async (req, res) => {
    const { email, otp } = req.body;
    console.log("yaha me agaya", email, otp)
    try {
        const response = await otpModel.findOne({ email, otp });
        console.log(response)
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).json({ message: "Otp wrong", error });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending OTP email", error });
    }
})


app.post('/adduser', async (req, res) => {
    console.log("hrlllo")
    console.log(req.body)
    try {
        const user = new User(req.body.chato);
        const saveuser = await user.save();
        res.status(201).json(saveuser);
    } catch (error) {
        console.error("Error saving track:", error);
        res.status(500).json({ message: "Error saving track", error });
    }
})

app.get('/getuser', async (req, res) => {
    const { email } = req.query;
    console.log(email)
    try {
        const user = await User.findOne({ email });
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
})


app.post('/add-to-favorites', async (req, res) => {
    const { userid, songid } = req.body;

    try {
        // Find the user's favorites document
        const favDocument = await FavSong.findOne({ userid });

        if (favDocument) {
            // Check if the song is already in the list
            const songExists = favDocument.songlist.some((song) => song.songid === songid);

            if (songExists) {
                // If song exists, remove it
                await FavSong.updateOne(
                    { userid },
                    { $pull: { songlist: { songid } } } // Removes the song ID from the list
                );
                return res.status(200).send({ message: 'Song removed from favorites!' });
            } else {
                // If song does not exist, add it
                await FavSong.updateOne(
                    { userid },
                    { $addToSet: { songlist: { songid } } } // Adds the song ID to the list
                );
                return res.status(200).send({ message: 'Song added to favorites!' });
            }
        } else {
            // If the document for the user doesn't exist, create it with the song
            await FavSong.updateOne(
                { userid },
                { $addToSet: { songlist: { songid } } },
                { upsert: true }
            );
            res.status(200).send({ message: 'Song added to favorites!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating favorites', error });
    }
});
app.get('/get-favorites', async (req, res) => {
    const { userid } = req.query; // Expecting userid to be passed as a 

    console.log("user id eh ye ", userid)
    if (!userid) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const favoriteDocument = await FavSong.findOne({ userid: userid });

        if (!favoriteDocument) {
            return res.status(404).json({ message: 'No favorites found for this user.' });
        }

        return res.status(200).json(favoriteDocument);
    } catch (error) {
        console.error("Error fetching favorite songs:", error);
        return res.status(500).json({ message: 'Server error' });
    }
});
app.get('/fetchsong', async (req, res) => {
    const { songid } = req.query;
    console.log("Fuck me hard ", songid)
    try {
        const song = await MusicTrack.findOne({ _id: songid });
        console.log("pussy ", song)
        return res.status(200).json(song);
    } catch (error) {
        console.error("Error fetching  songs:", error);
        return res.status(500).json({ message: 'Server error' });

    }

})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is listening on port", 3000);
});


