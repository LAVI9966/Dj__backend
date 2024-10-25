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
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();

cloudinary.config({
    cloud_name: "dggtmwjwt",
    api_key: "981491236798984",
    api_secret: "xjN3m0VHyofvLVyO4WhkgBC7tfk"
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());

app.get("/", (req, res) => {
    return res.send("hello world");
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
    const subject = "Your OTP Code"
    const text = `Your OTP code is: ${otp}`
    const html = `<p>Your OTP code is: <strong>${otp}</strong></p>`

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
        const user = new User(req.body.userData);
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
app.listen(3000, () => {
    console.log("Server is listening on port", 3000);
});
