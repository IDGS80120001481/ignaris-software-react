import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await axios.post(
      "http://lignaris-pizzeria.eba-u3tn6jm7.us-east-2.elasticbeanstalk.com/api/Usuarios/login",
      data
    );

    if (res.data.isSuccess == true && res.data.role == "Empleado") {
      setIsAuthenticated(true);
      const date = new Date(res.data.lastSession);
      alert("Tu ultima sesión fue el " + date.toLocaleDateString());
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } else {
      Swal.fire({
        title: "¡Login incorrecto!",
        text: "Por favor revisa la contraseña o el usuario para ingresar a tu aplicación.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <div className="body-login h-screen flex items-center justify-center body_component">
        <form
          className="shadow-md rounded-md p-5 bg-white w-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Iniciar Sesión (CRM)
          </h2>
          <div className="circular-container">
            <div className="text-center circular-img">
              <img
                src="/Capricciosa.jpg"
                alt="Imagen Inicio Sesión"
                id="img-login"
              />
            </div>
          </div>
          <br />
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900  ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Introduce tu email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message || "Este campo es obligatorio"}
              </span>
            )}
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password:
            </label>
            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                {...register("password", { required: true })}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.password ? "border-red-500" : "border-green-500"
                }`}
                placeholder="Introduce tu contraseña"
              />
              <button
                type="button"
                onClick={() => setHide(!hide)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {hide ? (
                  <EyeSlashIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message || "Este campo es obligatorio"}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full mt-4 border border-slate-200 rounded-md disabled:bg-green-300 py-2 px-3 bg-green-900 text-white font-bold"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
