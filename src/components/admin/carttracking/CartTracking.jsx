import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const CartTracking = () => {
  const [horaCart, setCart] = useState("");
  const [horaSuggest, setSuggest] = useState("");

  const handleChangeCart = (e) => {
    setCart(e.target.value);
  };

  const handleChangeSuggest = (e) => {
    setSuggest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (horaCart != "") {
      updateCart(horaCart + ":00");
    }

    if (horaSuggest != "") {
      updateSuggest(horaSuggest + ":00");
    }
  };

  const updateSuggest = async (time) => {
    const response = await axios.put(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Sugerencias/updatehourcarttracking/" +
        1,
      time,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    if (response.status == 200) {
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
        title:
          "Se actualizo la hora de la notificación de seguimiento de carrito",
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
        title: "Sucedió un problema con la actualización de la notificación",
      });
    }
  };

  const updateCart = async (time) => {
    const response = await axios.put(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Seguimiento/updatehourcart/" +
        1,
      time,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    if (response.status == 200) {
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
        title:
          "Se actualizo la hora de la notificación de sugerencias del cliente",
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
        title:
          "Sucedió un problema con la actualización de sugerencias de cliente",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="horaInicio"
          className="block text-sm font-medium text-gray-700"
        >
          Hora de notificación seguimiento carrito
        </label>
        <input
          type="time"
          id="horaCart"
          name="horaCart"
          value={horaCart}
          onChange={handleChangeCart}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="horaFin"
          className="block text-sm font-medium text-gray-700"
        >
          Hora de notificación sugerencias al cliente
        </label>
        <input
          type="time"
          id="horaSuggest"
          name="horaSuggest"
          value={horaSuggest}
          onChange={handleChangeSuggest}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default CartTracking;
