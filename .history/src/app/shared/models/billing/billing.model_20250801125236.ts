// ✅ Step 1: Create a billing model
// src/app/models/billing.model.ts

export interface BillingProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  total: number;
}

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  company?: string;
  notes?: string;
  shippingOption: string;
  paymentMethod: string;
  products: BillingProduct[];
  subtotal: number;
  total: number;
}
