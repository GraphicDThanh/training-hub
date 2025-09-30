"use client";

//Components
import { Text, Flex } from "@tremor/react";
import { Button } from "@/components";

//Styles
import "@/styles/billing.css";

// Constants
import { VARIANT_BUTTON, MAILTO_SUPPORT } from "@/constants";

const InvoiceFooter = () => {
  const handlePrintInvoice = () => {
    document.title = "Tremor Dashboard - Invoice Detail";

    window.print();
  };

  return (
    <Flex
      alignItems="start"
      flexDirection="col"
      className="md:items-end md:flex-row mt-10 md:mt-20 invoice print:mt-10">
      <Flex
        flexDirection="col"
        alignItems="start"
        className="print-footer md:max-w-[40%]">
        <Text className="text-primary dark:text-white text-xl font-semibold leading-7 print:text-primary dark:print:!text-primary">
          Thank you!
        </Text>
        <Text className="dark:text-dark-romance font-light text-tertiary leading-5 my-2 print:text-greyer dark:print:text-greyer">
          If you encounter any issues related to the invoice you can contact us
          at:
        </Text>
        <Flex justifyContent="start" className="gap-1">
          <Text className="dark:text-dark-romance font-light text-tertiary leading-5 my-2 print:text-greyer dark:print:text-greyer">
            email:{" "}
          </Text>
          <p className="dark:text-dark-romance text-sm font-light text-tertiary leading-5 print:text-greyer dark:print:text-greyer">
            <a href={`mailto:${MAILTO_SUPPORT}`}>{MAILTO_SUPPORT}</a>
          </p>
        </Flex>
      </Flex>

      <Button
        variant={VARIANT_BUTTON.PRIMARY}
        additionalClass="py-3 px-6 mt-6 md:mt-0 border-none dark:text-white print:hidden"
        onClick={handlePrintInvoice}>
        <Text className="uppercase font-bold text-xs text-white dark:text-white tracking-wide">
          print
        </Text>
      </Button>
    </Flex>
  );
};

export default InvoiceFooter;
