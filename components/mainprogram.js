import React, { useState } from "react"
import Layout from "./layout"
import * as XLSX from 'xlsx'

const columns = [
  {
    name: "No",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Brand",
    selector: (row) => row.brand,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => `Rp. ${(row.price * 15000).toLocaleString("id-ID")}`,
    sortable: true,
  },
  {
    name: "Stocks",
    selector: (row) => row.stock,
  },
];

const MainProgram = ({data}) => {
    const [tableData, setTableData]       = useState([])
    const [buttonExport, setButtonExport] = useState(true);
    const [showModal, setShowModal]       = useState(false)

    const convertToArray = (data) => {
      setTableData(data)
      setShowModal(!showModal)
    };
    if(!tableData) return null;

    const apiData = (data) => {
        const product = data.products;
        setTableData(product);
        setButtonExport(true);
        setShowModal(!showModal)
    }

    const importExcel = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.onload = (event) => {
            const bstr          = event.target.result
            const workBook      = XLSX.read(bstr, { type: "binary" })
            const workSheetName = workBook.SheetNames[0]
            const workSheet     = workBook.Sheets[workSheetName]
            const fileData      = XLSX.utils.sheet_to_json(workSheet, { header: 2 })
            const headers       = fileData
            const heads         = headers.map(head => ({ title: head, field: head }))
            convertToArray(headers, fileData)
        }
        reader.readAsBinaryString(file)
        setButtonExport(false)
    }

    const exportExcel = (data) => {
        const worksheet     = XLSX.utils.json_to_sheet(data);
        const workbook      = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    }

    return (
        <Layout 
            tableData={tableData} 
            showModal={showModal} 
            setShowModal={setShowModal} 
            columns={columns} 
            apiData={apiData}
            importExcel={importExcel}
            exportExcel={exportExcel}
            data={data}
            buttonExport={buttonExport}
            setButtonExport={setButtonExport}
        />
    );
}

export  default  MainProgram
