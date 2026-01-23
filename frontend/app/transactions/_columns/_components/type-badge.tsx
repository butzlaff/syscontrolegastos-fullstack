import { TransactionType } from "@/app/_components/_types/type_transaction";
import { Badge } from "@/app/_components/ui/badge";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transactionType: TransactionType;
}

const TransactionTypeBadge = ({
  transactionType,
}: TransactionTypeBadgeProps) => {
  if (transactionType === TransactionType.DESPESA) {
    return (
      <Badge className="bg-bgdanger font-bold text-danger hover:bg-bgdanger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesa
      </Badge>
    );
  }

  if (transactionType === TransactionType.RECEITA) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Receita
      </Badge>
    );
  }

  return null;
};

export default TransactionTypeBadge;
