import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { remove, add } from "../redux/Slices/cartSlice";
import { useState } from "react";

const Product = ({ post, darkMode }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle full description

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Added item to cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Removed item from cart");
  };

  const isInCart = cart.some((item) => item.id === post.id);
  const productImage = post.thumbnail || (post.images && post.images[0]);

  // Log productImage to check if it is being set correctly
  console.log("Product Image URL: ", productImage);

  return (
    <div className={`border border-gray-200 flex flex-col rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
      {productImage ? (
        <img
          alt={post.title}
          src={productImage}
          className="w-fit h-[200px] sm:h-[250px] md:h-[300px] object-cover mx-auto"
        />
      ) : (
        <div className="flex items-center justify-center h-[200px] sm:h-[250px] md:h-[300px] bg-gray-200">
          <span className={`text-gray-500 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Image not available</span>
        </div>
      )}
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <h3 className={`text-lg sm:text-xl bg-gradient-to-r from-blue-500 to-pink-700 bg-clip-text text-transparent italic font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{post.title}</h3>
          <p className={`text-gray-700 mb-2 text-sm sm:text-base ${darkMode ? 'text-white' : 'text-black'}`}>
            {showFullDescription ? post.description : truncateDescription(post.description, 15)}
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className={`text-blue-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
            >
              {showFullDescription ? 'read less' : 'read more'}
            </button>
          </p>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.category}</p>
        </div>
        <p className={`text-lg sm:text-xl mx-3 font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>${post.price.toFixed(2)}</p>
        <button
          onClick={isInCart ? removeFromCart : addToCart}
          className={`w-11/12 mx-auto justify-center py-3 rounded-lg font-semibold transition transform hover:scale-105 ${isInCart ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {isInCart ? 'Remove Item' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Product;
