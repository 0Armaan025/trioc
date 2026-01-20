"use client";
import LeftSideBar from "@/components/custom/left-side-bar";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Dashboard = () => {

  const { data: session, isPending, error, refetch } = authClient.useSession();


  if (!session?.user) {
    redirect("/auth");
  }

  return (
    <div className="dashboard min-h-screen flex flex-row items-start text-white ">



      <div className="content_side ml-8 mt-4">

        {/* checks what item is there according to link */}
      </div>
    </div>
  );

}

export default Dashboard;
