import { sumDoseX, filterByAreaITA, replaceArea } from "./utils";

const sommVaxSummaryURL = "data/somministrazioni-vaccini-summary-latest.json";
const sommVaxDetailURL = "data/somministrazioni-vaccini-latest.json";
const deliveryVaxDetailURL = "data/consegne-vaccini-latest.json";
const vaxSummaryURL = "data/vaccini-summary-latest.json";
const vaxLocationsURL = "data/punti-somministrazione-latest.json";


const anagraficaSummaryURL = "data/anagrafica-vaccini-summary-latest.json";
const puntiSommSummaryURL = "data/punti-somministrazione-latest.json";

const elaborate = (data) => {
  console.log(data);
  const tot = data.dataSommVaxSummary.data
    .filter(filterByAreaITA)
    .reduce(sumDoseX("totale"), 0);
  // datatable and map
  const deliverySummary = data.dataVaxSummary.data.map(replaceArea);

  // categories and ages summary
  const categoriesAndAges = data.dataProfileSummary.data;
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
  console.log(categoriesAndAges);
  const timestamp = categoriesAndAges[0].data;
  return { timestamp, tot, deliverySummary, categoriesAndAges };
};

export const loadData = async () => {
  const resSommVaxSummary = await fetch(sommVaxSummaryURL);
  const resSommVaxDetail = await fetch(sommVaxDetailURL);
  const resDeliveryVaxDetail = await fetch(deliveryVaxDetailURL);
  const resVaxSummary = await fetch(vaxSummaryURL);
  const resProfileSummaryURL = await fetch(anagraficaSummaryURL);
  const resPointsSommSummaryURL = await fetch(puntiSommSummaryURL);
  const resVaxLocations = await fetch(vaxLocationsURL);

  const dataSommVaxSummary = await resSommVaxSummary.json();
  const dataSommVaxDetail = await resSommVaxDetail.json();
  const dataDeliveryVaxDetail = await resDeliveryVaxDetail.json();
  const dataVaxSummary = await resVaxSummary.json();
  const dataProfileSummary = await resProfileSummaryURL.json();
  const dataPointsSommSummary = await resPointsSommSummaryURL.json();
  const dataVaxLocations = await resVaxLocations.json();

  return {
      ...elaborate({
          dataSommVaxSummary,
          dataSommVaxDetail,
          dataDeliveryVaxDetail,
          dataVaxSummary,
          dataProfileSummary,
          dataPointsSommSummary,
      }),
      dataVaxLocations,
  };
};
