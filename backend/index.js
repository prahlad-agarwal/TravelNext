import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import listingRoute from "./routes/listing.route.js";
import dbConnect from "./config/db.js";
import userRoute from "./routes/user.route.js";
import bookingRoute from "./routes/booking.route.js";

  

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://travelnext-frontend-folder.onrender.com",
    credentials: true,
  })
);

const PORT = process.env.SERVER_PORT || 8000;

dbConnect();

app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);
app.use("/api/booking", bookingRoute);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
