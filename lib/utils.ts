import { ClassValue, clsx } from "clsx"
import daysjs from "dayjs"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: Date): string {
  return daysjs(input).format("DD-MM-YYYY HH:mm:ss")
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
