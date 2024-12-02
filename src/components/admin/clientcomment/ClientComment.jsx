import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PizzaLoad from "../../animations/PizzaLoad";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ClientComment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { idCliente, nombre } = useParams();
  const [statusFilter, setStatusFilter] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    if (idCliente != undefined) {
      getCommentsUser(idCliente);
      setStatusFilter(false);
    } else {
      setStatusFilter(true);
    }
  }, []);

  const getCommentsUser = async (idCliente) => {
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Comentarios/commentsclient/" +
        idCliente
    );

    setComments(response.data);
    setLoading(false);
  };

  const getCommentsCategory = async (category) => {
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Comentarios/category/" +
        category
    );

    setComments(response.data);
    setLoading(false);
  };

  const handleSearch = () => {
    if (selectedOption) {
      getCommentsCategory(selectedOption);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(comments.length / itemsPerPage)) {
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
      {statusFilter ? (
        <div className="flex justify-center items-center p-6">
          <div className="flex items-center border-2 border-gray-300 rounded-lg p-2 w-96">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full p-2 border-none outline-none text-gray-700 rounded-lg"
            >
              <option value="">Filtro por comentario</option>
              <option value="queja">Queja</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="problemática">Problemática</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-green-700 text-white p-2 ml-2 rounded-lg hover:bg-green-900 transition"
            >
              Buscar
            </button>
          </div>
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Comentarios de {nombre}
        </h2>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Historial de comentarios
        </h2>
        {loading ? (
          <PizzaLoad />
        ) : (
          <div>
            {currentComments.map((comentario, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg shadow-lg bg-white border-l-4 ${
                  comentario.tipoComentario === "sugerencia"
                    ? "border-green-500"
                    : comentario.tipoComentario === "queja"
                    ? "border-red-500"
                    : comentario.tipoComentario === "problemática"
                    ? "border-yellow-500"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">{comentario.comentario}</p>
                  <span
                    className={`text-sm font-medium ${
                      comentario.tipoComentario === "sugerencia"
                        ? "text-green-600"
                        : comentario.tipoComentario === "queja"
                        ? "text-red-600"
                        : comentario.tipoComentario === "problemática"
                        ? "text-yellow-600"
                        : ""
                    }`}
                  >
                    {comentario.tipoComentario.charAt(0).toUpperCase() +
                      comentario.tipoComentario.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(comentario.fechaCreacion).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <span>
                [{currentPage} / {Math.ceil(comments.length / itemsPerPage)}]
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(comments.length / itemsPerPage)
                }
                className="mt-4 border border-slate-200 rounded-md py-2 px-4 bg-green-900 text-white font-bold"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientComment;
