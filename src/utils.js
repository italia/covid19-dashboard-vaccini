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
export const filterByArea = filterBy('area');
export const filterByAreaITA = filterByArea('ITA');
export const filterByAge = filterBy("TML_FASCIA_ETA");
export const mapBy = (y) =>
  Object.keys(y).map((x) => {
    return { [x]: { sum: y[x].reduce(sumDose, 0) } };
  });