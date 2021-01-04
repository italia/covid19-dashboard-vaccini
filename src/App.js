import { useEffect, useState } from "react";
import "./App.css";
import { HeaderBar } from "./components/HeaderBar";
import { FooterBar } from "./components/FooterBar";
import { MapArea } from "./components/MapArea";
import { StaticBlock } from "./components/StaticBlock";
import { Table } from "./components/Table";
import { Total } from "./components/Total";
import { loadData } from "./loadData";

function App() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    loadData().then((d) => {
      setSummary(d);
    });
  }, []);

  return (
    <>
      <HeaderBar />
      <Total summary={{ ...summary }} />
      <div
        className="d-flex justify-content-center w-75 mx-auto mt-3"
        style={{ height: 150 }}
      >
        <StaticBlock
          classes="bg-primary text-white"
          text="Il 27 dicembre sono state consegnate 9.750 dosi di vaccino, interamente somministrate."
        />
        <StaticBlock
          classes="bg-primary text-white"
          text="Dal 30 Dicembre al 1° Gennaio sono state consegnate 469.950 dosi di vaccino."
        />
      </div>
      <div
        className="d-flex justify-content-center w-75 mx-auto"
        style={{ height: 150 }}
      >
        <StaticBlock
          classes="text-black text-uppercase font-weight-bold"
          text="Le somministrazioni delle 469.950 dosi di vaccino su tutto il territorio sono iniziate il 31 dicembre"
        />
      </div>
      <div
        className="d-flex justify-content-center w-75 mx-auto h-100 mt-3"
        style={{ height: 150 }}
      >
        <Table summary={{ ...summary }} className="mr-5 h-100"/>
        <MapArea summary={{ ...summary }} className="ml-5"/>
      </div>
      <FooterBar />
    </>
  );
}

export default App;
