import { useEffect, useState } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { FooterBar } from "./components/FooterBar";
import { MapArea } from "./components/MapArea";
import { StaticBlock } from "./components/StaticBlock";
import { LocationsTable } from "./components/LocationsTable";
import { Table } from "./components/Table";
import { Total } from "./components/Total";
import { loadData } from "./loadData";
import "./App.css";
import { BarChart } from "./components/BarChart";

function App() {
  const [summary, setSummary] = useState({});
  const [selected, setSelected] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});

  const handleCountryClick = (countryIndex) => {
    setSelected({ ...summary.deliverySummary[countryIndex] });
  };

  const handleCountryClickLocations = (countryIndex) => {
    setSelectedLocation({ ...summary.deliverySummary[countryIndex] });
  };

  useEffect(() => {
    loadData().then((d) => {
      setSummary(d);
    });
  }, []);

  return (
    <div>
      <HeaderBar />
      <Total className="mb-3" summary={{ ...summary }} />
      <div
        className="d-flex flex-column flex-sm-row justify-content-center w-75 h-100 mx-auto mt-3"
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
      <div className="d-flex flex-column flex-sm-row justify-content-center w-75 mx-auto h-100 mt-3">
        <Table
          summary={{ ...summary }}
          selected={selected}
          className="mr-5 h-100"
        />
        <MapArea
          summary={{ ...summary }}
          handleCountryClick={handleCountryClick}
          className="ml-5 w-100 h-100"
        />
      </div>

      <div className="d-flex flex-column flex-sm-row justify-content-center w-75 mx-auto h-100 mt-3">
        <BarChart
          title=""
          xtitle="Fascia d'età"
          ytitle=""
          width="800"
          height="300"
          data={summary.categoriesAndAges}
        />
      </div>

      <h4 className="text-center mt-5">Punti di somministrazione</h4>
      <div className="d-flex flex-column flex-sm-row justify-content-center w-75 mx-auto h-100 mt-3">
        <LocationsTable
          summary={{ ...summary }}
          selected={selectedLocation}
          className="mr-5 h-100"
        />
        <MapArea
          summary={{ ...summary }}
          handleCountryClick={handleCountryClickLocations}
          className="ml-5 w-100 h-100"
        />

      </div>

      <FooterBar />
    </div>
  );
}

export default App;
