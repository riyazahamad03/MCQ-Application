const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
const userRoutes = require("./api/routes/mcqUser");
const mcqRoutes = require("./api/routes/mcq");
const userProfile = require("./api/routes/userProfile");
app.use(cors({ credentials: true, origin: true }));
// mongoose.set("strictQuery", false);
// mongoose.connect("mongodb://localhost:27017");
const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined.");
    }

    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
connectToDatabase();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin , X-Requested-With , Content-Type , Accept , Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "PUT , POST , PATCH , DELETE , GET"
//     );
//     return res.status(200).json({});
//   }
//   next();
// });

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://mcq-application-phi.vercel.app/",
//     ],
//     credentials: true,
//   })
// );

app.use("/user", userRoutes);
app.use("/creator", mcqRoutes);
app.use("/userdata", userProfile);
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello World" });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
