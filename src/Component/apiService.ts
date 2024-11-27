
import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const fetchProducts = async (
  page: number,
  selectedCategory: number | null,
  limit = 5
) => {
  try {
    const categoryFilter = selectedCategory ? `&categoryId=${selectedCategory}` : "";
    const response = await axios.get(
      `${process.env.API_BASE_URL}/products?offset=${
        (page - 1) * limit
      }&limit=${limit}${categoryFilter}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};
