import express from "express";
import bodyParser from "body-parser";
import QRCode from "qrcode";
import cors from "cors";

// Importar las funciones
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Función para generar QR code (adaptada de la tuya)
app.post("/generate-qr", async (req, res) => {
  const { imageHash, data } = req.body;
  const qrData = {
    textoMarcaAgua: data.textoMarcaAgua,
    duracion: data.duracion,
    fechaCreacion: new Date().toISOString(),
    imageHash: imageHash,
  };
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData));
    res.json({ qrCodeDataUrl });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.post("/aplicar-marca-agua", (req, res) => {
  res.json({
    message:
      "Función aplicarMarcaDeAgua debe implementarse con librería de manipulación de imágenes en backend",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Service is running" });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
