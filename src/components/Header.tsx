import "../assets/HeaderStyle.css";
import { NavLink } from "react-router-dom";
import logo from "../imgAssets/orginal_logo-removebg-preview.png";
import CheckoutLogo from "../imgAssets/Add-to-cart/add-to-cart.png";

interface props {
  promtionHeader?: string;
}

function Header({ promtionHeader }: props) {
  return (
    <header>
      <div className="container-fluid promotion-header text-center">
        <div className="row align-items-center">
          <div className="col-9 p-2">
            <p className="mb-0">{promtionHeader}</p>
          </div>
          <div className="col-3 p-2 d-flex justify-content-end">
            <NavLink
              to="/Cart"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              aria-current="page"
            >
              <img className="checkout" src={CheckoutLogo} alt="Checkout" />
            </NavLink>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-header">
        <div className="container-fluid">
          <div className="brand-name">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img className="logo" src={logo} alt="secureWrap" />
              Securewrap
              <br />
              <div className="brand-moto">One company Limitless Solution</div>
            </NavLink>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/service"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/aboutus"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
