import { sumDoseX, filterByAreaITA, replaceArea } from "./utils";

export const sommVaxSummaryURL = "data/somministrazioni-vaccini-summary-latest.json";
export const sommVaxDetailURL = "data/somministrazioni-vaccini-latest.json";
export const deliveryVaxDetailURL = "data/consegne-vaccini-latest.json";
export const vaxSummaryURL = "data/vaccini-summary-latest.json";
export const vaxLocationsURL = "data/punti-somministrazione-latest.json";

export const anagraficaSummaryURL = "data/anagrafica-vaccini-summary-latest.json";
export const puntiSommSummaryURL = "data/punti-somministrazione-latest.json";

const elaborate = (data) => {
  console.log(data);
  const tot = data.dataSommVaxSummary.data
    .filter(filterByAreaITA)
    .reduce(sumDoseX("totale"), 0);
  // datatable and map
  const deliverySummary = data.dataVaxSummary.data.map(replaceArea);

  // categories and ages summary
  const categoriesAndAges = data.dataProfileSummary.data;
  const categories = [
    {
      name: "Categoria OSS",
      total: categoriesAndAges.reduce(
        sumDoseX("categoria_operatori_sanitari_sociosanitari"),
        0
      ),
    },
    {
      name: "Categoria Ospiti RSA",
      total: categoriesAndAges.reduce(sumDoseX("categoria_ospiti_rsa"), 0),
    },
    {
      name: "Categoria Personale non sanitario",
      total: categoriesAndAges.reduce(
        sumDoseX("categoria_personale_non_sanitario"),
        0
      ),
    },
  ];
  const gender = {
    gen_m: categoriesAndAges.reduce(sumDoseX("sesso_maschile"), 0),
    gen_f: categoriesAndAges.reduce(sumDoseX("sesso_femminile"), 0),
  };

  const timestamp = categoriesAndAges[0].data;
  const aggr = {
    timestamp,
    tot,
    deliverySummary,
    categoriesAndAges,
    categories,
    gender,
  };
  console.log(aggr);

  return aggr;
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
