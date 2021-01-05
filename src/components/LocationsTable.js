import { React, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
// eslint-disable-next-line
import "datatables.net-bs4";

$.DataTable = DataTable;
const columns = [
  { title: "Regione", data: "area" },
  { title: "Provincia", data: "provincia" },
  { title: "Comune", data: "comune" },
  { title: "Presidio ospedaliero", data: "presidio_ospedaliero" },
];

export const LocationsTable = (props) => {
  useEffect(() => {
    $("#datatable-locations")
      .find("table")
      .DataTable({
        dom:
          "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        paging: true,
        searching: true,
        destroy: true,
        pagingType: "full_numbers",
        data: props.summary?.dataVaxLocations?.data || [],
        columns,
      });
  });
  return (
    <div id="datatable-locations" style={{ width: '80%' }}>
      <table
        className="table table-borderless compact"
        cellSpacing="0"
        width="100%"
      />
    </div>
  );
};
