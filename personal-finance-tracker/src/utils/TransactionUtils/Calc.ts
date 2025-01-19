export const calculateCategorySum = (transactions: any[], category: string) => {
  return transactions
    .filter((t) => t.category === category)
    .reduce((sum, transaction) => sum + Number(transaction.value), 0);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const getCategoryDetails = (transactions: any[], category: string) => {
  return transactions
    .filter((t) => t.category === category)
    .map((t) => ({
      date: new Date(t.purchaseDate).toLocaleDateString(),
      value: formatCurrency(Number(t.value)),
      description: t.description || "No description",
    }));
};
