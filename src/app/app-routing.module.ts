import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsContainerComponent } from './containters/products-container/products-container.component';
import { LoginComponent } from './component/login/login.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { ProductResolverService } from './services/product-resolver.service';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path: 'cart', loadChildren: './modules/cart/cart.module#CartModule'},
  // {path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then((m) => m.CartModule)},
 { path: 'feed', component: ProductsContainerComponent, canActivate: [AuthGuardGuard] },
  // { path: 'feed', component: ProductsContainerComponent },
  { path: 'product/:id', component: ProductPageComponent, resolve: { product: ProductResolverService } },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
