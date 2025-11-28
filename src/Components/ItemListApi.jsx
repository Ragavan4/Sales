const API_BASE_URL = "http://localhost:5141/api/ItemList";

export async function getAllItems() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
}

export async function addItem(item) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Failed to add item");
  return response.json();
}

export async function deleteItem(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete item");
  return true;
}
