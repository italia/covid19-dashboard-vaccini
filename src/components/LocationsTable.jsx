import { React, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";

$.DataTable = DataTable;
const columns = [
  { title: "Regione", data: "area" },
  { title: "Provincia", data: "provincia" },
  { title: "Comune", data: "comune" },
  { title: "Punto di somministrazione", data: "presidio_ospedaliero" },
];

export const LocationsTable = (props) => {
  useEffect(() => {
    const table = $("#datatable-locations")
      .find("table")
      .DataTable({
        dom:
          "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        paging: true,
        searching: true,
        destroy: true,
        LengthChange: false,
        pagingType: "full_numbers",
        pageLength: '20',
        data: props.summary?.locations || [],
        columns,
      });
    if (props?.selected?.area) {
      table.search(props.selected.area).draw();
    } else {
      table.search(" ").draw();
    }
  });
  return (
    <div id="datatable-locations">
      <table
        className="table table-borderless compact table-striped table-hover"
        cellSpacing="0"
        width="100%"
      />
    </div>
  );
};
