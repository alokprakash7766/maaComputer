import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { HomeComponent } from './customer/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AddCategoryComponent } from './admin/categories/add-category/add-category.component';
import { UpdateCategoryComponent } from './admin/categories/update-category/update-category.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './customer/shop/shop.component';
import { ShopDetailsComponent } from './customer/shop-details/shop-details.component';
import { ContactComponent } from './customer/contact/contact.component';
import { CartComponent } from './customer/cart/cart.component';
import { BillingsComponent } from './customer/billings/billings.component';
import { TestimonialComponent } from './customer/testimonial/testimonial.component';
import { ErrorComponent } from './customer/error/error.component';
import { userGuard } from './shared/guard/user/user.guard';
import { EditCategoryComponent } from './admin/categories/edit-category/edit-category.component';
import { ProductComponent } from './customer/product/product.component';
import { ServicesComponent } from './customer/services/services.component';
import { CategoryComponent } from './customer/category/category.component';
import { AddProductComponent } from './admin/categories/add-product/add-product.component';
import { AddServicesComponent } from './admin/categories/add-services/add-services.component';
import { EditProductComponent } from './admin/categories/edit-product/edit-product.component';
import { EditServicesComponent } from './admin/categories/edit-services/edit-services.component';
import { AddWeddingCardComponent } from './admin/categories/add-wedding-card/add-wedding-card.component';
import { EditWeddingCardComponent } from './admin/categories/edit-wedding-card/edit-wedding-card.component';
import { WeddingCardComponent } from './customer/wedding-card/wedding-card.component';
import { MyAccountComponent } from './customer/my-account/my-account.component';
import { OrdersComponent } from './customer/orders/orders.component';
import { ServiceAppointmentComponent } from './customer/service-appointment/service-appointment.component';
import { AllProductComponent } from './admin/categories/all-product/all-product.component';
import { AllServicesComponent } from './admin/categories/all-services/all-services.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { AllWeddingCardComponent } from './admin/categories/all-wedding-card/all-wedding-card.component';
import { AllOrdersComponent } from './admin/all-orders/all-orders.component';




export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "", component: CustomerLayoutComponent, children: [
      { path: "home", component: HomeComponent },
      { path: "category", component: CategoryComponent },
      { path: "shop", component: ShopComponent },
      { path: "product", component: ProductComponent },
      { path: "services", component: ServicesComponent },
      { path: "weddingCard", component: WeddingCardComponent },

      { path: "shop-details", component: ShopDetailsComponent },
      { path: "contact", component: ContactComponent },
      { path: "cart", component: CartComponent },
      { path: "billings", component: BillingsComponent },
      { path: "testimonial", component: TestimonialComponent },
      { path: "error", component: ErrorComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "orders", component: OrdersComponent },
      { path: "serviceBook", component: ServiceAppointmentComponent },

      { path: "myAccount", component: MyAccountComponent },
      { path: "paymentGateway", component: PaymentComponent },
      { path: "profile", component: RegisterComponent, canActivate: [userGuard] },
    ]
  }, {
    path: "admin", component: AdminLayoutComponent, canActivate: [userGuard], children: [
      { path: "dashboard", component: DashboardComponent },


      {path: "allOrders" , component: AllOrdersComponent},
      { path: "category/manage", component: CategoriesComponent },


      { path: "add/category", component: AddCategoryComponent },
      { path: "update/category", component: UpdateCategoryComponent },
      { path: "edit-category/:id", component: EditCategoryComponent },


      { path: "edit/product/:id", component: EditProductComponent },
      { path: "addProduct", component: AddProductComponent },
      { path: "viewProduct", component: AllProductComponent },


      { path: "addServices", component: AddServicesComponent },
      { path: 'edit-service/:id', component: EditServicesComponent },
      { path: 'viewServices', component: AllServicesComponent },


      { path: "addWeddingCard", component: AddWeddingCardComponent },
      { path: 'edit-wedding/card/:id', component: EditWeddingCardComponent },
      { path: 'viewWeddingCard', component: AllWeddingCardComponent }

    ]
  },
  { path: "**", redirectTo: "/error" }
];
