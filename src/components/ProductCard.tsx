import { IProduct } from "../interface";
import { txtSlicer } from "../utils/function";
import Button from "./ui/Button";
import Image from "./Image";

interface IProps {
  header?: string;
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, price, category } = product;
  return (
    <div className="grid grid-cols-1 max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-400 p-4 my-0 rounded-2xl">
      <Image className="w-96 h-52" ImageUrl={imageURL} alt={category.name} />
      <h3>{title}</h3>
      <p className="my-2">{txtSlicer(description, 100)}</p>

      <div className="flex items-center space-x-2">
        <span className="w-5 h-5 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500 " />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer hover:bg-red-500  " />
        <span className="w-5 h-5 bg-green-600 rounded-full cursor-pointer hover:bg-green-500  " />
      </div>

      <div className="flex items-center justify-between my-2">
        <span>{price}</span>
        <Image
          ImageUrl={category.imageURL}
          className="w-10 h-10 rounded-full border border-black object-fill "
          alt="category"
        />
      </div>

      

      <div className="flex items-center space-x-1 my-2">
      <Button className="bg-blue-600 hover:bg-blue-700" width="w-full">
        edit
      </Button>
        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={() => {
            alert("clicked");
          }}
          width="w-full"
        >
          delete
        </Button>


      </div>
    </div>
  );
};

export default ProductCard;
