import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

async function initRepoWebhook() {
  // TODO: a client side component should check the timezone of the user, otherwise RSC may use the server's timezone
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const res = await fetch(
    `http://localhost:3000/api/github/puneet-sarhali?userId=${user?.id}&goalId=cli9da24f0001iwkyz8pn34sl`
  )
  const data = await res.json()
  console.log(data)
}

export async function InitGithubRepo() {
  await initRepoWebhook()
  return <div></div>
}
