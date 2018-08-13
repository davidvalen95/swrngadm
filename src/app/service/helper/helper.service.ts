import {Injectable} from '@angular/core';
import * as toastr from 'toastr';
import {MyHelper} from '../../MyHelper';
// import * as toastr from 'toastr';

declare var $:any;
// declare var toastr:any;
@Injectable()
export class HelperService {

    private pageParameter:any = {};
    constructor() {
    }

    public  getParam(pageParameter:any){
        this.pageParameter = pageParameter;
    }
    public setParam<T>(): T{
        return <T> this.pageParameter
    }


    presentToast(config:ToastConfigInterface) {


        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "4000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
        }
        switch(config.type || NotificationTypeInterface.info){
            case NotificationTypeInterface.info:
                toastr.info(config.message || "",config.title || "Info");

                break;
            case NotificationTypeInterface.warning:
                toastr.warning(config.message || "",config.title || "Warning");

                break;
            case NotificationTypeInterface.danger:
                toastr.error(config.message || "",config.title || "Danger");

                break;
            case NotificationTypeInterface.success:
                toastr.success(config.message || "",config.title || "Success");

                break;
        }
        console.log('toast',toastr);
    }
    presentNotification(message:string, notificationType:NotificationTypeInterface = NotificationTypeInterface.success, from:"top"|"bottom" = "top", align:"left"|"center"|"right" = "center"){

        var type = NotificationTypeInterface[notificationType];

        var milisecond = 1000;
        $.notify({
            icon: "notifications",
            message: message,

        },{
            type: type,
            time: milisecond,
            duration: milisecond,
            timer: milisecond,
            placement: {
                from: from,
                align: align
            }
        });


    }


    presentConfirmation(config:ConfirmationConfigInterface = {},onConfirmed: ()=>void){

        $.confirm({
            title: config.title || 'Confirmation',
            content: config.message || 'Are you sure to continue?',
            buttons: {
                cancel: {
                    text: 'Cancel',
                    btnClass: 'btn-danger',
                    keys: ['esc'],
                    action: function(){

                    }
                },
                confirm: {
                    btnClass: 'btn-success',
                    action: function () {
                        onConfirmed();
                    }
                },



            }
        });

    }

    presentAlert(config:AlertConfigInterface = {}){
        $.alert({
            title: config.title || 'Attention',
            content: config.message || '',
            button:{
                ok: {
                    text: 'Ok',
                    btnClass: 'btn-danger',
                    keys: ['esc'],
                    action: function(){

                    }
                }

            }
        });
    }

    closeModal(){
        $('.closeModal').trigger('click');
    }

    public mergeObject(a:object,b:object):any{
        Object.keys(b).forEach(function(key) { a[key] = b[key]; });

        return a;
    }

    public parseBoolean(value:any):boolean{
        if (typeof(value) === 'string'){
            value = value.trim().toLowerCase();
        }
        switch(value){
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }

    getReadableDate(param:string | Date){
        var date:Date = null;
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(typeof param ==='string'){
            date = new Date(param);
        }
        if(param instanceof Date){
            date = param;
        }

        // console.log('getReadableDate',date);
        if(date){
            var month = months[date.getMonth()];
            return `${date.getDate()} ${month} ${date.getFullYear()}`;
        }

        return "-";


    }
}






export enum NotificationTypeInterface {
    info, success, warning, danger
}

export interface ToastConfigInterface{
    title?:string;
    message:string;
    type?: NotificationTypeInterface,
}
export interface ConfirmationConfigInterface{
    message?:string;
    title?:string;
}

export interface AlertConfigInterface{
    message?:string;
    title?:string;
}