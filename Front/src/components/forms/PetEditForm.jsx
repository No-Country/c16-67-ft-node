import { useState, useEffect } from 'react';
import { editPet } from '../../service/pets/petService';
import { useUserContext } from '../../context/userContext';
export const PetEditForm = ({ FormPrevData }) => {
  const [inputsData, setInputsData] = useState({});
  const [file, setFile] = useState(null); // Archivo seleccionado por el usuario
  const { setActivePet } = useUserContext();

  // Carga los datos previos en el estado del formulario
  useEffect(() => {
    if (FormPrevData) {
      console.log(FormPrevData);
      setInputsData({
        name: FormPrevData.name || '',
        age: FormPrevData.age || '',
        description: FormPrevData.description || '',
        image: FormPrevData.image_url
      });
    }
  }, [FormPrevData]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setInputsData({ ...inputsData, [property]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // Guardar el archivo para enviarlo luego

      // Leer el archivo para la vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        // Actualizar el estado con la URL de la imagen para la vista previa
        setInputsData((previnputsData) => ({ ...previnputsData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { data } = await editPet(FormPrevData.petId, inputsData, file);
    data.username = FormPrevData.username;
    const petEdited = data;
    console.log(petEdited);
    setActivePet(petEdited);
  };

  return (
    <>
      <form className="flex flex-col items-center gap-4 p-4" onSubmit={handleSubmit}>
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <img src={inputsData.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
          {/*Para el boton de cambiar imagen*/}
          <label
            htmlFor="image-upload"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              name="image"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <input
          type="text"
          placeholder="Nombre"
          className="input input-bordered w-full max-w-xs"
          name="name"
          value={inputsData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Edad"
          className="input input-bordered w-full max-w-xs"
          name="age"
          value={inputsData.age}
          onChange={handleChange}
        />

        <textarea
          placeholder="Descripción"
          className="textarea textarea-bordered h-24 w-full max-w-xs"
          name="description"
          value={inputsData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="btn btn-primary w-full max-w-xs">
          Guardar cambios
        </button>
      </form>
    </>
  );
};
