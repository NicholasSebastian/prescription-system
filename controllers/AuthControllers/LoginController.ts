import { RequestHandler } from "express";
import { VerifyFunction } from "passport-local";
import { compare } from "bcryptjs";
import { AccountUser, IAccountUser } from "../../models/AccountUser";

// GET: "/login"
const View: RequestHandler = (req, res) => {
    if (req.isAuthenticated()) 
        req.logout();

    res.render("LoginView");
}

// POST: "/login"
const Login: VerifyFunction = async (username, password, done) => {
    try {
        const accountUser = await AccountUser.findOne({ username });
        if (!accountUser) {
            return done(null, false, { message: "Incorrect username." });
        }
        const validPassword = await compare(password, accountUser.password);
        if (!validPassword) {
            return done(null, false, { message: "Incorrect password." });
        }
        return done(null, accountUser);
    }
    catch (err) {
        return done(err);
    }
}

const serializer: Serializer = (user, done) => {
    const userId = (user as IAccountUser)._id.toString();
    return done(null, userId);
}

const deserializer: Deserializer = async (userId, done) => {
    const accountUser = await AccountUser.findById(userId);
    return done(null, accountUser);
}

export { View, serializer, deserializer };
export default Login;

type Serializer = (user: Express.User, done: (err: any, id?: unknown) => void) => void;
type Deserializer = (id: unknown, done: (err: any, user?: false | Express.User | null | undefined) => void) => void;