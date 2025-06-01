export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">No se encontró la página</p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Volver a la página principal
      </a>
    </div>
  );
}
