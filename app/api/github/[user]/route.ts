import { NextRequest } from "next/server"
import dayjs from "dayjs"
import { z } from "zod"

import { db } from "@/lib/db"

export async function GET(req: NextRequest, context: any) {
  try {
    const { searchParams } = new URL(req.url)
    const goalId = searchParams.get("goalId")
    const userId = searchParams.get("userId")

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
    // TODO: shouldn't be goal start, get week start
    if (goal?.frequency === "WEEKLY") {
      const dueDateWeekday = dayjs(goal.start).day()
      const todayWeekday = dayjs().day()
      const weekday =
        dueDateWeekday < todayWeekday ? dueDateWeekday : dueDateWeekday - 7
      since = dayjs().day(weekday).startOf("day")
    }

    const response = await fetch(
      `https://api.github.com/users/puneet-sarhali/events?per_page=50`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    )
    const commits = await response.json()
    let userCommits: any[] = []
    commits.map((commit: any) => {
      if (commit.type === "PushEvent") {
        if (dayjs(commit.created_at).isAfter(since)) {
          userCommits.push(commit)
          // commit.payload.commits.map((commit: any) => {
          //   if (
          //     commit.author.name === "puneet-sarhali" ||
          //     commit.author.email === "pssarhali@gmail.com"
          //   ) {
          //     userCommits.push(commit)
          //   }
          // })
        }
      }
    })
    return new Response(JSON.stringify(userCommits), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("what the fuck", { status: 403 })
  }
}
