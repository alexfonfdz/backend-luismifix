import Stripe from 'stripe';
import { STRIPE_KEY } from '../server/config.js';

const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2022-11-15',
});

export default stripe;