import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateQuantity } from "../redux/Slices/cartSlice";

const Cart = ({ darkMode }) => {
  const cart = useSelector((state) => state.cart) || []; // Directly access cart state
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0)
    );
  }, [cart]);
  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {cart.length > 0 ? (
        <div className={`container mx-auto max-w-4xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-6`}>
          <div className="space-y-4">
            <div className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Your Cart</div>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <img
                    src={item.thumbnail || (item.images && item.images[0])}
                    alt={item.title}
                    className="w-30 h-30 mr-3 object-cover rounded-lg"
                  />
                  <CartItem item={item} onQuantityChange={handleQuantityChange} isDarkTheme={darkMode} />
                </div>
              ))}
            </div>

            <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Summary</div>
              <p className={`text-gray-700 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Total items: {cart.length}</p>
              <div className="flex justify-between items-center mt-4">
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Total Amount: ${totalAmount.toFixed(2)}</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} p-4`}>
          <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Cart is Empty</h1>
          <NavLink to="/">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Shop Now
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
