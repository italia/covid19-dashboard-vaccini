import { React, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
// eslint-disable-next-line
import "datatables.net-bs4";

$.DataTable = DataTable;
const columns = [
  { title: "Regioni", data: "area" },
  { title: "Somministrazioni", data: "dosi_somministrate" },
  { title: "Consegne", data: "dosi_consegnate" },
  { title: "%", data: "percentuale_somministrazione" },
];

export const Table = (props) => {
  useEffect(() => {
    const table = $("#datatable")
      .find("table")
      .DataTable({
        dom:
          "<'row'<'col-sm-12 col-md-12'lf>>" +
          "<'row'<'col-sm-12'tr>>",
        paging: false,
        searching: true,
        destroy: true,
        data: props.summary?.deliverySummary || [],
        language: {
          url: 'datatables.it.json',
        },
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
        className="table table-borderless compact table-striped table-hover"
        cellSpacing="0"
        width="100%"
      />
    </div>
  );
};
