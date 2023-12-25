// import React from 'react';
// import * as XLSX from 'xlsx/xlsx.mjs';

// export default function Import_Appointment_Component() {

//     const onchangeImport = async (e) => {
//         const selectedFile = e.target.files[0];
//         const fileReader = new FileReader();
//         fileReader.onload = (e) => {
//             const data = new Uint8Array(e.target.result);
//             const workbook = XLSX.read(data, { type: 'array' });
//             const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//             const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//             console.log(jsonData);
//         };
//         fileReader.readAsArrayBuffer(selectedFile);
//     }
//     return (
//         <div>
//             <input className="form-control form-control-sm" id="formFileSm" accept=".xlsx" type="file" onChange={(e) => onchangeImport(e)} />
//         </div>
//     )
// }