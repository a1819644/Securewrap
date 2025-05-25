import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import cors from "cors"; // Default import for cors
import * as admin from "firebase-admin";
const stripe = require("stripe")(
  ""
);
admin.initializeApp();
const db = admin.firestore();
// Initialize CORS middleware

const corsHandler = cors({ origin: true }); // Allow all origins
async function checkRateLimit(
  req: any,
  res: any,
  maxRequests = 5,
  windowInSeconds = 60
) {
  const ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "unknown";

  const now = admin.firestore.Timestamp.now();
  const docRef = db.collection("ip_logs").doc(ip);
  const doc = await docRef.get();

  if (doc.exists) {
    const data = doc.data();
    const lastRequest = data?.lastRequest?.toDate();
    const count = data?.count || 0;

    if (lastRequest) {
      const diffInSeconds =
        (now.toDate().getTime() - lastRequest.getTime()) / 1000;

      if (diffInSeconds < windowInSeconds) {
        if (count >= maxRequests) {
          res
            .status(429)
            .json({ error: "Too many requests. Please try again later." });
          return false; // Reject request
        } else {
          await docRef.update({
            count: admin.firestore.FieldValue.increment(1),
            lastRequest: now,
          });
        }
      } else {
        // Window expired, reset count
        await docRef.set({
          count: 1,
          lastRequest: now,
        });
      }
    }
  } else {
    // First request from this IP
    await docRef.set({
      count: 1,
      lastRequest: now,
    });
  }

  return true; // Allow request
}

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getAllProductsAndItems = onRequest((req, res) => {
  // Enable CORS
  corsHandler(req, res, async () => {
    const allowed = await checkRateLimit(req, res, 10, 60); // Allow 10 requests per 60 seconds
    if (!allowed) return; // Block if over limit
    try {
      const result: Record<
        string,
        Record<string, FirebaseFirestore.DocumentData>
      > = {};

      const productCategoriesSnap = await db
        .collection("products")
        .listDocuments();

      for (const categoryDocRef of productCategoriesSnap) {
        const categoryName = categoryDocRef.id;
        result[categoryName] = {};
        const itemsCollectionRef = db
          .collection("products")
          .doc(categoryName)
          .collection("items");

        const itemsSnap = await itemsCollectionRef.get();

        itemsSnap.forEach((itemDoc) => {
          result[categoryName][itemDoc.id] = itemDoc.data();
        });
      }

      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error reading product items:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

export const getNewArrivals = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const allowed = await checkRateLimit(req, res, 10, 60); // Allow 10 requests per 60 seconds
    if (!allowed) return; // Block if over limit
    // Apply CORS to this request handler
    try {
      const result: Record<
        string,
        Record<string, FirebaseFirestore.DocumentData>
      > = {};

      const productCategoriesSnap = await db
        .collection("products")
        .listDocuments();

      for (const categoryDocRef of productCategoriesSnap) {
        const categoryName = categoryDocRef.id;
        result[categoryName] = {};

        const itemsCollectionRef = db
          .collection("products")
          .doc(categoryName)
          .collection("items");

        const itemsSnap = await itemsCollectionRef.get();

        for (const itemDoc of itemsSnap.docs) {
          const rawData = itemDoc.data();

          // Sanitize function to clean bad characters
          const sanitizeData = (obj: any): any => {
            if (typeof obj === "string") {
              return obj.replace(/[\u0000-\u001F\u007F"\\]/g, "");
            } else if (Array.isArray(obj)) {
              return obj.map(sanitizeData);
            } else if (typeof obj === "object" && obj !== null) {
              const clean: any = {};
              for (const key in obj) {
                clean[key] = sanitizeData(obj[key]);
              }
              return clean;
            }
            return obj;
          };

          // Normalize fields
          const data = sanitizeData(rawData);
          if (data.price && typeof data.price === "string") {
            data.price = parseFloat(data.price);
          }
          if (data.rating && typeof data.rating === "string") {
            data.rating = parseFloat(data.rating);
          }

          result[categoryName][itemDoc.id] = data;
          break; // Only one item per category
        }
      }

      res.set("Content-Type", "application/json");
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error reading product items:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

export const validatePromoCode = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { code } = req.body;

      const validCodes: Record<string, number> = {
        SECUREWRAP10: 10.0,
        SAVE5: 5.0,
        SECUREWRAPFIRSTORDER: 5.0,
      };

      if (validCodes[code]) {
        res.status(200).json({
          valid: true,
          discountAmount: validCodes[code], // Use discountAmount here
        });
      } else {
        res.status(200).json({ valid: false });
      }
    } catch (error) {
      console.error("Error validating promo code:", error);
      res.status(500).json({ error: "Something went wrong." });
    }
  });
});

export const createCheckoutSession = onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const { items, deliveryFee = 0, discount = 0, paymentFee = 0 } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res
          .status(400)
          .json({ error: "Cart is empty or invalid items format" });
      }

      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: "aud",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      // Calculate GST (10% of subtotal)
      const subtotal = items.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );
      const gstAmount = subtotal * 0.1;

      lineItems.push({
        price_data: {
          currency: "aud",
          product_data: {
            name: "GST (10%)",
            images: [],
          },
          unit_amount: Math.round(gstAmount * 100),
        },
        quantity: 1,
      });

      // Add delivery fee if present
      if (deliveryFee > 0) {
        lineItems.push({
          price_data: {
            currency: "aud",
            product_data: {
              name: "Delivery Fee",
              images: [],
            },
            unit_amount: Math.round(deliveryFee * 100),
          },
          quantity: 1,
        });
      }

      // Add payment/card processing fee if present
      if (paymentFee > 0) {
        lineItems.push({
          price_data: {
            currency: "aud",
            product_data: {
              name: "Card Payment Fee",
              images: [],
            },
            unit_amount: Math.round(paymentFee * 100),
          },
          quantity: 1,
        });
      }

      // Add discount as a negative line item
      if (discount > 0) {
        lineItems.push({
          price_data: {
            currency: "aud",
            product_data: {
              name: "Discount",
              images: [],
            },
            unit_amount: -Math.round(discount * 100),
          },
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://www.securewrap.com.au",
        cancel_url: "https://www.securewrap.com.au/Cart",
        automatic_tax: {
          enabled: false,
        },
      });

      return res.status(200).json({ id: session.id });
    } catch (error: any) {
      console.error("Error creating Stripe checkout session:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
