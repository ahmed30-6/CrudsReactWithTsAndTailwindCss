import { HTMLInputTypeAttribute } from "react";
import { IProductEditName } from "../typs";

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
  rating?:number | undefined;
}

export interface IForm {
  id: string;
  name: IProductEditName;
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

export interface ICategoryList {
  id:string;
  name:string;
  imageURL:string;
}