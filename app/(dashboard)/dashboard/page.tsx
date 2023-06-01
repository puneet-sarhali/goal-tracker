import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { InitGithubRepo } from "@/components/init-github-repo"
import { PostCreateButton } from "@/components/post-create-button"
import { GoalItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const goals = await db.goal.findMany({
    where: {
      authorId: user.id,
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Goals" text="Create and manage goals.">
        <PostCreateButton />
        {/* @ts-expect-error Server Component */}
        <InitGithubRepo />
      </DashboardHeader>
      <div>
        {goals?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {goals.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
