import { React, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { filterByArea } from "../utils";

export const MapArea = (props) => {
  const [geographies, setGeographies] = useState([]);
  const width = 640,
    height = 640;

  const projection = d3
    .geoAlbers()
    .center([0, 41])
    .rotate([347, 0])
    .parallels([35, 45])
    .scale(4000)
    .translate([width / 2, height / 2]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("data/geo/it.json");
      const data = await res.json();
      setGeographies(topojson.feature(data, data.objects.regions).features);
    };
    fetchData();
  }, []);

  return (
    <svg width={width} height={height} viewBox="0 0 800 450">
      <g className="countries">
        {geographies.map((d, i) => {
          const regions = props.summary?.deliverySummary?.filter(
            filterByArea(d.properties.reg_name)
          );
          let region = {};
          if (regions && regions.length > 0) {
            region = regions[0];
          }
          return (
            <path
              key={`path-${i}`}
              d={d3.geoPath().projection(projection)(d)}
              className="country"
              fill={`rgba(0,102,204,${
                (1 / 50) * region.percentuale_somministrazione
              })`}
              stroke="#FFFFFF"
              strokeWidth={0.7}
            >
              <title>
                <span className="bg-info">
                  {region.area} {region.percentuale_somministrazione}%
                </span>
              </title>
            </path>
          );
        })}
        );
      </g>
    </svg>
  );
};
