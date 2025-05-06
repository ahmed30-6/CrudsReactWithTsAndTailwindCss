export interface IProduct {
    id?: string | undefined;
    title:string;
    description:string;
    imageURL:string;
    price:string;
    colors: string[];
    category:
    {
        name:string;
        imageURL:string;
    };
};

export interface IForm {
    id:string;
    name:string;
    label:string;
    type:string;
};