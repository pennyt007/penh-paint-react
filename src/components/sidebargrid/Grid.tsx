import React, { useEffect, useState } from "react";
import GridTable from "./GridTable";
import GridFilter from "./GridFilter";
import Error from "../error/Error";
import {
  SidebarItemGridInterface,
  sidebarItemGridService,
} from "../../services/gridsidebar-service-python";
import { CanceledError } from "../../services/api-client";

interface GridProps<T> {
  sidebarId: number;
  gridData: T[];
  gridSelected: T | null;
  dataSelected: T;
  // onViewPointOfProgress: (pointOfProgressState: any) => void;
  // onAcceptPointOfProgress: (pointOfProgressState: any) => void;
  // onPostPointOfProgress: (pointOfProgressState: any) => void;
  // onChangeProficiencyLevel: (original: any, id: number) => void;
  onGridRefresh: () => void;
  // onItemChanged: (student: T) => void;
  // onError: (error: string) => void;
}

// react functional component renders grid with filters for menu item
const Grid: React.FC<GridProps<any>> = (props) => {
  // destructuring
  const {
    sidebarId,
    gridData,
    gridSelected,
    dataSelected,
    // onViewPointOfProgress,
    // onPostPointOfProgress,
    // onAcceptPointOfProgress,
    // onChangeProficiencyLevel,
    onGridRefresh,
  } = props;

  // state variables
  const [error, setError] = useState("");
  const [grids, setGrids] = useState<SidebarItemGridInterface[]>([]);
  const [activeGrid, setActiveGrid] = useState<SidebarItemGridInterface>();
  const [activeData, setActiveData] = useState<any[]>([]);

  // effects
  useEffect(() => {
    const { request, cancel } =
      // fetch grids with filters for sidebar menu items
      sidebarItemGridService.getNested<SidebarItemGridInterface[]>(sidebarId);

    // set "grids" and "active grid" state variables
    request
      .then((res) => {
        setGrids(res.data);
        setActiveGrid(
          res.data.find((grid) => grid.grid?.data === gridSelected)
        );
      })
      // check if error is axios's CanceledError if not
      // error message is stored in "error" state variable
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(`Grid is not working: ${err.message}`);
      });

    // clean up function cancels request when
    // componenet is unmounted to prevent memory leaks
    return () => cancel();
  }, [sidebarId]);

  useEffect(() => {
    // set active grid when menu item changes
    setActiveGrid(grids.find((grid) => grid.grid?.data === gridSelected));
  }, [gridSelected]);

  useEffect(() => {
    // apply filters to active data
    let filteredActiveData = [...gridData]
    //console.log('test', test)
    filteredActiveData = filteredActiveData.find(
      (gridDatum) =>
        gridDatum.id === dataSelected && gridDatum.grid === gridSelected
    ).data;

    console.log("after", filteredActiveData);
    // apply filters to grid data
    if (activeGrid) {
      activeGrid.grid_filters?.map((filter) => {
        if (filter.current_filter.length !== 0) {
          filteredActiveData = filteredActiveData.filter(
            (datum: { [x: string]: string }) => {
              return filter.current_filter.includes(
                datum[filter.grid_filter_field.data_field]
              );
            }
          );
        }
      });
    }

    // set "active data" state variable
    setActiveData(filteredActiveData);
  }, [activeGrid, dataSelected, gridData, gridSelected]);

  // functions
  const handleFilterChanged = (
    checked: any,
    checkedValue: string,
    gridFilterIndex: any
  ) => {
    // handles filter field value change
    const updatedFilters = activeGrid?.grid_filters?.map((filter, index) => {
      if (index === gridFilterIndex) {
        // create a copy of current_filter array
        // add value when checked else remove value
        const updatedCurrentFilter = checked
          ? [...filter.current_filter, checkedValue]
          : filter.current_filter.filter((item) => item !== checkedValue);

        // return a new object with updated
        // current_filter and number_checked
        return {
          ...filter,
          current_filter: updatedCurrentFilter,
          number_checked: updatedCurrentFilter.length,
        };
      } else {
        return filter;
      }
    });

    // set "active grid" state variable
    setActiveGrid({
      sidebar: activeGrid?.sidebar,
      grid: activeGrid?.grid,
      grid_filters: updatedFilters,
    });

    // set "grid" state variable
    setGrids((prevValue) => [
      ...prevValue.filter((x) => x.grid?.data !== gridSelected),
      {
        sidebar: activeGrid?.sidebar,
        grid: activeGrid?.grid,
        grid_filters: updatedFilters,
      },
    ]);
  };

  // render
  return (
    <>
      {/* if there is an error, Error component is rendered */}
      {error && <Error></Error>}
      {/* if no errors grid and filters are rendered */}
      <div className="row">
        <div className="col">
          {activeData !== undefined && activeGrid !== undefined && (
            <GridTable
              data={activeData}
              columns={activeGrid}
              gridSelected={gridSelected}
              // onViewPointOfProgress={onViewPointOfProgress}
              // onPostPointOfProgress={onPostPointOfProgress}
              // onAcceptPointOfProgress={onAcceptPointOfProgress}
              // onChangeProficiencyLevel={onChangeProficiencyLevel}
              onGridRefresh={onGridRefresh}
            ></GridTable>
          )}
        </div>

        <div className="col-2">
          {activeGrid !== undefined && (
            <GridFilter
              filters={activeGrid.grid_filters}
              onFilterChanged={handleFilterChanged}
            ></GridFilter>
          )}
        </div>
      </div>
    </>
  );
};

export default Grid;
