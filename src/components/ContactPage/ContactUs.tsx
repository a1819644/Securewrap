import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "./ContactForm";
import "../../assets/ContactUs/ContactUsStyle.css";
export const ContactUs = () => {
  return (
    <div>
      <div className="container body p-5">
        <div className="row get-in-touch align-items-center">
          {/* Contact Form Column - Will take full width on small screens */}
          <div className="col-md-6 col-lg-4 mb-4">
            <ContactForm />
          </div>

          {/* Address and Image Column - Will take full width on small screens */}
          <div className="col-md-6 col-lg-8">
            <div className="row">
              <h5 style={{ color: "blue" }}>Reach us at</h5>
              <p>
                Taranaki Circuit
                <br /> Clyde North <br />
                Victoria 3978, Australia
              </p>
            </div>

            {/* Google Map - Takes Full Width on Small Screens */}
            <div className="row mt-4">
              <div className="col">
                <div className="map-container">
                  {/* Add an iframe for Google Maps */}
                  <iframe
                    title="Google Maps"
                    src="https://maps.google.com/maps?q=Clyde%20North,%20VIC&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-100"
                    style={{ height: "350px", border: "0" }}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
