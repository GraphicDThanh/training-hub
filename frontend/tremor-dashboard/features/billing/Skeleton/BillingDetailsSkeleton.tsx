const BillingDetailsSkeleton = () => (
  <div className="w-full flex flex-col md:flex-row items-center gap-4">
    <div className="w-full h-60 md:min-w-96 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    <div className="w-full h-60 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    <div className="w-full h-60 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
  </div>
);

export default BillingDetailsSkeleton;
