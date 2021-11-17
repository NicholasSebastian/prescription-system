import express from "express";
import session from "express-session";
import * as handlebars from "express-handlebars";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import path from "path";

import passport from "passport";
import { Strategy } from "passport-local";
import LoginController, { serializer, deserializer } from "./controllers/AuthControllers/LoginController";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_NAME = "main";

// MongoDB connection.
const { MONGODB_HOST, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
const databaseUri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${DB_NAME}`;
mongoose.connect(databaseUri, error => console.log(error || "Connected to MongoDB server"));

// Handlebars view engine.
const viewsDir = path.join(__dirname, "views");
const hbs = handlebars.create({ 
    extname: ".hbs", 
    layoutsDir: viewsDir, 
    partialsDir: viewsDir,
    defaultLayout: "_Layout",
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    } 
});

app.engine("hbs", hbs.engine as any);
app.set("view engine", "hbs");
app.set("views", viewsDir);

// 'passport' authentication.
const strategy = new Strategy(LoginController);
passport.use(strategy);
passport.serializeUser(serializer);
passport.deserializeUser(deserializer);

app.use(session({ secret: "hutao" }));
app.use(passport.initialize());
app.use(passport.session());

// Parse request body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows access to static files inside of the 'content' folder.
app.use(express.static("content"));

// Icon.
const iconDir = path.join(__dirname, "content", "favicon.ico");
app.use(favicon(iconDir));

// Register all the routes.
app.use(require("./routes/index"));

// Fallback page if requested path does not exist.
app.use((req, res) => res.status(404).redirect("/"));

// Listen on the port.
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
