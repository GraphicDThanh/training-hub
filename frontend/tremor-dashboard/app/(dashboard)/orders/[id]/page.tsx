import dynamic from "next/dynamic";
import { InView } from "react-intersection-observer";

// Components
import { Bold, Card, Col, Flex, Grid } from "@tremor/react";
import { BillingInfo } from "@/features/billing";
import {
  OrderHeader,
  OrderSummary,
  OrderContact,
  TrackOrder,
} from "@/features/orders";

const PaymentDetails = dynamic(
  () => import("@/features/orders/PaymentDetails/PaymentDetails"),
);

// Services
import { getOrderDetails } from "@/services";

const OrderDetailsPage = async ({ params }: { params: { id: number } }) => {
  const {
    id,
    orderCode,
    orderDeliverPrice,
    orderTax,
    trackOrderInfo,
    billingInfo,
    createdAt,
    products,
    status,
    cardInfo,
  } = await getOrderDetails(params.id);

  const {
    transmittedToCourierAt,
    generateOrderId,
    deliveredAt,
    generateOrderAt,
  } = trackOrderInfo;

  const productPrice = products.reduce(
    (total: number, item: Record<string, number>) =>
      total + item.count * item.price,
    0,
  );

  const firstProduct = products.length > 0 ? products[0] : null;

  const firstDay = new Date().getTime();
  const lastDay = new Date(deliveredAt).getTime();
  const period = Math.round((firstDay - lastDay) / (1000 * 3600 * 24));
  const { cardLast4Digit, cardNumber } = cardInfo;
  const { ownerName, companyName, email, vat } = billingInfo;

  return (
    <Flex
      justifyContent="center"
      className="w-full bg-transparent"
      as="section">
      <Card className="w-full lg:w-2/3 dark:bg-dark-blue p-4 ring-0 rounded-xl shadow-md">
        <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-2">
          <Col numColSpan={1} numColSpanMd={2} numColSpanLg={3}>
            <InView>
              <OrderHeader
                id={id}
                createdAt={createdAt}
                orderCode={orderCode}
              />
              <div className="w-full h-px bg-gradient-seldom dark:bg-gradient-divider opacity-45 my-6" />
            </InView>
          </Col>
          <Col numColSpan={1} numColSpanMd={2} numColSpanLg={3}>
            <InView>
              <OrderContact
                name={firstProduct.name}
                url={firstProduct.url}
                date={period}
                status={status}
              />
              <div className="w-full h-px bg-gradient-seldom dark:bg-gradient-divider opacity-25 my-6" />
            </InView>
          </Col>
          <Col numColSpan={1} numColSpanMd={2} numColSpanLg={3}>
            <Grid numItems={1} numItemsMd={4} numItemsLg={9}>
              <Col numColSpan={1} numColSpanMd={2} numColSpanLg={2}>
                <InView>
                  <TrackOrder
                    id={id}
                    transmittedToCourierAt={transmittedToCourierAt}
                    deliveredAt={deliveredAt}
                    generateOrderAt={generateOrderAt}
                    generateOrderId={generateOrderId}
                    status={status}
                  />
                </InView>
              </Col>
              <Col numColSpan={1} numColSpanMd={2} numColSpanLg={4}>
                <InView>
                  <div className="mb-6">
                    <PaymentDetails
                      cardLast4Digit={cardLast4Digit}
                      cardDigit={cardNumber}
                    />
                  </div>
                </InView>
                <InView>
                  <div>
                    <Bold className="text-primary font-semibold capitalize dark:text-white tracking-[0.12px]">
                      Billing Information
                    </Bold>
                    <BillingInfo
                      ownerName={ownerName}
                      companyName={companyName}
                      email={email}
                      vat={vat}
                    />
                  </div>
                </InView>
              </Col>
              <Col numColSpan={1} numColSpanMd={4} numColSpanLg={3}>
                <InView>
                  <div className="lg:pl-20 pt-6 lg:pt-0">
                    <OrderSummary
                      productPrice={productPrice}
                      delivery={orderDeliverPrice}
                      taxes={orderTax}
                    />
                  </div>
                </InView>
              </Col>
            </Grid>
          </Col>
        </Grid>
      </Card>
    </Flex>
  );
};

export default OrderDetailsPage;
