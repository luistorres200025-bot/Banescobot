import express from "express";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// === Inicializar Firebase ===
const firebaseKey = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
  databaseURL: "https://banesco-bot-effa5-default-rtdb.firebaseio.com"
});

const db = admin.database();

// === Rutas ===
app.get("/", (req, res) => {
  res.send("✅ Servidor Render activo y conectado a Firebase Realtime Database");
});

app.post("/compra", async (req, res) => {
  const data = req.body;
  console.log("Nueva compra recibida:", data);

  try {
    // Guardar localmente (opcional)
    fs.appendFileSync("compras.log", JSON.stringify(data) + "\n");
  } catch (err) {
    console.error("Error guardando localmente:", err);
  }

  try {
    // Guardar en Realtime Database
    const timestamp = Date.now();
    await db.ref("compras/" + timestamp).set({
      mechanism: data.mechanism || "Desconocido",
      accountB: data.accountB || "Sin cuenta",
      amount: data.amount || "0",
      body: data.body || "Sin descripción",
      timestamp
    });
    console.log("✅ Compra guardada en Firebase correctamente.");
  } catch (error) {
    console.error("❌ Error al guardar en Firebase:", error);
  }

  res.status(200).send("✅ Compra registrada correctamente");
});

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
