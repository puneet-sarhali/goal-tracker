import { headers } from "next/headers"

import { env } from "@/env.mjs"

export async function POST(req: Request) {
  const { owner, repo } = await req.json()
  console.log(owner, repo)
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/hooks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${env.GITHUB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        name: "web",
        active: true,
        events: ["push"],
        config: {
          url: "http://localhost:3000/api/webhooks/github",
          content_type: "json",
        },
      }),
    }
  )
  const json = await res.json()
  console.log(json)

  return new Response(JSON.stringify({ owner, repo }), { status: 200 })
}
