import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DropdownMenu from "@/components/common/DropdownMenu";
type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};
const Header = ({ collapsed, setCollapsed }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between h-16 px-5">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg"
            style={{
              background: "#f5f4f5",
            }}
            icon={faBars}
          />
          <Link href="/" className="text-black text-lg font-semibold">
            Admin panel
          </Link>
        </div>
        <div onClick={() => setOpen(!open)}>
          <Image
            className="object-cover h-8 rounded-full"
            src="/logo.jpg"
            alt="logo"
            width={32}
            height={32}
          />
        </div>
      </div>
      {open && <DropdownMenu />}
    </div>
  );
};
export default Header;
