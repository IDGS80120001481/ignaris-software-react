import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClienteInfo = () => {
  const [cliente, setCliente] = useState(null);
  const { idCliente } = useParams();

  useEffect(() => {
    if (idCliente != undefined) {
      getPerfil(idCliente);
    }
  }, []);

  const getPerfil = async () => {
    const response = await axios.get(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/CRMFunciones/ObtenerCliente/" +
        idCliente
    );

    setCliente(response.data);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      {cliente && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información del Cliente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-bold">ID Cliente:</span> {cliente.idCliente}
            </p>
            <p>
              <span className="font-bold">ID Persona:</span> {cliente.idPersona}
            </p>
            <p>
              <span className="font-bold">Usuario:</span>{" "}
              {cliente.idUsuario || "No especificado"}
            </p>
            <p>
              <span className="font-bold">Teléfono Fijo:</span>{" "}
              {cliente.telefonoFijo || "No especificado"}
            </p>
            <p>
              <span className="font-bold">LinkedIn:</span>{" "}
              {cliente.linkedin ? (
                <a
                  href={cliente.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500"
                >
                  {cliente.linkedin}
                </a>
              ) : (
                "No especificado"
              )}
            </p>
            <p>
              <span className="font-bold">YouTube:</span>{" "}
              {cliente.youtube ? (
                <a
                  href={cliente.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500"
                >
                  {cliente.youtube}
                </a>
              ) : (
                "No especificado"
              )}
            </p>
            <p>
              <span className="font-bold">Facebook:</span>{" "}
              {cliente.facebook ? (
                <a
                  href={cliente.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600"
                >
                  {cliente.facebook}
                </a>
              ) : (
                "No especificado"
              )}
            </p>
            <p>
              <span className="font-bold">Twitter:</span>{" "}
              {cliente.twitter ? (
                <a
                  href={cliente.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400"
                >
                  {cliente.twitter}
                </a>
              ) : (
                "No especificado"
              )}
            </p>
            <p className="md:col-span-2">
              <span className="font-bold">Cómo llegó:</span>{" "}
              {cliente.comoLlego || "No especificado"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteInfo;
