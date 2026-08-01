import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface AddToCartProps {
  maxQuantity?: number;
  onAddToCart?: (quantity: number) => void;
  initialQuantity?: number;
}

const AddToCart: React.FC<AddToCartProps> = ({
  maxQuantity = 10,
  onAddToCart,
  initialQuantity = 1,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(quantity);
    }
    // You can add toast notification or other logic here
    console.log(`Added ${quantity} item(s) to cart`);
  };

  return (
    <div className="mt-4 flex md:flex-row flex-col items-center gap-4">
      {/* Quantity Selector */}
      <div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className={`p-2 rounded-full border-2 transition-all ${
              quantity <= 1
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-300 hover:border-primary hover:bg-primary/5 text-gray-700'
            }`}
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>

          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={maxQuantity}
            className="w-16 h-11 text-center border-2 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-700 font-medium"
          />

          <button
            onClick={handleIncrement}
            disabled={quantity >= maxQuantity}
            className={`p-2 rounded-full border-2 transition-all ${
              quantity >= maxQuantity
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-300 hover:border-primary hover:bg-primary/5 text-gray-700'
            }`}
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/35"
      >
        <ShoppingCart size={20} />
        Add to Cart
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
          {quantity}
        </span>
      </button>
    </div>
  );
};

export default AddToCart;