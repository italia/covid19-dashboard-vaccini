import { useEffect, useState } from "react";
import "./App.css";
import { HeaderBar } from "./components/HeaderBar";

function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const sumDose = (acc, x) => acc + +x?.TML_DOSE_1 + +x?.TML_DOSE_2;
  const sumDoseXY = (y, z) => (acc, x) => acc + +x?.[y] + +x?.[z];
  const sumDoseX = (y) => (acc, x) => acc + +x?.[y];
  const aggrBy = (p) => (acc, x) => {
    let key = x[p];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(x);
    return acc;
  };
  const filterBy = (y) => (z) => (x) => {
    return x[y] === z;
  };
  const filterByAge = filterBy("TML_FASCIA_ETA");
  const mapBy = (y) =>
    Object.keys(y).map((x) => {
      return { [x]: { sum: y[x].reduce(sumDose, 0) } };
    });

  useEffect(() => {
    loadData();
  }, []);

  const elaborate = (data) => {
    const tot = data.reduce(sumDose, 0);
    const tot2 = data.reduce(sumDoseXY("TML_DOSE_1", "TML_DOSE_2"), 0);
    const areasRAW = data.reduce(aggrBy("TML_AREA"), {});
    const tot_m = data.reduce(sumDoseX("TML_SESSO_M"), 0);
    const tot_f = data.reduce(sumDoseX("TML_SESSO_F"), 0);
    const areas = mapBy(areasRAW);
    const fascia1619 = data.filter(filterByAge('16-19'));
    const fascia2029 = data.filter(filterByAge('20-29'));
    const totfascia1619 = fascia1619.reduce(sumDose, 0);
    const totfascia2029 = fascia2029.reduce(sumDose, 0);

    console.log(data);
    const sum = { tot, tot2, tot_m, tot_f, areas, totfascia1619, totfascia2029};
    setSummary(sum);
    console.log(sum);
  };
  const loadData = async () => {
    const res = await fetch("data/data.json");
    const data = await res.json();
    setData(data);
    elaborate(data);
  };
  return (
    <>
      <HeaderBar />
      <body></body>
    </>
  );
}

export default App;
