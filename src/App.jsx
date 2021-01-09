import { useEffect, useState } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { FooterBar } from "./components/FooterBar";
import { MapArea } from "./components/MapArea";
import { MapAreaByCat } from "./components/MapAreaByCat";
import { StaticBlock } from "./components/StaticBlock";
import { LocationsTable } from "./components/LocationsTable";
import { Table } from "./components/Table";
import { Total } from "./components/Total";
import { loadData } from "./loadData";
import { BarChart } from "./components/BarChart";
import { HBarChart } from "./components/HBarChart";
import { areaMappingReverse, groupByAge, allTotalGender } from "./utils";
import * as _ from 'lodash';
import "./App.css";

function App() {
  const [summary, setSummary] = useState({});
  const [selected, setSelected] = useState({});
  const [totalAgeByGender, setTotalAgeByGender] = useState({});
  const [barState, setBarState] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedLocationMap, setSelectedLocationMap] = useState(null);
  const [selectedLocationCategoryMap, setSelectedLocationCategoryMap] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCodeCategory, setSelectedCodeCategory] = useState(null);
  const [totalByCategory, setTotalByCategory] = useState(0);
  const [maxByCategory, setMaxByCategory] = useState(0);

  const resetFilter = () => {
    setSelected(null);
    setSelectedCategory(summary.categories);
    setBarState(summary.categoriesAndAges);
    setTotalAgeByGender(summary.gender);
    setSelectedAge(null);
    setSelectedLocationMap(null);
    setSelectedCodeCategory(null);
    setSelectedLocationCategoryMap(null);
  }
  const handleRectClick = (currentRect) => {
    if (currentRect) {
      let vaccinAdministrationListReportByAge = summary.dataSomeVaxDetail.filter(el => el.fascia_anagrafica === currentRect.fascia_anagrafica);
      // console.log(vaccinAdministrationListReportByAge);
      setTotalAgeByGender({ gen_m: currentRect?.sesso_maschile, gen_f: currentRect?.sesso_femminile });
      setSelectedAge(currentRect)
    } else {
      setBarState(summary.categoriesAndAges);
      setTotalAgeByGender(summary.gender);
      setSelectedAge(null)

    }
  }

  const handleHRectClick = (currentRect) => {
    if (currentRect) {
      setSelectedCodeCategory(currentRect?.code)
    } else {
      setSelectedCodeCategory(null)
    }
  }

  const handleCountryClick = (countryIndex) => {
    // console.log(summary);
    let _selected = summary.deliverySummary[countryIndex];

    setSelected({ ..._selected });
    setSelectedAge(null);
    setSelectedLocationMap(_selected);

    if (countryIndex || countryIndex == 0) {
      let vaccinAdministrationListReportByArea = summary.dataSomeVaxDetail.filter(el => el.area === _selected.area);

      setBarState(groupByAge(vaccinAdministrationListReportByArea));
      setTotalAgeByGender(allTotalGender(groupByAge(vaccinAdministrationListReportByArea)));

    } else {
      setBarState(summary.categoriesAndAges);
      setTotalAgeByGender(summary.gender);
    }

  };

  const handleCountryClickLocations = (countryIndex) => {
    setSelectedLocation({ ...summary.deliverySummary[countryIndex] });
  };

  const handleCountryClickCategories = (countryIndex) => {
    setSelectedCodeCategory(null)
    const area = summary.deliverySummary[countryIndex]?.area;
    const areaCode = areaMappingReverse[area];
    const data = summary.categoriesByRegions[areaCode];

    let _selected = summary.deliverySummary[countryIndex];

    setSelectedLocationCategoryMap(_selected);

    setTotalByCategory(
      countryIndex ? _selected.dosi_somministrate : summary.tot
    )
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

  useEffect(() => {
    let totalSumm = 0;
    let maxSumm = 0;

    if (selectedCodeCategory) {
      setSelectedLocationCategoryMap(null)
    }

    if (!selectedLocationCategoryMap) {
      summary?.deliverySummary?.forEach(i => {
        Object.keys(i.byCategory).forEach(cat => {
          if (!selectedCodeCategory) {
            totalSumm = totalSumm + (i.byCategory[cat].length && i.byCategory[cat][0].total) || 0
            maxSumm = (i.byCategory[cat].length && i.byCategory[cat][0].total) > maxSumm ?
              (i.byCategory[cat].length && i.byCategory[cat][0].total) : maxSumm

          } else if (selectedCodeCategory && cat === selectedCodeCategory) {
            totalSumm = totalSumm + (i.byCategory[cat].length && i.byCategory[cat][0].total) || 0
            maxSumm = (i.byCategory[cat].length && i.byCategory[cat][0].total) > maxSumm ?
              (i.byCategory[cat].length && i.byCategory[cat][0].total) : maxSumm
          }
        })
      });

      setMaxByCategory(maxSumm)
      setTotalByCategory(totalSumm)
    }
  }, [selectedCodeCategory, summary, totalByCategory])

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
            <img src="reset.png" onClick={resetFilter} />
          </div>

        </div>
        <div className="row" style={{ backgroundColor: '#F8FBFE' }}>
          <div className="col-12 col-md-5 h-100">
            <Table
              summary={{ ...summary }}
              selected={selected}
              className="mr-5 h-100"
            />
          </div>
          <div className="col-12 col-md-7 pt-5 pl-5">
            <div className="p-4 position-absolute" style={{ right: '0px', top: '30px' }}>

              <div className="w-100 h-100 d-flex justify-content-start pr-5">
                <img src="logo.png" width="35" height="35" alt="Logo" />
              </div>
              <div className="w-100 h-100 d-flex justify-content-end text-black">
                <h5>Distribuzione vaccinazioni<br />rispetto alle consegne</h5>

              </div>


            </div>
            <MapArea
              summary={{ ...summary }}
              selected={selectedLocationMap}
              handleCountryClick={handleCountryClick}
              className="ml-5 w-100 h-100"
            />
            <div className="p-4 position-relative">
              <div className="text-black w-100">
                <div className="w-100 h-100 d-flex justify-content-start pr-5">
                  <img src="logo.png" width="40" height="40" alt="Logo" />
                  <span className="font-30 bold pl-3" >{_.sum([totalAgeByGender?.gen_m, totalAgeByGender?.gen_f]) ? _.sum([totalAgeByGender?.gen_m, totalAgeByGender?.gen_f]).toLocaleString('it') : 0}</span>

                </div>

                <div className="w-100  h-100 d-flex justify-content-start">
                  <h5>Totale vaccinazioni</h5>
                </div>
              </div>

            </div>
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
                <div className="w-100 h-100 d-flex justify-content-end">
                  <img src="logo.png" width="40" height="40" alt="Logo" />
                </div>
                <div className="w-100  h-100 d-flex justify-content-end text-right">
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
              handleRectClick={handleRectClick}
              height="300"
              selected={selectedAge}
              property={{ xprop: "fascia_anagrafica", yprop: "totale" }}
              data={barState}
            />
          </div>
        </div>
        <div className="row ">
          <div
            className="col-12  d-flex justify-content-center align-items-center p-5"
            style={{ backgroundColor: '#F4F9FD' }}
          >
            <img src="logo.png" width="86" height="86" alt="Logo" className="img-fluid" style={{ zIndex:10 }}/>
            <h3 className="text-center">Vaccinazioni per categoria</h3>
          </div>
          <div className="col-12 col-md-12 h-100 ">
            <div className="col-3 col-md-3 h-100 ">
              <div style={{
                position: 'relative',
                // width: 300,
                // height: 180,
                background: '#013366',
                top: -90,
                left: 105
              }}>
                <div className="text-white w-100">
                  <div className="w-100  h-100 d-flex justify-content-start pt-3 pl-2">
                    <h5>Totale<br></br>vaccinazioni</h5>
                  </div>
                  <div className="w-100  h-100 d-flex justify-content-start pl-2">
                    <h4>{(!selectedCodeCategory && !selectedLocationCategoryMap)
                      ? summary.tot?.toLocaleString('it')
                      : totalByCategory?.toLocaleString('it')}
                    </h4>
                  </div>
                  <div className="col-12 d-flex justify-content-end  pb-2">
                    <img src="reset_white.png" onClick={resetFilter} height={35}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-7 h-100 " style={{ position: 'relative', left: 40 }}>
            <HBarChart
              title=""
              xtitle="Vaccinazioni per categoria"
              handleRectClick={handleHRectClick}
              ytitle=""
              width="500"
              height="350"
              property={{ xprop: "name", yprop: "total" }}
              data={selectedCategory?.slice() || []}
              selectedCodeCategory={selectedCodeCategory}
            />
          </div>
          <div className="col-12 col-md-5 h-100" style={{ position: 'relative', top: -40 }}>
            <MapAreaByCat
              summary={{ ...summary }}
              selected={selectedLocationCategoryMap}
              handleCountryClick={handleCountryClickCategories}
              maxByCategory={maxByCategory}
              selectedCodeCategory={selectedCodeCategory}
              className="w-100 h-100"
            />
          </div>
        </div>

        <div className="row" style={{ backgroundColor: '#F8FBFE' }}>
          <div className="col-12 col-md-6 pt-3 pl-3" >
            <LocationsTable
              summary={{ ...summary }}
              selected={selectedLocation}
              className="mr-5 h-100"
            />
          </div>

          <div className="col-12 col-md-6 pt-5">
            <div className="pt-5 position-absolute" style={{ right: '15px', top: '30px' }}>

              <div className="w-100 h-100 d-flex justify-content-start pr-5">
                <img src="logo.png" width="35" height="35" alt="Logo" />
              </div>
              <div className="w-100 h-100 d-flex justify-content-end text-black">
                <h5>Punti di somministrazione<br />per regione</h5>

              </div>


            </div>

            <MapArea
              summary={{ ...summary }}
              handleCountryClick={handleCountryClickLocations}
              className="w-100 h-100"
            />

            <div className="col-12 col-md-12 h-100 mb-3">
            <img src="logo.png" width="86" height="86" alt="Logo"
                style={{
                  position: 'relative',
                  left: 200,
                  top: 73,
                  zIndex: 10
                }}
            
            />
            <div className="col-3 col-md-6 h-100 pl-4 pt-4">
              <div style={{
                position: 'relative',
                background: '#013366',
                left: 230
              }}>
                
                <div className="text-white w-100">
                  <div className="w-100  h-100 d-flex justify-content-start pl-5 pt-4">
                    <h5>Totale punti di<br></br>somministrazione</h5>
                  </div>
                  <div className="w-100  h-100 d-flex justify-content-start pl-5 pt-4">
                    <h4>00000000
                    </h4>
                  </div>
                  <div className="col-12 d-flex justify-content-end pb-2">
                    <img src="reset_white.png" onClick={resetFilter} height={35} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center pt-5 pb-3">
            I dati visualizzati sono disponibili all'indirizzo{" "}
            <a href="https://github.com/italia/covid19-opendata-vaccini">
              https://github.com/italia/covid19-opendata-vaccini
        </a>
          </div>
        </div>
      </div>
      <FooterBar />

    </div>
  );
}

export default App;
