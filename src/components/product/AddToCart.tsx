import React from "react";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  availableQuantity: number;
  onAddToCart: () => void;
  isAdding: boolean;
}

const AddToCart: React.FC<AddToCartProps> = ({
  quantity,
  setQuantity,
  availableQuantity,
  onAddToCart,
  isAdding,
}) => {
  // const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= availableQuantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart();
    
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
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 hover:border-primary hover:bg-primary/5 text-gray-700"
            }`}
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>

          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            disabled={availableQuantity === 0}
            min={1}
            max={availableQuantity}
            className="w-16 h-11 text-center border-2 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-700 font-medium"
          />

          <button
            onClick={handleIncrement}
            disabled={quantity >= availableQuantity}
            className={`p-2 rounded-full border-2 transition-all ${
              quantity >= availableQuantity
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 hover:border-primary hover:bg-primary/5 text-gray-700"
            }`}
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        disabled={availableQuantity === 0 || isAdding}
        onClick={handleAddToCart}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/35"
      >
        {isAdding ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            Add to Cart
          </>
        )}
        {/* {availableQuantity === 0 ? "Out of Stock" : "Add to Cart"} */}
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
          {quantity}
        </span>
      </button>
    </div>
  );
};

export default AddToCart;
