function SidebarItem({ icon: Icon, label, active, danger, isSwitch, onClick }) {
  let classes =
    "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors text-sm font-medium";

  if (active) {
    classes += " bg-[#FDEDE3] text-[#F5732C] font-semibold";
  } else if (danger) {
    classes += " text-[#F5732C] hover:bg-red-50";
  } else if (isSwitch) {
    classes += " text-[#F5732C] hover:bg-[#FDEDE3]";
  } else {
    classes += " text-gray-700 hover:bg-gray-50";
  }

  return (
    <button onClick={onClick} className={classes + " w-full text-left"}>
      <Icon
        className={`w-5 h-5 flex-shrink-0 ${
          active
            ? "text-[#F5732C]"
            : danger
            ? "text-[#F5732C]"
            : isSwitch
            ? "text-[#F5732C]"
            : "text-gray-500"
        }`}
      />
      <span>{label}</span>
    </button>
  );
}

export default SidebarItem;