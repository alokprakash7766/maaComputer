export class Orders {
  id?: string;
  userId: string;
  items: any[];  // cart items ka array
  totalAmount: number;
  createdAt?: Date;

  constructor(userId: string, items: any[], totalAmount: number, createdAt?: Date) {
    this.userId = userId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt ?? new Date();
  }
}
