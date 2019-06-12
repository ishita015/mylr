import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {CommonModule} from '@angular/common';
import { AmazingTimePickerModule  } from 'amazing-time-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {trigger, state, style, transition, animate} from '@angular/animations';

import { CookieService } from 'ngx-cookie-service';
// import {CarouselModule} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { MyDatePickerModule, MyDatePicker } from 'mydatepicker';

import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { PendingApprovalComponent } from './pages/lr/pending-approval/pending-approval.component';

import { CreateBillComponent } from './pages/bill/create-bill/create-bill.component';

import { CreateVoucherComponent } from './pages/voucher/create-voucher/create-voucher.component';
import { ListVoucherComponent } from './pages/voucher/list-voucher/list-voucher.component';
import { VoucherDetailComponent } from './pages/voucher/voucher-detail/voucher-detail.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';

import { DetailComponent } from './pages/signup/detail/detail.component';
import { TemplateComponent } from './pages/signup/template/template.component';

import { ColorComponent } from './pages/signup/color/color.component';
import { ColorComponent1 } from './pages/signup/color1/color.component';

import { AddBranchComponent } from './pages/branch/add-branch/add-branch.component';
import { DetailBranchComponent } from './pages/branch/detail-branch/detail-branch.component';
import { UpdateBranchComponent } from './pages/branch/update-branch/update-branch.component';

import { LoginHeaderComponent } from './component/login-header/login-header.component';
import { LeftSidebarComponent } from './component/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './component/right-sidebar/right-sidebar.component';
import { LoginLeftbarComponent } from './component/login-leftbar/login-leftbar.component';
import { AddContactPersonComponent } from './pages/contact-person/add-contactperson/add-contactperson.component';
import { ListContactPersonComponent } from './pages/contact-person/list-contactperson/list-contactperson.component';
import { UpdateContactPersonComponent } from './pages/contact-person/update-contactperson/update-contactperson.component';

import {ComingsoonComponent} from './pages/comingsoon/comingsoon.component';

import {LrListComponent} from './pages/lr/lr-list/lr-list.component';
import { LrFormComponent } from './pages/lr/lr-form/lr-form.component';
import { ContentComponent } from './pages/signup/content/content.component';

import {CreateFreightComponent} from './pages/challan/create-freight/create-freight.component'
import {ListFreightComponent} from './pages/challan/list-freight/list-freight.component';
import {DetailFreightComponent} from './pages/challan/detail-freight/detail-freight.component'

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

import { Lr1Component } from './pages/signup/color/lr-1/lr-1.component';
import { Lr2Component } from './pages/signup/color/lr-2/lr-2.component';
import { Lr3Component } from './pages/signup/color/lr-3/lr-3.component';
import { Lr4Component } from './pages/signup/color/lr-4/lr-4.component';
import { Lr5Component } from './pages/signup/color/lr-5/lr-5.component';
import { Lr6Component } from './pages/signup/color/lr-6/lr-6.component'

import { VerificationComponent } from './pages/verification/verification.component';
import { VerificationIdComponent } from './pages/verification-id/verification-id.component'
/* -- pipe --*/
import {MylrService} from './mylr.service';
import { from } from 'rxjs/observable/from';
import { lrListPipe } from './pipe/filter.pipe';
import { loadingChallanPipe } from './pages/loading-challan/lc-list/loading-challan-filter.pipe';

import { LcAddComponent } from './pages/loading-challan/lc-add/lc-add.component';
import { LcListComponent } from './pages/loading-challan/lc-list/lc-list.component';
import { LcDetailComponent } from './pages/loading-challan/lc-detail/lc-detail.component';

import { InvoiceComponent } from './pages/invoice/create-invoice/invoice.component';
import { InvoiceListComponent } from './pages/invoice/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './pages/invoice/invoice-detail/invoice-detail.component';
import { CreateLrFormComponent } from './pages/create-lr-form/create-lr-form.component'
import { TrackerListComponent } from './pages/tracker/tracker-list.component';
import { TrackerPipe } from './pages/tracker/tracker-filter.pipe'

import { CreateLrFilterPipe } from './pages/create-lr-form/filter.pipe'; 
import { Pipe, PipeTransform } from '@angular/core';
import { TransporterlrComponent } from './pages/transporterlr/transporterlr.component';
import { TransporterlrDetailComponent } from './pages/transporterlr-detail/detail-1.component';
import { TransporterlrDetail2Component } from './pages/transporterlr-detail2/transporterlr-detail2.component';
import { TransporterlrDetail3Component } from './pages/transporterlr-detail3/transporterlr-detail3.component';

import { Md5 } from 'ts-md5/dist/md5';
import { TermconditionComponent } from './pages/term & condition/term & condition.component';
import { FaqComponent } from './pages/faq/faq.component';

import { OwlModule } from 'ngx-owl-carousel';
import { ForgetComponent } from './pages/forget/forget.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DatePipe } from '@angular/common'
@NgModule({
  declarations: [
    AppComponent,
    ListFreightComponent,
    DetailFreightComponent,
    InvoiceComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PendingApprovalComponent,
    CreateBillComponent,
    CreateVoucherComponent,
    TemplateComponent,
    ColorComponent,
    DetailComponent,
    Template1Component,
    ContentComponent,
    ColorComponent,
    ColorComponent1,
    AddBranchComponent,
    DetailBranchComponent,
    UpdateBranchComponent,
    DashboardComponent,
    LoginHeaderComponent,
    ProfileComponent,
    LrFormComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    LoginLeftbarComponent, ComingsoonComponent,TrackerListComponent,TrackerPipe,
    LrListComponent,
    AddContactPersonComponent, ListContactPersonComponent, UpdateContactPersonComponent,
    lrListPipe,
    Template2Component,
    Template3Component,
    Template4Component,
    Template5Component,
    Template6Component,
    Detail1Component,
    Detail2Component,
    Detail3Component,
    Lr1Component,
    Lr2Component,
    Lr3Component,
    Lr4Component, CreateLrFilterPipe,
    Lr5Component, VerificationIdComponent,
    Lr6Component, loadingChallanPipe, FaqComponent,
    VerificationComponent, CreateFreightComponent, ListVoucherComponent, VoucherDetailComponent, 
    LcAddComponent, LcListComponent, LcDetailComponent, CreateLrFormComponent,TransporterlrComponent,
    TransporterlrDetailComponent ,TransporterlrDetail2Component ,TransporterlrDetail3Component,TermconditionComponent, ForgetComponent
  ],
  imports: [
    BrowserModule, MyDatePickerModule, AmazingTimePickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    // CarouselModule,
    Ng4GeoautocompleteModule,
    ChartsModule,
    NgxPaginationModule, OwlModule,ImageCropperModule
  ],
  providers: [MylrService,CookieService,Md5,
    {provide: LocationStrategy, useClass: HashLocationStrategy},DatePipe
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
