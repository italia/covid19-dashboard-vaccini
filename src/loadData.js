import { sumDose, sumDoseX, aggrBy, mapBy, filterByAge } from "./utils";

const elaborate = (data) => {
  const timestamp = new Date().toISOString();
  const tot = data.reduce(sumDose, 0);
  //   const tot2 = data.reduce(sumDoseXY("TML_DOSE_1", "TML_DOSE_2"), 0);
  const areasRAW = data.reduce(aggrBy("TML_AREA"), {});
  const tot_m = data.reduce(sumDoseX("TML_SESSO_M"), 0);
  const tot_f = data.reduce(sumDoseX("TML_SESSO_F"), 0);
  const areas = mapBy(areasRAW);
  const fascia1619 = data.filter(filterByAge("16-19"));
  const fascia2029 = data.filter(filterByAge("20-29"));
  const totfascia1619 = fascia1619.reduce(sumDose, 0);
  const totfascia2029 = fascia2029.reduce(sumDose, 0);

  const sum = {
    timestamp,
    tot,
    tot_m,
    tot_f,
    areas,
    totfascia1619,
    totfascia2029,
  };
  console.log(sum);
  return sum;
};

export const loadData = async () => {
  const res = await fetch("data/data.json");
  return elaborate(await res.json());
};
