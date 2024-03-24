import createHttpService from "./http-service";

export interface inventoryInterface {
    inventory_id: number;
    product_id: number;
    quantity: number;
}

export default createHttpService("/inventory/");