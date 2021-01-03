import { React } from "react";
import moment from "moment";

export const Total = (props) => {
  return (
    <div className="d-flex flex-column justify-content-center mt-2 ">
      <div className="timestamp mx-auto">
        <h6>
          Dati aggiornati al:{" "}
          {moment(props.summary.timestamp).format("DD-MM-YYYY HH:mm")}
        </h6>
      </div>
      <div className="container">
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <img src="meds.png" alt="meds" className="pr-5"/>
            {" "}
            <h1 className="pl-5 mt-4 font-weight-light">{props.summary.tot?.toLocaleString('en')}</h1>
          </div>
          <span className="border-top mt-2 mb-2"></span>
          <div className="d-flex justify-content-center">
            <img src="logo.png" alt="fiore" height="30" />
            <img src="logo.png" alt="fiore" height="30" />
            <img src="logo.png" alt="fiore" height="30" className="pr-5"/>
            {" "}
            <h6 className="pl-5">Totale vaccinazioni</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
