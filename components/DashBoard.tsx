"use client";

import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faUser,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logo from "@components/Logo";
import { useAuth } from "@context/AuthContext";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faHome, faSignOutAlt, faUser, faUserGraduate);

export default function DashBoard({
  onLinkClick,
}: {
  onLinkClick: () => void;
}) {
  const pathname = usePathname();
  const { user, logOut } = useAuth();

  if (pathname == "/login" || pathname == "/signup") {
    return null;
  }

  const tabs = [
    { name: "Home", route: "/", icon: faHome, tabIndex: 0 },
    { name: "Jobs", route: "/jobs", icon: faUserGraduate, tabIndex: 1 },
    { name: "Profile", route: "/profile", icon: faUser, tabIndex: 2 },
  ];

  const getActiveTab = (pathname: string): number => {
    const routes = ["/", "/jobs", "/profile"];
    let index = 0;

    routes.forEach((route: string, i: number) => {
      if (pathname.startsWith(route)) {
        index = i;
      }
    });

    return index;
  };

  const activeTab = getActiveTab(pathname);

  const logout = () => {
    logOut();
    onLinkClick();
  };

  return (
    <div className="bg-primary text-white p-2 h-full flex flex-col justify-between">
      <div>
        <Logo />

        <div className="flex flex-col gap-4 mt-6">
          {tabs.map((tab, i) => (
            <Link
              key={i}
              href={tab.route}
              onClick={onLinkClick}
              className={`${
                activeTab === tab.tabIndex && "bg-secondary shadow"
              } p-4 rounded-lg text-xl hover:bg-secondary transition duration-200 w-full flex items-center gap-2`}
            >
              <FontAwesomeIcon icon={tab.icon} />
              <p>{tab.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 text-lg w-full mt-4">
        <p className="text-lg">{user?.first_name + " " + user?.last_name}</p>
        <button
          onClick={logout}
          className="rounded-lg text-xl flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  );
}
