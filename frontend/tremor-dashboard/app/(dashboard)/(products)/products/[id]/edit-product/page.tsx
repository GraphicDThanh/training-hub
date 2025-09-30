import dynamic from "next/dynamic";

// Components
const EditProductForm = dynamic(
  () => import("@/features/products/Forms/EditProductForm"),
);

// Services
import { getProduct } from "@/services";

const EditProduct = async ({ params }: { params: { id: number } }) => {
  const productData = await getProduct(params.id);

  return (
    <main>
      <EditProductForm id={params.id} productData={productData} />
    </main>
  );
};

export default EditProduct;
