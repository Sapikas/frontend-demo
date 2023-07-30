import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { DietAgencyPage } from './pages/diet-agency/diet-agency.page';
import { GeneralSidebarComponent } from './components/general-sidebar/general-sidebar.component';

import { DietAgenciesListPage } from './pages/diet-agencies-list/diet-agencies-list.page';
import { SharedService } from './services/shared.service';
import { FormsModule } from '@angular/forms';
import { AuthenticationInterceptorService } from './services/authentication-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DietAgenciesListPage,
    DietAgencyPage,
    MenuComponent,
    FooterComponent,
    BottomMenuComponent,
    LoginModalComponent,
    GeneralSidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    SharedService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
