import { backend_url } from "../App";

export const fetchUsersFromAPI = async (token: string) => {
    const response = await fetch(`${backend_url}/users/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error || "Failed to fetch products");
    }
  
    return await response.json();
};

