"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Control, FormProvider, useForm } from "react-hook-form";
import { InView } from "react-intersection-observer";
import { Suspense } from "react";

// Components
import { Col, Grid, Text } from "@tremor/react";
import { Button, LoadingIndicator } from "@/components";
import ImageCard from "../../../components/Form/ImageCard/ImageCard";
const SocialsCard = dynamic(
  () => import("../../../components/Form/SocialsCard/SocialsCard"),
);
const ProductInfo = dynamic(() => import("../ProductInfo/ProductInfo"));
const PricingInfo = dynamic(() => import("../EditProduct/Pricing/Pricing"));

import { ProductDetailsSkeleton } from "@/features/products";

// Services
import { editProduct } from "@/services";

// Types
import { EditProductData, ProductBasicInfo } from "@/types";

// Constants
import {
  MESSAGE_EDIT_PRODUCT,
  NOT_FOUND_IMAGE,
  VARIANT_BUTTON,
  SEPARATOR,
  SOCIAL_PRODUCTS,
} from "@/constants";

// Hooks
import useImageUploader from "@/hooks/useImageUploader";
import { TOAST_TYPE, TWithToast, withToast } from "@/hocs/withToast";

const EditProductForm = ({
  productData,
  id,
  openToast,
}: TWithToast<{
  productData: EditProductData;
  id: number;
}>) => {
  const { description, image } = productData;

  const [isLoading, setIsLoading] = useState(false);

  const formHandler = useForm<EditProductData>({
    defaultValues: {
      ...productData,
    },
    mode: "onBlur",
  });

  const { handleSubmit, formState, control, reset, watch } = formHandler;
  const { upload, imageValue, removeImage, isUpload } = useImageUploader(image);

  useEffect(() => {
    formHandler.setValue("image", imageValue, { shouldDirty: true });
  }, [imageValue, formHandler]);

  const onSubmit = useCallback(
    async (data: EditProductData) => {
      const convertedTagsValue = data.tags.map((value: string | number) => {
        return Number(value);
      });
      const convertedPrice = data.price
        .toString()
        .replaceAll(SEPARATOR.COMMAS, "");

      const newData = {
        productName: data.productName.trim(),
        price: Number(convertedPrice),
        quantity: Number(data.quantity),
        weight: Number(data.weight),
        category: +data.category,
        currency: +data.currency,
        tags: convertedTagsValue,
        image: imageValue,
        description: data.description.trim(),
        facebookUrl: data.facebookUrl.trim(),
        instagramUrl: data.instagramUrl.trim(),
        shopifyUrl: data.shopifyUrl.trim(),
        providerName: data.providerName.trim(),
        sku: data.sku.trim(),
      };

      setIsLoading(true);

      const res = await editProduct(id, newData);

      reset(data);

      openToast(
        {
          type: res.data ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR,
          message: res.data
            ? MESSAGE_EDIT_PRODUCT.SUCCESS
            : MESSAGE_EDIT_PRODUCT.FAILED,
        },
        res.data
          ? () => {
              setIsLoading(false);
            }
          : () => {
              setIsLoading(true);
            },
      );
    },
    [id, imageValue, openToast, reset],
  );

  const onRemoveImage = useCallback(() => {
    removeImage();
    formHandler.setValue("image", "", { shouldDirty: true });
  }, [formHandler, removeImage]);

  const renderContentButton = () =>
    isLoading ? (
      <LoadingIndicator width={4} height={5} additionalClass="px-1.5" />
    ) : (
      <Text className="items-center uppercase py-[2px] text-xs font-bold font-primary text-white dark:text-dark-tremor-content-title">
        Save
      </Text>
    );

  return (
    <>
      {isLoading && (
        <div className="opacity-25 fixed inset-0 z-20 bg-black cursor-not-allowed" />
      )}
      <FormProvider {...formHandler}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative product-info pt-20"
          id="edit-product-form">
          <div className="w-full text-end absolute -mt-20">
            <Button
              variant={VARIANT_BUTTON.PRIMARY}
              type="submit"
              size="xs"
              disabled={!formState.isDirty}
              additionalClass="antialiased text-center uppercase px-6 py-2.5 rounded-lg border-0 items-end">
              {renderContentButton()}
            </Button>
          </div>
          <Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="gap-6">
            <section className="w-full">
              <ImageCard
                name={watch("productName")}
                desc={description}
                image={imageValue || NOT_FOUND_IMAGE}
                onRemoveImage={onRemoveImage}
                onUpload={upload}
                disabled={!imageValue || imageValue === NOT_FOUND_IMAGE}
                isUpload={isUpload}
              />
            </section>
            <Col numColSpanSm={1} numColSpanLg={2} as="section">
              <InView style={{ height: "100%" }}>
                <Suspense fallback={<ProductDetailsSkeleton />}>
                  <ProductInfo
                    control={control as unknown as Control<ProductBasicInfo>}
                    errors={formState.errors}
                  />
                </Suspense>
              </InView>
            </Col>
            <Col numColSpan={1} as="section">
              <InView>
                <SocialsCard socialUrls={SOCIAL_PRODUCTS} />
              </InView>
            </Col>
            <Col numColSpanSm={1} numColSpanLg={2} as="section">
              <InView>
                <PricingInfo />
              </InView>
            </Col>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

const EditProductFormWithToast = withToast(EditProductForm);

export default EditProductFormWithToast;
