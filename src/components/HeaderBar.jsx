import React from "react";
import "../App.css";
import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";
import { Header } from "design-react-kit";

export const HeaderBar = () => {
  return (
    <>
      <Header small={false} theme="" type="slim">
        <div className="row justify-content-center">
          <div className="col-4 col-md-3 d-flex logo-section pt-2 pb-2">
              <div>
                <a href="http://www.governo.it" target="_blank" rel="noreferrer">
                  <img src="logo.svg" height="4px" alt="Logo" className="logo ml-5 mr-2" />
                </a>
              </div>
            <div>
              <p>Presidenza del Consiglio dei Ministri</p>
            </div>
          </div>
          <div className="col-4 col-md-3 d-flex logo-section pt-2 pb-2">          
              <div>
                <a href="http://www.governo.it" target="_blank" rel="noreferrer">
                  <img src="logo.svg" height="4px" alt="Logo" className="logo ml-5 mr-2" />
                </a>
              </div>
            <div>
              <p>Commissario Straordinario Covid-19</p>
            </div>
          </div>
          <div className="col-4 col-md-3 d-flex logo-section pt-2 pb-2">
          
            <div>
              <a href="http://www.governo.it" target="_blank" rel="noreferrer">
                <img src="logo.svg" height="4px" alt="Logo" className="logo ml-5 mr-2" />
              </a>
            </div>
         
          <div>
            <p>Ministero della Salute</p>
          </div>
        </div>
        </div>
        
      </Header>
      <div className="d-flex flex-column justify-content-center mainBanner">
        <div className="d-flex justify-content-center">
          <img src="logo.png" alt="Logo" className="main-logo" />
          <span className="pl-3">Report Vaccini Anti COVID-19</span>
        </div>
      </div>
    </>
  );
};
