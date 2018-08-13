import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseForm, InputType, LabelType} from '../BaseForm';
import {NgForm, NgModel} from '@angular/forms';

@Component({
    selector: 'app-floating-input',
    templateUrl: './floating-input.component.html',
    styleUrls: ['./floating-input.component.scss']
})
export class FloatingInputComponent implements OnInit {


    @Input() public baseForm: BaseForm;
    @Input() public parentForm: NgForm;

// public model:NgModel;
// @ViewChild('model') public set content(content:NgModel){
//   this.model = model;
//   this.parentForm.addControl(this.model);
//
// };

    @ViewChild('ionInputModel') public ionInputModel: NgModel;
    @ViewChild('ionSelectModel') public ionSelectModel: NgModel;
    @ViewChild('ionDateModel') public ionDateModel: NgModel;
    @ViewChild('ionTextareaModel') public ionTextareaModel: NgModel;
    @ViewChild('fileModel') public fileModel: NgModel;
    @ViewChild('ionRadioModel') public ionRadioModel: NgModel;
    public finalModel: NgModel;
    public inputType;
    public labelType;
    public allowedBroadcast;
    constructor() {
        this.baseForm = null;
        console.log('floatingInputComponentConstructor');
    }

    ngOnInit() {
        if (this.baseForm) {
            this.baseForm.changeListener.subscribe(((model: BaseForm) => {
                // this.parentForm.tes.setDirty()
                if (this.baseForm.inputType == InputType.number) {
                    console.log('listenerNumber val:', model.value, 'baseform: ', this.baseForm);
                    if (this.baseForm.rules.max < Number(model.value)) {
                        // console.log('listenerNumber catch error max', this.baseForm.rules.max, Number(model.value ))
                        this.parentForm.getControl(this.finalModel).setErrors(['max'])

                    }
                    if (this.baseForm.rules.min > Number(model.value)) {
                        this.parentForm.getControl(this.finalModel).setErrors(['min'])

                    }
                }

            }))
            switch (this.baseForm.inputType) {
                case InputType.text:
                case InputType.password:
                case InputType.email:
                case InputType.number:
                    this.finalModel = this.ionInputModel;
                    this.allowedBroadcast = 'ioninput';
                    break;
                case InputType.select:
                    this.finalModel = this.ionSelectModel;
                    this.allowedBroadcast = 'ionselect';
                    break;
                case InputType.date:
                case InputType.datetime:
                    this.finalModel = this.ionDateModel;
                    this.allowedBroadcast = 'iondatetime';
                    break;
                case InputType.textarea:
                    this.finalModel = this.ionTextareaModel;
                    this.allowedBroadcast = 'iontextarea';
                    break;
                case InputType.file:
                    this.finalModel = this.fileModel;
                    break;
                case InputType.radio:
                    this.finalModel = this.ionRadioModel;
                    this.allowedBroadcast = 'ionradio';

                    break;
            }
            this.parentForm.addControl(this.finalModel);
            this.inputType = InputType[this.baseForm.inputType];
            this.labelType = LabelType[this.baseForm.labelType];


        }

    }

    ngAfterContentInit() {



        // this.baseForm.isHidden = false;
    }

    debug() {
        console.log('debug');
    }

    onFieldClicked(model) {
        console.log('onFieldClicked');
        if (this.baseForm.isSearchBar) {
            // var param:SearchBarParam = {
            //     baseForm: this.baseForm
            // }
            // console.log('onFieldClicked');
            // this.navController.push(SearchBarPage, param)

        }


        if (this.baseForm.inputType == InputType.date) {
            // this.showCalendar();
            // this.showCalendarPage();
        }
        this.baseForm.inputClickListener.next(model);
    }


    public broadcast(origin) {

        // console.log('broadcastION',origin,this.allowedBroadcast,this.baseForm.name ,this.baseForm.value);
        if (origin == this.allowedBroadcast) {
            this.baseForm.broadcastIonChange(origin);
        }


    }


}

