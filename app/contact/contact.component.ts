import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as Phone from 'nativescript-phone';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html'
})
export class ContactComponent extends DrawerPage {

  constructor(private changeDetectorRef:ChangeDetectorRef,
    private fonticon: TNSFontIconService) {
    super(changeDetectorRef);
  }

  sendEmail() {
    Email.available()
      .then((avail: boolean) => {
        if (avail) {
          Email.compose({
            to: ['kstarcafe@food.net'],
            subject: 'Hello',
            body: 'Dear Sir/Madam:'
          });
        } else {
          console.log("No email configured.");
        }
      })
  }

  phoneCall() {
    console.log("Calling number...");
    Phone.dial('852-1234-5678', true);
  }
}