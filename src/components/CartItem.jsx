import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/cartSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const CartItem = ({ item, onQuantityChange, darkMode }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item Removed");
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity); // Notify Cart to update quantity
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity); // Notify Cart to update quantity
    }
  };

  return (
    <div className={`flex items-center border-b py-4 px-2 shadow-lg rounded-lg mb-4 transition-transform transform hover:scale-105 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex-1">
        <h1 className="text-lg font-bold mb-1 hover:underline">{item.title}</h1>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <div className="flex items-center mb-2">
          <button onClick={decreaseQuantity} className="text-lg font-bold mx-2 bg-red-500 text-white px-2 py-1 rounded-full transition-colors hover:bg-red-600">-</button>
          <span className="text-lg font-bold">{quantity}</span>
          <button onClick={increaseQuantity} className="text-lg font-bold mx-2 bg-green-500 text-white px-2 py-1 rounded-full transition-colors hover:bg-green-600">+</button>
        </div>
        <p className="text-xl font-bold mb-2">${(item.price * quantity).toFixed(2)}</p>
        <button onClick={removeFromCart} className="flex items-center transition duration-200 text-red-500 hover:text-red-700 hover:scale-105">
          <FaTrashAlt className="mr-2" />
          <span className="font-semibold">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
