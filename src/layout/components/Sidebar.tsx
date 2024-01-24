import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuilding,
  faClipboard,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useRouter } from "next/router";
export type NavItem = {
  label: string;
  href: string;
};
export const defaultNavItems: NavItem[] = [
  {
    label: "Нүүр",
    href: "/",
  },
  {
    label: "Хэрэглэгчид",
    href: "/users",
  },
  {
    label: "Байгууллага",
    href: "/organization",
  },
  {
    label: "Төхөөрөмж",
    href: "/device",
  },
];
type Props = {
  collapsed: boolean;
};
const Sidebar = ({ collapsed }: Props) => {
  const router = useRouter();
  return (
    <div
      className={classNames({
        "bg-white fixed pt-3 md:sticky top-16 md:top-0 left-0 z-10 h-screen w-[180px] border border-solid border=[#e5e7eb] px-1":
          true,
        "transition-all duration-300 ease-in-out": true,
        "w-[200px] ": !collapsed,
        "w-0": collapsed,
      })}
    >
      <div className="flex flex-col justify-start items-center h-full sticky">
        <nav>
          <ul className="my-2 flex flex-col gap-2 items-stretch">
            <Link href={defaultNavItems[0].href}>
              <li className="relative flex w-full justify-between">
                {!collapsed && (
                  <div
                    className={classNames(
                      "md:flex font-bold w-full px-2 py-1 rounded-lg flex items-center gap-2",
                      {
                        "bg-gradient-to-br from-pink-600 to-purple-900 text-white":
                          router.pathname === defaultNavItems[0].href,
                      }
                    )}
                  >
                    <FontAwesomeIcon icon={faHome} />
                    <span>{!collapsed && defaultNavItems[0].label}</span>
                  </div>
                )}
              </li>
            </Link>
            <Link href={defaultNavItems[1].href}>
              <li className="relative flex w-full justify-between">
                {!collapsed && (
                  <div
                    className={classNames(
                      "md:flex font-bold w-full px-2 py-1 rounded-lg flex items-center gap-2",
                      {
                        "bg-gradient-to-br from-pink-600 to-purple-900 text-white":
                          router.pathname === defaultNavItems[1].href,
                      }
                    )}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>{!collapsed && defaultNavItems[1].label}</span>
                  </div>
                )}
              </li>
            </Link>
            <Link href={defaultNavItems[2].href}>
              <li className="relative flex w-full justify-between">
                {!collapsed && (
                  <div
                    className={classNames(
                      "md:flex font-bold w-full px-2 py-1 rounded-lg flex items-center gap-2",
                      {
                        "bg-gradient-to-br from-pink-600 to-purple-900 text-white":
                          router.pathname === defaultNavItems[2].href,
                      }
                    )}
                  >
                    <FontAwesomeIcon icon={faBuilding} />
                    <span>{!collapsed && defaultNavItems[2].label}</span>
                  </div>
                )}
              </li>
            </Link>
            <Link href={defaultNavItems[3].href}>
              <li className="relative flex w-full justify-between">
                {!collapsed && (
                  <div
                    className={classNames(
                      "md:flex font-bold w-full px-2 py-1 rounded-lg flex items-center gap-2",
                      {
                        "bg-gradient-to-br from-pink-600 to-purple-900 text-white":
                          router.pathname === defaultNavItems[3].href,
                      }
                    )}
                  >
                    <FontAwesomeIcon icon={faClipboard} />
                    <span>{!collapsed && defaultNavItems[3].label}</span>
                  </div>
                )}
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
