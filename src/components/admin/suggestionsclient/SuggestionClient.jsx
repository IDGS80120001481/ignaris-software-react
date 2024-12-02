import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const SuggestionClient = () => {
  const [suggests, setSuggest] = useState([]);

  const getSuggest = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Sugerencias/recipelist",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSuggest(response.data);
  };

  const addSuggest = async (id) => {
    await axios.put(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Sugerencias/addsuggest/" +
        id
    );

    getSuggest();
  };

  useEffect(() => {
    getSuggest();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Foto
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Precio Unitario
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estatus
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ¿Sugerencia?
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sugerir
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {suggests.map((pizza, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pizza.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={pizza.foto}
                  alt={pizza.nombre}
                  className="h-16 w-16 rounded-md object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${pizza.precioUnitario}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pizza.estatus === 1 ? "Activo" : "Inactivo"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pizza.suggest ? "Sí" : "No"}
              </td>
              <td className="px-4 py-3 items-center">
                <button
                  className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                  onClick={() => {
                    addSuggest(pizza.idReceta);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuggestionClient;
