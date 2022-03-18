const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51KdXsiEUw3LuC1QHCuTrVgtWhSLmJ5HZ26FE7MVFUeF5xkgbSm9Oul4lFcg8rqUH6YjbZl0BWz032KtRuOAp80Lw00YXMIIaYW"
);

const PORT = process.env.port || 9000;

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// API routes

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;
    console.log(`Payment Request Recieved BOOM !!! for this amount >>>`, total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Listen command
app.listen(PORT, () => console.log(`server run with ${PORT}`));
// Example endpoint
// http://localhost:5001/challenge-531b6/us-central1/api
