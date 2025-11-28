const API_BASE_URL = "http://localhost:5141/api";

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/Register/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const query = new URLSearchParams({ email, password }).toString();

    const response = await fetch(
      `${API_BASE_URL}/Register/login?${query}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
