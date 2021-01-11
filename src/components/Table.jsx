import { React, useEffect } from "react";
import * as $ from "jquery";
import DataTable from "datatables.net";
import "./Table.css";


$.DataTable = DataTable;
const columns = [
  { title: "Regioni", data: "area" },
  { title: "Vaccinazione", data: "dosi_somministrate" },
  { title: "Consegne", data: "dosi_consegnate" },
  { title: "%", data: "percentuale_somministrazione" },
];

export const Table = (props) => {

  useEffect(() => {
    $("#datatable").find("tfoot")
    $("#datatable")
      .find("table")
      .append('<tfoot><th></th><th></th><th></th><th></th></tfoot>')
  }, [])

  useEffect(() => {

    const table = $("#datatable")
      .find("table")
      .DataTable({
        dom:
          "<'row'<'col-12'l>>" +
          "<'row'<'col-12'tr>>",
        paging: false,
        searching: true,
        destroy: true,
        data: ((props.summaryFilter || props.summary?.deliverySummary) || []),
        columns,
        columnDefs: [
          {
            targets: 0,
            width: '150px'
          },
          {
            "targets": [1, 2, 3],
            render: (data, type, row) => {
              return Number(data).toLocaleString('it')
            }
          }
        ],
        footerCallback: (row, data, start, end, display) => {
          var api = $("#datatable")
            .find("table")
            .DataTable();

          // Remove the formatting to get integer data for summation
          var intVal = function (i) {
            return typeof i === 'string' ?
              i.replace(/[$,]/g, '') * 1 :
              typeof i === 'number' ?
                i : 0;
          };

          // Total over all pages
          var totalPercentage = api
            .column(3, { search: 'applied' })
            .data()
            .reduce(function (a, b, _, { length }) {
              return intVal(a) + intVal(b) / length;
            }, 0);

          let totalDelivery = api
            .column(2, { search: 'applied' })
            .data()
            .reduce(function (a, b) {
              return intVal(a) + intVal(b);
            }, 0);

          let totalVaccines = api
            .column(1, { search: 'applied' })
            .data()
            .reduce(function (a, b) {
              return intVal(a) + intVal(b);
            }, 0);

          // Update footer
          $(api.column(3).footer()).html(
            (totalPercentage).toFixed(1) + '%'
          );

          $(api.column(2).footer()).html(
            totalDelivery.toLocaleString('it')
          );

          $(api.column(1).footer()).html(
            totalVaccines.toLocaleString('it')
          );

          $(api.column(0).footer()).html(
            'Totale'
          );
        }
      })
    if (props?.selected?.area) {
      table.search(props.selected.area).draw();
    } else {
      table.search(" ").draw();
    }
  });
  return (
    <div id="datatable">
      <table
        className="table h-100 table-borderless compact table-hover"
        cellSpacing="0"
        width="100%"
        style={{ paddingBottom: 6 }}
      />
    </div>
  );
};
