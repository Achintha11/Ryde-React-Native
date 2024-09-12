const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PyEzT03E06JPf4zyTiWaaXbh3ILg6x0CBwltE6xV24Ih6dKNnYqLwzvuUH5FsUkvu1upwmrSnCdfxbcF2OkpvZh006F4Rywm7"
);

const app = express();
const port = 3000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-06-20" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "eur",
    customer: customer.id,
    setup_future_usage: "off_session",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51PyEzT03E06JPf4zv5JUdOOodPzPTzkqndGXIE5lrkgy56YrPeAWy2AZtwDzVmQzsPZmhugnoGaxSWDZKvzFaVYY00l1nV10FU",
  });
});
