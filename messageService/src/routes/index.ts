import { useErrorHandler as use } from '../middleware/apiErrorMiddleware';
import { Router, } from 'express';
import Google from './google';
import Facebook from './facebook';
import MagicLogin from './magicLogin';
import Stripe from './stripe';
import Todo from './todo';
import Message from './message';

const routes = Router();

routes.use('/google', Google);
routes.use('/todos', Todo);
routes.use('/facebook', use(Facebook));
routes.use('/auth', MagicLogin);
routes.use('/stripe', Stripe);
routes.use('/messages', Message);

export default routes;