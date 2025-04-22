
export const getContentCategory = (contentType: string) => {
  if (contentType === "hardcover") return "Alto Contenido";
  if (contentType === "paperback") return "Medio Contenido";
  if (contentType === "ebook") return "Bajo Contenido";
  return contentType;
};

export const getEstadoCategory = (estado: string) => {
  if (estado === "publicado") return "Publicado";
  if (estado === "en_edicion") return "En revisión";
  if (estado === "borrador") return "Borrador";
  if (estado === "pausado") return "Archivado";
  return estado;
};
