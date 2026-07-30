import Navbar from "../../../landing/components/Navbar";
import OwnerSidebar from "./OwnerSidebar";

const OwnerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <OwnerSidebar />

        <main className="flex-1 p-6 bg-orange-50/30">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;