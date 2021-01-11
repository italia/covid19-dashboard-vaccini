import { React, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { filterByArea } from "../utils";

import "./MapArea.css"

export const MapAreaByDeliveryLocation = (props) => {
  const [geographies, setGeographies] = useState([]); 

  const handleClick = (x) => {
    if (props.locationRegionSelect === x) {
      props.handleCountryClick(null);
      props.setLocationRegionSelect(null);
    } else {
      props.handleCountryClick(x);
      props.setLocationRegionSelect(x);
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

  const fillRegion = (loc, totalLoc) => {

    if(loc.area === props.locationRegionSelect){
        return 1
    }else if(!props.locationRegionSelect){
          return loc.locations/totalLoc+0.1
    }else{
          return loc.locations/totalLoc/2+0.1
    }
}
  
  return (
    <div className="map-area mt-sx-3">
      <svg className="h-100 w-100" height={height} >
        <g className="countries" >
          {geographies.map((d, i) => {
            let _summary = (props.summaryFilter || props.summary.locationsByRegion);

            const regions = _summary?.filter(filterByArea(d.properties.reg_name));
            let region = {};
            if (regions && regions.length > 0) {
              region = regions[0];
            }

            return (
              <path
                key={`path-${i}`}
                d={d3.geoPath().projection(projection)(d)}
                className="country"
                id={`${region?.area?.trim()}`}
                fill={`rgba(23,50,77,${fillRegion(region, props?.summary?.maxNumberOfLocations)}) `}
                stroke="#FFFFFF"
                strokeWidth={0.7}
                onClick={() => handleClick(region.area)}
              >
                <title>
                  <span className="bg-info">
                    {region.area} {region.locations}
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
