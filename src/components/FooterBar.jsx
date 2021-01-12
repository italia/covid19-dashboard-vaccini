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
      <footer className="section">
        <ul className="footer_links clearfix">
          <li><a href="https://github.com/italia/covid19-dashboard-vaccini" title="">
            <Icon
              color="white"
              icon="it-github"
              padding={true}
              size="small"
            />
            GitHub
          </a></li>
          <li><a href="https://github.com/italia/covid19-opendata-vaccini" title="">
            <Icon
              color="white"
              icon="it-github"
              padding={true}
              size="small"
            />
            Open Data
          </a></li>
        </ul>
      </footer>
    </>
  );
};
