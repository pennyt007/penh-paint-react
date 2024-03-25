import { useEffect, useState } from "react";
import { CanceledError } from "../../services/api-client";
//import { User, getCurrentUser } from "../../services/user-service";
import Error from "../error/Error";
import GridSidebar from "../sidebargrid/Sidebar";
import Grid from "../sidebargrid/Grid";
import inventoryService, {inventoryInterface} from "../../services/inventory-service";

// functional component
const Painter = () => {
  // state variables
  const [error, setError] = useState("");
  const [gridSelected, setGridSelected] = useState("inventory");
  const [totalGridRefreshes, setTotalGridRefreshes] = useState(0);
  const [inventory, setInventory] = useState<inventoryInterface[]>();
 
  
  // fetch inventory
  useEffect(() => {
      const { request, cancel } = inventoryService.getAll<inventoryInterface>();
      // response data is used to update inventory state variable
      request
        .then((res) =>{ console.log(res.data), setInventory(res.data)})
        .catch((err) => {
          // check if error is axios's CanceledError if not
          // error message is stored in "error" state variable
          if (err instanceof CanceledError) return;
          setError(err.message);
        });

      // clean up function cancels request when component
      // is unmounted. prevents memory leaks
      return () => cancel();
    }
  , [totalGridRefreshes]);

 
  // called when item changed in the grid sidebar
  const handleGridSidebarChanged = (
    rootItemName: string,
    childItemName: string | null
  ) => {
    // leave console.log so rootItemName is used
    // which is required to get successful compile
    console.log(`Log ${rootItemName} to satisfy typescript.`);
    if (childItemName !== null) {
      setGridSelected(childItemName);
    }
  };

  // used to trigger the useEffect fetching the
  // points of progress for the student when data
  // has changed via a form accessed from the grid
  const handleGridRefresh = () => {
    setTimeout(() => {
    setTotalGridRefreshes((prevValue) => prevValue + 1);
     }, 100);
  };

  // used to update "error" state variable with error message
  const handleError = (error: string) => {
    setError(error);
  };

  return (
    <>
      {/* if there is an error, Error component is rendered */}
      {error && <Error></Error>}
      {/* if no errors and "student" array is not empty, 
      sidebar components are rendered */}
      {!error && inventory && (
        <aside id="sidebar" className="sidebar">
          <GridSidebar
            sidebarId={20}
            sidebarItemBadges={0}
            onItemChanged={handleGridSidebarChanged}
            onError={handleError}
          ></GridSidebar>
        </aside>
      )}
      <div className="grid-no-breadcrumbs">
        {inventory && (
          <Grid
            sidebarId={20}
            gridData={inventory}
            gridSelected={gridSelected}
            dataSelected={1}
            onGridRefresh={handleGridRefresh}
          ></Grid>
        )}
      </div>
    </>
  );
};

export default Painter;
