import React from "react";
import {
  CheckCircle,
  ShoppingBag,
  CalendarDays,
  Grid2x2Plus,
  CircleDollarSign,
  CreditCardIcon,
  CalendarSync,
} from "lucide-react";
import Link from "next/link";




const PaymentSuccessPage = () => {

   

  // Demo data from the image
  const orderData = {
    orderId: "ORD-260806-018682ZF1",
    transactionId: "TXN-8723-9A4F",
    totalPaid: "₱4,920",
    paymentMethod: "Credit Card",
    cardLast4: "4242",
    date: "06 Aug 2026",
    time: "12:53 PM",
    customer: {
      name: "Al Mamon",
      phone: "01746770324",
      address: "Mirpur-1, Dhaka",
      city: "Dhaka",
      country: "Bangladesh",
    },
    estimatedDelivery: "8 - 10 August 2026",
    items: [
      {
        name: "Premium T-Shirt",
        color: "Green",
        size: "M",
        quantity: 6,
        price: "₱585",
        total: "₱3,510",
      },
      {
        name: "Hoodie",
        color: "Yellow",
        size: "2XL",
        quantity: 2,
        price: "₱675",
        total: "₱1,350",
      },
    ],
    subtotal: "₱4,860",
    shippingCost: "₱60",
    discount: "- ₱0",
    total: "₱4,920",
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-6">
      <div className="max-w-4xl w-full bg-white border rounded shadow-xs overflow-hidden">
        {/* Header Section */}
        <div className=" px-6 md:px-10 py-8 md:py-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping"></div>
                  <div className="relative bg-primary rounded-full p-4 md:p-5 shadow-lg shadow-xs-primary">
                    <CheckCircle
                      className="w-12 h-12 md:w-16 md:h-16 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold">
                  Payment Successful!
                </h1>
                <p className="text-primary font-medium text-sm md:text-base mt-1 md:w-lg">
                  Thank you for your purchase. Your transaction has been
                  completed successfully.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 text-primary font-medium rounded px-4 py-2 border border-white/20 text-sm ">
              {orderData.orderId}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            <div className="bg-gray-50 flex flex-col items-center justify-center rounded p-4 border border-gray-100">
              <p className="p-2 bg-primary/15 text-primary rounded">
                <Grid2x2Plus size={18} />
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">
                Transaction ID
              </p>
              <h2 className="text-gray-800 font-mono font-semibold md:text-lg text-sm mt-1">
                {orderData.transactionId}
              </h2>
            </div>
            <div className="bg-gray-50 flex flex-col items-center justify-center rounded p-4 border border-gray-100">
              <p className="p-2 bg-primary/15 text-primary rounded">
                <CircleDollarSign size={18}/>
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">
                Total Paid
              </p>
              <h2 className="text-primary font-mono font-semibold text-lg mt-1">
                ৳ 2540
              </h2>
            </div>
            <div className="bg-gray-50 flex flex-col items-center justify-center rounded p-4 border border-gray-100">
              <p className="p-2 bg-primary/15 text-primary rounded">
                <CreditCardIcon size={18}  />
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">
                Payment <span className="md:block hidden">Method</span>
              </p>
              <h2 className="text-gray-800 font-mono font-semibold text-lg mt-1">
                CARD
              </h2>
            </div>
            <div className="bg-gray-50 flex flex-col items-center justify-center rounded p-4 border border-gray-100">
              <p className="p-2 bg-primary/15 text-primary rounded">
                <CalendarSync size={18}/>
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">
                Date & Time
              </p>
              <h2 className="text-gray-800 font-mono font-semibold md:text-lg text-base mt-1">
                06 Aug 2026
              </h2>
            </div>
            
            
          </div>
          <div className="bg-emerald-50 rounded p-5 border border-emerald-100 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-800">
                Estimated Delivery
              </h3>
            </div>
            <div className="text-lg font-bold text-emerald-700">
              {orderData.estimatedDelivery}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              We will notify you once your order is shipped.
            </p>
          </div>
          <div className="mt-4">
           <Link href="/">
            <button className="w-full bg-primary text-white font-medium cursor-pointer py-3 px-4 rounded transition-all duration-200  flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </button>
           </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-400">
              Thank you for shopping with{" "}
              <span className="font-semibold text-gray-600">Oqtos</span>. We
              appreciate your trust in us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
