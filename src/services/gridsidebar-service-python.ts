import createHttpServicePython from "./http-service-python";

interface GridInterface {
  grid_id: number;
  grid_sidebar_item_id: number;
  grid_sidebar_id: number;
  data: string;
  data_key: string;
  columns: JSON;
  is_selected: boolean;
  unfiltered: any[];
  filtered: any[];
}

interface GridFilterFieldInterface {
  grid_filter_field_id: number;
  name: string;
  data_field: string;
  values: string[];
}

export interface GridFilterInterface {
  grid_filter_id: number;
  current_filter: string[];
  number_checked: number;
  grid_filter_field: GridFilterFieldInterface;
}

export interface SidebarItemInterface {
  sidebar_item_id: number;
  name: string;
  icon: string;
  is_selected: boolean;
  order: number;
  is_parent_item: boolean;
  parent_item_id: number;
  grid: GridInterface;
  children: SidebarItemInterface[];
  badgeOn: boolean;
}

export interface SidebarItemGridInterface {
  sidebar: SidebarItemInterface | undefined
  grid: GridInterface | undefined
  grid_filters: GridFilterInterface[] | undefined
}

interface ButtonInterface {
  hidden: boolean;
  buttonTitle: string;
}

export interface SidebarButtonInterface {
  properties: ButtonInterface[];
}

interface CarouselInterface {
  itemKey: string;
  itemImage: string;
  itemTitle: string;
  itemSubtitle: string;
}

export interface SidebarCarouselInterface {
  properties: CarouselInterface[];
}


// export interface FilterInterface {
//   grid_filter_id: number;
//   grid_id: number;
//   grid_filter_field_id: number;
//   data: string;
//   grid_sidebar_item_id: number;
//   grid_sidebar_id: number;
//   name: string;
//   data_field: string;
//   values: JSON;
//   current_filter: any[];
//   number_checked: number;
// }



export const sidebarService = createHttpServicePython("/sidebargrid/sidebars","itemsastree/");
export const sidebarButtonService = createHttpServicePython("/sidebargrid/sidebars", "buttons/");
export const sidebarCarouselService = createHttpServicePython("/sidebargrid/sidebars", "carousels/");
export const sidebarItemGridService = createHttpServicePython("/sidebargrid/sidebars", "itemswithgridfilters/")

// export const gridSidebarItemService = createHttpService("/gridSidebar/items");
// export const gridService = createHttpService("/gridSidebar/grids");
// export const filterService = createHttpService(
//   "/gridSidebar/grid/filters"
// );
// export const gridSidebarCarouselService = createHttpService(
//   "/gridSidebar/carousel"
// );
// export const gridSidebarButtonService = createHttpService(
//   "/gridSidebar/buttons"
// );
