import Link from "next/link"
import {
  AlarmCheck,
  BellRing,
  DollarSign,
  Github,
  LayoutTemplate,
  TrendingUp,
} from "lucide-react"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/shadcn/taxonomy",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Track Progress. <br /> Meet Deadlines. <br /> Stay Accountable.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Level up your programming skills and achieve your goals with
            GitHub-powered accountability!
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Note: This project is still work in progress. Use only for testing.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[250px] flex-col justify-between rounded-md p-6">
              <TrendingUp className="h-12 w-12 " />
              <div className="space-y-2">
                <h3 className="font-bold">Goal Setting</h3>
                <p className="text-sm text-muted-foreground">
                  Easily set programming goals and milestones to track your
                  progress and stay motivated.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[250px] flex-col justify-between rounded-md p-6">
              <Github className="h-12 w-12 " />
              <div className="space-y-2">
                <h3 className="font-bold">GitHub Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Seamlessly integrate with your GitHub repositories to retrieve
                  relevant data and monitor your activity.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[250px] flex-col justify-between rounded-md p-6">
              <DollarSign className="h-12 w-12 " />
              <div className="space-y-2">
                <h3 className="font-bold">Accountability Stakes</h3>
                <p className="text-sm text-muted-foreground">
                  Put your money on the line as a commitment to completing your
                  goals, adding an extra layer of motivation.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[250px] flex-col justify-between rounded-md p-6">
              <AlarmCheck className="h-12 w-12 " />
              <div className="space-y-2">
                <h3 className="font-bold">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your daily progress, commit frequency, pull request
                  completion, and other metrics to visualize your achievements.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[250px] flex-col justify-between rounded-md p-6">
              <BellRing className="h-12 w-12 " />
              <div className="space-y-2">
                <h3 className="font-bold">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive timely notifications and reminders to stay on track
                  with your goals, deadlines, and accountability stakes.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[250px] flex-col justify-between rounded-md p-6">
              <LayoutTemplate className="h-12 w-12 " />
              <div className="space-y-2">
                <h3 className="font-bold">Goal Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from predefined goal templates or create custom goals
                  tailored to your specific programming needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
