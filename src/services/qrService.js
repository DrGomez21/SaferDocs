import QRCode from 'qrcode';

export const generateQRCodeData = async (imageHash, data) => {
  const qrData = {
    textoMarcaAgua: data.textoMarcaAgua,
    duracion: data.duracion,
    fechaCreacion: new Date().toISOString(),
    imageHash: imageHash,
  }

  try {
    return await QRCode.toDataURL(JSON.stringify(qrData))
  } catch (error) {
    console.error("Error generating QR code:", error)
    return null
  }
}

export const generateQRCodeAPI = async (imageHash, data) => {
  try {
    const response = await fetch('http://localhost:3000/generate-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageHash, data }),
    });

    if (!response.ok) {
      throw new Error('Error al generar el código QR');
    }

    const result = await response.json();
    return result.qrCodeDataUrl;
  } catch (error) {
    console.error('Error generando el QR desde la API:', error);
    return null;
  }
};