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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerCategory } from "../_actions/category";
import { Purpose } from "./_types/purpose";

interface UpsertCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultValues?: FormSchema;
  categoryId?: string;
}

const formSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  purpose: z.nativeEnum(Purpose),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertCategoryDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
  categoryId,
}: UpsertCategoryDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      description: "",
      purpose: Purpose.AMBAS,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      const success = await registerCategory(values);

      if (success) {
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    } finally {
      form.reset();
      setIsOpen(false);
    }
  };

  const isUpdate = Boolean(categoryId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Editar" : "Adicionar"} Categoria
          </DialogTitle>
          <DialogDescription>Informe os dados da categoria</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição da categoria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finalidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a finalidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Purpose).map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default UpsertCategoryDialog;
