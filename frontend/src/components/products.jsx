import React, { useEffect, useState } from "react";
import axios from "axios";

const RecProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-products");

                const productData = response.data.products || response.data;

                console.log("Fetched Products:", productData);
                
                setProducts(productData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);  // ✅ Added dependency array

    // ✅ Loading and error handling
    if (loading) return <p className="text-center text-green-500">Loading products...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="mt-8 px-4">
            <h4 className="text-4xl font-semibold text-green-600">Products</h4>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    {products.map((product) => (
                        <div key={product._id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition">
                            <h5 className="text-xl font-bold">{product.name}</h5>
                            <p className="text-gray-600 mt-2">{product.description || "No description available"}</p>
                            <p className="text-lg font-semibold mt-2">₹ {product.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6">No products available.</p>
            )}
        </div>
    );
};

export default RecProduct;
