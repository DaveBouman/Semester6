import { Request, Response } from 'express';
import passport from "passport"

class GoogleController {

    authenticate = (passport.authenticate('google',
        {
            scope: ['profile', 'email']
        }));

    logout = (req: Request, res: Response) => {
        console.log('5')

        req.logOut();
        res.redirect(`${process.env.DOMAIN}`);
    };

    callback = (passport.authenticate("google", {
        successRedirect: `${process.env.DOMAIN}`,
        failureRedirect: 'api/v1/users/login/failed'
    }));

    authFailed = (res: Response) => {
        res.status(401).json({
            success: false,
            message: 'failure'
        })
    };

    authSucces = (req: Request, res: Response) => {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: 'succesfull',
                user: req.user,
                cookies: req.cookies
            })
        }
    };
}

export default GoogleController