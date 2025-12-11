import { ZodObject } from "zod"

export const zodValidator = <T>(payload: T, schema: ZodObject) => {
    const validatedPayload = schema.safeParse(payload)

    if (!validatedPayload.success) {
        return {
            success: false,
            errors: validatedPayload.error.issues.map(issue => {
                // Convert path array to dot notation for easier field matching
                // e.g., ["client", "name"] becomes "client.name"
                const fieldPath = issue.path.join('.')
                return {
                    field: fieldPath || 'form',
                    message: issue.message,
                }
            })
        }
    }

    return {
        success: true,
        data: validatedPayload.data,
    };
}