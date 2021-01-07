import React from "react";
import "../App.css";
import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";
import { Icon } from "design-react-kit";

export const FooterBar = () => {
  return (
    <>
      <div className="footer-wrapper p-4 clearfix">
        <footer className="footer_container container" id="footer">
          <div className="row title_row">

          <div className="col-md-4 d-flex justify-content-center logo-section pt-1 pb-2">
          <div>
            <div>
              <a href="http://www.governo.it" target="_blank" rel="noreferrer">
                <img src="logo.svg" height="4px" alt="Logo" className="logo ml-5 mr-2" />
              </a>
            </div>
          </div>
          <div>
            <p>Presidenza del Consiglio dei Ministri</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center logo-section pt-1 pb-2">
          <div>
            <div>
              <a href="http://www.governo.it" target="_blank" rel="noreferrer">
                <img src="logo.svg" height="4px" alt="Logo" className="logo ml-5 mr-2" />
              </a>
            </div>
          </div>
          <div>
            <p>Commissario Straordinario Covid-19</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center logo-section pt-1 pb-2">
          <div>
            <div>
              <a href="http://www.governo.it" target="_blank" rel="noreferrer">
                <img src="logo.svg" height="4px" alt="Logo" className="logo ml-5 mr-2" />
              </a>
            </div>
          </div>
          <div>
            <p>Ministero della Salute</p>
          </div>
        </div>

           
          </div>


          
        </footer>
      </div>
    </>
  );
};
