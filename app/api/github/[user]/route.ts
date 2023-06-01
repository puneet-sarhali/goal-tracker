import dayjs from "dayjs"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function GET(req: Request, context: any) {
  try {
    // Ensure user is authentication and has access to this user.
    // const session = await getServerSession(authOptions)
    // const currentUser = await getCurrentUser()
    // console.log("current user", currentUser)
    // console.log("current session", session)
    // if (!session?.user) {
    //   return new Response(null, { status: 403 })
    // }

    const { searchParams } = new URL(req.url)
    const goalId = searchParams.get("goalId")

    if (!goalId) {
      return new Response("Missing goal ID", { status: 404 })
    }

    const { user } = context.params
    const today = dayjs().startOf("day")

    const goal = await db.goal.findUnique({
      where: { id: goalId },
    })

    if (!goal) {
      return new Response("Goal not found", { status: 404 })
    }

    if (goal.end && dayjs(goal.end).isBefore(today)) {
      return new Response("Goal has ended", { status: 404 })
    }
    let since = dayjs()
    if (goal?.frequency === "DAILY") {
      since = dayjs(new Date()).startOf("day")
    }
    if (goal?.frequency === "WEEKLY") {
      const weekday = dayjs(goal.start).day()
      since = dayjs()
        .day(weekday - 7)
        .startOf("day")
    }

    // // TODO: should check users weekly deadline to calculate the since date
    const response = await fetch(
      `https://api.github.com/users/${user}/events?per_page=25`,
      {
        next: {
          revalidate: 0,
        },
      }
    )
    const commits = await response.json()
    console.log("hello")
    commits.map((commit: any) => {
      if (commit.type === "PushEvent") {
        if (dayjs(commit.created_at).isAfter(since)) {
          commit.payload.commits.map((commit: any) => {
            if (commit.author.name === "puneet-sarhali") {
              console.log(commit)
            }
          })
        }
      }
    })
    return new Response(JSON.stringify("yessir"), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("what the fuck", { status: 403 })
  }
}
