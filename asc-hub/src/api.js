import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const ACTIONS = {
  HOME: "home",
  WORKSHOPS: "workshops",
  QUICK_LINKS: "quick_links",
  STAFF: "staff",
  RESOURCES: "resources",
};

export async function callAPI({ method = "GET", action, data = {} }) {
  try {
    if (method.toUpperCase() === "GET") {
      const res = await axios.get(API_URL, {
        params: {
          action,
          ...data,
        },
      });
      return res.data;
    }

    if (method.toUpperCase() === "POST") {
      const res = await axios.post(
        API_URL,
        {
          action,
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
