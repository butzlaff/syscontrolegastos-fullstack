"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import UpsertPersonDialog from "./upsert-person-dialog";

const AddPersonButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar Pessoa
        <ArrowDownUpIcon />
      </Button>
      <UpsertPersonDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddPersonButton;
