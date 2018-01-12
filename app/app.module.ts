import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { NativeScriptUIListViewModule } from 'nativescript-telerik-ui/listview/angular';
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { DrawerComponent } from "./shared/drawer/drawer.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { FavoritesComponent } from './favorites/favorites.component';
import { ReservationComponent } from "./reservation/reservation.component";
import { ReservationModalComponent } from "./reservationmodal/reservationmodal.component";
import { CommentComponent } from "./comment/comment.component";

import { DishService } from "./services/dish.service";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";
import { FavoriteService } from "./services/favorite.service";
import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";
import { CouchbaseService } from './services/couchbase.service';

import { baseURL } from "./shared/baseurl";

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
        }),
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        DishdetailComponent,
        DrawerComponent,
        ContactComponent,
        AboutComponent,
        FavoritesComponent,
        ReservationComponent,
        ReservationModalComponent,
        CommentComponent
    ],
    entryComponents: [
        ReservationModalComponent,
        CommentComponent
    ],
    providers: [
        DishService,
        PromotionService,
        LeaderService,
        FavoriteService,
        ProcessHTTPMsgService,
        CouchbaseService,
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
