interface IProps {
    className?: string,
    ImageUrl: string,
    alt: string
}

const Image = ({ className , ImageUrl , alt}: IProps) => {
    if (!ImageUrl) return null;
    return (
        <div>
            <img className={`${className}`} src={ImageUrl}
                alt={alt}
            />
        </div>
    )
}

export default Image;