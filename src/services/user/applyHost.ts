/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

import { deleteCookie } from "../auth/tokenHandlers";

export async function applyHost() {
  try {
    const response = await serverFetch.post("/auth/apply-host");

    const result = await response.json();
    if (result.success) {

    await deleteCookie("accessToken");
    }
 
    return result;

  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
