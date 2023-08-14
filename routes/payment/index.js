const {randomUUID} = require("crypto");
const { Client, Environment, ApiError } = require("square");
const express = require('express');
const router = express.Router();

BigInt.prototype.toJSON = function() {return this.toString()}

const { paymentsApi } = new Client({
    accessToken: process.env.SQUAREUP_ACCESS,
    environment: Environment.Sandbox,
    timeout: 30000
});

router.post('/make-purchase', async (req, res, next) => {
    const requestBody = {
        idempotencyKey: randomUUID(),
        sourceId: req.body.sourceId,
        amountMoney: {
            currency: 'USD',
            amount: 1000
        }
    }

    try {
        const {result} = await paymentsApi.createPayment(requestBody);
        res.json({
            data: result
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Something went wrong',
            errorLog: JSON.toString(e)
        })
    }
});

module.exports = router;