import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../../assets/Products/CheckoutInfoStyle.css";

// Define the CartItem interface
interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutInfoProps {
  isFormValid: boolean;
  isDeliveryMethod: string; // "delivery" or "pickup"
}

const stripePromise = loadStripe(
  "pk_live_51RFqEeL4AeLgMjV3A4zmsWxbRCRtNPVzCRznniYStpXi3onGLh6yReT6HY9AhNzVC072byPh7q2wrxAszEQDCJDy00LBvevrIX"
);

const CheckoutInfo: React.FC<CheckoutInfoProps> = ({
  isFormValid,
  isDeliveryMethod,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const DELIVERY_FEE = 25;
  const MIN_DELIVERY_AMOUNT = 100;
  const GST_RATE = 0.1;
  const PAYMENT_FEE_RATE = 0.017;

  const getSubtotal = (cart: CartItem[]) =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const subtotal = getSubtotal(cart);

  // Apply delivery fee only if delivery is selected
  const deliveryFee =
    isDeliveryMethod === "delivery" && subtotal < 500 ? DELIVERY_FEE : 0;

  // GST (assuming included in total — or adjust if not)
  const gstAmount = (subtotal + deliveryFee - discount) * GST_RATE;
  const paymentFee =
    (subtotal + deliveryFee - discount + gstAmount) * PAYMENT_FEE_RATE;

  // Final total
  const total = subtotal + deliveryFee - discount + gstAmount + paymentFee;

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  const handleCheckout = async () => {
    if (!isFormValid) {
      alert("Please fill in all the fields before proceeding.");
      return;
    }

    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add at least one product before proceeding."
      );
      return;
    }

    const stripe = await stripePromise;
    try {
      const response = await fetch(
        "https://us-central1-wrap-17bfd.cloudfunctions.net/createCheckoutSession",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.map(({ name, price, quantity, image }) => ({
              name,
              price,
              quantity,
              image,
            })),
            deliveryFee,
            discount,
            paymentFee,
          }),
        }
      );

      const session = await response.json();

      if (session.id) {
        const { error } = await stripe!.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) {
          console.error("Stripe redirect error:", error);
        }
      }
    } catch (err) {
      console.error("Checkout session error:", err);
    }
  };

  const handleApplyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!promoCode) {
      alert("Please enter a promo code.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://us-central1-wrap-17bfd.cloudfunctions.net/validatePromoCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: promoCode }),
        }
      );

      const data = await response.json();
      if (data.valid) {
        setDiscount(data.discountAmount);
        alert(`Promo code applied! Discount: $${data.discountAmount}`);
      } else {
        setDiscount(0);
        alert("Invalid promo code.");
      }
    } catch (err) {
      console.error("Promo code error:", err);
      alert("There was an error applying the promo code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-info-container">
      <h2>Items</h2>
      <hr />
      <div className="col listed-items">
        {cart.map((item) => (
          <div key={item.id} className="items">
            <div className="row items-containers">
              <div className="col">
                <p>{item.name}</p>
              </div>
              <div className="col">
                <p>Qt: {item.quantity}</p>
              </div>
              <div className="col">
                <h5>${(item.price * item.quantity).toFixed(2)}</h5>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <div
          style={{ fontSize: "14px", fontWeight: "300", paddingInline: "5px" }}
        >
          <SummaryRow label="Subtotal" value={subtotal} />
          <SummaryRow label="Discount" value={discount} />{" "}
          <SummaryRow label="Payment Fee (1.7%)" value={paymentFee} />
          <SummaryRow label="Delivery Fee" value={deliveryFee} />
          <SummaryRow label="GST (10%)" value={gstAmount} />
          <SummaryRow label="Total" value={total} isBold />
        </div>
        <div
          className="promo-code-container mb-3"
          style={{ display: "flex", gap: "10px" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-outline-primary"
            onClick={handleApplyPromoCode}
            disabled={loading}
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>
        <div className="checkout-bttn row-cols-1">
          <button
            className="btn btn-primary"
            onClick={handleCheckout}
            disabled={
              (isDeliveryMethod === "delivery" &&
                subtotal < MIN_DELIVERY_AMOUNT) ||
              !isFormValid
            }
          >
            Make a payment
          </button>
        </div>
        {subtotal >= 500 && isDeliveryMethod === "delivery" && (
          <div style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
            🎉 You’ve qualified for free delivery!
          </div>
        )}
        {isDeliveryMethod === "delivery" && subtotal < MIN_DELIVERY_AMOUNT && (
          <Warning
            message={`Minimum order of $${MIN_DELIVERY_AMOUNT} is required for delivery.`}
          />
        )}
        {subtotal < MIN_DELIVERY_AMOUNT && (
          <Warning message="Orders below $100 are available for pickup only." />
        )}
        {!isFormValid && (
          <Warning message="Please fill all the fields before proceeding." />
        )}
      </div>
    </div>
  );
};

// Reusable components for Summary and Warning
const SummaryRow = ({
  label,
  value,
  isBold = false,
}: {
  label: string;
  value: number;
  isBold?: boolean;
}) => (
  <div className={`row ${label.toLowerCase()}`}>
    <div className="col-9">
      <p style={isBold ? { fontWeight: "bold" } : {}}>{label}</p>
    </div>
    <div className="col">
      <h5 className="amount" style={isBold ? { fontWeight: "bold" } : {}}>
        ${value.toFixed(2)}
      </h5>
    </div>
  </div>
);

const Warning = ({ message }: { message: string }) => (
  <div className="warning-message mt-2">
    <p style={{ color: "red", fontSize: "12px" }}>{message}</p>
  </div>
);

export default CheckoutInfo;
