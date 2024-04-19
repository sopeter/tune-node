import express from "express";
import session from "express-session"
import mongoose from "mongoose";
import cors from "cors";
import Health from "./Health.js"
import SpotifyRoutes from "./Spotify/routes.js";
import TuneRoutes from "./Tune/routes.js";
import UserRoutes from "./Users/routes.js";
import "dotenv/config";

const CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tune";
mongoose.connect(CONNECTION_STRING);


const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

const app = express();
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
)
app.use(session(sessionOptions));
app.use(express.json());
Health(app);
SpotifyRoutes(app);
TuneRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
