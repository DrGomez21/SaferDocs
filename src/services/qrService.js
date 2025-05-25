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