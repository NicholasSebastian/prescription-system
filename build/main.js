"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const handlebars = __importStar(require("express-handlebars"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const LoginController_1 = __importStar(require("./controllers/AuthControllers/LoginController"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const DB_NAME = "main";
// MongoDB connection.
const { MONGODB_HOST, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
const databaseUri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${DB_NAME}`;
mongoose_1.default.connect(databaseUri, error => console.log(error || "Connected to MongoDB server"));
// Handlebars view engine.
const viewsDir = path_1.default.join(__dirname, "views");
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
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", viewsDir);
// 'passport' authentication.
const strategy = new passport_local_1.Strategy(LoginController_1.default);
passport_1.default.use(strategy);
passport_1.default.serializeUser(LoginController_1.serializer);
passport_1.default.deserializeUser(LoginController_1.deserializer);
app.use((0, express_session_1.default)({ secret: "hutao" }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Parse request body.
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Allows access to static files inside of the 'content' folder.
app.use(express_1.default.static("content"));
// Icon.
const iconDir = path_1.default.join(__dirname, "content", "favicon.ico");
app.use((0, serve_favicon_1.default)(iconDir));
// Register all the routes.
app.use(require("./routes/index"));
// Fallback page if requested path does not exist.
app.use((req, res) => res.status(404).redirect("/"));
// Listen on the port.
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
