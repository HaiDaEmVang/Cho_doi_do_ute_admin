import { backend_url } from "../App";
import { NhiemVuDTO } from "../types/NhiemVu";

export const fetchMisstionFromAPI = async () => {
    const response = await fetch(`${backend_url}/mission/all`, {
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


export const addMisstionFromAPI = async (token: string, data: NhiemVuDTO) => {
  const response = await fetch(`${backend_url}/mission/add`, {
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

export const updateMisstionFromAPI = async (token: string, data: NhiemVuDTO) => {
  const response = await fetch(`${backend_url}/mission/update`, {
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


export const deleteMissionFromAPI = async (token: string, idDichVu: number) => {
  const response = await fetch(`${backend_url}/mission/delete/${idDichVu}`, {
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