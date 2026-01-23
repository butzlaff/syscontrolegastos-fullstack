"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
//import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { TransactionDetails } from "@/app/_actions/transaction/schema";

interface EditTransactionButtonProps {
  transaction: TransactionDetails;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={"ghost"}
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          description: transaction.description,
          date: new Date(transaction.date),
          transactionType: transaction.transactionType,
          categoryId: transaction.categoryId,
          personId: transaction.personId,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
