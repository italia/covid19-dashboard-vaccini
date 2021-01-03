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
      <Header small={false} theme="" type="slim" className="App-header">
        <div className="d-flex justify-content-center mb-3 logo-section mx-auto">
          <div className="presidenza">
            <img src="logo.svg" alt="Logo" className="logo" />
            <span>Presidenza Del</span>
            <span>Consiglio dei Ministri</span>
          </div>
          <div className="presidenza">
            <img src="logo.svg" alt="Logo" className="logo" />
            <span>Commissario</span>
            <span>Straordinario Covid-19</span>
          </div>
          <div className="presidenza">
            <img src="logo.svg" alt="Logo" className="logo" />
            <span>Ministero</span>
            <span>della Salute</span>
          </div>
        </div>
      </Header>
      <div className="d-flex flex-column justify-content-center mainBanner">
        <div className="d-flex justify-content-center">
          <img src="logo.png" alt="Logo" className="main-logo" />
          <span>Report Vaccini Anti COVID-19</span>
        </div>
      </div>
    </>
  );
};
