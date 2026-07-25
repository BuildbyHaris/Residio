import SidebarItem from "./SidebarItem";
import { sidebarLinks, sidebarBottomLinks } from "../constants/sidebarLinks";

function Sidebar({ activeItem, onSelect, accountType, onSwitchToSeller }) {
  return (
    <aside className="w-64 bg-white rounded-2xl p-4 shadow-sm h-fit flex-shrink-0">
      <nav className="flex flex-col gap-1">
        {sidebarLinks.map((link) => (
          <SidebarItem
            key={link.id}
            icon={link.icon}
            label={link.label}
            active={activeItem === link.id}
            onClick={() => onSelect(link.id)}
          />
        ))}

        <hr className="my-3 border-gray-200" />

        {accountType === "buyer" && (
          <SidebarItem
            icon={sidebarBottomLinks[0].icon}
            label={sidebarBottomLinks[0].label}
            isSwitch
            onClick={onSwitchToSeller}
          />
        )}

        {accountType === "seller" && (
          <SidebarItem
            icon={sidebarBottomLinks[0].icon}
            label="Seller Dashboard"
            isSwitch
            onClick={() => onSelect("seller-dashboard")}
          />
        )}

        <div className="mt-2">
          <SidebarItem
            icon={sidebarBottomLinks[1].icon}
            label={sidebarBottomLinks[1].label}
            danger
            onClick={() => onSelect("logout")}
          />
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;