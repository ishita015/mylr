import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { DetailComponent } from './pages/signup/detail/detail.component';
import { TemplateComponent } from './pages/signup/template/template.component';
import { ColorComponent } from './pages/signup/color/color.component';
import { ColorComponent1 } from './pages/signup/color1/color.component';

import { Lr1Component } from './pages/signup/color/lr-1/lr-1.component';
import { Lr2Component } from './pages/signup/color/lr-2/lr-2.component';
import { Lr3Component } from './pages/signup/color/lr-3/lr-3.component';
import { Lr4Component } from './pages/signup/color/lr-4/lr-4.component';
import { Lr5Component } from './pages/signup/color/lr-5/lr-5.component';
import { Lr6Component } from './pages/signup/color/lr-6/lr-6.component'

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AddBranchComponent } from './pages/branch/add-branch/add-branch.component';
import { UpdateBranchComponent } from './pages/branch/update-branch/update-branch.component';
import { DetailBranchComponent } from './pages/branch/detail-branch/detail-branch.component';

import { AddContactPersonComponent } from './pages/contact-person/add-contactperson/add-contactperson.component';
import { ListContactPersonComponent } from './pages/contact-person/list-contactperson/list-contactperson.component';
import { UpdateContactPersonComponent } from './pages/contact-person/update-contactperson/update-contactperson.component';

import { CreateBillComponent } from './pages/bill/create-bill/create-bill.component';

import { CreateVoucherComponent } from './pages/voucher/create-voucher/create-voucher.component';
import { ListVoucherComponent } from './pages/voucher/list-voucher/list-voucher.component';
import { VoucherDetailComponent } from './pages/voucher/voucher-detail/voucher-detail.component';

import { LrFormComponent } from './pages/lr/lr-form/lr-form.component';
import {LrListComponent} from './pages/lr/lr-list/lr-list.component';
import { PendingApprovalComponent } from './pages/lr/pending-approval/pending-approval.component';

import { ContentComponent } from './pages/signup/content/content.component';
import {ComingsoonComponent} from './pages/comingsoon/comingsoon.component';

import { Template1Component } from './pages/lr/create-lr/template-1/template-1.component';
import { Template2Component } from './pages/lr/create-lr/template-2/template-2.component';
import { Template3Component } from './pages/lr/create-lr/template-3/template-3.component';
import { Template4Component } from './pages/lr/create-lr/template-4/template-4.component';
import { Template5Component } from './pages/lr/create-lr/template-5/template-5.component';
import { Template6Component } from './pages/lr/create-lr/template-6/template-6.component';

import { Detail1Component } from './pages/lr/lr-detail/detail-1/detail-1.component';
import { Detail2Component } from './pages/lr/lr-detail/detail-2/detail-2.component';
import { Detail3Component } from './pages/lr/lr-detail/detail-3/detail-3.component';
// import { Detail4Component } from './pages/lr/lr-detail/detail-4/detail-4.component';
// import { Detail5Component } from './pages/lr/lr-detail/detail-5/detail-5.component';
// import { Detail6Component } from './pages/lr/lr-detail/detail-6/detail-6.component';

import { VerificationComponent } from './pages/verification/verification.component';
import { VerificationIdComponent } from './pages/verification-id/verification-id.component'

import {CreateFreightComponent} from './pages/challan/create-freight/create-freight.component'
import {ListFreightComponent} from './pages/challan/list-freight/list-freight.component';
import {DetailFreightComponent} from './pages/challan/detail-freight/detail-freight.component'

import { LcAddComponent } from './pages/loading-challan/lc-add/lc-add.component';
import { LcListComponent } from './pages/loading-challan/lc-list/lc-list.component';
import { LcDetailComponent } from './pages/loading-challan/lc-detail/lc-detail.component';

import { InvoiceComponent } from './pages/invoice/create-invoice/invoice.component';
import { InvoiceListComponent } from './pages/invoice/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './pages/invoice/invoice-detail/invoice-detail.component'

import { CreateLrFormComponent } from './pages/create-lr-form/create-lr-form.component'
import { TrackerListComponent } from './pages/tracker/tracker-list.component';
import { TransporterlrComponent } from './pages/transporterlr/transporterlr.component';
import { TransporterlrDetailComponent } from './pages/transporterlr-detail/detail-1.component';
import { TransporterlrDetail2Component } from './pages/transporterlr-detail2/transporterlr-detail2.component';
import { TransporterlrDetail3Component } from './pages/transporterlr-detail3/transporterlr-detail3.component';

