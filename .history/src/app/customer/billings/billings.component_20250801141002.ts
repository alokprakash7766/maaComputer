this.cartService.getCartItems().subscribe((cartItems) => {
  this.billing.items = cartItems;
  this.billing.totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  this.billingService.saveBilling(this.billing).then(() => {
    alert('Order placed successfully!');
    this.cartService.clearCart();
  });
});
