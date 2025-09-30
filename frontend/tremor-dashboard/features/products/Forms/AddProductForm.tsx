"use client";

// Libs
import { useRouter } from "next/navigation";
import { useState } from "react";

// Components
import { Stepper, LoadingIndicator } from "@/components";
import {
  MediaForm,
  PricingForm,
  ProductInfoForm,
} from "@/features/products/Forms";
import SocialForm from "@/components/Form/SocialForm/SocialForm";

// Types
import {
  IMedia,
  NewPricing,
  ProductBasicInfo,
  ProductData,
  SocialFormData,
} from "@/types";

// Constants
import {
  NEW_PRODUCT_FORM_STEPS,
  MESSAGE_ADD_PRODUCT,
  SEPARATOR,
  SOCIAL_PRODUCTS,
  ROUTES,
} from "@/constants";

// Services
import { addNewProduct } from "@/services";

// HOCs
import { TOAST_TYPE, TWithToast, withToast } from "@/hocs/withToast";

const AddProductForm = ({ openToast }: TWithToast<{}>) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newProduct, setNewProduct] = useState<ProductData>({
    productName: "",
    description: "",
    weight: 0,
    category: 1,
    quantity: 0,
    price: 0,
    providerName: "",
    image: "",
    currency: 0,
    sku: "",
    tags: [],
    shopifyUrl: "",
    facebookUrl: "",
    instagramUrl: "",
  });

  const onClickBackButton = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderLoading = isLoading ? (
    <LoadingIndicator
      width={16}
      height={16}
      fillColor="gray-500"
      additionalClass="h-full w-full absolute flex items-center justify-center z-30"
    />
  ) : null;

  const formContent = () => {
    switch (currentStep) {
      case 2:
        return (
          <MediaForm
            onBack={onClickBackButton}
            onSubmit={handleSubmitMediaForm}
          />
        );
      case 3:
        return (
          <SocialForm
            socialUrls={SOCIAL_PRODUCTS}
            onBack={onClickBackButton}
            onSubmit={handleSubmitSocialForm}
          />
        );
      case 4:
        return (
          <PricingForm
            price={newProduct.price}
            currency={newProduct.currency}
            sku={newProduct.sku}
            tags={newProduct.tags}
            isLoading={isLoading}
            onBack={onClickBackButton}
            onSubmit={handleSubmitPricingForm}
            errorMessage={errorMessage}
          />
        );
      default:
        return (
          <ProductInfoForm
            productName={newProduct.productName}
            description={newProduct.description}
            providerName={newProduct.providerName}
            weight={newProduct.weight}
            category={newProduct.category}
            quantity={newProduct.quantity}
            onSubmit={handleSubmitProductInfoForm}
          />
        );
    }
  };

  const handleSubmitProductInfoForm = (info: ProductBasicInfo) => {
    setNewProduct({
      ...newProduct,
      ...info,
      weight: Number(info.weight),
      category: Number(info.category),
      quantity: Number(info.quantity),
    });
    setCurrentStep(currentStep + 1);
  };

  const handleSubmitMediaForm = (media: IMedia) => {
    setNewProduct({ ...newProduct, image: media.image });
    setCurrentStep(currentStep + 1);
  };

  const handleSubmitSocialForm = (social: SocialFormData) => {
    setNewProduct({
      ...newProduct,
      ...social,
    });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    router.push(ROUTES.PRODUCTS);
  };

  const handleSubmitPricingForm = async (pricing: NewPricing) => {
    const price = pricing.price.toString().replaceAll(SEPARATOR.COMMAS, "");

    const product: ProductData = {
      ...newProduct,
      price: Number(price),
      currency: Number(pricing.currency),
      tags: pricing.tags?.map(Number),
    };

    setIsLoading(true);

    const { message = "" } = await addNewProduct(product);

    setErrorMessage(message);

    openToast(
      {
        type: message ? TOAST_TYPE.ERROR : TOAST_TYPE.SUCCESS,
        message: message
          ? MESSAGE_ADD_PRODUCT.FAILED
          : MESSAGE_ADD_PRODUCT.SUCCESS,
      },
      message
        ? () => {
            setIsLoading(false);
          }
        : handleBack,
    );
  };

  return (
    <section className="flex flex-col items-center relative p-4 bg-white dark:bg-dark-tremor-primary rounded-lg shadow-md mx-auto w-full">
      <Stepper
        steps={NEW_PRODUCT_FORM_STEPS}
        currentStep={currentStep}
        total={NEW_PRODUCT_FORM_STEPS.length}
      />
      {renderLoading}
      {formContent()}
    </section>
  );
};

const AddProductFormWithToast = withToast(AddProductForm);

export default AddProductFormWithToast;
