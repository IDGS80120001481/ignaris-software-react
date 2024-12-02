import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faComment,
  faDollar,
  faEnvelope,
  faEnvelopeOpenText,
  faHeadphones,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import PizzaLoad from "../../animations/PizzaLoad";
import { useNavigate } from "react-router-dom";

const Client = () => {
  const [showSection, setShowSection] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const initialFormData = {
    email: "",
    subject: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const navigateAttention = (idCliente, nombre) => {
    navigate(`/admin/history-atention/${idCliente}/${nombre}`);
  };

  const navigatePerfil = (idCliente) => {
    navigate(`/admin/perfil/${idCliente}`);
  };

  const navigateHistory = (email) => {
    navigate(`/admin/history-contact/${email}`);
  };

  const navigateComments = (idCliente, nombre) => {
    navigate(`/admin/client-comment/${idCliente}/${nombre}`);
  };

  const navigateSales = (idCliente, nombre) => {
    navigate(`/admin/history-sale/${idCliente}/${nombre}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/CRMFunciones/send",
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
        title: "Se envió el correo correctamente",
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
        title: "Sucedió un problema con el correo",
      });
    }
  };

  const getClients = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/CRMFunciones/getclients",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setClient(response.data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(function () {
      getClients();
    }, 3000);
  }, []);

  // Mostrar formulario envió de correos electrónicos
  const toggleSection = () => {
    setShowSection(!showSection);
  };

  const toggleSectionEmail = (email) => {
    setShowSection(!showSection);
    setFormData((prevData) => ({
      ...prevData,
      email: email,
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(clients.length / itemsPerPage)) {
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
      {showSection && (
        <section
          className="flex items-center bg-white-50 p-3 sm:p-5"
          style={{ backgroundColor: "#f1efe6" }}
        >
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={toggleSection}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Regresar a la lista
            </button>
            <form
              className="mx-auto max-w-screen-xl px-4 lg:px-12 form-options"
              onSubmit={handleSubmit}
            >
              <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-black">
                Enviar Correos Electrónicos
              </h2>
              <br />
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="w-full">
                  <label
                    htmlFor="to"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Destinatario:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-green-600 block w-full p-2.5 dark:bg-white dark:border-green-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-green-500"
                    placeholder="ejemplo@correo.com"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Asunto:
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-green-600 block w-full p-2.5 dark:bg-white dark:border-green-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-green-500"
                    placeholder="Asunto del correo"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full sm:col-span-2">
                  <label
                    htmlFor="body"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Mensaje:
                  </label>
                  <textarea
                    id="message"
                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-green-600 block w-full p-2.5 dark:bg-white dark:border-green-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-green-500"
                    placeholder="Escribe tu mensaje aquí..."
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Enviar Correo
              </button>
            </form>
          </div>
        </section>
      )}
      {!showSection && (
        <section
          className="flex items-center bg-white-50 p-3 sm:p-5"
          style={{ backgroundColor: "#f1efe6" }}
        >
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-black">
              Clientes registrados
            </h2>

            {loading ? (
              <PizzaLoad />
            ) : (
              <div className="bg-white dark:bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="max-w-5xl text-sm text-left text-white dark:text-black border-collapse border-3 border-green-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-green-600 dark:text-white">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Nombre
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Teléfono
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Enviar correo
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Historial correo
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Comentarios
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Ventas
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Perfil
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Buzón Quejas
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentClients.map((client) => (
                        <tr
                          key={client.id}
                          className="border-b dark:border-black"
                        >
                          <td className="px-4 py-3">
                            {client.nombre} {client.apellidoPaterno}{" "}
                            {client.apellidoMaterno}
                          </td>
                          <td className="px-4 py-3">{client.telefono}</td>
                          <td className="px-4 py-3">{client.email}</td>
                          <td className="px-4 py-3 items-center">
                            <button
                              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                              onClick={() => {
                                toggleSectionEmail(client.email);
                              }}
                            >
                              <FontAwesomeIcon icon={faEnvelope} />
                            </button>
                          </td>
                          <td className="px-4 py-3 items-center">
                            <button
                              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                              onClick={() => {
                                navigateHistory(client.email);
                              }}
                            >
                              <FontAwesomeIcon icon={faEnvelopeOpenText} />
                            </button>
                          </td>
                          <td className="px-4 py-3 items-center">
                            <button
                              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                              onClick={() => {
                                navigateComments(
                                  client.idPersona,
                                  client.nombre
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faComment} />
                            </button>
                          </td>
                          <td className="px-4 py-3 items-center">
                            <button
                              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                              onClick={() => {
                                navigateSales(client.idPersona, client.nombre);
                              }}
                            >
                              <FontAwesomeIcon icon={faDollar} />
                            </button>
                          </td>
                          <td className="px-4 py-3 items-center">
                            <button
                              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                              onClick={() => {
                                navigatePerfil(client.idPersona);
                              }}
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </button>
                          </td>
                          <td className="px-4 py-3 items-center">
                            <button
                              className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                              onClick={() => {
                                navigateAttention(
                                  client.idPersona,
                                  client.nombre
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faHeadphones} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <span>
                    [{currentPage} / {Math.ceil(clients.length / itemsPerPage)}]
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={
                      currentPage === Math.ceil(clients.length / itemsPerPage)
                    }
                    className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Client;
