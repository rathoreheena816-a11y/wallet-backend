const express = require('express');
const cors = require('cors');
const { Keypair } = require('@solana/web3.js');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 THIS LINE ADD
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

// test route
app.get('/', (req, res) => {
  res.send("Server running ✅");
});

// wallet route
app.get('/create-wallet', (req, res) => {
  const keypair = Keypair.generate();

  res.json({
    publicKey: keypair.publicKey.toBase58(),
    privateKey: Array.from(keypair.secretKey)
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

