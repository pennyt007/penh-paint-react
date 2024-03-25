import GridTableContainer from "./GridTableContainer";

interface GridTableProps<T extends object> {
  data: T;
  columns: T;
  gridSelected: string;
  onGridRefresh: () => void;
}

const GridTable: React.FC<GridTableProps<any>> = (props) => {
  // destructuring
  const { data, columns, gridSelected, onGridRefresh } = props;

  // functions
  const preparedColumns = columns.grid.columns.map(
    (column: { hasOwnProperty: (arg0: string) => any; Cell: any }) => {
      let cellFunction = null;

      if (column.hasOwnProperty("Cell") && typeof column.Cell === "string") {
        if (column.Cell === "editOrder") {
          cellFunction = (row: any) => editOrder(row);
        } else if (column.Cell === "editJob") {
          cellFunction = (row: any) => editJob(row);
        }

        // cell property exists and is a string
        // convert it back to a function with eval
        return {
          ...column,
          Cell: cellFunction,
          // Cell: eval(`${column.Cell}`),
        };
      }
      // cell property doesn't exist or is already
      // a function, return the column as is
      return column;
    }
  );

  //let data = useMemo(() => values, [values]);
  //let columns = useMemo(() => preparedColumns, [header.columns]);

  const editOrder = (row: any) => { 
    // open form to edit an order
    console.log(row)
    onGridRefresh
    return (
      <>
        <button className="btn btn-sm btn-warning">
          <i className="bi bi-pencil-square fs-6"></i>
        </button>

        {/* <FormOrder
          row={row.cell.row.original}
          icon={"bi bi-pencil-square fs-6"}
          onGridRefresh={onGridRefresh}
        ></FormOrder> */}
      </>
    );
  };

  const editJob = (row: any) => {
    // open form to edit a job
    console.log(row)
    return (
      <>
        <button className="btn btn-sm btn-warning">
          <i className="bi bi-pencil-square fs-6"></i>
        </button>
        {/* <FormJob
          row={row.cell.row.original}
          icon={"bi bi-pencil-square fs-6"}
          modalTitle={`Job`}
          onGridRefresh={onGridRefresh}
        ></FormJob> */}
      </>
    );
  };

  // render
  return (
    <>
      <GridTableContainer
        key={gridSelected}
        data={data}
        columns={preparedColumns}
      />
    </>
  );
};

export default GridTable;
