"use client";

import {
  Banknote,
  CreditCard,
} from "lucide-react";

const paymentMethods = [
  {
    id: "COD",
    name: "COD",
    description: "Pay when you receive your order",
    badge: "Popular",
    icon: Banknote,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "CARD",
    name: "Online",
    description: "Visa, Mastercard, Nexus & more",
    badge: "secure",
    icon: CreditCard,
    iconBg: "bg-blue-100",
    iconColor: "text-primary",
  },
];

interface PaymentMethodsProps {
  selected?: string;
  onChange?: (value: string) => void;
}

export default function PaymentMethods({ selected, onChange }: PaymentMethodsProps) {
  return (
    <div className="flex md:flex-row flex-col gap-4 mt-2">
      {paymentMethods.map((method) => {
        const Icon = method.icon;

        return (
          <label
            key={method.id}
            className={`flex cursor-pointer items-center gap-4 border px-4 py-3 transition-all rounded flex-1 ${
              selected === method.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selected === method.id}
              onChange={(e) => onChange?.(e.target.value)}
              className="hidden"
            />

            {/* Radio */}
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 flex-shrink-0 ${
                selected === method.id
                  ? "border-primary"
                  : "border-gray-300"
              }`}
            >
              {selected === method.id && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </div>

            {/* Icon */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${method.iconBg} ${method.iconColor}`}
            >
              <Icon size={24} />
            </div>

            {/* Content */}
            <div className="flex-1 gap-1 flex flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">{method.name}</h4>

                {method.badge && (
                  <span className={`rounded uppercase px-2 py-0.5 text-[10px] font-medium ${
                    selected === method.id 
                      ? "bg-primary/10 text-primary" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {method.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500">
                {method.description}
              </p>
            </div>
          </label>
        );
      })}
    </div>
  );
}