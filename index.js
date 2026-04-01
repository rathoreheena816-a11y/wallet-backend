const express = require('express');
const cors = require('cors');
const { Keypair } = require('@solana/web3.js');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ GET route (browser + fallback)
app.get('/wallet/create', (req, res) => {
  try {
    const keypair = Keypair.generate();

    res.json({
      publicKey: keypair.publicKey.toString(),
      secretKey: Array.from(keypair.secretKey),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Wallet creation failed",
    });
  }
});

// ✅ POST route (FlutterFlow)
app.post('/wallet/create', (req, res) => {
  try {
    const keypair = Keypair.generate();

    res.json({
      publicKey: keypair.publicKey.toString(),
      secretKey: Array.from(keypair.secretKey),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Wallet creation failed",
    });
  }
});

// ✅ Railway port fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
