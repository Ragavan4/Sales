const API_BASE_URL = "http://localhost:5141/api/CustomerList";

export async function getAllCustomers() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch customers");
  return response.json();
}

export async function addCustomer(customer) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!response.ok) throw new Error("Failed to add customer");
  return response.json();
}

export async function deleteCustomer(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }

  return response;
}
