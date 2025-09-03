"use client";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://geniusgrid-backend-pxk1.onrender.com",
  withCredentials: false, // since you're using JWT not cookies
});

export default api;
