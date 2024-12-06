import { backend_url } from "../App";
import { DanhMucDTO } from "../types/DanhMuc";

export const fetchCategoryFromAPI = async () => {
    const response = await fetch(`${backend_url}/category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error || "Failed to fetch products");
    }
   
    return await response.json();
};

export const addCategoryFromAPI = async (token: string, data: FormData) => {
  const response = await fetch(`${backend_url}/category/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.error || "Failed to fetch products");
  }

  return await response.json();
};

export const updateCategoryFromAPI = async (token: string, data: FormData) => {
  const response = await fetch(`${backend_url}/category/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.error || "Failed to fetch products");
  }

  return await response.json();
};


export const deleteCategoryFromAPI = async (token: string, id: number) => {
  const response = await fetch(`${backend_url}/category/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.error || "Failed to fetch products");
  }

  return await response.json();
};
