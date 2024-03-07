import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportExcelButton = ({ data, filename }) => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu');
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  return (
    <button className='btn btn-info mt-3 mb-3' onClick={exportToExcel}>Xuất Excel</button>
  );
};

export default ExportExcelButton;