describe("orderSubmit", () =>
{
  // It should first submit payment via the payment service provider.
  //   If this fails, it should throw an error.
  // It should then execute a batch write, which
  //   - should update the Status to PAYMENT_PENDING;
  //   - should update the inventory of each SKU (quantity and quantityReserved).
})
