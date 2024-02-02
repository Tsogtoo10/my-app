import Header from "./Header";
import { useState } from "react";
type Props = {
  children: any;
};
const LoginLayout = ({ children }: Props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  return (
    <>
      <Header
        collapsed={collapsed}
        setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
      />
      <div className="h-auto flex items-start justify-start relative">
        <main className="w-full max-h-[80vh] overflow-y-auto">{children}</main>
      </div>
    </>
  );
};
export default LoginLayout;
