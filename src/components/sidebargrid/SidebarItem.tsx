import React from "react";
import { SidebarItemInterface } from "../../services/gridsidebar-service-python";

interface SidebarItemProps<T> {
  item: SidebarItemInterface;
  activeItem: SidebarItemInterface;
  isActive: boolean;
  badgeValue: number;
  onActiveItemChanged: (item: T) => void;
  onItemChanged: (rootItemName: string, childItemName: string | null) => void;
}

// react functional component represents an item in sidebar menu
const SidebarItem: React.FC<SidebarItemProps<any>> = (props) => {
  // destructuring
  const {
    item,
    activeItem,
    isActive,
    // badgeValue,
    onActiveItemChanged,
    onItemChanged,
  } = props;

  const {
    sidebar_item_id,
    is_parent_item,
    name,
    icon,
    grid,
    children,
    // badgeOn,
  } = item;

  // functions
  const handleItemClick = () => {
    onActiveItemChanged(item);
    onItemChanged(name, grid.data);
  };

  // render
  return (
    <>
      <li
        key={sidebar_item_id}
        className="nav-item"
        // data-bs-parent="#sidebar-nav"
      >
        {/* clickable link to display related grid */}
        <a
          onClick={handleItemClick}
          className={`nav-link ${isActive && !is_parent_item ? "active" : ""}`}
        >
          {/* icon of the item */}
          <i className={icon}></i>
          <div className="position-relative">
            <span className="pe-3">{name}</span>

            {isActive && !is_parent_item && (
              <span
                className={
                  "position-absolute top-50 start-100 translate-middle badge rounded-pill bg-success p-1 dot-badge"
                }
              >
                <span className="visually-hidden">New alerts</span>
              </span>
            )}
          </div>{" "}
        </a>
        {/* children are rendered recursively in "ul" element */}
        {children && (
          <ul
            id={"_" + sidebar_item_id}
            className="nav-content"
          >
            {/* the children items are mapped over, each child
            is rendered as "li" element */}
            {children.map((child) => (
              <SidebarItem
                key={child.sidebar_item_id}
                item={child}
                activeItem={activeItem}
                isActive={child === activeItem}
                badgeValue={0}
                onActiveItemChanged={onActiveItemChanged}
                onItemChanged={onItemChanged}
              ></SidebarItem>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default SidebarItem;
