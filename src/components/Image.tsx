import { useState } from 'react';

interface IProps {
    className?: string,
    ImageUrl: string,
    alt: string
}

const Image = ({ className , ImageUrl , alt}: IProps) => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (!ImageUrl) return null;
    if (isError) return (
        <div className={`${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
            <span className="text-gray-400">Failed to load image</span>
        </div>
    );

    return (
        <div className="relative">
            {isLoading && (
                <div className={`${className} bg-gray-100 dark:bg-gray-800 animate-pulse absolute inset-0`} />
            )}
            <img 
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
                src={ImageUrl}
                alt={alt}
                onError={() => setIsError(true)}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    )
}

export default Image;