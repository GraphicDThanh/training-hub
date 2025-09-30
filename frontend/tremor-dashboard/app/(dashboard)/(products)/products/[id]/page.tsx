import { Suspense } from "react";
import { InView } from "react-intersection-observer";

// Components
import {
  OtherProductList,
  OtherProductSkeleton,
  ProductDetail,
  ProductDetailsSkeleton,
} from "@/features/products";

import { getProduct, getProducts } from "@/services";

import { OTHER_PRODUCTS_LENGTH } from "@/constants";
import { getOtherProducts } from "@/helpers/product";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;

  const {
    id: idProduct,
    productName,
    price,
    image,
    description,
    quantity,
  } = await getProduct(id);

  const { results: products } = await getProducts({});
  const otherProducts = getOtherProducts(products, id, OTHER_PRODUCTS_LENGTH);

  return (
    <main className="opacity-100 mt-1 bg-secondary dark:bg-dark-blue text-primary rounded-xl p-6 shadow-box-icon-default dark:shadow-main-content">
      <h3 className="text-primary text-tremor-primary font-semibold dark:text-white">
        Product Details
      </h3>
      <div className="pt-6">
        {/* Streaming data */}

        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetail
            id={idProduct}
            productName={productName}
            image={image}
            price={price}
            description={description}
            quantity={quantity}
          />
        </Suspense>

        {/* Streaming data */}
        <InView as="section">
          <Suspense fallback={<OtherProductSkeleton />}>
            <div className="mt-16 mb-4 dark:text-white">
              <h3 className="text-primary text-tremor-primary font-semibold dark:text-white">
                Other Products
              </h3>
              <div className="mt-2">
                <OtherProductList products={otherProducts} />
              </div>
            </div>
          </Suspense>
        </InView>
      </div>
    </main>
  );
}
