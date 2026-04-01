const express = require('express');
const cors = require('cors');
const { Keypair } = require('@solana/web3.js');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send("Server running ✅");
});

// wallet create route
app.get('/wallet/create', (req, res) => {
  try {
    const keypair = Keypair.generate();

    res.json({
      publicKey: keypair.publicKey.toString(),
      secretKey: Array.from(keypair.secretKey),
    });
  } catch (error) {
    res.status(500).json({
      error: "Wallet creation failed",
      details: error.message,
    });
  }
});

// IMPORTANT for Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});