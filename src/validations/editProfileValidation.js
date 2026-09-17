import { z } from "zod";
import { getLocalToday } from "../utils/dateUtils";

function isValidDate(value) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const [, year, month, day] = match;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) &&
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() + 1 === Number(month) &&
    date.getUTCDate() === Number(day);
}

export const editProfileSchema = z.object({
  name: z.string().trim().min(1, "กรุณากรอกชื่อผู้ใช้งาน"),
  birthDate: z.string()
    .min(1, "กรุณาเลือกวันเกิด")
    .refine(isValidDate, "วันเกิดไม่ถูกต้อง")
    .refine(
      (value) => value <= getLocalToday(),
      "วันเกิดต้องไม่เป็นวันที่ในอนาคต",
    ),
});
