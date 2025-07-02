import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen conatiner mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur bg-background/60 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MG</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
