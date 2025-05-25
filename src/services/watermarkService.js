export const aplicarMarcaDeAgua = (ctx, text, width, height) => {
  const fontSize = Math.floor(width / 15);
  ctx.font = `${fontSize}px Impact`;
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Define las 4 marcas de agua apiladas con diferentes rotaciones
  const watermarks = [
    { x: width / 2, y: height / 2, rotation: 0 },
    { x: width / 2, y: height / 4, rotation: 0 },    // 30 grados
    { x: width / 2, y: height / 6, rotation: 0 },   // -30 grados
    { x: width / 2, y: height / -4, rotation: 0 },    // 60 grados
    { x: width / 2, y: height / 3, rotation: 0 },    // 60 grados
  ];

  watermarks.forEach(mark => {
    ctx.save();
    ctx.translate(mark.x, mark.y);
    ctx.rotate(mark.rotation);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  });
}