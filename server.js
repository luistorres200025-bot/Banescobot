import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 10000;

// ======== MIDDLEWARE ========
app.use(cors()); // Permite peticiones desde cualquier origen
app.use(bodyParser.json());

// ======== LOG DE PRUEBA ========
const logFile = "compras.log";
function registrarLog(mensaje) {
  const fecha = new Date().toISOString();
  fs.appendFileSync(logFile, `[${fecha}] ${mensaje}\n`);
}

// ======== RUTAS ========

// Ruta principal para verificar estado
app.get("/", (req, res) => {
  res.send("✅ Servidor de notificaciones activo en Render");
});

// Ruta para registrar compras
app.post("/compra", (req, res) => {
  const { mechanism, accountB, amount, body } = req.body;

  // Validar que los campos existan
  if (!mechanism || !accountB || !amount || !body) {
    registrarLog(`❌ Datos incompletos recibidos: ${JSON.stringify(req.body)}`);
    return res.status(400).send("❌ Datos incompletos o inválidos");
  }

  // Registrar compra
  const datos = {
    mechanism,
    accountB,
    amount,
    body,
  };

  registrarLog(`✅ Nueva compra recibida: ${JSON.stringify(datos, null, 2)}`);
  console.log("Nueva compra recibida:", datos);

  res.status(200).send("✅ Compra registrada correctamente en Render");
});

// ======== INICIO DEL SERVIDOR ========
app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
  registrarLog(`🚀 Servidor iniciado en puerto ${PORT}`);
});
