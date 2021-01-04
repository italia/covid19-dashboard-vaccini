import { React, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
import dt from "datatables.net-bs4";

// const dt = require("datatables.net")(window, $);

// dt(window, $);
$.DataTable = DataTable;
const columns = [
  { title: "Regioni", data: "area" },
  { title: "Somm", data: "dosi_somministrate" },
  { title: "Cons", data: "dosi_consegnate" },
  { title: "%", data: "percentuale_somministrazione" },
];

export const Table = (props) => {
  console.log(props);
  useEffect(() => {
    const table = $("#datatable")
      .find("table")
      .DataTable({
        dom:
          "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>",
        paging: false,
        searching: true,
        destroy: true,
        data: props.summary?.dataConsegneVaxSummary?.data || [],
        columns,
      });
  });
  return (
    <div id="datatable" className="d-flex">
      <table
        className="table table-borderless compact"
        cellSpacing="0"
        width="100%"
      />
    </div>
  );
};
