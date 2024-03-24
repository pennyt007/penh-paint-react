import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  SidebarButtonInterface,
  sidebarButtonService,
} from "../../services/gridsidebar-service-python";
import { CanceledError } from "../../services/api-client";

interface SidebarButtonProps {
  sidebarId: number;
  onButtonClicked: () => void;
  onGridRefresh: () => void;
  onError: (error: string) => void;
}

// react functional component renders a button in sidebar
const SidebarButton: React.FC<SidebarButtonProps> = (props) => {
  // destructuring
  const { sidebarId, onButtonClicked, onGridRefresh, onError } = props;

  // state variables
  const [error, setError] = useState("");
  const [buttons, setButtons] = useState<SidebarButtonInterface[]>([]);

  // effects
  useEffect(() => {
    const { request, cancel } =
      // fetch buttons for the sidebar
      sidebarButtonService.getNested<SidebarButtonInterface[]>(sidebarId);

    // set "buttons" state variable
    request
      .then((res) => setButtons(res.data))
      // check if error is axios's CanceledError if not
      // error message is stored in "error" state variable
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(`Sidebar button is not working: ${err.message}`);
      });

    // clean up function cancels request when
    // componenet is unmounted to prevent memory leaks
    return () => cancel();
  }, [sidebarId]);

  // render
  return (
    <React.Fragment>
      {error &&
        toast.error(error, {
          onClick: () => onError(error),
          onClose: () => onError(error),
          className: "custom-toast",
          autoClose: false,
        })}

      {buttons.length > 0 && (
        <div className="mb-5">
          {buttons.map((button, index) => (
            <div key={"divButton" + index}>
              <button
                onClick={() => {
                  onButtonClicked();
                  onGridRefresh();
                }}
                key={"gridButton" + index}
                className="btn btn-primary text-center w-100"
                type="button"
                hidden={button.properties[0].hidden}
              >
                {button.properties[0].buttonTitle}
              </button>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default SidebarButton;
