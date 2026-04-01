const express = require("express");
const cors = require("cors");
const { Keypair } = require("@solana/web3.js");

const app = express();

// ✅ IMPORTANT CORS FIX
app.use(cors({
  origin: "*",   // allow all (FlutterFlow ke liye)
  methods: ["GET", "POST"],
}));

app.use(express.json());

// ✅ BOTH GET + POST (important)
app.get("/wallet/create", (req, res) => {
  const keypair = Keypair.generate();

  res.json({
    publicKey: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey),
  });
});

app.post("/wallet/create", (req, res) => {
  const keypair = Keypair.generate();

  res.json({
    publicKey: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey),
  });
});

// ✅ PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
