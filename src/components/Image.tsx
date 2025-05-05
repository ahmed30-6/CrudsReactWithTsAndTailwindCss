interface IProps {
    className?: string,
    ImageUrl: string,
    alt: string
}

const Image = ({ className , ImageUrl , alt}: IProps) => {
    return (
        <div>
            <img className={`${className} `} src={ImageUrl}
                alt={alt}
            />
        </div>
    )
}

export default Image;