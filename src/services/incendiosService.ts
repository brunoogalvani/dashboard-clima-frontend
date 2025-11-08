import axios from "axios";

const API_URL = "http://localhost:3000/api/incendios"; // Ajuste conforme seu backend

export const getIncendios = async (cidade: string) => {
  try {
    const response = await axios.get(`${API_URL}?cidade=${cidade}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar incêndios:", error.response?.data || error.message);
    throw new Error("Erro ao buscar incêndios.");
  }
};
