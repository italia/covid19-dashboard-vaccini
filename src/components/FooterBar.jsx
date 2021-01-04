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
      <div class="footer-wrapper">
        <footer class="container mx-auto pt-3" id="footer">
          <div class="row title_row">
            <div class="col-md-12">
              <div class="logo_container clearfix">
                <div class="logo_wrapper clearfix">
                  <a href="http://www.governo.it">
                    <img src="http://www.governo.it/sites/new.governo.it/themes/governo/governo-assets/img/logo.svg" class="logo" alt="Emblema della Repubblica Italiana" /></a>
                </div>
                <div class="clearfix">
                  <h3><strong>Governo Italiano</strong> Presidenza del Consiglio dei Ministri</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-9">
              <div class="row title_row">
                <div class="col-md-12">
                  <h5 class="contacts_footer">Contatti</h5>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h5>Presidenza del Consiglio dei Ministri</h5>
                    <p>Palazzo Chigi<br />
                     Piazza Colonna 370<br />
                     00187 Roma - Italia</p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h5>Corrispondenza cartacea</h5>
                    <p>Via dell'Impresa 89<br />
00186 Roma - Italia</p>

                  </div>
                </div>
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h5>Indirizzi di posta elettronica</h5>
                    <p><a href="http://presidenza.governo.it/AmministrazioneTrasparente/Organizzazione/TelefonoPostaElettronica/PEC.html">Elenco PEC</a></p>

                    <p><a href="http://presidenza.governo.it/AmministrazioneTrasparente/Organizzazione/TelefonoPostaElettronica/email.html">Elenco e-Mail</a></p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h5>Recapiti telefonici</h5>
                    <p>Centralino: (+39) 06.6779.1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <ul class="footer_links clearfix">
                <li><a href="http://www.governo.it/it/privacy-policy" title="">Privacy policy</a></li>
                <li><a href="http://www.governo.it/note-legali" title="">Note legali</a></li>
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
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
