import { Logo } from "../components/Logo"

export const Home = () => {
  return (
    <>
      <header className='w-full flex justify-center p-6 mb-4'>
        <Logo />
      </header>
      
      <main className="flex flex-col justify-center items-center gap-16 px-6">
        <section className="flex flex-col items-center gap-6">
          <p className="text-center text-2xl font-poppins">Protege tus 💳 <span className="font-semibold">documentos</span> de manera <span className="font-source-serif italic">fácil</span> y <span className="font-source-serif italic">segura</span></p>

          <div className="absolute -z-30 bg-blue-300 w-36 h-36 rounded-full blur-2xl" />

          <button className="flex justify-center gap-2 w-full bg-primary text-white font-poppins font-semibold text-sm px-4 py-3 rounded-lg">
            Elige una imagen
          </button>

          <p className="font-poppins text-sm">
            Con solo unos clics, podrás cifrar tus documentos con una marca de agua, con el fin de evitar estafas por suplantación de identidad, ayudando a garantizar que tus documentos no sean alterados ni utilizados de forma fraudulenta.
          </p>

        </section>
      </main>
    </>
  )
}
