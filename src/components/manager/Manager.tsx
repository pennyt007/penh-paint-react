import { useEffect, useState } from "react";
import { CanceledError } from "../../services/api-client";
import { User, getCurrentUser } from "../../services/user-service";
// import {
//   Student,
//   pointOfProgressStudentService,
// } from "../../services/student-service";
// import familyService from "../../services/family-service";
import Error from "../error/Error";
import GridCarousel from "../sidebargrid/SidebarCarousel";
import GridSidebar from "../sidebargrid/Sidebar";
import Grid from "../sidebargrid/Grid";
// import {
//   PointOfProgressState,
//   PointOfProgressStateSummary,
//   pointOfProgressStateService,
// } from "../../services/pointofprogress-service";
import { useNavigate } from "react-router-dom";
import inventoryService, {inventoryInterface} from "../../services/inventory-service";

// functional component
const Manager = () => {
  // state variables
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [gridSelected, setGridSelected] = useState("inventory");
  const [totalGridRefreshes, setTotalGridRefreshes] = useState(0);
  const [manager, setManager] = useState();
  const [inventory, setInventory] = useState<inventoryInterface[]>();
 
  // initialize useNavigate
 const navigate = useNavigate();

  // fetch current user asynchronously when component mounts
  // updates the "user" state variable
  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user) setUser(user);
    };
    getUser();
  }, []);

  // fetch inventory
  // useEffect(() => {
  //   if (user) {
  //     const { request, cancel } = familyService.getId<Student>(
  //       user.user.family_member_id
  //     );
  //     // response data is used to update "students" state variable
  //     // first student is set as selected student
  //     request
  //       .then((res) =>
  //         setStudents({
  //           all: res.data,
  //           ids: res.data.map((student) => student.student_id),
  //           selected: res.data[0],
  //         })
  //       )
  //       .catch((err) => {
  //         // check if error is axios's CanceledError if not
  //         // error message is stored in "error" state variable
  //         if (err instanceof CanceledError) return;
  //         setError(err.message);
  //       });

  //     // clean up function cancels request when component
  //     // is unmounted. prevents memory leaks
  //     return () => cancel();
  //   }
  // }, [user]);

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

  // update the point of progress's state to posted
  //const handleAcceptPointOfProgress = async (
 // ) => {
  //   try {
  //     const user = await getCurrentUser();
  //     if (user) {
  //       const newPointOfProgressState: PointOfProgressState = {
  //         point_of_progress_id:
  //           pointOfProgressStateSummary.point_of_progress_id,
  //         point_of_progress_state_type_id: 50,
  //         user_id: user.user.user_id,
  //       };
  //       await pointOfProgressStateService.create(newPointOfProgressState);
  //     }
  //   } catch (err: any) {
  //     // check if error is axios's CanceledError if not
  //     // error message is stored in "error" state variable
  //     if (err instanceof CanceledError) return;
  //     setError(err.message);
  //   }
  //};

  // called when student is selected in the carousel update
  // the "selected" property of "student" state variable
  // const handleStudentChanged = (student: Student) => {
  //   setStudents((prevState) => ({ ...prevState, selected: student }));
  // };

  // use selected point of progress to navigate to Learning Update
  // const handleViewPointOfProgress = async (
  //   point_of_progress_id: number
  // ) => {
  //   navigate("/learningUpdate", {
  //     state: {
  //       point_of_progress_id: point_of_progress_id,
  //       grid_sidebar_id: 35,
  //       previous_grid_sidebar_id: 10,
  //     },
  //   });
  // };

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
          {/* <GridCarousel
            sidebarId={10}
            items={students.all}
            //items = { (students.all.length === 1? students.all[0]:students.all) }
            itemSelected={students.selected}
            onItemChanged={handleStudentChanged}
            onError={handleError}
          ></GridCarousel> */}

          <GridSidebar
            sidebarId={10}
            sidebarItemBadges={0}
            onItemChanged={handleGridSidebarChanged}
            onError={handleError}
          ></GridSidebar>
        </aside>
      )}
      <div className="grid-no-breadcrumbs">
        {inventory && (
          <Grid
            sidebarId={10}
            gridData={inventory}
            gridSelected={gridSelected}
            dataSelected={1}
            // onViewPointOfProgress={handleViewPointOfProgress}
            // onPostPointOfProgress={() => {}}
            // onAcceptPointOfProgress={handleAcceptPointOfProgress}
            onGridRefresh={handleGridRefresh}
            //onChangeProficiencyLevel={() => {}}
            // onUpdatePointOfProgressStateStudent = {handleUpdatePointOfProgressStateStudent}
          ></Grid>
        )}
      </div>
    </>
  );
};

export default Manager;
