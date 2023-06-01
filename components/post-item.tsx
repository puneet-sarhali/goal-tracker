import { Goal } from "@prisma/client"
import {
  CalendarClock,
  DollarSign,
  Flame,
  Github,
  TrendingUp,
} from "lucide-react"

// delete this
import dayjs from "@/lib/dayjs"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface goalItemProps {
  goal: Goal
}

export function GoalItem({ goal }: goalItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <h2 className="flex gap-2 font-semibold mb-8">
          <Github></Github>
          {`${
            goal.target
          } ${goal.type.toLowerCase()} ${goal.frequency.toLowerCase()}`}
        </h2>
        <div>
          <ul className="flex gap-4 [&>*]:bg-muted [&>*]:p-4 [&>*]:rounded-md">
            <li>
              <DollarSign></DollarSign>
              <p>25$</p>
            </li>
            <li>
              <CalendarClock></CalendarClock> {goal.end.toLocaleString()}
            </li>
            <li>
              <Flame></Flame> {goal.streak}
            </li>
            <li>
              <TrendingUp></TrendingUp> 1 / {goal.target}
            </li>
          </ul>
        </div>
      </div>
      {/* <PostOperations post={{ id: post.id, title: post.title }} /> */}
    </div>
  )
}

GoalItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
