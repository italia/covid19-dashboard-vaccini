export const sumDose = (acc, x) => acc + +x?.TML_DOSE_1 + +x?.TML_DOSE_2;
export const sumDoseXY = (y, z) => (acc, x) => acc + +x?.[y] + +x?.[z];
export const sumDoseX = (y) => (acc, x) => acc + +x?.[y];
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
export const replaceArea = (x) => ({ ...x, area: areaMapping[x.area]});
export const areaMapping = {
  ABR: "Abruzzo",
  BAS: "Basilicata",
  CAL: "Calabria",
  CAM: "Campania",
  EMR: "Emilia Romagna",
  FVG: "Friuli Venezia Giulia",
  LAZ: "Lazio",
  LIG: "Liguria",
  LOM: "Lombardia",
  MAR: "Marche",
  MOL: "Molise",
  PAB: "Prov. Aut. Bolzano",
  PAT: "Prov. Aut. Trento",
  PIE: "Piemonte",
  PUG: "Puglia",
  SAR: "Sardegna",
  SIC: "Sicilia",
  TOS: "Toscana",
  UMB: "Umbria",
  VDA: "Val D'Aosta",
  VEN: "Veneto",
};
