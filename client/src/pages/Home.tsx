import Navbar from "../components/layout/navbar";
import { Home as HomeContent } from "../components/shared/home";

export const Home = () => (
  <>
    <Navbar />
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <HomeContent />
    </main>
  </>
);
