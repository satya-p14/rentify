import Image from "next/image";
import PropertyListPage from "./properties/page";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex flex-col gap-[2px] row-start-2 items-center sm:items-start">
      <Toaster position="top-right" />
      <PropertyListPage />
    </main>
  );
}
