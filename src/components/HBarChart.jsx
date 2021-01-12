import { React, useEffect, useRef } from "react";
import * as d3 from "d3";
import "../App.css";
import { maxX } from "../utils";

export const HBarChart = (props) => {
  const width = +props.width, //hack to get int
    height = +props.height;
  const myRef = useRef();
  const divRef = useRef();

  useEffect(() => {
    doExit();
    draw();
  });

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
    const margin = { y: 80, x: 200 };

    // Add X axis
    const xScale = d3.scaleLinear().domain([0, maxScale]).range([0, width]);
    // Y axis
    const yScale = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((d) => d[props.property.xprop]))
      .padding(0.1);

    svg
      .attr("width", width + 2 * margin.x)
      .attr("height", height + 2 * margin.y)
      .call(responsivefy) // Call responsivefy to make the chart responsive
      .attr("id", "svg-horizontal-bar");

    svg
      .append("text")
      .attr("x", width / 2 + margin.x)
      .attr("y", margin.y / 2)
      .attr("class", "hb-title")
      .attr("text-anchor", "middle")
      .attr(props.title);

    svg
      .append("text")
      .attr("x", width / 2 + margin.x)
      .attr("y", margin.y * 2)
      .attr("transform", `translate(0,${height - margin.y / 4})`)
      .attr("class", "hb-title")
      .text(props.xtitle);

    svg
      .append("text")
      .attr("x", -(height / 2) - margin.y)
      .attr("y", margin.x / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("class", "hb-title")
      .text(props.ytitle);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.x},${margin.y})`);

    chart.append("g").attr("class", "hb-axis").call(d3.axisLeft(yScale));
    chart
      .append("g")
      .attr("class", "hb-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d => d.toLocaleString('it')))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    chart
      .append("g")
      .attr("class", "hb-grid-hline")
      .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(""));

    const path = chart.selectAll().data(data);

    path
      .enter()
      .append("rect")
      .attr("class", "hb-bar")
      .attr("x", xScale(0))
      .attr("y", (d) => yScale(d[props.property.xprop]))
      .attr("width", (d) => xScale(d[props.property.yprop]))
      .attr("height", yScale.bandwidth())
      .append("hb-title")
      .attr("x", (d) => xScale(d[props.property.xprop]))
      .attr("y", (d) => yScale(d[props.property.yprop]))
      .text(
        (d) =>
          `Fascia ${d[props.property.xprop]} totale: ${d[props.property.yprop]}`
      );

    path
      .enter()
      .append("text")
      .attr("class", "hb-bartext")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("x", (d) => xScale(d[props.property.yprop]) + 35)
      .attr("y", (d) =>
        height - yScale(d[props.property.xprop]) >= 60
          ? yScale(d[props.property.xprop]) + 60
          : yScale(d[props.property.xprop])
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
