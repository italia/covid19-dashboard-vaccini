import { useEffect, useState } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { FooterBar } from "./components/FooterBar";
import { MapArea } from "./components/MapArea";
import { StaticBlock } from "./components/StaticBlock";
import { LocationsTable } from "./components/LocationsTable";
import { Table } from "./components/Table";
import { Total } from "./components/Total";
import { loadData } from "./loadData";
import { BarChart } from "./components/BarChart";
import { HBarChart } from "./components/HBarChart";
import { areaMappingReverse, groupByAge, allTotalGender } from "./utils";
import "./App.css";

function App() {
  const [summary, setSummary] = useState({});
  const [selected, setSelected] = useState({});
  const [totalAgeByGender, setTotalAgeByGender] = useState({});
  const [barState, setBarState] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleCountryClick = (countryIndex) => {
    // console.log(summary);
    let _selected = summary.deliverySummary[countryIndex];

    setSelected({ ..._selected });

    if (countryIndex || countryIndex == 0) {
      let vaccinAdministrationListReportByArea = summary.dataSomeVaxDetail.filter(el => el.area == _selected.area);

      setBarState(groupByAge(vaccinAdministrationListReportByArea));
      setTotalAgeByGender(allTotalGender(groupByAge(vaccinAdministrationListReportByArea)));
      calcGenderByAge(summary?.categoriesAndAges)
      function calcGenderByAge(arg) {
        if (Array.isArray(arg)) {
          arg.map((el) => {
            return el.sesso_maschile;
          })
        }
      }
    } else {
      setBarState(summary.categoriesAndAges);
      setTotalAgeByGender(summary.gender);
    }

  };

  const handleCountryClickLocations = (countryIndex) => {
    setSelectedLocation({ ...summary.deliverySummary[countryIndex] });
  };

  const handleCountryClickCategories = (countryIndex) => {
    const area = summary.deliverySummary[countryIndex]?.area;
    const areaCode = areaMappingReverse[area];
    const data = summary.categoriesByRegions[areaCode];

    setSelectedCategory(
      countryIndex ? data?.slice() || [] : summary.categories
    );
  };

  useEffect(() => {
    loadData().then((d) => {
      setSummary(d);
      setSelectedCategory(d.categories);
      setBarState(d.categoriesAndAges);
      setTotalAgeByGender(d.gender);
    });
  }, []);

  return (
    <div>
      <HeaderBar />
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">

            <Total className="mb-3" summary={{ ...summary }} />

          </div>
        </div>
        <div className="row ">
          <div className="col-12 col-md-6">
            <StaticBlock
              classes="bg-primary text-white"
              text="Il 27 dicembre sono state consegnate 9.750 dosi di vaccino, interamente somministrate."
            />
          </div>
          <div className="col-12 col-md-6">
            <StaticBlock
              classes="bg-primary text-white"
              text="Dal 30 Dicembre al 1° Gennaio sono state consegnate 469.950 dosi di vaccino."
            />
          </div>
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
        <div className=" w-75 mx-auto h-100 mt-3">
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
        <h4 className="text-center mt-5">Vaccinazioni per fasce di età</h4>
        <div className=" w-100 mx-auto h-100 mt-3" style={{
          backgroundColor: '#013366'
        }}>
          <BarChart
            title=""
            xtitle="Fascia d'età"
            ytitle=""
            width="800"
            height="300"
            property={{ xprop: "fascia_anagrafica", yprop: "totale" }}
            data={barState}
          />
          <div className="d-flex flex-column justify-content-center">
            <img src="user_f.png" alt="users" className="d-flex" width="140px" />
            <span className="text-center font-weight-light text-white">
              <h3>{totalAgeByGender?.gen_f?.toLocaleString('it')}</h3>
            </span>
            <img src="user_m.png" alt="users" className="d-flex" width="140px" />
            <span className="text-center font-weight-light text-white">
              <h3>{totalAgeByGender?.gen_m?.toLocaleString('it')}</h3>
            </span>
          </div>
        </div>

        <h4 className="text-center mt-5">Vaccinazioni per categoria</h4>
        <div className=" w-75 mx-auto h-100 mt-3">
          <HBarChart
            title=""
            xtitle="Vaccinazioni per categoria"
            ytitle=""
            width="400"
            height="400"
            property={{ xprop: "name", yprop: "total" }}
            data={selectedCategory?.slice() || []}
          />
          <MapArea
            summary={{ ...summary }}
            handleCountryClick={handleCountryClickCategories}
            className="ml-5 w-100 h-100"
          />
        </div>

        <h4 className="text-center mt-5">Punti di somministrazione</h4>
        <div className=" w-75 mx-auto h-100 mt-3">
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

        <p className="text-center pt-20">
          I dati visualizzati sono disponibili all'indirizzo{" "}
          <a href="https://github.com/italia/covid19-opendata-vaccini">
            https://github.com/italia/covid19-opendata-vaccini
        </a>
        </p>

      </div>

      <FooterBar />

    </div>
  );
}

export default App;
