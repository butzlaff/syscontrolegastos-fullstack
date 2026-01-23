"use server";

import { Purpose } from '../../_components/_types/purpose';
import { CategoriesBalanceReport, CategoryList, upsertCategorySchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertCategoryProps {
  description: string;
  purpose: Purpose;
}

const API_URL = process.env.API_URL;

export const registerCategory = async (params: UpsertCategoryProps) => {
  upsertCategorySchema.parse(params);

  const res = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    cache: "no-store",
  }); 

  revalidatePath("/categories");

  if (res.status !== 201) {
    return false;
  }

  return true;
  
};

export const getAllCategories = async() : Promise<CategoryList> => {

  const res = await fetch(`${API_URL}/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  
  const data = await res.json();
  
  return data;
};

export const getCategoriesBalance = async () : Promise<CategoriesBalanceReport> => {
  const res = await fetch(`${API_URL}/api/categories/balance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }); 
  const data = await res.json();
  
  return data;
}
