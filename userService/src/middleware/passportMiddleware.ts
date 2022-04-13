const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
import MagicLoginStrategy from "passport-magic-login"
import passportGoogle from "passport-google-oauth20";
import User from '../entities/database/user';
import passport from 'passport';
import UserService from "../services/userService";
import SendGridService from "../services/sendGridService";
import SendGridMessage from "../entities/sendGrid";

const userService = new UserService();
const sendGridService = new SendGridService();

const googleLogin = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "api/google/auth/callback",
    },
    async function (accessToken: string, refreshToken: string, profile: passportGoogle.Profile, done: any) {
        const user: User = await userService.getOneById(profile.id) as unknown as User;

        if (!user) {
            const newUser = await createGoogleUser(profile);
            done(null, newUser);
        } else {
            done(null, user);
        }
    });

export const magicLogin = new MagicLoginStrategy({
    secret: process.env.MAGIC_LINK_SECRET || '',
    callbackUrl: "api/auth/magiclogin/callback",

    sendMagicLink: async (href) => {
        await sendGridService.sendEmail('db.dave.bouman@gmail.com', 'db.dave.bouman@gmail.com', 'sign up', 'welcome to the sign up', `Click this link to finish logging in: http://www.localhost:3001${href}`)
    },

    verify: async (payload, done) => {

        const user: User = await userService.getOneByEmail(payload.destination) as unknown as User;

        if (!user) {
            const newUser = new User;
            newUser.social = 'email';
            newUser.email = payload.destination;

            const sendUser = userService.create(newUser) as unknown as User

            if (newUser) {
                done(undefined, sendUser)
            }
        } else {
            done(undefined, user);
        }
    }
})

const createGoogleUser = async (profile: passportGoogle.Profile): Promise<User> => {
    const newUser = new User;
    if (profile.name?.givenName) {
        newUser.name = profile.name.givenName;
    }
    if (profile.name?.familyName) {
        newUser.familyName = profile.name.familyName;
    }
    if (profile.emails) {
        newUser.email = profile.emails[0].value;
    }
    if (profile.profileUrl) {
        newUser.imageUrl = profile.profileUrl;
    }
    newUser.social = 'google';
    newUser.socialId = profile.id;

    const user = await userService.create(newUser) as unknown as User;
    return user;
}

passport.serializeUser((user: User, done) => {
    return done(null, user);
});

passport.deserializeUser((user: User, done) => {
    return done(null, user);
});

passport.use(magicLogin);
passport.use(googleLogin);