const express = require("express");
const { Keypair } = require("@solana/web3.js");

const app = express();
app.use(express.json());

// root (important)
app.get("/", (req, res) => {
  res.send("Backend is LIVE ✅");
});

// real wallet generate
app.get("/wallet", (req, res) => {
  try {
    const keypair = Keypair.generate();

    const publicKey = keypair.publicKey.toBase58();
    const privateKey = Buffer.from(keypair.secretKey).toString("hex");

    res.json({
      status: "success",
      publicKey,
      privateKey
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Wallet generation failed"
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
