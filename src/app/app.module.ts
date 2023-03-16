import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { DietAgencyPage } from './pages/diet-agency/diet-agency.page';
import { GeneralSidebarComponent } from './components/general-sidebar/general-sidebar.component';

import { HomePage } from './pages/home/home.page';
import { SharedService } from './services/shared.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
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
    FontAwesomeModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    SharedService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
