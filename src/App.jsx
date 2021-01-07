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
        <div className="row">
          <div className="col-12 col-md-6 font-25">
            <StaticBlock
              classes="bg-primary text-white"
              text="Il 27 dicembre sono state consegnate 9.750 dosi di vaccino, interamente somministrate."
            />
          </div>
          <div className="col-12 col-md-6 font-25">
            <StaticBlock
              classes="bg-primary text-white"
              text="Dal 30 Dicembre al 1° Gennaio sono state consegnate 469.950 dosi di vaccino."
            />
          </div>
          <div className="col-12">
            <div
              className="text-center font-22"
            >
              <StaticBlock
                classes="text-black text-uppercase font-weight-bold"
                text="Le somministrazioni delle 469.950 dosi di vaccino su tutto il territorio sono iniziate il 31 dicembre"
              />
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-12 d-flex justify-content-end">
             <img src="reset.png"/>
          </div>
       
        </div>
        <div className="row" style={{ backgroundColor: '#F8FBFE' }}>
          <div className="col-12 col-md-6 h-100">
            <Table
              summary={{ ...summary }}
              selected={selected}
              className="mr-5 h-100"
            />
          </div>
          <div className="col-12 col-md-6 pt-5 pl-5">
            <MapArea
              summary={{ ...summary }}
              handleCountryClick={handleCountryClick}
              className="ml-5 w-100 h-100"
            />
          </div>
        </div>





        <div className="row position-powerbi" style={{ backgroundColor: '#F8FBFE' }}>
          <div className="col-12 col-md-6">
          </div>
          <div className="col-12 col-md-6  position-relative" >
            <div className="bg-gradient-bar"></div>
            <div className="row">
              <div className="col-6 d-flex align-items-baseline">
                <img src="user_f.png" alt="users" width="75px" />
                <span className="text-center font-weight-light text-white">
                  <h3>{totalAgeByGender?.gen_f?.toLocaleString('it')}</h3>
                </span>
              </div>
              <div className="col-6  d-flex align-items-baseline">
                <img src="user_m.png" alt="users" width="75px" />
                <span className="text-center font-weight-light text-white">
                  <h3>{totalAgeByGender?.gen_m?.toLocaleString('it')}</h3>
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5" style={{ backgroundColor: '#013366' }}>
            <div className="p-4 position-relative">
              <div style={{ height: 100 }}>
                <img src="group_person.svg" alt="Logo" className="img-fluid" />
              </div>
              <div className="text-white w-100">
                <div className="w-100 h-100 d-flex justify-content-end pr-5">
                  <img src="logo.png" width="30" height="30" alt="Logo" />
                </div>
                <div className="w-100  h-100 d-flex justify-content-end">
                  <h3>Vaccinazioni<br></br> per fasce di età</h3>

                </div>
              </div>

            </div>
          </div>
          <div className="col-12  col-md-7" style={{
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
          </div>
        </div>
        <div className="row ">
          <div className="col-12  d-flex justify-content-center align-items-center p-5">
            <img src="logo.png" width="75" height="75" alt="Logo" className="img-fluid" />
            <h4 className="text-center">Vaccinazioni per categoria</h4>
          </div>

          <div className="col-12 col-md-6 h-100 ">
            <HBarChart
              title=""
              xtitle="Vaccinazioni per categoria"
              ytitle=""
              width="400"
              height="400"
              property={{ xprop: "name", yprop: "total" }}
              data={selectedCategory?.slice() || []}
            />
          </div>
          <div className="col-12 col-md-6 h-100">
            <MapArea
              summary={{ ...summary }}
              handleCountryClick={handleCountryClickCategories}
              className="w-100 h-100"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <LocationsTable
              summary={{ ...summary }}
              selected={selectedLocation}
              className="mr-5 h-100"
            />
          </div>
          <div className="col-12 col-md-6">
            <MapArea
              summary={{ ...summary }}
              handleCountryClick={handleCountryClickLocations}
              className="w-100 h-100"
            />
          </div>

          <p className="text-center pt-20">
            I dati visualizzati sono disponibili all'indirizzo{" "}
            <a href="https://github.com/italia/covid19-opendata-vaccini">
              https://github.com/italia/covid19-opendata-vaccini
        </a>
          </p>

        </div>
      </div>
      <FooterBar />

    </div>
  );
}

export default App;
