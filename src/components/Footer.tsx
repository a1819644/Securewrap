import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/FooterStyle.css";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBusinessTime,
  faDiamond,
  faEnvelope,
  faLocationArrow,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div>
      <footer className="main-footer-container text-center text-lg-start text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-1 border-bottom">
          <div className="me-4 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.google.com/search?client=firefox-b-d&q=securewrap"
              className="me-4 text-reset"
            >
              <FontAwesomeIcon icon={faGoogle} />
            </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <FontAwesomeIcon icon={faDiamond} /> &nbsp;Securewrap
                </h6>
                <p>One stop for all your packaging needs!</p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                <p>
                  <FontAwesomeIcon icon={faLocationArrow} />
                  &nbsp; Taranaki Circuit, Clyde North VIC 3978, Australia
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} />
                  &nbsp;info@securewrap.com.au
                </p>
                <p>
                  <FontAwesomeIcon icon={faBusinessTime} />
                  &nbsp;Mon–Fri: 09:00 AM to 6:00 PM AEDT
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} />
                  &nbsp;+61 452 216 087
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Support</h6>
                <p
                  className="text-reset"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowTrackModal(true)}
                >
                  Track delivery
                </p>
                <p
                  className="text-reset"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowUpdateModal(true)}
                >
                  Update delivery
                </p>
                <p>
                  <span
                    className="text-reset"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowReturnPolicy(true)}
                  >
                    Return policy
                  </span>
                </p>
                <p>
                  <span
                    className="text-reset"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPrivacyPolicy(true)}
                  >
                    Privacy policy
                  </span>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Information</h6>
                <p>
                  <Link className="nav-link active" to={"/aboutus"}>
                    About Us
                  </Link>
                </p>
                <p>
                  <span
                    className="text-reset"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowTerms(true)}
                  >
                    Terms and conditions
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-2">
          © 2025 Copyright:
          <a className="text-reset fw-bold" href="https://securewrap.com.au">
            &nbsp; securewrap.com
          </a>
        </div>
      </footer>

      {/* Animated Modal Templates Below */}

      {showReturnPolicy && (
        <div className="modal-overlay fade-in">
          <div className="modal-content">
            <h5>Return Policy</h5>
            <p>
              We accept returns within 30 days of delivery. Items must be in
              original condition and packaging. Shipping costs for returns are
              the customer’s responsibility unless the return is due to a defect
              or error on our part.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowReturnPolicy(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPrivacyPolicy && (
        <div className="modal-overlay fade-in">
          <div className="modal-content">
            <h5>Privacy Policy</h5>
            <p>
              Securewrap respects your privacy. We collect only necessary data
              to fulfill your orders and improve your experience. We never sell
              your data. For full details, please refer to our official Privacy
              Policy page.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPrivacyPolicy(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="modal-overlay fade-in">
          <div className="modal-content">
            <h5>Terms and Conditions</h5>
            <p>
              By accessing or using Securewrap’s services, you agree to be bound
              by these terms. All purchases are subject to availability and
              confirmation. Prices are subject to change. Misuse of this website
              is prohibited. For complete details, please refer to our official
              Terms and Conditions.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowTerms(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showTrackModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-content">
            <h5>Track Delivery</h5>
            <p>
              Please call on the 0452216087 provided above to track your delivery.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowTrackModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-content">
            <h5>Update Delivery</h5>
            <p>
              Please call on the 0452216087 provided above to update your delivery.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowUpdateModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
