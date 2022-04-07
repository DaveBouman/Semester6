import { useErrorHandler as use } from '../middleware/apiErrorMiddleware';
import { Router, } from 'express';
import Google from './google';
import Facebook from './facebook';
import MagicLogin from './magicLogin';
import Stripe from './stripe';
import Todo from './todo';

const routes = Router();

routes.use('/api/google', Google);
routes.use('/todos', use(Todo));
routes.use('/api/facebook', Facebook);
routes.use('/api/auth', MagicLogin);
routes.use('/api/stripe', Stripe);

export default routes;