import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr'

import {environment} from "../environments/environment"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NextfestivalComponent } from './nextfestival/nextfestival.component';
import { GarellyComponent } from './garelly/garelly.component';
import { ContactComponent } from './contact/contact.component';

import {HomeService} from "./model/home.service";
import {PaginationService} from "./model/pagination.service";

import { DetailFestivalComponent } from './detail-festival/detail-festival.component';
import { ScrollableDirective } from './model/scrollable.directive';
import { LoadingSpinnerComponent } from './garelly/loading-spinner/loading-spinner.component';
import {ScrollingModule}from "@angular/cdk/scrolling"
import {BrowserAnimationsModule}from "@angular/platform-browser/animations";
import { AboutusComponent } from './aboutus/aboutus.component';
import { FAQComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ManagerCartComponent } from './manager-cart/manager-cart.component';
import { DetailCartComponent } from './detail-cart/detail-cart.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NextfestivalComponent,
    GarellyComponent,
    ContactComponent,
    DetailFestivalComponent,
    ScrollableDirective,
    LoadingSpinnerComponent,
    AboutusComponent,
    FAQComponent,
    FeedbackComponent,
    UpdateProfileComponent,
    ManagerCartComponent,
    DetailCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(), 
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ScrollingModule


  ],
  providers: [
    HomeService,
    PaginationService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
