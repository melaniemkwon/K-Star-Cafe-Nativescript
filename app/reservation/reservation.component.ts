import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { ReservationModalComponent } from '../reservationmodal/reservationmodal.component';
import { Animation, AnimationDefinition } from "ui/animation";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import * as enums from "ui/enums";
import { CouchbaseService } from '../services/couchbase.service';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html'
  })
export class ReservationComponent extends DrawerPage implements OnInit {
    reservationForm: FormGroup;
    reservationFormView: View;
    reservationSubmissionView: View;
    showSubmission: boolean = false;
    reservations: Array<number>;
    docId: string = "reservations";

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private formBuilder: FormBuilder,
        private page: Page,
        private couchbaseService: CouchbaseService) {
            super(changeDetectorRef);

            this.reservationForm = this.formBuilder.group( {
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });

            this.reservations = [];
            let doc = this.couchbaseService.getDocument(this.docId);
            if( doc == null) {
                this.couchbaseService.createDocument({"reservations": []}, this.docId);
            }
            else {
                this.reservations = doc.favorites;
            }
    }
    
    ngOnInit() {

    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservationForm.patchValue({ smoking: true });
        } else {
            this.reservationForm.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;
        this.reservationForm.patchValue({ guests: textField.text });
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;
        this.reservationForm.patchValue({ dateTime: textField.text });
    }
    
    createModalView(args) {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservationForm.patchValue({guests: result});
                } else if (args === "date-time") {
                    this.reservationForm.patchValue({dateTime: result});
                }
            });
    }

    onSubmit() {
        this.addReservation();

        this.reservationFormView = this.page.getViewById<View>("reservationForm");
        this.reservationFormView.animate({
            scale: { x: 0, y: 0 },
            opacity: 0,
            duration: 500,
            curve: enums.AnimationCurve.easeIn
        }).then(() => {
            console.log("reservationFormView animation played");
            this.reservationSubmissionView = this.page.getViewById<View>("reservationSubmission");
            this.reservationSubmissionView.scaleX = 0.1;
            this.reservationSubmissionView.scaleY = 0.1;
            this.reservationSubmissionView.opacity = 0;

            this.showSubmission = true;

            this.reservationSubmissionView.animate({
                scale: { x: 1, y: 1 },
                opacity: 1,
                duration: 500,
                curve: enums.AnimationCurve.easeIn
            }).then(() => {
                console.log("reservationSubmissionView animations played");
            }).catch((e) => {
                console.log(e.message);
            });
        }).catch((e) => {
            console.log(e.message);
        });
    }

    addReservation(): boolean {
        console.log(JSON.stringify(this.reservationForm.value));
        this.reservations.push(this.reservationForm.value);
        this.couchbaseService.updateDocument(this.docId, {"reservations": this.reservations});
        return true;
    }
}

