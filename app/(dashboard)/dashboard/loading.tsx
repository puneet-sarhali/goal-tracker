import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { GoalItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <GoalItem.Skeleton />
        <GoalItem.Skeleton />
        <GoalItem.Skeleton />
        <GoalItem.Skeleton />
        <GoalItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
