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
      <div className="d-flex flex-column justify-content-center mainBanner mx-auto pt-3">
        <div className="d-flex justify-content-center">
          <div className="presidenza mx-2">
            <img src="logo.svg" alt="Logo" className="logo" />
            <span>Presidenza Del Consiglio dei Ministri</span>
          </div>
          <div className="presidenza mx-2">
            <img src="logo.svg" alt="Logo" className="logo" />
            <span>Commissario Straordinario Covid-19</span>
          </div>
          <div className="presidenza mx-2">
            <img src="logo.svg" alt="Logo" className="logo" />
            <span>Ministero della Salute</span>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2 footer-link">
          <a href="https://github.com/italia/covid19-dashboard-vaccini/">
            <Icon
              className={undefined}
              color="white"
              icon="it-github"
              padding={false}
              size=""
            />
          </a>
        </div>
      </div>
    </>
  );
};
