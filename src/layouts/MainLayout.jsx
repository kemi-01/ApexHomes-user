import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
// import AIAssistant from "../components/ai/AIAssistant";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      
      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* ApexHomes AI Assistant
      <AIAssistant /> */}

    </div>
  );
}

export default MainLayout;