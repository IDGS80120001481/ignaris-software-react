import {
  faAddressBook,
  faBagShopping,
  faBell,
  faBuilding,
  faCircleLeft,
  faComment,
  faDashboard,
  faHeadset,
  faLightbulb,
  faTags,
  faTimes,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidenav.css";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const navbarData = [
  {
    routeLink: "dashboard",
    label: "Dashboard",
    icon: faDashboard,
    open: false,
  },
  {
    routeLink: "client",
    label: "Clientes",
    icon: faUsers,
    open: false,
  },
  {
    routeLink: "companies",
    label: "Empresas",
    icon: faBuilding,
    open: false,
  },
  {
    routeLink: "/admin/history-sale",
    label: "Historial de ventas",
    icon: faBagShopping,
    open: false,
  },
  {
    routeLink: "/admin/offers-client",
    label: "Ofertas Personalizadas",
    icon: faTags,
    open: false,
  },
  {
    routeLink: "/admin/cart-tracking",
    label: "Control de notificaciones",
    icon: faBell,
    open: false,
  },
  {
    routeLink: "/admin/client-comment",
    label: "Comentarios de clientes",
    icon: faComment,
    open: false,
  },
  {
    routeLink: "/admin/history-contact",
    label: "Historial de contactos",
    icon: faAddressBook,
    open: false,
  },
  {
    routeLink: "history-atention",
    label: "Buzón de quejas",
    icon: faHeadset,
    open: false,
  },
  {
    routeLink: "/admin/suggestion-client",
    label: "Sugerencias de cliente",
    icon: faLightbulb,
    open: false,
  },
];

const Sidenav = ({ isAuthenticated }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const faUtensilsIcon = faUtensils;

  const getUserDetail = () => {
    const token = getTokenUser();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);

      const userDetail = {
        id: decodedToken.nameid,
        fullName: decodedToken.name,
        email: decodedToken.email,
        roles: decodedToken.role || [],
      };

      return userDetail;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  const getTokenUser = () => {
    return localStorage.getItem("token");
  };

  const getBodyClass = () => {
    let styleClass = "";
    if (collapsed && screenWidth > 768) {
      styleClass = "body-trimmed";
    } else if (collapsed && screenWidth <= 768 && screenWidth > 0) {
      styleClass = "body-md-screen";
    }
    return styleClass;
  };

  useEffect(() => {
    setUser(getUserDetail());

    // Manejo del resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setCollapsed(false);
      }
    };

    // Agregar el event listener para el resize
    window.addEventListener("resize", handleResize);

    // Limpiar tanto el listener como la suscripción al mensaje cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el listener
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const closeSidenav = () => {
    setCollapsed(false);
  };

  const toggleDropdown = (item) => {
    item.open = !item.open;
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div
        className={`sidenav overflow-y-scroll ${
          collapsed ? "sidenav-collapsed" : ""
        }`}
      >
        <div className="logo-container">
          <button className="logo" onClick={toggleCollapse}>
            {user ? user.fullName.charAt(0) : "?"}{" "}
          </button>
          {collapsed && (
            <div className="logo-text fade-in">{user?.fullName || "User"}</div>
          )}
          {collapsed && (
            <button
              className={`btn-close ${collapsed ? "rotate" : ""}`}
              onClick={closeSidenav}
            >
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </button>
          )}
        </div>
        <ul className="sidenav-nav">
          {navbarData.map((data, index) => (
            <li
              key={index}
              className={`sidenav-nav-item ${data.open ? "open" : ""}`}
            >
              <Link
                to={data.routeLink}
                className="sidenav-nav-link"
                onClick={() => toggleDropdown(data)}
              >
                <FontAwesomeIcon icon={data.icon} />
                {collapsed && (
                  <span className="sidenav-link-text fade-in">
                    {data.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className="sidenav-nav-item">
            <a className="sidenav-nav-link" onClick={logout}>
              <FontAwesomeIcon icon={faCircleLeft} />
              {collapsed && (
                <span className="sidenav-link-text fade-in">Salir</span>
              )}
            </a>
          </li>
        </ul>
      </div>

      <div className={`body ${getBodyClass()}`}>
        <div className="main">
          <div className="topbar">
            <div className="toggle">
              <FontAwesomeIcon icon={faUtensilsIcon} />
            </div>

            <div className="lignaris-title">
              <label>
                <p className="title">Lignaris Pizzeria</p>
                <p className="title">
                  Donde cada rebanada es una obra de arte.
                </p>
              </label>
            </div>
            <div className="user">
              <button className="logo">
                {user ? user.fullName.charAt(0) : "?"}
              </button>
            </div>
          </div>
          <main
            style={{
              backgroundColor: "#f1efe6",
              height: "100vh",
              color: "black",
            }}
          >
            <br />
            <div>
              <Outlet />{" "}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
