import { useState, useRef, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Logo } from "../components/Logo";
import { Explicacion } from "../components/Explicacion";
import { SHA256 } from "crypto-js";
import { aplicarMarcaDeAgua } from "../services/watermarkService";
import { generateQRCodeData } from "../services/qrService";
import { Fomulario } from "../components/Formulario";
import downloadIcon from "../assets/download.svg";

export const SecurePage = () => {

  const [watermarkedImage, setWatermarkedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm()

  const location = useLocation()
  const { image } = location.state || {}

  if (!image) return <Navigate to="/" replace />

  const onSubmit = async (data) => {
    setLoading(true);
    const canvas = document.createElement("canvas");
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      // Generar el hash de la imagen
      const imageHash = SHA256(img.src).toString();
      const qrCodeDataUrl = await generateQRCodeData(imageHash, data); // Generar el código QR

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0); // Dibuja la imagen original en el canvas
      aplicarMarcaDeAgua(ctx, data.textoMarcaAgua, img.width, img.height); // Aplica la marca de agua

      // Agregar el código QR a la imagen
      if (qrCodeDataUrl) {
        const qrImage = new Image();
        qrImage.onload = () => {
          const qrSize = Math.floor(img.width / 8)
          const padding = 20
          ctx.drawImage(
            qrImage,
            img.width - qrSize - padding,
            img.height - qrSize - padding,
            qrSize,
            qrSize
          )

          // Guardar la imagen en el estado
          setWatermarkedImage(canvas.toDataURL("image/png"));
          setLoading(false);
        }
        qrImage.src = qrCodeDataUrl
      }
    };
    img.src = image;
  }

  useEffect(() => {
    if (watermarkedImage && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [watermarkedImage]);

  return (
    <>
      <header className='w-full flex justify-center p-6'>
        <Logo />
      </header>
      <nav className="w-full flex justify-start px-6 mb-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary hover:underline font-poppins hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver atrás
        </button>
      </nav>
      <main className="flex flex-col justify-center items-center gap-4 px-6 max-w-5xl mx-auto mb-6">
        <img src={image} alt="Imagen seleccionada" className="w-sm h-auto" />
        <Fomulario onSubmit={onSubmit} />
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <p>Estamos procesando la imagen</p>
          </div>
        )}
        <Explicacion />
        {/* Mostrar la imagen procesada si existe */}
        {watermarkedImage && (
          <div ref={resultRef} className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h3 className="text-lg font-poppins font-medium mb-4">Documento Protegido</h3>
            <img
              src={watermarkedImage}
              alt="Documento con marca de agua"
              className="w-sm h-auto rounded-lg shadow-lg"
            />
            <a
              href={watermarkedImage}
              download="documento_protegido.png"
              className="mt-4 text-center items-center flex gap-2 bg-primary text-white px-4 py-2 rounded-lg font-poppins font-semibold hover:scale-95 transition duration-100 w-full justify-center"
            >
              <img src={downloadIcon}/> Descargar imagen
            </a>
          </div>
        )}
      </main>
    </>
  );
}