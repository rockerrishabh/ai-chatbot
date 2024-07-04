import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return <div>{JSON.stringify(session)}</div>;
}

export default Dashboard;
