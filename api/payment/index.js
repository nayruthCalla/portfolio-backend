// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const YOUR_DOMAIN = process.env.STRIPE_YOUR_DOMAIN;

const createPaymentIntent = async (req, res) => {
  try {
    const product = await stripe.products.create({
      name: 'Regalito',
      description: 'Recuerda que puedes invitar más de un regalito :)',
      images: [
        'https://res.cloudinary.com/drcn7ijzl/image/upload/v1645745679/regalo_dzdmh0.png',
      ],
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 300,
      currency: 'usd',
    });
    // console.log(product, price);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
          },
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}`,
      cancel_url: `${YOUR_DOMAIN}`,
    });
    res.redirect(303, session.url);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
