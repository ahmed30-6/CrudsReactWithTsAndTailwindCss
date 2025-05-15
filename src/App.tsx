import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { CategoryList, Colors, FormList, ProductList } from "./data";
import Button from "./components/ui/Button";
import { IForm, IProduct } from "./interface";
import Inputs from "./components/ui/Inputs";
import { ProductValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import HeroSection from "./components/ui/HeroSection";
import { IProductEditName } from "./typs";

function App() {
  const DefaultFormData = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [""],
    category: {
      name: "",
      imageURL: "",
    },
    rating: 0,
  };

  const DefaultErrorData = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  /*------------- start state---------------- */
  const [formData, setFormData] = useState<IProduct>(DefaultFormData);
  const [formDatas, setFormDatas] = useState<IProduct[]>(ProductList);
  const [error, setError] = useState(DefaultErrorData);
  const [tempColor, setTempColor] = useState<string[]>([]);
  // state select Component
  const [selectedCategory, setSelectedCategory] = useState(CategoryList[0]);
  // Open Add Model State
  const [isOpen, setIsOpen] = useState(false);
  // Edit state
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const [isEditProductIdx, setEditProductIdx] = useState<number>(0);
  const [editProduct, setEditProduct] = useState<IProduct>({
    ...DefaultFormData,
    id: "",
  });

  // Filter category state
  const [filterCategory, setFilterCategory] = useState<string>("all");

  /*------------- end state---------------- */

  /*------------- handle---------------- */

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setFormData(DefaultFormData);
    setError(DefaultErrorData);
    setTempColor([]);
    setIsOpen(false);
  };
  const openEditModel = () => {
    setIsOpenEditModel(true);
  };

  const closeEditModel = () => {
    setIsOpenEditModel(false);
    setError(DefaultErrorData);
    setTempColor([]);
  };

  // delete Product
  const onDeleteProduct = (id: string|undefined) => {
    setFormDatas((prev) => prev.filter((product) => product.id !== id));
  };

  const filteredProducts =
    filterCategory === "all"
      ? formDatas
      : formDatas.filter((product) => product.category.name === filterCategory);

  const onChangeHandel = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError({ ...error, [name]: "" });
  };
  const onChangeEditHandel = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError({ ...error, [name]: "" });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { title, description, imageURL, price } = formData;

    const errors = ProductValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (hasErrorMsg) {
      close();
    } else {
      setError(errors);
      return;
    }
    setFormDatas((prev) => [
      {
        ...formData,
        id: uuid(),
        colors: tempColor,
        category: selectedCategory,
        rating: formData.rating,
      },
      ...prev,
    ]);

    localStorage.setItem("products", JSON.stringify(setFormDatas));
  };

  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { title, description, imageURL, price } = editProduct;

    const errors = ProductValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (hasErrorMsg) {
      closeEditModel();
    } else {
      setError(errors);
      return;
    }

    const updatedProducts = [...formDatas];
    updatedProducts[isEditProductIdx] = {
      ...editProduct,
      colors: [...new Set([...editProduct.colors, ...tempColor])],
    };
    setFormDatas(updatedProducts);
  };

  /*------------- end handle---------------- */

  /*------------- Render and  mapping ---------------- */
  const renderProductList = filteredProducts.map(
    (product: IProduct, idx: number) => (
      <ProductCard
        key={product.id}
        product={product}
        setEditProduct={setEditProduct}
        openEditModel={openEditModel}
        idx={idx}
        setIsOpenEditModeIdx={setEditProductIdx}
        onDelete={() => onDeleteProduct(product.id)}
      />
    )
  );

  const renderFormList = FormList.map((input: IForm) => (
    <div key={input.id} className="w-full max-w-md">
      <label className="text-sm/6 font-medium text-zinc-800" htmlFor={input.id}>
        {input.label}
      </label>
      <Inputs
        id={input.id}
        name={input.name}
        onChange={onChangeHandel}
        value={formData[input.name] || ""}
      />

      <ErrorMsg msg={error[input.name]} />
    </div>
  ));

  // model Circle Color
  const renderColorsComponent = Colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (!tempColor.includes(color) && !editProduct.colors.includes(color)) {
          setTempColor((prev) => [...prev, color]);
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  const RenderEditProduct = (
    id: string,
    label: string,
    name: IProductEditName
  ) => {
    return (
      <div className="w-full max-w-md">
        <label className="text-sm/6 font-medium text-zinc-800" htmlFor={id}>
          {label}
        </label>
        <Inputs
          id={id}
          name={name}
          onChange={onChangeEditHandel}
          value={editProduct[name] || ""}
        />

        <ErrorMsg msg={error[name]} />
      </div>
    );
  };

  /*------------- End Render and mapping ---------------- */

  return (
    <main className="mx-auto">
      <section className="mx-auto w-full">
        <HeroSection />
      </section>

      <section className="my-5 flex justify-center">
        <Button className="bg-blue-600 px-6 py-2 submitButton" onClick={open}>
          Build Product
        </Button>
      </section>

      {/* NEW: Filter Category Select */}
      <section className="my-5 flex justify-center">
        <select
          className="border p-2 rounded"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CategoryList.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </section>

      <section className="">
        {/* Add Model */}
        <Model isOpen={isOpen} close={close} open={open} title="Add The Product">
          <form className="space-y-2" onSubmit={submitHandler}>
            {renderFormList}
            {/* Tailwind Ui */}
            <Select selected={selectedCategory} setSelected={setSelectedCategory} />
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {renderColorsComponent}
            </div>
            <div className="flex items-center justify-start gap-1 flex-wrap">
              {tempColor.map((color) => (
                <span
                  key={color}
                  className="p-1 text-xs rounded-md text-white"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex items-center  space-x-2">
              <Button width="w-full" className={"submitButton bg-blue-600"} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Model>

        {/* Edit Model */}
        <Model
          isOpen={isOpenEditModel}
          close={closeEditModel}
          open={openEditModel}
          title="Edit The Product"
        >
          <form className="space-y-2" onSubmit={submitEditHandler}>
            {/* {renderFormList} */}
            {RenderEditProduct("title", "Product Title", "title")}
            {RenderEditProduct("description", "Product Description", "description")}
            {RenderEditProduct("imageURL", "Product Image URL", "imageURL")}
            {RenderEditProduct("price", "Product Price", "price")}

            {/* Tailwind Ui */}
            <Select selected={selectedCategory} setSelected={setSelectedCategory} />
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {renderColorsComponent}
            </div>
            <div className="flex items-center justify-start gap-1 flex-wrap">
              {tempColor.concat(editProduct.colors).map((color) => (
                <span
                  key={color}
                  className="p-1 text-xs rounded-md text-white"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex items-center  space-x-2">
              <Button width="w-full" className={"submitButton bg-blue-600"} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Model>
      </section>
      <section className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 rounded-m mx-auto container ">
        {renderProductList}
      </section>
    </main>
  );
}

export default App;
