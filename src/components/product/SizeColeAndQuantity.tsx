"use client";
import { TProduct } from "@/types";
import { useState } from "react";
import AddToCart from "./AddToCart";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

interface productProps {
  product: TProduct;
}

type TInventory = NonNullable<TProduct["inventories"]>[number];

const SizeColorAndQuantity: React.FC<productProps> = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();
  const [selectedInventory, setSelectedInventory] = useState<TInventory | null>(
    product?.inventories?.[0] || null,
  );

  // Get unique colors by colorName
  const uniqueColors =
    product?.inventories?.reduce((acc, curr) => {
      if (!acc.some((item) => item.colorName === curr.colorName)) {
        acc.push(curr);
      }
      return acc;
    }, [] as TInventory[]) || [];

  // Get all inventories for selected color
  const selectedColorInventories =
    product?.inventories?.filter(
      (inv) => inv.colorName === selectedInventory?.colorName,
    ) || [];

  const availableSizes = selectedColorInventories
    .map((inv) => inv.size)
    .filter((size) => size && size.trim() !== "");

  // Handle color selection - select first available size of that color
  const handleColorSelect = (inventory: TInventory) => {
    const colorInventories =
      product?.inventories?.filter(
        (inv) => inv.colorName === inventory.colorName,
      ) || [];
    setSelectedInventory(colorInventories[0] || inventory);
    setQuantity(1);
  };

  // Handle size selection
  const handleSizeSelect = (inventory: TInventory) => {
    setSelectedInventory(inventory);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (!selectedInventory) {
      toast.error("Please select a variant.");
      return;
    }

    if (selectedInventory.quantity <= 0) {
      toast.error("This variant is out of stock.");
      return;
    }

    setIsAdding(true);

    // Small delay so users can see the loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    addToCart({
      product: {
        _id: product._id,
        name: product.title,
        slug: product.slug,
        image: product.thumbnailImage, // change if your image field has a different name
        price: product.price,
      },
      quantity,
      color: selectedInventory.colorName,
      size: selectedInventory.size,
    });

    toast.success("Added to cart");
    setIsAdding(false);
  };

  console.log("Selected Inventory:", selectedInventory);

  return (
    <div>
      {uniqueColors.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 text-sm">Color:</span>
            <span className="text-sm text-gray-600 capitalize">
              {selectedInventory?.colorName || "Select Color"}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {uniqueColors.map((inventory) => (
              <button
                key={inventory._id}
                onClick={() => handleColorSelect(inventory)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                  selectedInventory?.colorName === inventory.colorName
                    ? "border-primary ring-2 ring-primary/30 ring-offset-2"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{
                  backgroundColor: inventory.color || "#e5e7eb",
                }}
                title={inventory.colorName}
              >
                {!inventory.color && (
                  <span className="text-[8px] text-gray-500 absolute inset-0 flex items-center justify-center font-medium">
                    {inventory.colorName?.substring(0, 2).toUpperCase()}
                  </span>
                )}
                {selectedInventory?.colorName === inventory.colorName && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-[10px]">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {availableSizes.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 text-sm">Size:</span>
            <span className="text-sm text-gray-600 uppercase">
              {selectedInventory?.size || "Select Size"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedColorInventories.map((inventory) => (
              <button
                key={inventory._id}
                onClick={() => handleSizeSelect(inventory)}
                className={`px-2 py-1 border-2 capitalize rounded-md text-sm font-medium transition-all ${
                  selectedInventory?._id === inventory._id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50"
                }`}
                disabled={inventory.quantity === 0}
              >
                {inventory.size}
                {inventory.quantity === 0 && (
                  <span className="ml-1 text-xs text-red-500">(Out)</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <AddToCart
        quantity={quantity}
        setQuantity={setQuantity}
        availableQuantity={selectedInventory?.quantity ?? 0}
        onAddToCart={handleAddToCart}
        isAdding={isAdding}
      />
    </div>
  );
};

export default SizeColorAndQuantity;
