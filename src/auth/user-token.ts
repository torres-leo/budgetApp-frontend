import { cookies } from "next/headers";

export function getUserToken() {
  const token = cookies().get('BudgeAppToken')?.value;
  return token
}