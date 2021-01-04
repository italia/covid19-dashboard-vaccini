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
        <div className="d-flex mb-3 logo-section mx-auto pt-1 pb-2">
          <div>
            <div>
              <a href="http://www.governo.it" target="_blank" rel="noreferrer">
                <img src="logo.svg" height="4px" alt="Logo" className="logo ml-5 mr-2" />
              </a>
            </div>
          </div>
          <div>
            <p><strong>Governo Italiano</strong> Presidenza del Consiglio dei Ministri</p>
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
