const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
//Make keySecret secret before deploying
const keySecret = "sk_test_k5r0VkkM3ddLjMmst8aYC23900eTkN1l2U";

const express = require("express");
const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");

const app = express();

const axios = require("axios");

/*module.exports.startStripeSession = axios.post("/profile-payment", paymentDetails)
.then(res => {
  const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
  const stripe = Stripe(keyPublishable);
  const {error} = stripe.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as parameter here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    sessionId: res.data.sessionId
  })
  console.log(res.data);
})
.catch(err => {
  this.setState({
    errors: err.response.data // Error messages from server
  });
});*/

/*module.exports.getPayment = app.get("/checkout-session", async (req, res) => {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
});

module.exports.createPayment = app.post("/create-checkout-session", async (req, res) => {
    //const domainURL = process.env.DOMAIN;
    const domainURL = "localhost:3000"

    const { quantity } = req.body;
    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [payment_intent_data] - lets capture the payment later
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                name: "Pasha photo",
                images: ["https://picsum.photos/300/300?random=4"],
                quantity: quantity,
                currency: process.env.CURRENCY,
                amount: process.env.BASE_PRICE // Keep the amount on the server to prevent customers from manipulating on client
            }
        ],
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/canceled.html`
    });

    res.send({
        sessionId: session.id
    });
});*/
