import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const OffersClient = () => {
  const [recipes, setRecipe] = useState([]);
  const [offers, setOffers] = useState([]);
  const [showSection, setShowSection] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialFormData = {
    idRecetum: 0,
    cantidadPizzas: 0,
    cantidadDinero: 0,
    inicioOferta: "2024-12-02T06:47:34.791Z",
    finOferta: "2024-12-02T06:47:34.791Z",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    getRecipes();
    getOffer();
  }, []);

  const getRecipes = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Recetas/ListaRecetas",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecipe(response.data);
  };

  const getOffer = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Ofertas/getoffers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOffers(response.data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Ofertas/addoffer",
      formData
    );

    if (response.status == 200) {
      setFormData(initialFormData);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Se agrego la oferta correctamente",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Sucedió un problema con el método de agregar la oferta",
      });
    }
  };

  const toggleSection = () => {
    setShowSection(!showSection);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffers = offers.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(offers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {!showSection && (
        <div className="p-4 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Formulario de Oferta
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-screen-xl px-4 lg:px-12"
          >
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={toggleSection}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Regresar a la lista
            </button>
            <br />
            {/* idRecetum */}
            <div className="mb-4">
              <label
                htmlFor="idRecetum"
                className="block text-sm font-medium text-gray-700"
              >
                Recetas
              </label>
              <select
                id="idRecetum"
                name="idRecetum"
                value={formData.idRecetum}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value={0} disabled>
                  Seleccione una receta
                </option>
                {recipes.map((receta) => (
                  <option key={receta.idReceta} value={receta.idReceta}>
                    {receta.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* cantidadPizzas */}
            <div className="mb-4">
              <label
                htmlFor="cantidadPizzas"
                className="block text-sm font-medium text-gray-700"
              >
                Cantidad de Pizzas
              </label>
              <input
                type="number"
                id="cantidadPizzas"
                name="cantidadPizzas"
                value={formData.cantidadPizzas}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* cantidadDinero */}
            <div className="mb-4">
              <label
                htmlFor="cantidadDinero"
                className="block text-sm font-medium text-gray-700"
              >
                Cantidad de Dinero
              </label>
              <input
                type="number"
                id="cantidadDinero"
                name="cantidadDinero"
                value={formData.cantidadDinero}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* inicioOferta */}
            <div className="mb-4">
              <label
                htmlFor="inicioOferta"
                className="block text-sm font-medium text-gray-700"
              >
                Inicio de la Oferta
              </label>
              <input
                type="datetime-local"
                id="inicioOferta"
                name="inicioOferta"
                value={formData.inicioOferta}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* finOferta */}
            <div className="mb-4">
              <label
                htmlFor="finOferta"
                className="block text-sm font-medium text-gray-700"
              >
                Fin de la Oferta
              </label>
              <input
                type="datetime-local"
                id="finOferta"
                name="finOferta"
                value={formData.finOferta}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
      {showSection && (
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={toggleSection}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Regresar al formulario
          </button>
          <table className="min-w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  ID Recetum
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Cantidad Pizzas
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Cantidad Dinero
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Inicio Oferta
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Fin Oferta
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOffers.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {item.idRecetum}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {item.cantidadPizzas}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {item.cantidadDinero}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {new Date(item.inicioOferta).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {new Date(item.finOferta).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span>
              [{currentPage} / {Math.ceil(offers.length / itemsPerPage)}]
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(offers.length / itemsPerPage)}
              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OffersClient;
