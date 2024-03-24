import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CanceledError } from "axios";
import SidebarItem from "./SidebarItem";
import {
  SidebarItemInterface,
  sidebarService,
} from "../../services/gridsidebar-service-python";

interface SidebarProps {
  sidebarId: number;
  sidebarItemBadges: number;
  onItemChanged: (rootItemName: string, childItemName: string | null) => void;
  onError: (error: string) => void;
}

// react functional component renders a sidebar menu with items
const Sidebar: React.FC<SidebarProps> = (props) => {
  // destructuring
  const { sidebarId, sidebarItemBadges, onItemChanged, onError } = props;

  // state variables
  const [error, setError] = useState("");
  const [items, setItems] = useState<SidebarItemInterface[]>([]);
  const [activeItem, setActiveItem] = useState<SidebarItemInterface | null>(
    null
  );

  // effects
  useEffect(() => {
    const { request, cancel } =
      // fetch items for the sidebar
      sidebarService.getNested<SidebarItemInterface[]>(sidebarId);

    // set "items" state variable
    request
      .then((res) => {
        setItems(res.data);
        for (let x = 0; x < res.data.length; x++) {
          // // set initial active item
          if (res.data[x].is_selected) {
            setActiveItem(res.data[x]);
          }
        }
      })
      // check if error is axios's CanceledError if not
      // error message is stored in "error" state variable
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setError(`Sidebar Menu is not working: ${err.message}`);
      });

    // clean up function cancels request when
    // componenet is unmounted to prevent memory leaks
    return () => cancel();
  }, [sidebarItemBadges, sidebarId]);

  // functions
  const handleActiveItemChanged = (item: SidebarItemInterface) => {
    // update active item
    setActiveItem(item);
  };

  // render
  return (
    <>
      {/* if there is an error, Error component is rendered */}
      {error &&
        toast.error(error, {
          onClick: () => onError(error),
          onClose: () => onError(error),
          className: "custom-toast",
          autoClose: false,
        })}

      {/* if no errors and "items" array is not empty, 
      it mapps over the array and renders a
      GridSidebarItem component for each of items */}
      {!error && items.length > 0 && (
        <ul className="sidebar-nav" id="sidebar-nav">
          {items.map((item) => (
            <SidebarItem
              key={item.sidebar_item_id}
              item={item}
              activeItem={activeItem ? activeItem : item}
              isActive={item === activeItem}
              badgeValue={sidebarItemBadges}
              onActiveItemChanged={handleActiveItemChanged}
              onItemChanged={onItemChanged}
            ></SidebarItem>
          ))}
        </ul>
      )}
    </>
  );
};

export default Sidebar;
