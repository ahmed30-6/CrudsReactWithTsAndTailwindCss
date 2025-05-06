import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    className?: string,
    width?:"w-full" | "w-fit"
}

const Button = ({ children, className , width , ...rest }: IProps) => {
    return (
        <button className={`${className} ${width} py-2 rounded-md text-lime-50`} {...rest}>
            {children}
        </button>
    )
}

export default Button;