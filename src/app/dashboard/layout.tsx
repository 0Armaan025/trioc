import LeftSideBar from "@/components/custom/left-side-bar";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="min-h-screen   bg-[#0e0f0e] flex flex-row items-start">

      <LeftSideBar />
      {children}
    </div >
  );
}

export default Layout;
