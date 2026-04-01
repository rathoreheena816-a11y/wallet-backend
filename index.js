const express = require("express");
const { Keypair } = require("@solana/web3.js");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// 🔐 Supabase connection
const supabase = createClient(
  "https://uruopjtgggfjeqdyqrqz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVydW9wanRnZ2dmZWpxZHlycXpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDY4NzEwNiwiZXhwIjoyMDkwMjYzMTA2fQ.Bw_kLmXnFNtv0LkdOePHRvnzeUr46oorcZHg3iGHOcs"
);

// Root
app.get("/", (req, res) => {
  res.send("Backend is LIVE ✅");
});

// Wallet generate + save
app.get("/wallet", async (req, res) => {
  try {
    const keypair = Keypair.generate();

    const publicKey = keypair.publicKey.toBase58();
    const privateKey = Buffer.from(keypair.secretKey).toString("hex");

    // Save to Supabase
    const { error } = await supabase
      .from("wallets")
      .insert([
        {
          public_key: publicKey,
          private_key: privateKey
        }
      ]);

    if (error) throw error;

    // Only public key return
    res.json({
      status: "success",
      publicKey
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Wallet save failed"
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});