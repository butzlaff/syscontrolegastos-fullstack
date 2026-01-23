"use server";

import { revalidatePath } from "next/cache";
import { deletePersonSchema, PersonList, PersonsBalanceReport, personsBalanceReportSchema, upsertPersonSchema } from './schema';

interface UpsertPersonProps {
  name: string;
  age: number;
}

const API_URL = process.env.API_URL;

export const registerPerson = async (params: UpsertPersonProps) => {
  upsertPersonSchema.parse(params);

  const res = await fetch(`${API_URL}/api/persons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    cache: "no-store",
  });  

  revalidatePath("/persons");

  if (res.status !== 201) {
    return false;
  }

  return true;
};

export const getAllPersons = async() : Promise<PersonList> => {

  const res = await fetch(`${API_URL}/api/persons`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  
  return data;
};

export const deletePerson = async (id: string) => {
  deletePersonSchema.parse({ id });

  await fetch(`${API_URL}/api/persons/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  revalidatePath("/persons");
};

export const getPersonsBalance = async (): Promise<PersonsBalanceReport> => {
  const res = await fetch(`${API_URL}/api/persons/balance`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar balanço das pessoas");
  }

  const data = await res.json();

  return personsBalanceReportSchema.parse(data);
};