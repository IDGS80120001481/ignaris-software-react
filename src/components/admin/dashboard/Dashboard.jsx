import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [commentsQuantityRecipe, setCommentsQuantityRecipe] = useState([]);
  const [commentsQuantityOrder, setCommentsQuantityOrder] = useState([]);
  const [commentsRecipe, setCommentsRecipe] = useState([]);
  const [moneyClient, setMoneyClient] = useState([]);
  const [commentsType, setCommentsType] = useState([]);
  const [commentsClient, setCommentsClient] = useState([]);

  useEffect(() => {
    getQuantityRecipe();
    getQuantityOrder();
    getRecipe();
    getMoney();
    getType();
    getClient();
  }, []);

  const getQuantityRecipe = async () => {
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Graphics/getCantidadPizzaPorReceta/"
    );

    setCommentsQuantityRecipe(response.data);
  };

  const getQuantityOrder = async () => {
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Graphics/getConteoPorCantidad/"
    );

    setCommentsQuantityOrder(response.data);
  };

  const getRecipe = async () => {
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Graphics/getComentarioPorReceta/"
    );

    setCommentsRecipe(response.data);
  };

  const getMoney = async () => {
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Graphics/getVentasPorCliente/"
    );

    setMoneyClient(response.data);
  };

  const getType = async () => {
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Graphics/getComentarioTipoCount/"
    );

    setCommentsType(response.data);
  };

  const getClient = async () => {
    const response = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Graphics/getComentarioCount/"
    );

    setCommentsClient(response.data);
  };

  // Colores para cada segmento del gráfico
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
        Dashboard Lignaris Pizzas
      </h2>
      <br />
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Gráfica de cantidad de pizzas por receta
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={commentsQuantityRecipe}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={150}
              fill="#8884d8"
              dataKey="cantidadPizza"
              nameKey="nombreReceta"
              label
            >
              {commentsQuantityRecipe.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="bg-gray-300 p-4 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Gráfica de cantidad de pizzas por orden
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={commentsQuantityOrder}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={150}
              fill="#8884d8"
              dataKey="conteo"
              nameKey="cantidad"
              label
            >
              {commentsQuantityOrder.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      {/* Segunda sección de gráficos */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Gráfica de comentarios por receta
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={commentsRecipe}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={150}
              fill="#8884d8"
              dataKey="cantidadComentarios"
              nameKey="nombreReceta"
              label
            >
              {commentsRecipe.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="bg-gray-300 p-4 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Gráfica de cantidad de dinero gastado por clientes
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={moneyClient}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={150}
              fill="#8884d8"
              dataKey="totalVentas"
              nameKey="nombreCompleto"
              label
            >
              {moneyClient.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      {/* Tercera sección de gráficos */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Gráfica de tipo de comentarios
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={commentsType}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={150}
              fill="#8884d8"
              dataKey="cantidadComentarios"
              nameKey="tipoComentario"
              label
            >
              {commentsType.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="bg-gray-300 p-4 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Gráfica de cantidad de comentarios por cliente
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={commentsClient}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={150}
              fill="#8884d8"
              dataKey="conteoComentarios"
              nameKey="nombreCompleto"
              label
            >
              {commentsClient.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
