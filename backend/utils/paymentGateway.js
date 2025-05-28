const axios = require("axios");
const ApiError = require("./ApiError");

const store = process.env.TELR_STORE_ID;
const authkey = process.env.TELR_AUTH_KEY;
const authorised = process.env.TELR_AUTHORISED_URL;
const declined = process.env.TELR_DECLINED_URL;
const cancelled = process.env.TELR_CANCELLED_URL;
const test = process.env.NODE_ENV !== "production" ? "1" : "0";

/**
 * Creates a payment order with Telr payment gateway
 * @param {string} cartId - The unique cart ID for the order
 * @param {number} amount - The order amount
 * @param {string} description - The order description
 * @returns {Promise<{ref: string, url: string}>} - Payment reference and URL
 * @throws {ApiError} If payment gateway request fails
 */
exports.createPaymentOrder = async (cartId, amount, description) => {
  const options = {
    method: "POST",
    url: "https://secure.telr.com/gateway/order.json",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    data: {
      method: "create",
      store,
      authkey,
      framed: 0,
      order: {
        cartid: cartId,
        test,
        amount,
        currency: "SAR",
        description,
      },
      return: {
        authorised,
        declined,
        cancelled,
      },
    },
  };

  const { data } = await axios.request(options);

  if (!data || data.error || !data.order) {
    throw new ApiError("Error getting payment link", 500);
  }

  const { order } = data;
  const { ref, url } = order;

  if (!ref || !url) {
    throw new ApiError("Error getting payment link", 500);
  }

  return { ref, url };
};
