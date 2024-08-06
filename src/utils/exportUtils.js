import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

export const exportToCSV = (tableElement, columns) => {
  const rows = Array.from(tableElement.querySelectorAll('tbody tr')).map(row =>
    Array.from(row.querySelectorAll('td')).map(cell => cell.innerText)
  );
  
  const csv = Papa.unparse({
    fields: columns.map(col => col.label),
    data: rows
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  a.click();
};

export const exportToExcel = (tableElement, columns) => {
  const ws = utils.table_to_sheet(tableElement);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  writeFile(wb, 'data.xlsx');
};

export const exportToPDF = (tableElement, columns) => {
  const doc = new jsPDF();
  doc.autoTable({ html: tableElement });
  doc.save('data.pdf');
};

export const printTable = (tableElement) => {
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Print Table</title>');
  printWindow.document.write('</head><body >');
  printWindow.document.write(tableElement.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};