import { TermconditionComponent } from './pages/term & condition/term & condition.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ForgetComponent } from './pages/forget/forget.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent
   },
  {
    path: 'tracker',
    component: TrackerListComponent,
  },
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'about', 
    component: AboutComponent
  },
  { 
    path: 'contact', 
    component: ContactComponent
  },
  { 
    path:'dashboard', 
    component: DashboardComponent
  },
  { 
    path: 'verification/:message', 
    component: VerificationComponent
   },
   { 
    path: 'verification/:message/:transporter_id', 
    component: VerificationIdComponent
   }, 
  {
    path: 'profile',
    component: ProfileComponent 
  },
  {
    path: 'comingsoon',
    component: ComingsoonComponent 
  },
  {
    path: 'comingsoon0',
    component: ComingsoonComponent 
  },
  {
    path: 'comingsoon1',
    component: ComingsoonComponent 
  },
  {
    path: 'comingsoon2',
    component: ComingsoonComponent 
  },
  {
    path: 'comingsoon3',
    component: ComingsoonComponent 
  },
  {
    path: 'comingsoon4',
    component: ComingsoonComponent 
  },
  {
    path: 'comingsoon5',
    component: ComingsoonComponent 
  },
  {
    path: 'terms-and-condition',
    component: TermconditionComponent 
  },

  {
    path: 'invoice',
    children:[
    {path: 'create',component: InvoiceComponent,pathMatch: 'full' },
    {path: 'list',component: InvoiceListComponent,pathMatch: 'full' },
    {path: 'invoice-detail/:invoice_id',component: InvoiceDetailComponent,pathMatch: 'full' }
    ]
  },
  { 
    path: 'branch', 
    children:[
      { path: 'add-branch', component:AddBranchComponent },
      { path: 'update-branch', component:UpdateBranchComponent },
      { path: 'detail-branch', component:DetailBranchComponent}
    ]
  },
  { 
    path: 'contact-person', 
    children:[
      { path: 'add-contactperson', component:AddContactPersonComponent,pathMatch: 'full' },
      { path: 'update-contactperson/:contact_person_id', component:UpdateContactPersonComponent,pathMatch: 'full' },
      { path: 'list-contactperson/:branch_id', component:ListContactPersonComponent,pathMatch: 'full'}
    ]
  },

  { 
    path: 'lr', 
    children:[
      { path: 'list', component:LrListComponent },
      {
        path: 'create',
        component: CreateLrFormComponent,
      },
      { path: 'pending-approval', component:PendingApprovalComponent },

      { path: 'create/1', component:Template1Component },
      { path: 'create/2', component:Template2Component },
      { path: 'create/3', component:Template3Component },
      { path: 'create/4', component:Template4Component },
      { path: 'create/5', component:Template5Component },
      { path: 'create/6', component:Template6Component },

      { path: 'detail/:lr_id/1', component:Detail1Component },
      { path: 'detail/:lr_id/2', component:Detail2Component },
      { path: 'detail/:lr_id/3', component:Detail3Component },
      // { path: 'detail/:lr_id/4', component:Detail4Component },
      // { path: 'detail/:lr_id/5', component:Detail5Component },
      // { path: 'detail/:lr_id/6', component:Detail6Component },
    ]
  },
  { 
    path:'voucher', 
    children:[
      { path: 'create', component:CreateVoucherComponent },
      { path: 'list', component:ListVoucherComponent },
      { path: 'detail/:voucher_id', component:VoucherDetailComponent }
    ]
  },
  { 
    path:'loading-challan', 
    children:[
      { path: 'create', component:LcAddComponent },
      { path: 'list', component:LcListComponent },
      { path: 'detail/:loading_challan_id', component:LcDetailComponent }
    ]
  },
   {
  path:'freight-challan', 
  children:
  [ 
    {path: 'add', component:CreateFreightComponent },
    {path: 'list', component:ListFreightComponent },
    {path: 'detail/:fr_challan_id', component:DetailFreightComponent }
  ]
},
  { 
    path: 'contact-person', 
    children:[
      { path: 'add/:branch_id', component:AddContactPersonComponent,pathMatch: 'full' },
      { path: 'update-contactperson/:contact_person_id', component:UpdateContactPersonComponent,pathMatch: 'full' },
      { path: 'list-contactperson/:branch_id', component:ListContactPersonComponent,pathMatch: 'full'}
    ]
  },
  { 
    path:'signup', 
    children:[
      { path: 'detail', component:DetailComponent },
      { path: 'template', component:TemplateComponent },

      { path: 'color/1/:id', component:ColorComponent },
      { path: 'color/2/:id', component:ColorComponent1 },
      { path: 'content', component:ContentComponent },

      { path: 'color/1', component:Lr1Component },
      { path: 'color/2', component:Lr2Component },
      { path: 'color/3', component:Lr3Component },
      { path: 'color/4', component:Lr4Component },
      { path: 'color/5', component:Lr5Component },
      { path: 'color/6', component:Lr6Component }
    ]
  },
  {
    path: 'tranporter-lr/:transporter_id',
    component: TransporterlrComponent, 
  },
  {
    path: 'transporter-lr-detail/:lr_id/1',
    component: TransporterlrDetailComponent, 
  },
  {
    path: 'transporter-lr-detail/:lr_id/2',
    component: TransporterlrDetail2Component, 
  },
  {
    path: 'transporter-lr-detail/:lr_id/3',
    component: TransporterlrDetail3Component, 
  },
  {
    path: 'faq',
    component: FaqComponent 
  },
  {
    path: 'forget-password',
    component: ForgetComponent 
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
