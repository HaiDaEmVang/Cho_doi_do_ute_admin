import { backend_url } from "../App";
import { DichVuDTO } from "../types/DichVu";

export const fetchServicesFromAPI = async () => {
    const response = await fetch(`${backend_url}/servicePackage/all`, {
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


export const addServiceFromAPI = async (token: string, data: DichVuDTO) => {
  const response = await fetch(`${backend_url}/servicePackage/addService`, {
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

export const updateServiceFromAPI = async (token: string, data: DichVuDTO) => {
  const response = await fetch(`${backend_url}/servicePackage/update`, {
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


export const deleteServiceFromAPI = async (token: string, idDichVu: number) => {
  const response = await fetch(`${backend_url}/servicePackage/delete/${idDichVu}`, {
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