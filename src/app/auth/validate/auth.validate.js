import { z } from 'zod';

const validateEmail = z.object({
    email: z.string().email({
        message: "Invalid email format"
    }),
});

export default validateEmail;