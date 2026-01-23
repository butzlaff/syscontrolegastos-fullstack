import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TRANSACTION_TYPE_OPTIONS,
  TransactionType,
} from "./_types/type_transaction";
import { DatePicker } from "./data-picker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerTransaction } from "../_actions/transaction";
import { useEffect, useState } from "react";
import { getAllCategories } from "../_actions/category";
import { getAllPersons } from "../_actions/person";
import { Purpose } from "./_types/purpose";

interface UpsertTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: FormSchema;
  transactionId?: string;
}

type SelectOption = {
  label: string;
  value: string;
};

type CategorySelectOption = {
  label: string;
  value: string;
  purpose: Purpose;
};

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  amount: z
    .number({
      required_error: "Valor é obrigatório",
    })
    .positive({
      message: "Valor deve ser positivo",
    }),
  date: z.date({
    required_error: "Data é obrigatória",
  }),
  transactionType: z.nativeEnum(TransactionType, {
    required_error: "Tipo é obrigatório",
  }),
  categoryId: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  personId: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertTransactionDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
  transactionId,
}: UpsertTransactionDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      description: "",
      amount: 0,
      transactionType: TransactionType.RECEITA,
      date: new Date(),
      categoryId: "",
      personId: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      const parsedValues = {
        ...values,
        date: values.date.toISOString(),
      };

      const success = await registerTransaction({ ...parsedValues });

      if (success) {
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      form.reset();
      setIsOpen(false);
    }
  };

  const isUpdate = Boolean(transactionId);

  const [categoryOptions, setCategoryOptions] = useState<
    CategorySelectOption[]
  >([]);

  const [personOptions, setPersonOptions] = useState<SelectOption[]>([]);

  const selectedType = form.watch("transactionType");

  const filteredCategories = categoryOptions.filter((category) => {
    if (category.purpose === Purpose.AMBAS) return true;

    if (selectedType === TransactionType.DESPESA)
      return category.purpose === Purpose.DESPESA;

    if (selectedType === TransactionType.RECEITA)
      return category.purpose === Purpose.RECEITA;

    return false;
  });

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getAllCategories();

      setCategoryOptions(
        categories.map((category) => ({
          label: category.description,
          value: category.id,
          purpose: category.purpose,
        })),
      );
    };

    const loadPersons = async () => {
      const { persons } = await getAllPersons();

      setPersonOptions(
        persons.map((person) => ({
          label: person.name,
          value: person.id,
        })),
      );
    };

    loadCategories();
    loadPersons();
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Adicionar"} Transação
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite uma descrição..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor"
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finalidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a finalidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria da transação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredCategories.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pessoa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {personOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="ml-2">
                  Cancelar
                </Button>
              </DialogClose>
              <Button>{isUpdate ? "Atualizar" : "Adicionar"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default UpsertTransactionDialog;
