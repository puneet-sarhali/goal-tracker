import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const goalCreateSchema = z.object({
  type: z.enum(["COMMITS", "LINES"]),
  target: z.number().min(1),
  frequency: z.enum(["DAILY", "WEEKLY"]),
  start: z.string(),
  end: z.string(),
  cheatDays: z.number().min(0),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
