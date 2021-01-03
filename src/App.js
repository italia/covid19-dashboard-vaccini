import { useEffect, useState } from "react";
import "./App.css";
import { HeaderBar } from "./components/HeaderBar";
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
    </>
  );
}

export default App;
