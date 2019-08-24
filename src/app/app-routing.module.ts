import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomeComponent} from "./home/home.component";
import {GarellyComponent} from "./garelly/garelly.component";
import {NextfestivalComponent} from "./nextfestival/nextfestival.component";
import {DetailFestivalComponent} from "./detail-festival/detail-festival.component"
import{AboutusComponent}from "./aboutus/aboutus.component"
import{FAQComponent}from "./faq/faq.component"
import{FeedbackComponent}from "./feedback/feedback.component"
import{ManagerCartComponent}from "./manager-cart/manager-cart.component"
import {DetailCartComponent} from "./detail-cart/detail-cart.component"

import{UpdateProfileComponent}from "./update-profile/update-profile.component"



const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'nextfestival',component:NextfestivalComponent},
  {path:'garelly',component:GarellyComponent},
  {path:'detailF/:id',component:DetailFestivalComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'faq',component:FAQComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'updateprofile',component:UpdateProfileComponent},
  {path:'managercart',component:ManagerCartComponent},
  {path:'detailcart/:id/:idC/:type',component:DetailCartComponent}






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
