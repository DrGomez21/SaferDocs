import { useNavigate } from "react-router-dom"
import { Logo } from "../components/Logo"
import addFile from "../assets/addFile.svg"
import pcSecure from "../assets/pc-secure.svg"
import qrCode from "../assets/qr.png"

export const Home = () => {

  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      navigate('/app', {state: { image: imageUrl }})
    } else {
      console.error("No file selected")
    }
  }

  return (
    <>
      <header className='w-full flex justify-center p-6'>
        <Logo />
      </header>

      <main className="flex flex-col justify-center items-center gap-4 px-6 max-w-5xl mx-auto">
        <section className="flex flex-col items-center gap-6">
          <p className="text-center text-2xl font-poppins">Protege tus 💳 <span className="font-semibold">documentos</span> de manera <span className="font-source-serif italic">fácil</span> y <span className="font-source-serif italic">segura</span></p>

          <div className="absolute -z-30 bg-blue-300 w-36 h-36 rounded-full blur-2xl" />

          <input type="file" accept="image/*" className="hidden" id="imageInput" onChange={handleFileChange} />
          <button
            className="flex justify-center items-center gap-2 w-full bg-primary text-white font-poppins font-semibold text-sm px-4 py-3 rounded-lg max-w-xl hover:cursor-pointer sm:hover:scale-110 transition duration-100"
            onClick={() => document.getElementById('imageInput').click()}
          >
            <img src={addFile} />Elige una imagen
          </button>

          <p className="font-poppins text-sm">
            Con solo unos clics, podrás cifrar tus documentos con una marca de agua, con el fin de evitar estafas por suplantación de identidad, ayudando a garantizar que tus documentos no sean alterados ni utilizados de forma fraudulenta.
          </p>
        </section>
        <img src={pcSecure} alt="Asegura tus archivos antes de compartirlos." />
        <section className="flex flex-col items-center gap-6">
          <h2 className="text-2xl text-center font-poppins font-medium">Tu <span className="font-source-serif italic font-light">privacidad</span> es lo más importante</h2>
          <div className="flex flex-col gap-4 w-full">
            <article className="w-full flex items-center gap-4 rounded-lg bg-amarillo h-auto p-6">
              <p className="text-7xl">🔐</p>
              <p className="font-poppins">Gratuito, instantáneo, y seguro; tus archivos no salen de tu dispositivo</p>
            </article>

            <article className="w-full flex items-center gap-4 rounded-lg bg-lila h-auto p-6">
              <p className="text-7xl">🛡️</p>
              <p className="font-poppins">Marca de agua personalizable para cada situación</p>
            </article>

            <article className="w-full flex items-center gap-4 rounded-lg bg-rosa h-auto p-6">
              <img src={qrCode} alt="Código QR" className="w-[72px] h-[72px] rounded-sm" />
              <p className="font-poppins">QR <span className="font-semibold">único</span> que identifica tu documento</p>
            </article>

            <article className="w-full flex items-center gap-4 rounded-lg bg-verde h-auto p-6">
              <p className="text-7xl">👮🏼‍♂️</p>
              <p className="font-poppins">Reduce el riesgo de estafa por suplantación de identidad</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="flex flex-col justify-center items-center gap-2 p-6">
        <Logo />
        <p className="text-sm font-poppins">Hecho con ❤️ en Paraguay</p>
      </footer>
    </>
  )
}
