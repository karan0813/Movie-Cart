import "../globals.css";

import Navbar from "@/components/Navbar";
import { Providers } from "./Provider";

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
