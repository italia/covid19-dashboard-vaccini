import { React, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
// eslint-disable-next-line
import "datatables.net-bs4";

$.DataTable = DataTable;
const columns = [
  { title: "Regioni", data: "area" },
  { title: "Somm", data: "dosi_somministrate" },
  { title: "Cons", data: "dosi_consegnate" },
  { title: "%", data: "percentuale_somministrazione" },
];

export const Table = (props) => {
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
        data: props.summary?.deliverySummary || [],
        columns,
      });
    if (props?.selected?.area) {
      table.search(props.selected.area).draw();
    } else {
      table.search(" ").draw();
    }
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
