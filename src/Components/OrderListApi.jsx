const API_BASE_URL = "http://localhost:5141/OrderList";


export async function getAllOrders() {
  try {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return await res.json();
  } catch (error) {
    console.error("Error loading orders:", error);
    return [];
  }
}


export async function getOrderById(docEntry) {
  try {
    const res = await fetch(`${API_BASE_URL}/${docEntry}`);
    if (!res.ok) throw new Error("Order not found");
    return await res.json();
  } catch (error) {
    console.error("Error loading order:", error);
    return null;
  }
}


export async function createOrder(orderData) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    return await res.json();
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}


export async function updateOrder(docEntry, orderData) {
  try {
    const res = await fetch(`${API_BASE_URL}/${docEntry}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    return await res.json();
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
}


export async function deleteOrder(docEntry) {
  try {
    const res = await fetch(`${API_BASE_URL}/${docEntry}`, {
      method: "DELETE",
    });

    return await res.text();
  } catch (error) {
    console.error("Error deleting order:", error);
    return null;
  }
}
