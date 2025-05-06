import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { ProductList } from "./data";
import Button from "./components/ui/Button";
import { IProduct } from "./interface";


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



  return (
    <main className="container mx-auto">
      <Model isOpen={isOpen} close={close} open={open} title="Add The Product">
        <div className="flex items-center space-x-2">
          <Button width="w-full" className={"bg-slate-700"} onClick={close}>
            close
          </Button>
          <Button width="w-full" className={"bg-blue-700"}>
            add
          </Button>
        </div>
      </Model>

      <section className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 rounded-md">
        {renderProductList}
      </section>


    </main>
  );
}

export default App;
