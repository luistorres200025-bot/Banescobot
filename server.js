import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ruta principal para verificar que el servidor está activo
app.get("/", (req, res) => {
  res.send("✅ Servidor de notificaciones activo en Render");
});

// Ruta para recibir las notificaciones de compra
app.post("/compra", (req, res) => {
  const data = req.body;

  // Mostrar los datos recibidos en la consola
  console.log("Nueva compra recibida:", data);

  // Guarda los datos de la compra en un archivo local (opcional)
  fs.appendFileSync("compras.log", JSON.stringify(data) + "\n");

  // Responde al cliente con un mensaje de éxito
  res.status(200).send("✅ Compra registrada correctamente");
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
