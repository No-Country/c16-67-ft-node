//funciones varias aqui

export const validateImages = (file, setErrors) => {
  let errorMessage = '';
  const validImagesTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validImagesTypes.includes(file.type)) {
    errorMessage = 'Invalid image format';
  }
  setErrors((prevErrors) => ({
    ...prevErrors,
    profilePhoto: errorMessage
  }));
};
