import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { IoIosArrowUp } from "react-icons/io";

const Home = ({ darkMode }) => {
  const BASE_API_URL = process.env.REACT_APP_PRODUCT_LIST;
  const CATEGORY_API_URL = process.env.REACT_APP_PRODUCT_CATEGORIES;
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const PRODUCTS_PER_PAGE = 10;

  // Fetch product data and categories based on category and search input
  async function fetchProductData(category = "", page = 1, query = "", append = false) {
    setLoading(true);
    try {
      let productRes;
      if (query && category) {
        // Search within the selected category
        productRes = await fetch(`${BASE_API_URL}/category/${category}/search?q=${query}&limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`);
      } else if (query && !category) {
        // Search across all categories
        productRes = await fetch(`${BASE_API_URL}/search?q=${query}&limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`);
      } else if (!query && category) {
        // Get products from the selected category
        productRes = await fetch(`${BASE_API_URL}/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`);
      } else {
        // Get all products if no query or category is specified
        productRes = await fetch(`${BASE_API_URL}?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`);
      }

      const productData = await productRes.json();

      if (append) {
        setProducts((prevProducts) => [...prevProducts, ...productData.products]);
      } else {
        setProducts(productData.products);
      }

      setHasMore(productData.products.length === PRODUCTS_PER_PAGE);

      if (categories.length === 0) {
        const categoryRes = await fetch(CATEGORY_API_URL);
        const categoryData = await categoryRes.json();
        setCategories(categoryData);
      }
    } catch (err) {
      console.error("Error fetching product or category data:", err);
    } finally {
      setLoading(false);
    }
  }

  // Handle search input change and update URL
  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const params = new URLSearchParams(location.search);
    if (inputValue) {
      params.set("search", inputValue);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`);

    // Call search API or reset to original fetch based on input value
    setCurrentPage(1);
    fetchProductData(selectedCategory === "All Categories" ? "" : selectedCategory, 1, inputValue);
  };

  // Handle category filter change and update URL
  const handleFilterChange = (category) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(location.search);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    navigate(`?${params.toString()}`);

    setCurrentPage(1);
    fetchProductData(category === "All Categories" ? "" : category, 1, searchInput);
  };

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fetch products and categories initially based on query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "";
    const searchQuery = params.get("search") || "";

    setSelectedCategory(category || "All Categories");
    setSearchInput(searchQuery);

    fetchProductData(category === "All Categories" ? "" : category, 1, searchQuery);
  }, [location.search]);

  // Infinite scrolling logic
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProductData(selectedCategory === "All Categories" ? "" : selectedCategory, currentPage, searchInput, true);
    }
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <select 
        className={`border w-[155px] border-gray-300 rounded-lg p-2 flex-1 custom-scrollbar ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} shadow-sm hover:shadow-md transition duration-200`}
        value={selectedCategory} 
        onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="All Categories">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search your product"
        className={`border w-[185px] border-gray-300 rounded-lg p-2 flex-1 ml-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} shadow-sm hover:shadow-md transition duration-200`}
        value={searchInput}
        onChange={handleSearchChange}
      />
      {loading && currentPage === 1 ? (
        <Spinner />
      ) : (
        <>
          {products.length === 0 ? (
            <div className={`text-center ${darkMode ? 'text-white' : 'text-black'}`}>
              <h2>No products found</h2>
            </div>
          ) : (
            <div className="lg:max-w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {products.map((product) => (
                <Product key={product.id} post={product} darkMode={darkMode} />
              ))}
            </div>
          )}
          {loading && currentPage > 1 && <Spinner />}
        </>
      )}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-200"
        >
          <IoIosArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
