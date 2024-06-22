import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySearch />
    </div>
  );
}
