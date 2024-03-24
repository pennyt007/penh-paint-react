import React from "react";
import { GridFilterInterface } from "../../services/gridsidebar-service-python";

interface GridFilterProps {
  filters: GridFilterInterface[] | undefined;
  onFilterChanged: (checked: any, checkedValue: any, filterIndex: any) => void;
}

const GridFilter: React.FC<GridFilterProps> = (props) => {

  // destructuring
  const { filters, onFilterChanged } = props;

  // render
  return (
    <div className="accordion" >
      {filters?.map((filter, index) => (
        <div key={"div-" + filter.grid_filter_field.grid_filter_field_id}>
          <div
            key={"accordion-item-" + filter.grid_filter_field.grid_filter_field_id}
            className="accordion-item"
          >
            <div
              className="accordion-header"
              key={"accordion-header-" + filter.grid_filter_field.grid_filter_field_id}
              id={"heading_" + filter.grid_filter_field.grid_filter_field_id}
            >
              <button
                className="accordion-button accordion-title"
                key={"button-" + filter.grid_filter_field.grid_filter_field_id}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse_" + filter.grid_filter_field.grid_filter_field_id}
                aria-expanded="true"
                aria-controls={"collapse_" + filter.grid_filter_field.grid_filter_field_id}
              >
                {filter.grid_filter_field.name}{" "}
                {filter.number_checked === 0 ? (
                  ""
                ) : (
                  <span className="badge bg-primary m-1">
                    {filter.number_checked}
                  </span>
                )}
              </button>
            </div>
            <div
              key={"accordion-collaspe-" + filter.grid_filter_field.grid_filter_field_id}
              id={"collapse_" + filter.grid_filter_field.grid_filter_field_id}
              className="accordion-collapse collapse show"
              aria-labelledby={"heading_" + filter.grid_filter_field.grid_filter_field_id}
            >
              <div
                className="accordion-body"
                key={"accordion-body-" + filter.grid_filter_field.grid_filter_field_id}
              >
                {filter.grid_filter_field.values.map((value: string) => (
                <div
                    className="form-check"
                    key={value}
                    onClick={(e) => (e)}
                    // onClick={(e) => onfilterChanged(e.target.checked, e.target.value, index)}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      key={"input" + value + filter.grid_filter_field.grid_filter_field_id}
                      id={
                        "inlineRadio" + value + filter.grid_filter_field.grid_filter_field_id
                      }
                      checked={
                        filter.current_filter.includes(value) 
                      }
                      onChange={(e) => onFilterChanged(e.target.checked, value, index)}
                      value={value}
                    />

                   <label
                      className={
                        filter.current_filter.includes(value)
                          ? "form-check-label active"
                          : "form-check-label"
                      }
                      key={"label" + value}
                      htmlFor={
                        "inlineRadio" + value + filter.grid_filter_field.grid_filter_field_id
                      }
                    >
                     {value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridFilter;
