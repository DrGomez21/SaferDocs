import { useState, useRef, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Logo } from "../components/Logo";
import { Explicacion } from "../components/Explicacion";

export const SecurePage = () => {

  const [watermarkedImage, setWatermarkedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm()

  const location = useLocation()
  const { image } = location.state || {}
  if (!image) {
    return <Navigate to="/" replace />
  }

  const onSubmit = (data) => {
    setLoading(true);
    const canvas = document.createElement("canvas");
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Configura el texto de la marca de agua
      const fontSize = Math.floor(img.width / 15);
      ctx.font = `${fontSize}px Impact`;
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Escribe la marca de agua en el centro
      // const watermarks = [
      //   { x: img.width / 2, y: img.height / 4, rotation: -Math.PI / 6 },
      //   { x: img.width / 2, y: img.height / 2, rotation: 0 },
      //   { x: img.width / 2, y: (img.height / 4) * 3, rotation: Math.PI / 6 },
      // ];

      // Define las 4 marcas de agua apiladas con diferentes rotaciones
      const watermarks = [
        { x: img.width / 2, y: img.height / 2, rotation: 0 },
        { x: img.width / 2, y: img.height / 4, rotation:0 },    // 30 grados
        { x: img.width / 2, y: img.height / 6, rotation: 0 },   // -30 grados
        { x: img.width / 2, y: img.height / -4, rotation: 0 },    // 60 grados
        { x: img.width / 2, y: img.height / 3, rotation: 0 },    // 60 grados
      ];

      watermarks.forEach(mark => {
        ctx.save();
        ctx.translate(mark.x, mark.y);
        ctx.rotate(mark.rotation);
        ctx.fillText(data.textoMarcaAgua, 0, 0);
        ctx.restore();
      });

      // Guardar la imagen en el estado
      setWatermarkedImage(canvas.toDataURL("image/png"));
      setLoading(false);
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
          className="flex items-center gap-2 text-primary hover:underline font-poppins"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver atrás
        </button>
      </nav>
      <main className="flex flex-col justify-center items-center gap-4 px-6 max-w-5xl mx-auto mb-6">
        <img src={image} alt="Imagen seleccionada" className="w-sm h-auto" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-md mx-auto bg-white p-4 rounded"
        >
          <label className="font-poppins font-medium" htmlFor="textoMarcaAgua">
            Fin de uso
            <input
              id="textoMarcaAgua"
              type="text"
              placeholder="Texto acá"
              className="w-full rounded-lg border border-gray-300 p-3 font-poppins"
              {...register("textoMarcaAgua", { required: true })}
            />
          </label>
          {errors.textoMarcaAgua && (
            <span className="text-red-500 text-sm">Este campo es obligatorio</span>
          )}

          <label className="font-poppins font-medium mt-4" htmlFor="duracion">
            Validez
            <select
              id="duracion"
              className="w-full rounded-lg border border-gray-300 p-3 font-poppins"
              {...register("duracion", { required: true })}
            >
              <option value="">Selecciona duración</option>
              <option value="siempre">Por siempre</option>
              <option value="1semana">1 semana</option>
              <option value="1mes">1 mes</option>
              <option value="1año">1 año</option>
            </select>
          </label>
          {errors.duracion && (
            <span className="text-red-500 text-sm">Este campo es obligatorio</span>
          )}

          <input
            type="submit"
            value="Proteger documento"
            className="w-full rounded-lg mt-6 bg-primary text-white p-3 font-poppins font-semibold cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          />
        </form>
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <p>Estamos procesando la imagen</p>
          </div>
        )}
        <Explicacion />
        {/* Mostrar la imagen procesada si existe */}
        {watermarkedImage && (
          <div ref={resultRef} className="mt-8 w-full max-w-2xl">
            <h3 className="text-lg font-poppins font-medium mb-4">Documento Protegido:</h3>
            <img
              src={watermarkedImage}
              alt="Documento con marca de agua"
              className="w-sm h-auto rounded-lg shadow-lg"
            />
            <a
              href={watermarkedImage}
              download="documento_protegido.png"
              className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg font-poppins"
            >
              Descargar imagen
            </a>
          </div>
        )}
      </main>
    </>
  );
}