import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PizzaLoad from "../../animations/PizzaLoad";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AttentionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const { idCliente, nombre } = useParams();
  const itemsPerPage = 10;

  useEffect(() => {
    if (idCliente != undefined) {
      getReportsClient(idCliente);
    } else {
      getReports();
    }
  }, []);

  const getReports = async () => {
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/AtencionCliente"
    );

    setReports(response.data);
    setLoading(false);
  };

  const getReportsClient = async (idCliente) => {
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/AtencionCliente/" +
        idCliente
    );

    setReports(response.data);
    setLoading(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(reports.length / itemsPerPage)) {
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
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Historial de contactos {nombre ? "con " + nombre : ""}
        </h2>
        {loading ? (
          <PizzaLoad />
        ) : (
          <div className="space-y-4">
            {currentReports.map((report, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {nombre}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(report.fechaCreacion).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    <strong>Tipo Atención:</strong> {report.tipoAtencion}
                  </p>
                  <p>
                    <strong>Prioridad:</strong> {report.prioridad}
                  </p>
                  <div>
                    <strong>{report.descripcion}</strong>
                  </div>
                </div>
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
                [{currentPage} / {Math.ceil(reports.length / itemsPerPage)}]
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(reports.length / itemsPerPage)
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

export default AttentionHistory;
