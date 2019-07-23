import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsContainerComponent } from './containters/products-container/products-container.component';

import {MatGridListModule, MatButtonModule, MatCheckboxModule, MatDialogModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { DiscountPipe } from './pipes/discount.pipe';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { SharedModule } from './modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthEffects } from './store/effect/auth.effects';
import { FeedEffects } from './store/effect/feed.effects';

@NgModule({
  declarations: [
    AppComponent,
    // ProductComponent,
    ProductsContainerComponent,
    // ImgDialogComponent,
    // NgNotIfDirective,
    // ScrollEndDirective,
    // NgNotIf2Directive,
    // DiscountPipe,
    HeaderComponent,
    LoginComponent,
    ProductPageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MatGridListModule,
    // MatButtonModule, MatCheckboxModule, MatDialogModule, MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects, AuthEffects, FeedEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  exports: [],
  // entryComponents: [ImgDialogComponent],
  providers: [
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
