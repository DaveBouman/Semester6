const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passportGoogle from "passport-google-oauth20";
import User from "../entities/database/user";
import passport from "passport";

passport.use(new GoogleStrategy(
    {
        clientID: "758144089634-teoht7idk1g4sb64mvcl1268h9bapfh3.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3001/api/v1/users/google/auth/callback",
    },
    function (accessToken: string, refreshToken: string, profile: passportGoogle.Profile, done: any) {
        console.log('test asdl');
        done(null, profile);
    }
));

passport.serializeUser((user: any, done) => {
    return done(null, user);
});

passport.deserializeUser((user: any, done) => {
    return done(null, user);
});
