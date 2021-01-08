import * as _ from 'lodash';
export const sumDose = (acc, x) => acc + +x?.TML_DOSE_1 + +x?.TML_DOSE_2;
export const sumDoseXY = (y, z) => (acc, x) => acc + +x?.[y] + +x?.[z];
export const sumYear = (accumulator, currentValue) => accumulator + currentValue;
export const sumDoseX = (y) => (acc, x) => acc + +x?.[y];
export const maxX = (y) => (acc, x) => (x?.[y] > acc ? x?.[y] : acc);
export const age = ["16-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90+"];
export const groupByAge = (array) => {
  let _age;
  if (Array.isArray(array) && array.length > 0) {
    _age = age.map(el => {
      let resMale = _.sum(array.filter(_el => _el.fascia_anagrafica === el).map(__el => __el.sesso_maschile));
      let resFemale = _.sum(array.filter(_el => _el.fascia_anagrafica === el).map(__el => __el.sesso_femminile));
      return { fascia_anagrafica: el, sesso_femminile: resFemale, sesso_maschile: resMale, totale: resMale + resFemale };
    });
  }
  return _age;
}
export const mapArrayByProp = (array, prop) => array.map((e) => e[prop]);
export const reduceSum = (array) => array.reduce(sumYear);

export const allTotalGender = (array) => {
  let sessoMaschile = reduceSum(mapArrayByProp(array, 'sesso_maschile'));
  let sessoFemminile = reduceSum(mapArrayByProp(array, 'sesso_femminile'));
  return { gen_m: sessoMaschile, gen_f: sessoFemminile }
}
export const aggrBy = (p) => (acc, x) => {
  let key = x[p];
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(x);
  return acc;
};
export const filterBy = (y) => (z) => (x) => {
  return x[y] === z;
};
export const filterByArea = filterBy("area");
export const filterByAreaITA = filterByArea("ITA");
export const filterByAge = filterBy("TML_FASCIA_ETA");
export const mapBy = (y) =>
  Object.keys(y).map((x) => {
    return { [x]: { sum: y[x].reduce(sumDose, 0) } };
  });
export const mapByX = (y, z) =>
  Object.keys(y).map((x) => {
    return { [x]: y[x].reduce(sumDoseX(z), 0) };
  });
const inverse = (obj) => {
  let retobj = {};
  for (const key in obj) {
    retobj[obj[key]] = key;
  }
  return retobj;
};
export const replaceArea = (x) => ({ ...x, area: areaMapping[x.area] });
export const areaMapping = {
  ABR: "Abruzzo",
  BAS: "Basilicata",
  CAL: "Calabria",
  CAM: "Campania",
  EMR: "Emilia-Romagna",
  FVG: "Friuli Venezia Giulia",
  LAZ: "Lazio",
  LIG: "Liguria",
  LOM: "Lombardia",
  MAR: "Marche",
  MOL: "Molise",
  PAB: "P.A. Bolzano",
  PAT: "P.A. Trento",
  PIE: "Piemonte",
  PUG: "Puglia",
  SAR: "Sardegna",
  SIC: "Sicilia",
  TOS: "Toscana",
  UMB: "Umbria",
  VDA: "Valle d'Aosta",
  VEN: "Veneto",
};
export const areaMappingReverse = inverse(areaMapping);

//
//   const tot2 = data.reduce(sumDoseXY("TML_DOSE_1", "TML_DOSE_2"), 0);
//   const areasRAW = data.reduce(aggrBy("TML_AREA"), {});
//   const tot_m = data.reduce(sumDoseX("TML_SESSO_M"), 0);
//   const tot_f = data.reduce(sumDoseX("TML_SESSO_F"), 0);
//   const areas = mapBy(areasRAW);
//   const fascia1619 = data.filter(filterByAge("16-19"));
//   const fascia2029 = data.filter(filterByAge("20-29"));
//   const totfascia1619 = fascia1619.reduce(sumDose, 0);
//   const totfascia2029 = fascia2029.reduce(sumDose, 0);
