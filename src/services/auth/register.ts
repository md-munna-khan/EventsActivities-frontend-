// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";

// import { loginUser } from "./loginUser";
// import { registerValidation } from "@/zod/auth.validation";

// export const registerClient = async (_currentState: any, formData: any): Promise<any> => {
//   try {
//     // Build payload from incoming FormData
//     // note: interests can be sent as multiple values, so use getAll if present
//     const rawInterests = typeof formData.getAll === "function" ? formData.getAll("interests") : (formData.get("interests") ? [formData.get("interests")] : []);
//     const payload = {
//       password: formData.get("password"),
//       client: {
//         name: formData.get("name"),
//         email: formData.get("email"),
//         bio: formData.get("bio"),
//         contactNumber: formData.get("contactNumber"),
//         location: formData.get("location"),
//         // ensure interests is an array of strings
//         interests: rawInterests.map((i: any) => String(i)),
//         // profilePhoto will be handled via FormData file upload; include as optional string if you want but backend will set it after cloud upload
//         profilePhoto: formData.get("profilePhoto") ? undefined : undefined,
//       },
//     };

//     // Validate using server-side zod schema (userValidation.createClient)
//     const validationResult = zodValidator(payload, registerValidation);
//     if (validationResult.success === false) {
//       return validationResult;
//     }

//     // Use validated data for constructing request to backend
//     const validatedPayload: any = validationResult.data;

//     // Build FormData to send to backend route (same pattern as your router expects: data JSON + optional file)
//     const newFormData = new FormData();
//     newFormData.append("data", JSON.stringify(validatedPayload));

//     // If a file input named 'file' (or 'profilePhoto') exists in the original formData, append it
//     // We'll accept either 'file' (old name) or 'profilePhoto' (new input)
//     const file = formData.get("file") ?? formData.get("profilePhoto");
//     console.log(file)
//     if (file) {
//       // file might be File or Blob
//       newFormData.append("file", file as Blob);
//     }

//     const res = await serverFetch.post("/user/create-client", {
//       body: newFormData,
//     });

//     const result = await res.json();

//     if (result.success) {
//       // Optionally auto-login user after successful registration (keeps previous behavior)
//       // The loginUser expects the original formData format (email/password)
//       await loginUser(_currentState, formData);
//     }
// console.log("Registration result:", result);
//     return result;
//   } catch (error: any) {
//     // Re-throw NEXT_REDIRECT errors so Next.js can handle them
//     if (error?.digest?.startsWith("NEXT_REDIRECT")) {
//       throw error;
//     }
//     console.error(error);
//     return {
//       success: false,
//       message:
//         process.env.NODE_ENV === "development"
//           ? error?.message ?? "Registration Failed"
//           : "Registration Failed. Please try again.",
//     };
//   }
// };









/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

import { loginUser } from "./loginUser";
import { registerValidation } from "@/zod/auth.validation";

export const registerClient = async (_currentState: any, formData: FormData): Promise<any> => {
  try {
    // Interests handling (works for single or multiple)
    const rawInterests = typeof formData.getAll === "function"
      ? formData.getAll("interests")
      : (formData.get("interests") ? [formData.get("interests")] : []);

    // Build payload WITHOUT profilePhoto (server will set after upload)
    const payload = {
      password: formData.get("password"),
      client: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        bio: String(formData.get("bio") ?? ""),
        contactNumber: String(formData.get("contactNumber") ?? ""),
        location: String(formData.get("location") ?? ""),
        interests: rawInterests.map((i: any) => String(i)),
        // DO NOT set profilePhoto here — let backend fill it after Cloudinary upload
      },
    };

    // Validate payload
    const validationResult = zodValidator(payload, registerValidation);
    if (validationResult.success === false) {
      return validationResult;
    }
    const validatedPayload: any = validationResult.data;

    // Build FormData for backend (data JSON + optional file)
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    // Accept file either from key 'file' (preferred for backend) or 'profilePhoto'
    const incomingFile = (typeof formData.get === "function") ? (formData.get("file") ?? formData.get("profilePhoto")) : null;

    // Only append if it's a real File with size > 0
    if (incomingFile && incomingFile instanceof File && incomingFile.size > 0) {
      // backend multer expects key 'file' (see your router), so append as 'file'
      newFormData.append("file", incomingFile);
    }

    const res = await serverFetch.post("/user/create-client", {
      body: newFormData,
    });

    const result = await res.json();

    if (result.success) {
      // optionally auto-login
      await loginUser(_currentState, formData);
    }

    console.log("Registration result:", result);
    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message ?? "Registration Failed"
          : "Registration Failed. Please try again.",
    };
  }
};

