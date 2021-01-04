import {
  sumDose,
  sumDoseX,
  aggrBy,
  mapBy,
  filterByAge,
  filterByArea,
  filterByAreaITA,
} from "./utils";

const sommVaxSummaryURL = "data/somministrazioni-vaccini-summary-latest.json";
//   "https://raw.githubusercontent.com/teamdigitale/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-summary-latest.json?token=ACT7Q5GQ6UUAV5MUSXDNTLS76JODC";
const sommVaxDetailURL = "data/somministrazioni-vaccini-latest.json";
//   "https://raw.githubusercontent.com/teamdigitale/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-latest.json?token=ACT7Q5CEDP6JMS4BVM26MGC76JOUQ";
const consegneVaxSummaryURL = "data/consegne-vaccini-summary-latest.json";
//   "https://raw.githubusercontent.com/teamdigitale/covid19-opendata-vaccini/master/dati/consegne-vaccini-summary-latest.json?token=ACT7Q5AK2MOVUOWBNW5BCZC76JOYE";

const elaborate = (data) => {
  console.log(data);
  const timestamp = data.dataConsegneVaxSummary.data.slice(0, 1)[0].data;
  const tot = data.dataSommVaxSummary.data
    .filter(filterByAreaITA)
    .reduce(sumDoseX("totale"), 0);
  //   //   const tot2 = data.reduce(sumDoseXY("TML_DOSE_1", "TML_DOSE_2"), 0);
  //   const areasRAW = data.reduce(aggrBy("TML_AREA"), {});
  //   const tot_m = data.reduce(sumDoseX("TML_SESSO_M"), 0);
  //   const tot_f = data.reduce(sumDoseX("TML_SESSO_F"), 0);
  //   const areas = mapBy(areasRAW);
  //   const fascia1619 = data.filter(filterByAge("16-19"));
  //   const fascia2029 = data.filter(filterByAge("20-29"));
  //   const totfascia1619 = fascia1619.reduce(sumDose, 0);
  //   const totfascia2029 = fascia2029.reduce(sumDose, 0);

  //   const sum = {
  //     timestamp,
  //     tot,
  //     tot_m,
  //     tot_f,
  //     areas,
  //     totfascia1619,
  //     totfascia2029,
  //   };
  //   console.log(sum);
  return { timestamp, tot, dataConsegneVaxSummary: data.dataConsegneVaxSummary };
};

export const loadData = async () => {
  const resSommVaxSummary = await fetch(sommVaxSummaryURL);
  const resSommVaxDetail = await fetch(sommVaxDetailURL);
  const resConsegneVaxSummary = await fetch(consegneVaxSummaryURL);

  const dataSommVaxSummary = await resSommVaxSummary.json();
  const dataSommVaxDetail = await resSommVaxDetail.json();
  const dataConsegneVaxSummary = await resConsegneVaxSummary.json();

  return elaborate({
    dataSommVaxSummary,
    dataSommVaxDetail,
    dataConsegneVaxSummary,
  });
};
