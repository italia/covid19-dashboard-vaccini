import { React, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { filterByArea } from "../utils";
import "./MapArea.css"

export const MapAreaByCat = (props) => {
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

  const getCategoryQuantity = (region) => {
      if(!props.selectedCodeCategory){
        return region.dosi_somministrate
      }else{
        return region.byCategory[props.selectedCodeCategory].length 
            &&   region.byCategory[props.selectedCodeCategory][0].total
      }
  }

  const fillRegion = (region) => {
      let dosi = props.selectedCodeCategory ? (region.byCategory[props.selectedCodeCategory].length 
      && region.byCategory[props.selectedCodeCategory][0].total) : region.dosi_somministrate

      if(props?.selected === region){
            return 1
      }else if(!props?.selected){
            return (1 / 50) * (dosi/props.maxByCategory*100)
      }else{
            return (0.5 / 50) * (dosi/props.maxByCategory*100/2)
      }
  }

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
            // console.log(region);
            // console.log(props?.selected);
            // console.log(select);
            return (
              <path
                key={`path-${i}`}
                d={d3.geoPath().projection(projection)(d)}
                className="country"

                fill={`rgba(0,102,204, ${fillRegion(region)}) `}
                stroke="#FFFFFF"
                strokeWidth={0.7}
                onClick={() => handleClick(region.index)}
              >
                <title>
                  <span className="bg-info">
                    {region.area} {getCategoryQuantity(region)}
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
