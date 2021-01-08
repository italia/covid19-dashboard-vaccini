import { React, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { filterByArea } from "../utils";

import "./MapArea.css"

export const MapArea = (props) => {
  const [geographies, setGeographies] = useState([]);
  const [select, setSelected] = useState([]);

  const handleClick = (x) => {
    if (select === x) {
      props.handleCountryClick(null);
      setSelected(null);
    } else {
      props.handleCountryClick(x);
      setSelected(x);
    }
  };

  const width = 498,
    height = 478;

  const projection = d3
    .geoAlbers()
    .center([0, 41])
    .rotate([347, 0])
    .parallels([35, 45])
    .scale(2200)
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
    <div className="map-area mt-2">
      <svg className="h-100 w-100" height={height} >
        <g className="countries">
          {geographies.map((d, i) => {
            const regions = props.summary?.deliverySummary?.filter(filterByArea(d.properties.reg_name));
            let region = {};
            if (regions && regions.length > 0) {
              region = regions[0];
            }
            return (
              <path
                key={`path-${i}`}
                d={d3.geoPath().projection(projection)(d)}
                className="country"
                fill={`rgba(1,37,76,${(1 / 80) * region.percentuale_somministrazione
                  })`}
                stroke="#FFFFFF"
                strokeWidth={0.7}
                onClick={() => handleClick(region.index)}
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
    </div>
  );
};
