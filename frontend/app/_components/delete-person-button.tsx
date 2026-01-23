import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { deletePerson } from "../_actions/person";

type Props = {
  id: string;
};

const DeletePersonButton = ({ id }: Props) => {
  const handledelete = async () => {
    console.log("Deleting person with id:", id);
    await deletePerson(id);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handledelete}
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default DeletePersonButton;
