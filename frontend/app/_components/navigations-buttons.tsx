import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

const NavigationButtons = () => {
  return (
    <div className="flex w-full gap-3 p-6">
      <Button asChild className="rounded-lg">
        <Link href="/persons">Pessoas</Link>
      </Button>

      <Button asChild className="rounded-lg">
        <Link href="/categories">Categorias</Link>
      </Button>

      <Button asChild className="rounded-lg">
        <Link href="/transactions">Transações</Link>
      </Button>
    </div>
  );
};

export default NavigationButtons;
