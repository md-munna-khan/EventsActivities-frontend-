"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { logoutUser } from "@/services/auth/logoutUser";
import { redirect } from "next/navigation";

export interface IHostApplicationData {
  bio?: string;
  experience?: string;
  specialties?: string[];
  portfolio?: string;
  contactNumber?: string;
  location?: string;
}

export async function applyHostAction(_prevState: any, formData: FormData): Promise<any> {
  try {
    const specialtiesStr = formData.get("specialties") as string;
    const specialties = specialtiesStr 
      ? specialtiesStr.split(",").map(s => s.trim()).filter(s => s.length > 0)
      : [];

    const data: IHostApplicationData = {
      bio: formData.get("bio") as string,
      experience: formData.get("experience") as string,
      specialties: specialties.length > 0 ? specialties : undefined,
      portfolio: formData.get("portfolio") as string || undefined,
      contactNumber: formData.get("contactNumber") as string,
      location: formData.get("location") as string,
    };

    const response = await serverFetch.post("/user/apply-host", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.success) {
      // Logout user after successful application
      await logoutUser();
    }

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error applying to become host:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to submit host application. Please try again.",
    };
  }
}

export async function applyToBecomeHost(data: IHostApplicationData) {
  try {
    const response = await serverFetch.post("/user/apply-host", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error applying to become host:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to submit host application. Please try again.",
    };
  }
}

export async function getHostApplicationStatus() {
  try {
    const response = await serverFetch.get("/user/host-application-status");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching host application status:", error);
    return {
      success: false,
      data: null,
    };
  }
}

