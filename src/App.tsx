import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { FormList, ProductList } from "./data";
import Button from "./components/ui/Button";
import { IForm, IProduct } from "./interface";
import FormModel from "./components/ui/FormModel";

function App() {
  /*------------- start state---------------- */
  const [isOpen, setIsOpen] = useState(false);

  /*------------- handel---------------- */

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  /*------------- end handel---------------- */

  /*------------- end state---------------- */

  const renderProductList = ProductList.map((product: IProduct) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormList = FormList.map((form: IForm) => (
    <FormModel key={form.id} form={form} />
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
          <div className="space-y-2">
            {renderFormList}
            <div className="flex items-center space-x-2">
              <Button
                width="w-full"
                className={"bg-blue-700 mt-3 hover:bg-blue-800"}
              >
                Submit
              </Button>
            </div>
          </div>
        </Model>
      </section>
      <section className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 rounded-md">
        {renderProductList}
      </section>
    </main>
  );
}

export default App;
