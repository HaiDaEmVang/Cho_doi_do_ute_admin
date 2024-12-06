import { backend_url } from "../App";

export const fetchProductsFromAPI = async (token: string) => {
    const response = await fetch(`${backend_url}/products/getProductForAdmin`, {
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

export const deleteProduct = async (token: string, idProudct: number) => {
  const response = await fetch(`${backend_url}/products/${idProudct}`, {
    method: "DELETE",
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


export const updateStatusProduct = async (token: string, status: string , idProduct: number) => {
  const response = await fetch(`${backend_url}/products/update/status?idProduct=${idProduct}&status=${status}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({idProduct, status})
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.error || "Failed to fetch products");
  }

  return await response.json();
};
