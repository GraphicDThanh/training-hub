// Components
import { Button } from "@/components";

// Icons
import { MdDone, MdReplay, MdClose } from "react-icons/md";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface ProductStatusProps {
  status: number;
}

const ProductStatus = ({ status }: ProductStatusProps) => {
  switch (status) {
    case 0:
      return (
        <Button
          aria-label="Done"
          additionalClass="border-green-500 cursor-default"
          variant={VARIANT_BUTTON.LIGHT_STATUS}
          variantTremor={VARIANT_BUTTON.LIGHT}>
          <MdDone className="text-xs text-green-500" />
        </Button>
      );
    case 1:
      return (
        <Button
          aria-label="Close"
          additionalClass="border-red-500 cursor-default"
          variant={VARIANT_BUTTON.LIGHT_STATUS}
          variantTremor={VARIANT_BUTTON.LIGHT}>
          <MdClose className="text-xs text-red-500" />
        </Button>
      );
    case 2:
      return (
        <Button
          aria-label="Replay"
          additionalClass="border-primary dark:border-primary cursor-default"
          variant={VARIANT_BUTTON.LIGHT_STATUS}
          variantTremor={VARIANT_BUTTON.LIGHT}>
          <MdReplay className="text-xs text-primary dark:text-primary" />
        </Button>
      );
    default:
      return <span className="w-[25px] h-[25px] mr-2"></span>;
  }
};

export default ProductStatus;
