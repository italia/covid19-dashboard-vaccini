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
      <div class="footer-wrapper section section_grey_darker clearfix">
        <footer class="footer_container container" id="footer">
          <div class="row title_row">
            <div class="col-md-12">
              <div class="logo_container clearfix">
                <div class="logo_wrapper clearfix">
                  <a href="http://www.governo.it">
                    <img src="logo.svg" class="logo_footer" alt="Emblema della Repubblica Italiana" />
                  </a>
                </div>
                <div class="logo_text clearfix">
                  <h1><strong>Governo Italiano</strong> Presidenza del Consiglio dei Ministri</h1>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-9">
              <div class="row title_row">
                <div class="col-md-12">
                  <h3 class="contacts_footer">Contatti</h3>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="row title_row">

                <div class="col-md-12">
                  <h3 class="h3_footer">Seguici su</h3>
                  <div class="footer_social clearfix social_footer">
                    <a href="https://www.facebook.com/palazzochigi.it/" title="Seguici su Facebook">
                      <Icon
                        color="white"
                        icon="it-facebook"
                        padding={true}
                        size="small"
                      /></a>
                    <a href="https://twitter.com/Palazzo_Chigi" title="Seguici su Twitter">
                      <Icon
                        color="white"
                        icon="it-twitter"
                        padding={true}
                        size="small"
                      /></a>
                    <a href="https://www.instagram.com/palazzo_chigi/" title="Seguici su Instagram">
                      <Icon
                        color="white"
                        icon="it-instagram"
                        padding={true}
                        size="small"
                      /></a>
                    <a href="https://www.youtube.com/palazzochigi" title="Seguici su YouTube">
                      <Icon
                        color="white"
                        icon="it-youtube"
                        padding={true}
                        size="small"
                      /></a>
                    <a href="https://www.linkedin.com/company/presidenza-del-consiglio-dei-ministri" title="Seguici su LinkedIn">
                      <Icon
                        color="white"
                        icon="it-linkedin"
                        padding={true}
                        size="small"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h4>Presidenza del Consiglio dei Ministri</h4>
                    <p>Palazzo Chigi<br />
                      Piazza Colonna 370<br />
                        00187 Roma - Italia</p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h4>Corrispondenza cartacea</h4>
                    <p>Via dell'Impresa 89<br />
                      00186 Roma - Italia</p>

                    <p><strong>È opportuno indicare chiaramente sull'involucro la Struttura destinataria</strong></p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h4>Indirizzi di posta elettronica</h4>
                    <p><a href="http://presidenza.governo.it/AmministrazioneTrasparente/Organizzazione/TelefonoPostaElettronica/PEC.html">Elenco PEC</a></p>

                    <p><a href="http://presidenza.governo.it/AmministrazioneTrasparente/Organizzazione/TelefonoPostaElettronica/email.html">Elenco e-Mail</a></p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="box_text box_text_footer new_footer clearfix">
                    <h4>Recapiti telefonici</h4>
                    <p>Centralino: (+39) 06.6779.1</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="row">
            <div class="col-md-12">
              <ul class="footer_links clearfix"><li><a href="http://www.governo.it/sala-stampa" title="">Sala stampa</a></li>
                <li><a href="http://www.governo.it/privacy-policy" title="">Privacy policy</a></li>
                <li><a href="http://www.governo.it/note-legali" title="">Note legali</a></li>
                <a href="http://www.governo.it/feed/rss" title="Feed RSS" class="rss_feed"><span class="icon-rss-two"></span></a>
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
