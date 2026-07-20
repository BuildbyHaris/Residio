function AccountBadge({ type }) {
  const label = type === "seller" ? "Seller Account" : "Buyer Account";

  return (
    <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

export default AccountBadge;