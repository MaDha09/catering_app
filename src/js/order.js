import { supabase } from "./main";

async function loadOrders() {
    const { data: orders, error } = await supabase
        .from('order')
        .select('*');

    if (error) {
        console.error('Error fetching orders:', error);
        return;
    }

    console.log('Fetched orders:', orders);

    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.innerHTML = ''; // Clear existing orders

    orders.forEach((order) => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
            <div class="card">
                <div class="order">
                    <h2>${order.order_name}</h2>
                    <h2>$${order.order_price}.00</h2>
                </div>
            </div>
        `;

        ordersContainer.appendChild(orderCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});
