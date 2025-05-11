import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { FormList, ProductList } from "./data";
import Button from "./components/ui/Button";
import { IForm, IProduct } from "./interface";
import Inputs from "./components/ui/Inputs";
import { ProductValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";

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

  /*------------- start state---------------- */
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<IProduct>(DefaultFormData);
  const [error, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  // const [isTouched, setIsTouched] = useState({
  //   title: false,
  //   description: false,
  //   imageURL: false,
  //   price: false,
  // });

  /*------------- handle---------------- */

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setFormData(DefaultFormData);
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
      console.log("success submit");
      console.log(formData);
      close();
    } else {
      setError(errors);
      console.log(errors);
      console.log("Form validation failed");
      return;
    }
  };

  /*------------- end handle---------------- */

  /*------------- end state---------------- */

  const renderProductList = ProductList.map((product: IProduct) => (
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
            <div className="flex items-center space-x-2">
              <Button width="w-full" className={" submitButton"} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Model>
      </section>
      <section className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 rounded-md">
        {renderProductList}
      </section>
    </main>
  );
}

export default App;
