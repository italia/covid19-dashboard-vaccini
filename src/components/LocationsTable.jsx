import { React, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";

$.DataTable = DataTable;
$.DataTable.ext.classes.sPageButton = 'btn';
$.DataTable.ext.classes.sPageButtonActive = 'btn-primary text-white';
$.DataTable.ext.classes.sPageButtonDisabled = 'btn-outline-primary disabled';
$.DataTable.ext.classes.sPaging = '';

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
          "<'row pagination-wrapper'<'col-sm-12 pagination'p><'col-sm-12'i>>",
        paging: true,
        searching: true,
        destroy: true,
        pagingType: "simple_numbers",
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
        className="table table-borderless compact table-striped table-hover table-responsive-sm"
        cellSpacing="0"
        width="100%"
      />
    </div>
  );
};
