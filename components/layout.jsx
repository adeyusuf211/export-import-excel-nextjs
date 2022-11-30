import DataTable from "react-data-table-component";

const Layout = ({ tableData, showModal, setShowModal, columns, importExcel, exportExcel, apiData, data, buttonExport, setButtonExport }) => {

  return (
    <div className="bg-gray-300 min-h-screen h-full">
      <div className="py-20 px-[200px]">
        <div className="mb-5 bg-white p-5 flex justify-between items-center">
            <h3 className="font-medium text-gray-700 text-md">
                Program Export & Import Data Excel Dengan Menggunakan Next JS
            </h3>
            <a href="https://adeyusuf.site" target="_blank" className="text-blue-500">Created By &copy; Ade Yusuf</a>
        </div>
        <div className="block bg-white p-10">
          <div className="flex justify-between items-center w-full mb-5">
            <h3 className="font-medium text-2xl text-gray-70">Product List</h3>
            <div className="relative flex gap-3 items-center">
              {tableData.length > 0 && buttonExport ? (
                <button
                  className="px-10 py-3 bg-purple-500 text-white outline-none font-semibold shadow-lg shadow-purple-300 hover:shadow-none transition duration-300 ease-linear"
                  onClick={() => exportExcel(tableData)}
                >
                  Eksport CSV
                </button>
              ) : (
                <></>
              )}
              <button
                className="px-10 py-3 border relative border-blue-500 text-blue-500"
                onClick={() => setShowModal(true)}
              >
                Select Data
                {showModal ? (
                  <div className="flex flex-col gap-2 items-start absolute right-0 top-full w-[200px] p-3 bg-white z-10 rounded-md shadow-lg border border-gray-300 transition-all duration-500 ease-in mt-3">
                    <a
                      className="ml-3 mt-1 cursor-pointer text-gray-800 transtion-all duration-300 ease-in hover:text-blue-400"
                      onClick={() => {
                        apiData(data);
                      }}
                    >
                      From Api
                    </a>
                    <div className="block">
                      <label
                        className="ml-3 mt-1 cursor-pointer text-gray-800 transtion-all duration-300 ease-in hover:text-blue-400"
                        htmlFor="file"
                        onClick={() => {
                          setButtonExport(!buttonExport);
                        }}
                      >
                        From Excel
                      </label>
                      <input
                        className="hidden"
                        id="file"
                        onChange={importExcel}
                        type="file"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>
          <DataTable
            data={tableData}
            columns={columns}
            highlightOnHover={true}
            pointerOnHover={true}
            striped={true}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
