import React from 'react';
import {
    CheckCircle,
    Receipt,
    ShoppingBag,
    FileDown,
    Truck,
    CalendarDays,
    CreditCard,
    User,
    Phone,
    MapPin,
    Package,
    ChevronRight,
} from 'lucide-react';

const PaymentSuccessPage = () => {
    // Demo data from the image
    const orderData = {
        orderId: 'ORD-260806-018682ZF1',
        transactionId: 'TXN-8723-9A4F',
        totalPaid: '₱4,920',
        paymentMethod: 'Credit Card',
        cardLast4: '4242',
        date: '06 Aug 2026',
        time: '12:53 PM',
        customer: {
            name: 'Al Mamon',
            phone: '01746770324',
            address: 'Mirpur-1, Dhaka',
            city: 'Dhaka',
            country: 'Bangladesh',
        },
        estimatedDelivery: '8 - 10 August 2026',
        items: [
            {
                name: 'Premium T-Shirt',
                color: 'Green',
                size: 'M',
                quantity: 6,
                price: '₱585',
                total: '₱3,510',
            },
            {
                name: 'Hoodie',
                color: 'Yellow',
                size: '2XL',
                quantity: 2,
                price: '₱675',
                total: '₱1,350',
            },
        ],
        subtotal: '₱4,860',
        shippingCost: '₱60',
        discount: '- ₱0',
        total: '₱4,920',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 md:p-6">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 md:px-10 py-8 md:py-10 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                <CheckCircle className="w-8 h-8 md:w-10 md:h-10" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">Payment Successful!</h1>
                                <p className="text-emerald-100 text-sm md:text-base mt-1">
                                    Thank you for your purchase. Your transaction has been completed successfully.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 text-sm font-mono">
                            {orderData.orderId}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Column - Main Details */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Transaction & Payment */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Transaction ID</div>
                                    <div className="text-gray-800 font-mono font-semibold text-lg mt-1">{orderData.transactionId}</div>
                                    <div className="text-xs text-gray-400 mt-1">Total Paid</div>
                                    <div className="text-2xl font-bold text-emerald-600">{orderData.totalPaid}</div>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Payment Method</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <CreditCard className="w-4 h-4 text-gray-600" />
                                        <span className="text-gray-800 font-semibold">{orderData.paymentMethod}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">(₱ {orderData.cardLast4})</div>
                                    <div className="text-xs text-gray-400 mt-2">Date & Time</div>
                                    <div className="text-sm text-gray-700 font-medium">
                                        {orderData.date} <span className="text-gray-400">•</span> {orderData.time}
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Truck className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-semibold text-gray-800">Delivery Information</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{orderData.customer.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{orderData.customer.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-gray-700">{orderData.customer.address}</span>
                                            <br />
                                            <span className="text-gray-500 text-xs">
                                                {orderData.customer.city}, {orderData.customer.country}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-emerald-600" />
                                        <h3 className="font-semibold text-gray-800">Order Summary</h3>
                                    </div>
                                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
                                        View Full Order Details
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {orderData.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                                            <div>
                                                <div className="font-medium text-gray-800">{item.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    Color: {item.color} · Size: {item.size}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                                                <div className="font-semibold text-gray-800">{item.price}</div>
                                                <div className="text-xs text-gray-400">{item.total}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Summary & Actions */}
                        <div className="space-y-6">
                            {/* Estimated Delivery */}
                            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <CalendarDays className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-semibold text-gray-800">Estimated Delivery</h3>
                                </div>
                                <div className="text-lg font-bold text-emerald-700">{orderData.estimatedDelivery}</div>
                                <p className="text-xs text-gray-600 mt-1">We will notify you once your order is shipped.</p>
                            </div>

                            {/* Cost Summary */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <h3 className="font-semibold text-gray-800 mb-3">Cost Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="text-gray-700">{orderData.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Shipping Cost</span>
                                        <span className="text-gray-700">{orderData.shippingCost}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-2">
                                        <span className="text-gray-500">Discount</span>
                                        <span className="text-gray-400">{orderData.discount}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-300 pt-3 mt-1">
                                        <span className="font-bold text-gray-800">Total Paid</span>
                                        <span className="font-bold text-emerald-600 text-lg">{orderData.total}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2.5">
                                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 shadow-md hover:shadow-emerald-300 flex items-center justify-center gap-2">
                                    <FileDown className="w-5 h-5" />
                                    Download Invoice PDF
                                </button>
                                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 shadow-md hover:shadow-gray-300 flex items-center justify-center gap-2">
                                    <Receipt className="w-5 h-5" />
                                    View Invoice
                                </button>
                                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-200 border-2 border-gray-200 hover:border-emerald-300 flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-400">
                            Thank you for shopping with <span className="font-semibold text-gray-600">Oqtos</span>. We appreciate your trust in us!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;