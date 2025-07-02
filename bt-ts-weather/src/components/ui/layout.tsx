import type { PropsWithChildren } from "react";
import Header from "./header";
import { Github } from "lucide-react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur bg-background/60 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <a
            href="https://github.com/MGough22"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 text-gray-400 hover:text-foreground transition-colors py-2"
          >
            &copy; {new Date().getFullYear()} MG
            <Github className="h-4 w-4" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
