async function initRepoWebhook() {
  // TODO: a client side component should check the timezone of the user, otherwise RSC may use the server's timezone
  const res = await fetch(
    "http://localhost:3000/api/github/puneet-sarhali?goalId=cli9dawja0003iwkyelmp1jvh"
  )
}

export async function InitGithubRepo() {
  await initRepoWebhook()
  return <div></div>
}
