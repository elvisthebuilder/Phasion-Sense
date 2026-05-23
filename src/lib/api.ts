import axios from "axios";
import { config } from "@/config";

export const api = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
