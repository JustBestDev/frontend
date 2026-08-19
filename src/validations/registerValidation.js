import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "กรุณากรอกชื่อ - นามสกุล"),
    email: z.string().trim().min(1, "กรุณากรอกอีเมล").email("รูปแบบอีเมลไม่ถูกต้อง"),
    password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string().min(1, "กรุณายืนยันรหัสผ่าน"),
    birthDate: z.string().min(1, "กรุณาเลือกวันเกิด"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });
