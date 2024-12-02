import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './TopBar.css'

const Topbar = ({ letter }) => {
    return (
      <div className="topbar">
        <div className="toggle">
          <FontAwesomeIcon icon={faUtensils} />
        </div>
  
        <div className="lignaris-title">
          <label>
            <p className="title">Lignaris Pizzeria</p>
            <p className="title">Donde cada rebanada es una obra de arte.</p>
          </label>
        </div>
  
        <div className="user">
          <button className="logo">{letter}</button>
        </div>
      </div>
    );
  };
  
  export default Topbar;