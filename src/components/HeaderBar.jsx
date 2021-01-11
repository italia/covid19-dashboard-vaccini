import React from "react";
import "../App.css";
import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

export const HeaderBar = () => {
  return (
    <>
      {/* <Header small={false} theme="" type="slim">
      
      </Header> */}
      <div className="row m-0" style={{ backgroundColor: '#0059b3' }}>
        <div className="col-12 col-md-4 d-flex justify-content-md-center justify-content-sm-start logo-section pt-2 pb-2">
             <a href="http://www.governo.it" target="_blank" rel="noreferrer">
              <img src="logo.svg" height="4px" alt="Logo" className="logo pl-5 pr-2" />
            </a>
            <p className="pt-sm-0">Presidenza del Consiglio dei Ministri</p>
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-md-center justify-content-sm-start logo-section pr-sm-0 pt-2 pb-2">
            <a href="http://www.governo.it" target="_blank" rel="noreferrer">
              <img src="logo.svg" height="4px" alt="Logo" className="logo pl-5 pr-2" />
            </a>
            <p className="pt-sm-0">Commissario Straordinario Covid-19</p>
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-md-center justify-content-sm-start logo-section pt-2 pb-2 pr-sm-3">
            <a href="http://www.governo.it" target="_blank" rel="noreferrer">
              <img src="logo.svg" height="4px" alt="Logo" className="logo pl-5 pr-2" />
            </a>
            <p className="pt-sm-0">Ministero della Salute</p>
        </div>
        {/** TITLE + LOGO*/}
        <div className="col-12 d-flex flex-column justify-content-center mainBanner">
          <div className="d-flex justify-content-center">
            <img src="logo.png" alt="Logo" className="main-logo" />
            <span className="pl-3">Report Vaccini Anti COVID-19</span>
          </div>
        </div>
      </div>
    </>
  );
};
