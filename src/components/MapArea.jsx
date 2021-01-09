import { React, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { filterByArea } from "../utils";

import "./MapArea.css"

export const MapArea = (props) => {
  const [geographies, setGeographies] = useState([]);
  const [select, setSelected] = useState(null);

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
        <g className="countries" >
          {geographies.map((d, i) => {
            let _summary = (props.summaryFilter || props.summary.deliverySummary);
            const regions = _summary?.filter(filterByArea(d.properties.reg_name));
            let region = {};
            if (regions && regions.length > 0) {
              region = regions[0];
            }
            let scaleOp = props && props.summaryFilter ? (1 / 80) * region.percentuale_somministrazione : props?.selected === region ? 1 : !props?.selected ? (1 / 80) * region.percentuale_somministrazione : (0.5 / 50) * region.percentuale_somministrazione;
            return (
              <path

                key={`path-${i}`}
                d={d3.geoPath().projection(projection)(d)}
                className="country"
                id={`${region?.area?.trim()}`}
                fill={`rgba(0,102,204,${scaleOp}) `}
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
