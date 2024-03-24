import { useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFlexLayout,
  useBlockLayout,
// TableInstance,
} from "react-table";

interface GridProps<T extends object> {
  data: T;
  columns: T;
  //onGridRefresh: () => void;
}

const GridTableContainer: React.FC<GridProps<any>> = (props) => {

  // destructing
  const { data, columns } = props;

  // state variables
  const [tableData, setTableData] = useState(data); 
  const [tableColumns, setTableColumns] = useState(columns);

  // effects
  useEffect(() => {
    // reset state
    setTableData([]);
    setTableColumns([]);
  
    // delay setting new data and columns 
    // to ensure previous state is cleared
    setTimeout(() => {
      setTableData(data);
      setTableColumns(columns);
    }, 100);
  }, [data, columns]);

  // component variables
  const reactTable = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 10 }, // Set the initial page index and page size
    },
    useSortBy,
    usePagination,
    useBlockLayout,
    useFlexLayout
  );

  // extract required props and functions from react-table,
  // something with react-table and typescript mades
  // getSortByToggleProps look like it is not used but is (line 133)
  const {
    getTableProps,
    getTableBodyProps,
    getSortByToggleProps, // eslint-disable-line
    headerGroups,
    // rows, currently not used
    prepareRow,
    page, // The current page of data
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = reactTable;

  // Explicitly reference getSortByToggleProps somewhere in your code
  const dummyVariable = getSortByToggleProps;
  `${dummyVariable}`

  // functions
  const isEven = (index: number) => {
    // determine if row is an even row number
    // even row numbers get a different background colour
    return index % 2 === 0 ? true : false;
  };

  const getCurrentPageRowsRange = () => {
    // get the range of rows shown on the current page
    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min(startRow + page.length - 1, data.length);
    return `${startRow} to ${endRow}`;
  };

  // render
  return (
    <>
      {tableData.length !==0 && 
        <>
          {/* pagination UI */}
          <div className="grid-pagination">
            {/* buttons for navigating previous and next pages*/}
            <button
              className="btn btn-sm btn-warning p-1 me-1"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <button
              className="btn btn-sm btn-warning p-1"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
            {/* display current page and total pages */}
            <span
              className="m-2"
              tabIndex={-1}
              onDoubleClick={(e) => e.preventDefault()}
            >
              Page{" "}
              <strong tabIndex={-1}>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
          </div>

          {/* create a scrollable container for table */}
          <div style={{ overflowX: "auto", maxHeight: "800px" }}>
            {/* render table */}
            <table {...getTableProps()}>
              {/* table header */}
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "white",
                }}
              >
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps([
                          column.getSortByToggleProps(),
                          {
                            style: {
                              width: column.width, // Use the width from useFlexLayout
                            },
                          },
                        ])}
                      >
                        {column.render("Header")}

                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="bi bi-caret-down-fill"></i>
                          ) : (
                            <i className="bi bi-caret-up-fill"></i>
                          )
                        ) : (
                          ""
                        )}
                        <span>&nbsp;</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {/* table body */}
              <tbody {...getTableBodyProps()} style={{ overflowY: "auto" }}>
                {page.map((row, index) => {
                  prepareRow(row);
                  const rowNumber = pageIndex * pageSize + index + 1; // Calculate the row number based on the current page and row index
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={isEven(index) ? "row-even-bg-colour" : ""}
                    >
                      {/* display the row number */}
                      <td
                        {...row.cells[0].getCellProps()}
                        style={{
                          width: "5%",
                        }}
                      >
                        {rowNumber}
                      </td>
                      {/* render the remaining cells */}
                      {row.cells.slice(1).map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            width: cell.column.width,
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
              {/* table footer */}
              <tfoot
                style={{
                  position: "sticky",
                  bottom: 0,
                  zIndex: 1,
                  background: "white",
                }}
              >
                <tr>
                  {/* Show the range of rows displayed on the current page */}
                  <td colSpan={5}>{`Showing ${getCurrentPageRowsRange()} of ${
                    data.length
                  } rows`}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      }
    </>
  );
};

export default GridTableContainer;
