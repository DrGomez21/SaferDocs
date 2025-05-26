import { useForm } from "react-hook-form"

export const Fomulario = ({ onSubmit, loading }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-md mx-auto bg-white p-4 rounded shadow-lg"
    >
      <label className="font-poppins font-medium" htmlFor="textoMarcaAgua">
        Fin de uso
        <input
          id="textoMarcaAgua"
          type="text"
          placeholder="Ej. válido trámite académico"
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
        className="w-full rounded-lg mt-6 bg-primary text-white p-3 font-poppins font-semibold cursor-pointer hover:cursor-pointer hover:scale-95 transition duration-100"
      />
    </form>
  )
}