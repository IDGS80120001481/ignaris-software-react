import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PizzaLoad from "../../animations/PizzaLoad";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HistorySale = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const { idCliente, nombre } = useParams();
  const itemsPerPage = 10;

  useEffect(() => {
    if (idCliente != undefined) {
      getSalesUser(idCliente);
    } else {
      getSales();
    }
  }, []);

  const getSalesUser = async (idCliente) => {
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/HistorialVentas/ventas/" +
        idCliente
    );

    console.log(response);
    setSales(response.data);
    setLoading(false);
  };

  const getSales = async () => {
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/HistorialVentas/ventas/"
    );

    setSales(response.data);
    setLoading(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSales = sales.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(sales.length / itemsPerPage)) {
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
      <div className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Historial de Ventas {nombre || ""}
        </h1>

        {loading ? (
          <PizzaLoad />
        ) : (
          <div className="max-w-7xl mx-auto">
            {currentSales.map((venta) => (
              <div
                key={venta.idVenta}
                className="bg-white shadow-lg rounded-lg mb-6 p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Venta #{venta.idVenta}
                    </h2>
                    <p className="text-gray-600">{venta.fechaVenta}</p>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">
                      $ {venta.total} MXN
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-medium">
                    Método de Pago: {venta.metodoPago}
                  </p>
                  <p className="text-gray-500">Cliente: {venta.fullName}</p>
                </div>

                {venta.historialVentaDetalleDto.length > 0 ? (
                  <div>
                    <h3 className="font-semibold text-lg">
                      Detalles de la Venta:
                    </h3>
                    <div className="mt-4 space-y-4">
                      {venta.historialVentaDetalleDto.map((detalle, index) => (
                        <div key={index} className="flex items-center">
                          <img
                            src={detalle.foto}
                            alt={detalle.nombre}
                            className="w-16 h-16 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <h4 className="text-lg font-medium">
                              {detalle.nombre}
                            </h4>
                            <p>Cantidad: {detalle.cantidad}</p>
                            <p>
                              Precio unitario: $ {detalle.precioUnitario} MXN
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No hay detalles para esta venta.
                  </p>
                )}
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
                [{currentPage} / {Math.ceil(sales.length / itemsPerPage)}]
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(sales.length / itemsPerPage)
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

export default HistorySale;
