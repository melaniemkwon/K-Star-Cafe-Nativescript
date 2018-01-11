import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
    
    commentForm: FormGroup;

    constructor(private params: ModalDialogParams,
        private formBuilder: FormBuilder,){

        this.commentForm = this.formBuilder.group( {
            author: ['', Validators.required],
            rating: 5,
            comment: '',
            date: ''
        });
    }
    
    ngOnInit() {
    }

    onSubmit() {
        this.commentForm.patchValue({date: new Date().toISOString()});
        this.params.closeCallback(this.commentForm.value);
    }
}