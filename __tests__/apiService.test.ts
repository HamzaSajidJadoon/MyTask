
import axios from "axios";
import { fetchCategories, fetchProducts } from "../src/Component/apiService";
// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Service Tests", () => {
  it("should fetch categories successfully", async () => {
    // Mock the response
    const mockData = [{ id: 1, name: "Category 1" }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const categories = await fetchCategories();
    expect(categories).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/categories`);
  });

  it("should fetch products successfully", async () => {
    const mockData = [{ id: 1, name: "Product 1", price: 100 }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const products = await fetchProducts(1, null, 5);
    expect(products).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/products?offset=0&limit=5`);
  });

  it("should handle errors in fetchCategories", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchCategories()).rejects.toThrow("Network Error");
  });

  it("should handle errors in fetchProducts", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchProducts(1, null, 5)).rejects.toThrow("Network Error");
  });
});