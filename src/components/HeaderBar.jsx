import React from "react";
import "../App.css";
import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

export const HeaderBar = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center bg-danger topBanner">
        <div className="d-flex justify-content-center">
          <div className="primary">Questo è un esempio di dashboard, per quella ufficiale visita <a href="https://www.governo.it/it/cscovid19/report-vaccini/">report-vaccini</a> (<a href="https://github.com/italia/report-vaccini-anti-covid-19">GitHub</a>)</div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center mainBanner">
        <div className="d-flex justify-content-center">
          <img src="logo.png" alt="Logo" className="main-logo" />
          <span className="pl-3">Report Vaccini Anti COVID-19</span>
        </div>
      </div>
    </>
  );
};
