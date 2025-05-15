// import { IProduct } from "../interface";
// import { txtSlicer } from "../utils/function";
// import Button from "./ui/Button";
// import Image from "./Image";

// interface IProps {
//   header?: string;
//   product: IProduct;
//   setEditProduct:(product:IProduct)=> void;
//   openEditModel:()=> void;
//   idx:number
//   setIsOpenEditModeIdx:(value:number)=> void;
// }

// const ProductCard = ({ product , setEditProduct , openEditModel  , idx , setIsOpenEditModeIdx: setIsOpenEditModelIdx }: IProps) => {
//   const { title, description, imageURL, price, category , colors = [""]} = product;

//   const renderColors = colors.map(color => <span key={color} style={{backgroundColor:color}} className="w-5 h-5 rounded-full cursor-pointer"/>)

//   const onEdit = ()=>{
//      setEditProduct(product);
//      openEditModel();
//      setIsOpenEditModelIdx(idx)
//   }

//   return (
//     <div className="grid grid-cols-1 max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-400 p-4 my-0 rounded-2xl">
//       <Image className="w-96 h-min" ImageUrl={imageURL} alt={category.name} />
//       <h3>{title}</h3>
//       <p className="my-2">{txtSlicer(description, 100)}</p>

//       <div className="flex items-center space-x-2 ">
//         {renderColors}
//       </div>

//       <div className="flex items-center justify-between my-2">
//         <span>{price}$</span>
//         <Image
//           ImageUrl={category.imageURL}
//           className="w-10 h-10 rounded-full border border-black object-fill "
//           alt="category"
//         />
//       </div>

//       <div className="flex items-center space-x-1 my-2">
//       <Button className="bg-blue-600 hover:bg-blue-700" width="w-full" onClick={onEdit}>
//         edit
//       </Button>
//         <Button
//           className="bg-red-600 hover:bg-red-700"
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
// 2

import { IProduct } from "../interface";
import { txtSlicer } from "../utils/function";
import Image from "./Image";
import { motion } from "framer-motion";
import { FiHeart, FiShare2, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  product: IProduct;
  setEditProduct: (product: IProduct) => void;
  openEditModel: () => void;
  idx: number;
  setIsOpenEditModeIdx: (value: number) => void;
  onDelete: (id: string) => void;
}

