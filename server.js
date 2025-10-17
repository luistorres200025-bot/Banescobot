import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON y permitir CORS
app.use(cors());
app.use(bodyParser.json());

// Ruta de verificación
app.get("/", (req, res) => {
  res.send("✅ Servidor de notificaciones activo en Render y listo para recibir compras.");
});

// Ruta para recibir las notificaciones
app.post("/compra", async (req, res) => {
  try {
    const data = req.body;

    // Mostrar los datos recibidos en la consola de Render
    console.log("🟢 Nueva compra recibida:");
    console.log(JSON.stringify(data, null, 2));

    // Validar si llegaron los datos esperados
    if (!data || Object.keys(data).length === 0) {
      console.warn("⚠️ Advertencia: No se recibieron datos en el cuerpo de la solicitud.");
      return res.status(400).send("⚠️ Cuerpo de solicitud vacío o inválido.");
    }

    // Guardar en un archivo local (solo visible en logs de Render)
    const logLine = `[${new Date().toISOString()}] ${JSON.stringify(data)}\n`;
    fs.appendFileSync("compras.log", logLine);

    console.log("✅ Datos guardados localmente en compras.log");
    res.status(200).send("✅ Compra registrada correctamente en Render");
  } catch (error) {
    console.error("❌ Error procesando la compra:", error);
    res.status(500).send("❌ Error interno en el servidor");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});
