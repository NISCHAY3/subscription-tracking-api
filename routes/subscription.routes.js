import { Router } from 'express';
import autherize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.contoller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: "GET all subscriptions" }));

subscriptionRouter.get('/:id', (req, res) => res.send({ title: "GET subscription details" }));

subscriptionRouter.post('/', autherize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({ title: "UPDATE subscription " }));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: "DELETE a subscription " }));

subscriptionRouter.get('/user/:id', autherize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: "cancel subscription" }));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: "GET upcoming renewals" }));



export default subscriptionRouter;





