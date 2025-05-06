import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiPlus,
  FiX,
  FiImage,
  FiTrash2,
  FiAlertTriangle
} from "react-icons/fi";

const Market = () => {
  // State for products and loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("price");
  const [filterOption, setFilterOption] = useState("all");
  
  // State for add product modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "latex",
    price: "",
    stock: "",
    qualityScore: "",
    images: []
  });
  const [imageUrls, setImageUrls] = useState("");
  const [isMerchant, setIsMerchant] = useState(false);
  const [formError, setFormError] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");

  // State for quality reports
  const [hasQualityReport, setHasQualityReport] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [reportCount, setReportCount] = useState(0);

  // Parse price from suggested price string
  const parseSuggestedPrice = (priceStr) => {
    if (!priceStr) return 0;
    // Extract the numeric part before " per"
    const pricePart = priceStr.split(' per')[0];
    // Remove all non-numeric characters except decimal point
    const numericValue = parseFloat(pricePart.replace(/[^0-9.]/g, ''));
    // Convert to price per kg if needed
    return numericValue / 100; // Assuming the price is per 100kg
  };

  // Fetch products and check user role
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-products"
        );
        setProducts(response.data.products || response.data);
        setLoading(false);
        
        // Check if user is merchant
        const token = localStorage.getItem('token');
        if (token) {
          const userResponse = await axios.get(
            "http://localhost:1000/api/v1/get-user-information",
            { headers: { authorization: `Bearer ${token}` } }
          );
          setIsMerchant(userResponse.data.user.role === "merchant");
          setCurrentUserId(userResponse.data.user._id);
          setCurrentUsername(userResponse.data.user.username);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch user's latest quality report when merchant status is confirmed
  useEffect(() => {
    const fetchLatestPdf = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!currentUsername) return;

        const response = await axios.get(
          `http://localhost:1000/api/v1/get-latest-pdf?username=${encodeURIComponent(currentUsername)}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        
        setPdfData(response.data.pdf);
        setReportCount(response.data.totalCount || 0);
        setHasQualityReport(response.data.totalCount > 0);
        
        // If there's a report, pre-fill the quality score and price
        if (response.data.pdf) {
          const priceValue = parseSuggestedPrice(response.data.pdf.suggestedPrice);
          setNewProduct(prev => ({
            ...prev,
            qualityScore: response.data.pdf.parameters.qualityScore,
            price: priceValue || ""
          }));
        }
      } catch (err) {
        console.error("Failed to fetch PDF data:", err);
        setHasQualityReport(false);
      }
    };

    if (isMerchant) {
      fetchLatestPdf();
    }
  }, [isMerchant, currentUsername]);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      await axios.delete(
        `http://localhost:1000/api/v1/delete-prod/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId
          }
        }
      );

      // Remove the deleted product from the list
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.mssg || "Failed to delete product");
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterOption === "all" ||
        product.category.toLowerCase() === filterOption.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      if (sortOption === "quality") return b.qualityScore - a.qualityScore;
      return 0;
    });

  // Handle adding new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError("");
    
    // Basic validation
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      setFormError("Name, category, price, and stock are required");
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      // Process image URLs (comma separated)
      const images = imageUrls.split(',').map(url => url.trim()).filter(url => url);
      
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        qualityScore: newProduct.qualityScore ? parseInt(newProduct.qualityScore) : undefined,
        images
      };

      const response = await axios.post(
        "http://localhost:1000/api/v1/add-prod",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId
          }
        }
      );

      // Add the new product to the list
      setProducts([...products, response.data.product]);
      setShowAddModal(false);
      resetForm();
      
    } catch (error) {
      console.error("Error adding product:", error);
      setFormError(error.response?.data?.mssg || "Failed to add product");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      category: "latex",
      price: "",
      stock: "",
      qualityScore: "",
      images: []
    });
    setImageUrls("");
    setFormError("");
  };

  // Handle input changes properly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Only update if the field is editable
    if (!hasQualityReport || (name !== "qualityScore" && name !== "price")) {
      setNewProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-4 sm:ml-64 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 sm:ml-64 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Add Product Modal Component
  const AddProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Add New Product</h3>
            <button
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>
          </div>

          {!hasQualityReport && (
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg flex items-center">
              <FiAlertTriangle className="mr-2" />
              <span>No quality report found. Please check rubber quality first.</span>
            </div>
          )}

          {pdfData && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Using values from your latest quality report:</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Latex %:</span> {pdfData.parameters.latexPercentage}
                </div>
                <div>
                  <span className="text-gray-600">DRC:</span> {pdfData.parameters.dryRubberContent}
                </div>
                <div>
                  <span className="text-gray-600">Quality Score:</span> {pdfData.parameters.qualityScore}
                </div>
                <div className="col-span-3">
                  <span className="text-gray-600">Suggested Price:</span> {pdfData.suggestedPrice}
                </div>
                <div>
                  <span className="text-gray-600">Report Date:</span> {new Date(pdfData.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {formError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {formError}
            </div>
          )}

          <form onSubmit={handleAddProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="latex">Latex</option>
                  <option value="coagulant">Coagulant</option>
                  <option value="rubber sheets">Rubber Sheets</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹ per kg)*
                </label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                    hasQualityReport ? "bg-gray-100" : ""
                  }`}
                  required
                  disabled={hasQualityReport}
                />
                {hasQualityReport && (
                  <p className="text-xs text-gray-500 mt-1">
                    Calculated from: {pdfData?.suggestedPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock (kg)*
                </label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quality Score
                </label>
                <input
                  type="number"
                  name="qualityScore"
                  value={newProduct.qualityScore}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                    hasQualityReport ? "bg-gray-100" : ""
                  }`}
                  disabled={hasQualityReport}
                />
                {hasQualityReport && (
                  <p className="text-xs text-gray-500 mt-1">
                    From quality report
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs (comma separated)
              </label>
              <div className="flex items-center">
                <FiImage className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={imageUrls}
                  onChange={(e) => setImageUrls(e.target.value)}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-lg ${
                  hasQualityReport 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!hasQualityReport}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <a href="#" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold">
                  LatexQ 
                </span>
              </a>
            </div>
            <div className="flex items-center"></div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <Link
                to="/check"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Check Quality
                </span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  free
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/market"
                className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-100"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Marketplace
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/order"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Orders & Transactions
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Help & Support
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Add Product Button (for merchants) */}
          {isMerchant && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FiPlus className="mr-2" />
                Add Product
              </button>
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search latex products..."
                  className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="text-gray-400" />
                  </div>
                  <select
                    className="pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none appearance-none"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="latex">Latex</option>
                    <option value="rubber">Rubber</option>
                  </select>
                </div>
                <select
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="quality">Best Quality</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Product Modal */}
          {showAddModal && <AddProductModal />}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isProductOwner = isMerchant && product.merchant && product.merchant._id === currentUserId;
                
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <div className="relative">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src="https://img.freepik.com/free-vector/illustration-shopping-online_53876-5906.jpg"
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">
                            No Image Available
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                          <FiHeart className="text-gray-600" />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                          <FiShare2 className="text-gray-600" />
                        </button>
                      </div>
                      {product.qualityScore > 90 && (
                        <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 text-sm capitalize">
                            {product.category}
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {product.stock} in stock
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {product.description || "No description available"}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="font-bold text-gray-800">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <div className="flex items-center">
                          <FiStar className="text-amber-400" />
                          <span className="text-gray-600 ml-1 text-sm">
                            {product.qualityScore / 20}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        {!isProductOwner && (
                          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                            View Details
                          </button>
                        )}
                        {isProductOwner && (
                          <button 
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 text-sm font-medium hover:text-red-700 flex items-center"
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        )}
                        <button className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition">
                          <FiShoppingCart className="mr-2" />
                          Add to Cart
                        </button>
                      </div>
                      {product.merchant && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Sold by: {product.merchant.username}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Showing count */}
          <div className="mt-6 text-right text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;