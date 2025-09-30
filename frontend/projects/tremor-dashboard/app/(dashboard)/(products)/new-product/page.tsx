import dynamic from "next/dynamic";

// Components
const AddProductForm = dynamic(
  () => import("@/features/products/Forms/AddProductForm"),
);

const AddProductPage = () => {
  return (
    <main className="mt-10 mb-18 mx-auto lg:w-[67%]">
      {/* Heading */}
      <div className="mt-12 mb-16">
        <h3 className="text-xl lg:text-3xl font-bold text-primary dark:text-white text-center mb-2">
          Add New Product
        </h3>
        <h4 className="text-md lg:text-xl dark:text-secondary text-grey text-center">
          This information will describe more about the product.
        </h4>
      </div>
      <AddProductForm />
    </main>
  );
};

export default AddProductPage;
