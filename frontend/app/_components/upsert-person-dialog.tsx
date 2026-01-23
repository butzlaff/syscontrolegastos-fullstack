"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPerson } from "../_actions/person";

interface UpsertPersonDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultValues?: FormSchema;
  personId?: string;
}

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  age: z.number({
    required_error: "Idade é obrigatória",
    invalid_type_error: "Idade deve ser um número",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertPersonDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
  personId,
}: UpsertPersonDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      age: 0,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      const success = await registerPerson({
        age: values.age,
        name: values.name,
      });

      if (success) {
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
    } finally {
      form.reset();
      setIsOpen(false);
    }
  };

  const isUpdate = Boolean(personId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Editar" : "Adicionar"} Pessoa</DialogTitle>
          <DialogDescription>Informe os dados da pessoa</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da pessoa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Idade"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button>{isUpdate ? "Atualizar" : "Adicionar"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertPersonDialog;
