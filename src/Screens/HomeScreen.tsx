import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { fetchCategories, fetchProducts } from "../Component/apiService";

const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadProducts(1, selectedCategory); // Load initial products
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadProducts = async (pageNumber: number, category: number | null) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchProducts(pageNumber, category);
      setProducts((prev) => (pageNumber === 1 ? data : [...prev, ...data]));
      setPage(pageNumber + 1);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Categories Filter */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.id && styles.selectedCategoryButton,
            ]}
            onPress={() => {
              setPage(1);
              setSelectedCategory(item.id);
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.id && styles.selectedCategoryText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Products List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>Price  ${item.price}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Button
              title="Show More"
              onPress={() => loadProducts(page, selectedCategory)}
              disabled={loading}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#000" },
  categoryButton: {
    height:50,
    width:115,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#ddd",
    justifyContent:'center',
    alignItems:'center'
    // padding: 5,
    // backgroundColor: "#ddd",
    // marginRight: 10,
    // borderRadius: 5,
  },
  selectedCategoryButton: { backgroundColor: "#007bff" },
  categoryText: { fontSize: 16, color: "#000" },
  selectedCategoryText: { color: "#fff", fontWeight: "bold" },
  productCard: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#000",
    marginTop:10
  },
  productImage: { width: 80, height: 80, borderRadius: 5, marginRight: 10 },
  productInfo: { flex: 1, justifyContent: "center" },
  productName: { fontSize: 17, fontWeight: "bold" , color:'#fff'},
  productPrice: { fontSize: 16, color: "#666", color:'#fff'},
  footer: { marginVertical: 10 },
});

export default HomeScreen;
