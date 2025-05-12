import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { Colors, FormList, ProductList } from "./data";
import Button from "./components/ui/Button";
import { IForm, IProduct } from "./interface";
import Inputs from "./components/ui/Inputs";
import { ProductValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
function App() {
  const DefaultFormData = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const DefaultErrorData = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  /*------------- start state---------------- */
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<IProduct>(DefaultFormData);
  const [formDatas, setFormDatas] = useState<IProduct[]>(ProductList);
  const [error, setError] = useState(DefaultErrorData);
  const [tempColor, setTempColor] = useState<string[]>([]);

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

  const onChangeHandel = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
    
    setFormDatas(prev => [...prev, {...formData, id:uuid() , colors:tempColor}])
    
  };

  /*------------- end handle---------------- */

  /*------------- end state---------------- */

  /*-------------  mapping ---------------- */
  const renderProductList = formDatas.map((product: IProduct) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormList = FormList.map((input: IForm) => (
    <div key={input.id} className="w-full max-w-md">
      <label className="text-sm/6 font-medium text-zinc-800" htmlFor={input.id}>
        {input.label}
      </label>
      <Inputs
        id={input.id}
        name={input.name}
        onChange={onChangeHandel}
        value={formData[input.name]}
      />

      <ErrorMsg msg={error[input.name]} />
    </div>
  ));

  const renderColorsComponent = Colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  /*------------- End mapping ---------------- */

  return (
    <main className="container mx-auto">
      <section className="container-lg mx-auto">
        <Model
          isOpen={isOpen}
          close={close}
          open={open}
          title="Add The Product"
        >
          <form className="space-y-2" onSubmit={submitHandler}>
            {renderFormList}
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
              <Button width="w-full" className={"submitButton"} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Model>
      </section>
      <section className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 rounded-m ">
        {renderProductList}
      </section>
    </main>
  );
}

export default App;
