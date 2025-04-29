import "../assets/HeaderStyle.css";
import { Link } from "react-router-dom";
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
            <Link to="/Cart" className="nav-link active" aria-current="page">
              <img className="checkout" src={CheckoutLogo} alt="Checkout" />
            </Link>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-header ">
        <div className="container-fluid">
          {/* todo: add the links to the home page */}
          <Link to={"/"} className="nav-link active" aria-current="page">
            <img className="logo" src={logo} alt="secureWrap" />
            Securewrap
            <br />
           <div className="brand-moto">One company Limitless Solution</div>
          </Link>
          {/* todo: toggle button isnt  working on small size window */}
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
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/products"}
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/service"}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/aboutus"}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/contact"}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
