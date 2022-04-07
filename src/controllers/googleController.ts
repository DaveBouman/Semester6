import { Request, Response } from 'express';
import passport from "passport"

class GoogleController {

    authenticate = async () => {
        passport.authenticate("google", {
            scope: ["email", "profile"],
        })
    }

    logout = async (req: Request, res: Response) => {
        req.logOut();
        res.redirect(`${process.env.DOMAIN}`);
    }

    callback = async () => {
        passport.authenticate("google", {
            successRedirect: `${process.env.DOMAIN}`,
            failureRedirect: '/api/google/auth/failed'
        })
    }

    authFailed = async (res: Response) => {
        res.status(401).json({
            success: false,
            message: 'failure'
        })
    }

    authSucces = async (req: Request, res: Response) => {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: 'succesfull',
                user: req.user,
                cookies: req.cookies
            })
        }
    }
}

export default GoogleController