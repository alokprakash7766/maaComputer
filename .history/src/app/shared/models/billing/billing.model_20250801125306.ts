export class Billing {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  country: string = '';
  postalCode: string = '';
  company?: string;
  notes?: string;
  shippingOption: string = 'Free Shipping';
  paymentMethod: string = 'Cash On Delivery';

  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    total: number;
  }[] = [];

  subtotal: number = 0;
  total: number = 0;
}