const ProductCard = ({
  product,
  setEditProduct,
  openEditModel,
  idx,
  setIsOpenEditModeIdx,
  onDelete,
}: IProps) => {
  const {
    title,
    description,
    imageURL,
    price,
    category,
    colors = [],
    id,
  } = product;

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const renderColors = colors.map((color) => (
    <motion.span
      key={color}
      style={{ backgroundColor: color }}
      className="w-5 h-5 rounded-full border border-white/20 shadow-sm cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    />
  ));

  const onEdit = () => {
    try {
      setEditProduct(product);
      openEditModel();
      setIsOpenEditModeIdx(idx);
      toast.success("Product ready for editing!");
    } catch (error: unknown) {
      console.error("Edit error:", error);
      toast.error("Failed to prepare product for editing");
    }
  };

  const handleDelete = () => {
    try {
      if (id) {
        onDelete(id);
        toast.success("Product deleted successfully!");
      }
      setIsDeleteModalOpen(false);
    } catch (error: unknown) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
    <motion.div
        className="w-full max-w-[360px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group mx-auto border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
            <Image
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              ImageUrl={imageURL}
            alt={category?.name || "Product"}
          />
          <div className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            NEW
          </div>

          {/* Quick actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <FiHeart className="text-gray-700 text-sm" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <FiShare2 className="text-gray-700 text-sm" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <FiEye className="text-gray-700 text-sm" />
            </motion.button>
        </div>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-sm font-medium hover:bg-white transition-colors shadow-lg hover:shadow-xl"
        >
          Quick View
        </motion.button>
          </div>
      </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <span className="text-sm font-bold text-indigo-600">
              ${price}
          </span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{txtSlicer(description, 80)}</p>

          {/* Colors */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex gap-1">{renderColors}</div>
        </div>

          {/* Category */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-indigo-600">
              {category?.name}
            </span>
            {category?.imageURL && (
              <Image
                ImageUrl={category.imageURL}
                className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                alt={category.name}
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEdit}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-sm font-medium text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-shadow flex items-center justify-center gap-2"
            >
              <FiEdit2 className="text-sm" />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <FiTrash2 className="text-sm" />
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDeleteModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Product
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this product? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProductCard;

// ==============================================

// import { IProduct } from "../interface";
// import { txtSlicer } from "../utils/function";
// import Button from "./ui/Button";
// import Image from "./Image";
// import { motion } from "framer-motion";
// import { FiHeart, FiShare2, FiEye } from "react-icons/fi";
// import { BsStarFill, BsStarHalf } from "react-icons/bs";

// interface IProps {
//   product: IProduct;

// }

// const ProductCard = ({ product }: IProps) => {
//   if (!product) return null;

//   const { title, description, imageURL, price, category, colors = [] , rating=0 } = product;

//   return (
//     <motion.div
//       className="w-full max-w-[360px] sm:max-w-md bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group mx-auto"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}

//     >
//       {/* Image Container */}
//       <div className="relative aspect-square overflow-hidden">
//         {imageURL ? (
//           <>
//             <Image
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               ImageUrl={imageURL}
//               alt={category?.name || "Product image"}
//             />
//             {/* Sale Badge */}
//             <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md">
//               -20%
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
//             <span className="text-xs sm:text-sm">Image Coming Soon</span>
//           </div>
//         )}

//         {/* Quick Action Buttons */}
//         <div className="absolute top-2 right-2 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white rounded-full shadow-sm sm:shadow-md hover:bg-gray-100 transition-colors">
//             <FiHeart className="text-xs sm:text-sm text-gray-600" />
//           </button>
//           <button className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white rounded-full shadow-sm sm:shadow-md hover:bg-gray-100 transition-colors">
//             <FiShare2 className="text-xs sm:text-sm text-gray-600" />
//           </button>
//           <button className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white rounded-full shadow-sm sm:shadow-md hover:bg-gray-100 transition-colors">
//             <FiEye className="text-xs sm:text-sm text-gray-600" />
//           </button>
//         </div>

//         {/* Quick View Button */}
//         <motion.button
//           className="absolute bottom-0 left-0 right-0 bg-black/80 text-white py-1 sm:py-2 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           whileHover={{ backgroundColor: "rgba(0,0,0,0.9)" }}
//         >
//           Quick View
//         </motion.button>
//       </div>

//       {/* Product Details */}
//       <div className="p-3 sm:p-4">
//         {/* Category and Rating */}
//         <div className="flex justify-between items-center mb-1 sm:mb-2">
//           <span className="text-[10px] sm:text-xs font-medium text-indigo-600 uppercase tracking-wide">
//             {category?.name || "Category"}
//           </span>
//           <div className="flex items-center">
//             <div className="flex mr-1">
//               {[...Array(5)].map((_, i) => (
//                 i < Math.floor(rating) ? (
//                   <BsStarFill key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400" />
//                 ) : i === Math.floor(rating) && rating % 1 > 0 ? (
//                   <BsStarHalf key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400" />
//                 ) : (
//                   <BsStarFill key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300" />
//                 )
//               ))}
//             </div>
//             <span className="text-[10px] sm:text-xs text-gray-500">({rating})</span>
//           </div>
//         </div>

//         {/* Title and Price */}
//         <div className="flex justify-between items-start mb-2 sm:mb-3">
//           <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight line-clamp-2 hover:text-indigo-600 transition-colors">
//             {title || "Premium Product"}
//           </h3>
//           <div className="flex flex-col items-end ml-2">
//             <span className="text-sm sm:text-base font-bold text-indigo-600">${price}</span>
//             {price && (
//               <span className="text-[10px] sm:text-xs text-gray-400 line-through">${(parseFloat(price) * 1.2).toFixed(2)}</span>
//             )}
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed line-clamp-2">
//           {txtSlicer(description, 80) || "Premium quality product with exquisite design."}
//         </p>

//         {/* Color Options */}
//         {colors.length > 0 && (
//           <div className="mb-2 sm:mb-3">
//             <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Colors:</p>
//             <div className="flex flex-wrap gap-1 sm:gap-2">
//               {colors.map((color) => (
//                 <motion.div
//                   key={color}
//                   className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-200 shadow-sm cursor-pointer"
//                   style={{ backgroundColor: color }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-white transition-all" />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//           <motion.div
//             className="flex-1"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//           >
//             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg shadow-sm sm:shadow-md hover:shadow-indigo-200 transition-all">
//               Add to Cart
//             </Button>
//           </motion.div>
//           <motion.div
//             className="flex-1"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//           >
//             <Button
//               className="bg-gray-900 hover:bg-gray-800 text-white w-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg shadow-sm sm:shadow-md hover:shadow-gray-200 transition-all"
//               onClick={() => alert("View details")}
//             >
//               Details
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;
