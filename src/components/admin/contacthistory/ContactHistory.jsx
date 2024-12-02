import PizzaLoad from "../../animations/PizzaLoad";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const HistoryContact = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState([]);
  const [query, setQuery] = useState("");
  const { email } = useParams();
  const itemsPerPage = 10;

  useEffect(() => {
    if (email != undefined) {
      getEmails(email);
    }
  }, []);

  const getEmails = async (email) => {
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/CRMFunciones/emails",
      {
        request: email,
      }
    );

    setEmails(response.data);
    setLoading(false);
  };

  const handleSearch = () => {
    getEmails(query);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmails = emails.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(emails.length / itemsPerPage)) {
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
      <div className="flex justify-center items-center p-6">
        <div className="flex items-center border-2 border-gray-300 rounded-lg p-2 w-96">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full p-2 border-none outline-none text-gray-700 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white p-2 ml-2 rounded-lg hover:bg-green-900 transition"
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Historial de contactos con
        </h2>
        {loading ? (
          <PizzaLoad />
        ) : (
          <div className="space-y-4">
            {currentEmails.map((email, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {email.subject}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(email.date).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    <strong>De:</strong> {email.from}
                  </p>
                  <p>
                    <strong>Para:</strong> {email.to}
                  </p>
                  <p>
                    <strong>Carpeta:</strong> {email.folder}
                  </p>
                  <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: email.body }}
                  ></div>
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
                [{currentPage} / {Math.ceil(emails.length / itemsPerPage)}]
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(emails.length / itemsPerPage)
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

export default HistoryContact;
