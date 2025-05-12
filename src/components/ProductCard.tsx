// import { IProduct } from "../interface";
// import { txtSlicer } from "../utils/function";
// import Button from "./ui/Button";
// import Image from "./Image";

// interface IProps {
//   header?: string;
//   product: IProduct;
// }

// const ProductCard = ({ product }: IProps) => {
//   const { title, description, imageURL, price, category } = product;
//   return (
//     <div className="grid grid-cols-1 max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-400 p-4 my-0 rounded-2xl">
//       <Image className="w-96 h-min" ImageUrl={imageURL} alt={category.name} />
//       <h3>{title}</h3>
//       <p className="my-2">{txtSlicer(description, 100)}</p>

//       <div className="flex items-center space-x-2">
//         <span className="w-5 h-5 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500 " />
//         <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer hover:bg-red-500  " />
//         <span className="w-5 h-5 bg-green-600 rounded-full cursor-pointer hover:bg-green-500  " />
//       </div>

//       <div className="flex items-center justify-between my-2">
//         <span>{price}</span>
//         <Image
//           ImageUrl={category.imageURL}
//           className="w-10 h-10 rounded-full border border-black object-fill "
//           alt="category"
//         />
//       </div>

      

//       <div className="flex items-center space-x-1 my-2">
//       <Button className="bg-blue-600 hover:bg-blue-700" width="w-full">
//         edit
//       </Button>
//         <Button
//           className="bg-red-600 hover:bg-red-700"
//           onClick={() => {
//             alert("clicked");
//           }}
//           width="w-full"
//         >
//           delete
//         </Button>


//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// ==============================================

import { IProduct } from "../interface";
import { txtSlicer } from "../utils/function";
import Button from "./ui/Button";
import Image from "./Image";
import { motion } from "framer-motion";
import { FiHeart, FiShare2, FiEye } from "react-icons/fi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  if (!product) return null;

  const { title, description, imageURL, price, category, colors = [] } = product;
  const rating = 4.5;

  return (
    <motion.div
      className="w-full max-w-[280px] sm:max-w-xs bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {imageURL ? (
          <>
            <Image
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              ImageUrl={imageURL}
              alt={category?.name || "Product image"}
            />
            {/* Sale Badge */}
            <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md">
              -20%
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <span className="text-xs sm:text-sm">Image Coming Soon</span>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white rounded-full shadow-sm sm:shadow-md hover:bg-gray-100 transition-colors">
            <FiHeart className="text-xs sm:text-sm text-gray-600" />
          </button>
          <button className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white rounded-full shadow-sm sm:shadow-md hover:bg-gray-100 transition-colors">
            <FiShare2 className="text-xs sm:text-sm text-gray-600" />
          </button>
          <button className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white rounded-full shadow-sm sm:shadow-md hover:bg-gray-100 transition-colors">
            <FiEye className="text-xs sm:text-sm text-gray-600" />
          </button>
        </div>

        {/* Quick View Button */}
        <motion.button 
          className="absolute bottom-0 left-0 right-0 bg-black/80 text-white py-1 sm:py-2 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        >
          Quick View
        </motion.button>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4">
        {/* Category and Rating */}
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs font-medium text-indigo-600 uppercase tracking-wide">
            {category?.name || "Category"}
          </span>
          <div className="flex items-center">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                i < Math.floor(rating) ? (
                  <BsStarFill key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400" />
                ) : i === Math.floor(rating) && rating % 1 > 0 ? (
                  <BsStarHalf key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400" />
                ) : (
                  <BsStarFill key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300" />
                )
              ))}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-500">({rating})</span>
          </div>
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight line-clamp-2 hover:text-indigo-600 transition-colors">
            {title || "Premium Product"}
          </h3>
          <div className="flex flex-col items-end ml-2">
            <span className="text-sm sm:text-base font-bold text-indigo-600">${price}</span>
            {price && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">${(parseFloat(price) * 1.2).toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed line-clamp-2">
          {txtSlicer(description, 80) || "Premium quality product with exquisite design."}
        </p>

        {/* Color Options */}
        {colors.length > 0 && (
          <div className="mb-2 sm:mb-3">
            <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Colors:</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {colors.map((color) => (
                <motion.div
                  key={color}
                  className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-200 shadow-sm cursor-pointer"
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-white transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg shadow-sm sm:shadow-md hover:shadow-indigo-200 transition-all">
              Add to Cart
            </Button>
          </motion.div>
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              className="bg-gray-900 hover:bg-gray-800 text-white w-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg shadow-sm sm:shadow-md hover:shadow-gray-200 transition-all"
              onClick={() => alert("View details")}
            >
              Details
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
