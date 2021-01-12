import { React, useEffect, useRef, useState, useLayoutEffect, usePrevious } from "react";
import * as d3 from "d3";
import "../App.css";
import { maxX, showLoader } from "../utils";

export const BarChart = (props) => {
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const width = +props.width, //hack to get int
    height = +props.height;
  const myRef = useRef();
  const divRef = useRef();
  const [select, setSelected] = useState(null);
  const { data, selected } = props;
  const prevData = usePrevious({ data, selected });

  const handleRectClick = (x) => {
    if (select === x) {
      props.handleRectClick(null);
      setSelected(null);
    } else {
      props.handleRectClick(x);
      setSelected(x);
    }
  };
  useEffect(() => {
    if (prevData?.data !== data || prevData?.selected !== selected) {
      doExit();
      draw();
    }
  }, [data, selected]);


  const responsivefy = (svg) => {
    // Container is the DOM element, svg is appended.
    // Then we measure the container and find its
    // aspect ratio.
    const container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width"), 10),
      height = parseInt(svg.style("height"), 10),
      aspect = width / height;

    // Add viewBox attribute to set the value to initial size
    // add preserveAspectRatio attribute to specify how to scale
    // and call resize so that svg resizes on page load
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);

    function resize() {
      const targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
    }
  };

  function doExit() {
    d3.select(divRef.current).selectAll("svg").remove();
  }

  const draw = () => {
    const data = props?.data || [];
    const maxScale = data?.reduce(maxX(props.property.yprop), 0) || 0;
    // append element
    const svg = d3
      .select(divRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    const margin = { y: 50, x: 50 };

    // axis
    const xScale = d3.scaleBand().padding(0.2);
    const yScale = d3.scaleLinear().domain([0, maxScale]); //max scale should be dynamic
    yScale.range([height, 0]);
    xScale.range([0, width]).domain(data.map((d) => d[props.property.xprop]));

    svg
      .attr("width", width + 2 * margin.x)
      .attr("height", height + 2 * margin.y)
      .call(responsivefy) // Call responsivefy to make the chart responsive
      .attr("id", "svg-bar");

    svg
      .append("text")
      .attr("x", width / 2 + margin.x)
      .attr("y", margin.y / 2)
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr(props.title);

    // svg
    //   .append("text")
    //   .attr("x", width / 2 + margin.x)
    //   .attr("y", margin.y * 2)
    //   .attr("transform", `translate(0,${height - margin.y / 4})`)
    //   .attr("class", "title-bar")
    //   .text(props.xtitle);

    svg
      .append("text")
      .attr("x", -(height / 2) - margin.y)
      .attr("y", margin.x / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("class", "title")
      .text(props.ytitle);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.x},${margin.y})`);

    // chart.append("g").attr("class", "axis").call(d3.axisLeft(yScale));
    chart
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .style('font-size', 20)
      .call(d3.axisBottom(xScale));

    // chart
    //   .append("g")
    //   .attr("class", "grid-hline")
    //   .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(""));

    const path = chart.selectAll().data(data);

    path
      .enter()
      .append("rect").on('click', (e, d) => {
        handleRectClick(d);
      })
      .attr('id', (d) => d?.fascia_anagrafica)
      .attr('opacity', (d) => {
        let opac = props.selected?.fascia_anagrafica === d?.fascia_anagrafica ? 1 : !props.selected ? 1 : 0.3;
        return opac;
      })
      .attr("class", "bar")
      .attr("x", (d) => xScale(d[props.property.xprop]))
      .attr("y", (d) => yScale(d[props.property.yprop]))
      .attr("height", (d) => height - yScale(d[props.property.yprop]))
      .attr("width", xScale.bandwidth())
      .append("title")
      .attr("x", (d) => xScale(d[props.property.xprop]))
      .attr("y", (d) => yScale(d[props.property.yprop]))
      .text((d) => `Fascia ${d[props.property.xprop]} totale: ${d[props.property.yprop]}`)

    path
      .enter()
      .append("text")
      .attr("class", "bartext")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("x", (d) => xScale(d[props.property.xprop]) + 35)
      .attr("y", (d) =>
        height - yScale(d[props.property.yprop]) >= 0
          ? yScale(d[props.property.yprop]) - 10
          : yScale(d[props.property.yprop])
      )
      .text((d) => d[props.property.yprop].toLocaleString('it'));

    path.exit().remove();
  };

  return (
    <div ref={divRef} className="chart svg-container">
      <svg ref={myRef} className="svg-content-responsive"></svg>
    </div>
  );
};
