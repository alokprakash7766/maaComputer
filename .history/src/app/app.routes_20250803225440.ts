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



export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "", component: CustomerLayoutComponent, children: [
      { path: "home", component: HomeComponent },
      { path: "category", component: CategoryComponent},
      { path: "shop", component: ShopComponent },
      { path: "product", component: ProductComponent},
      { path: "services", component: ServicesComponent},

      { path: "shop-details", component: ShopDetailsComponent },
      { path: "contact", component: ContactComponent },
      { path: "cart", component: CartComponent },
      { path: "billings", component: BillingsComponent },
      { path: "testimonial", component: TestimonialComponent },
      { path: "error", component: ErrorComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "profile", component: RegisterComponent, canActivate: [userGuard] },
    ]
  }, {
    path: "admin", component: AdminLayoutComponent, canActivate: [userGuard], children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "category/manage", component: CategoriesComponent },
      { path: "add/category", component: AddCategoryComponent },
      { path: "update/category", component: UpdateCategoryComponent },
      { path: "edit-category/:id", component: EditCategoryComponent },
      { path: "edit/product/:id", component: Edi },
      { path: "addProduct", component: AddProductComponent},
      { path: "addServices", component: AddServicesComponent},
    ]
  },
  { path: "**", redirectTo: "/error" }
];
