import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { DrawerComponent } from "./shared/drawer/drawer.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";

import { DishService } from "./services/dish.service";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";
import { FavoriteService } from "./services/favorite.service";
import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";

import { baseURL } from "./shared/baseurl";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.min.css'
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        DishdetailComponent,
        DrawerComponent,
        ContactComponent,
        AboutComponent
    ],
    providers: [
        DishService,
        PromotionService,
        LeaderService,
        FavoriteService,
        ProcessHTTPMsgService,
        { provide: 'BaseURL', useValue: baseURL }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
