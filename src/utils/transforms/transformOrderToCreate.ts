import type { TypeCartItem } from "../../types/cart.types";

export const transformOrderToCreate = (cartItems: TypeCartItem[]) => {
    const orderItems = cartItems.map(item => ({
        quantity: item.quantity,
        unit_price: parseFloat(item.product_price),
        product_id: item.product_id,
    }));
    return {
        currency: 'USD',
        items: orderItems,
    }
}