import { HTMLInputTypeAttribute } from "react";

export interface IProduct {
  id?: string | undefined;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IForm {
  id: string;
  name: "title" | "description" | "imageURL" | "price";
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}


export interface IProductValidation {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}