import {Component, OnInit, ViewChild} from '@angular/core';
import {RowFloatingInputInterface} from '../../../components/floating-input/row-floating-input/row-floating-input.component';
import {SelectListDataInterface, SelectListResponseInterface} from '../../database/select-list/select-list.component';
import {ApiConfigInterface, FilterInterface, ApiService} from '../../../service/api/api.service';
import {BaseForm, KeyValueInterface} from '../../../components/floating-input/BaseForm';
import {NgForm} from '@angular/forms';
import {HelperService} from '../../../service/helper/helper.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpParams} from '@angular/common/http';
import {PhotosDataInterface, RoomDataInterface, RoomTopInterface} from './RoomApiInterface';
import {isArray, isBoolean, isObject, isString} from 'util';
import {MyHelper} from '../../../MyHelper';
import {ContainerKeyValueInterface} from '../../../components/key-value/key-value/key-value.component';
import * as $ from "jquery";
import {UserService} from '../../../service/user/user.service';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

    public top: RoomTopInterface;
    public modalData: RoomDataInterface;
    public rowBaseForms: RowFloatingInputInterface[] = [];
    public filter: FilterInterface = new FilterInterface();
    public title: string = "Module Room";
    public filterForm: RowFloatingInputInterface[] = [];
    public readableModalData: ContainerKeyValueInterface[] = [];
    public approvalForm:RowFloatingInputInterface[] = [];
    public onClickPagination:()=>void = ()=>{
        this.apiExecuteGetTop((response)=>{

        })
    };
    @ViewChild('formModal') formModal;

    constructor(public userService:UserService, public modalService: NgbModal, public apiService: ApiService, public helperService: HelperService) {


        this.apiExecuteGetTop((response)=>{
            this.getFilter();
            this.setFilterForm();
            this.setForms();
        });
    }

    ngOnInit() {

    }



    public setForms() {

        this.rowBaseForms = [];
        var buildingName: BaseForm = new BaseForm('Name', 'name');

        this.rowBaseForms.push({
            baseForms: [name]
        });



    }

    public setApprovalForm(){
        this.approvalForm = [];
        var approve = new BaseForm("Approval status","status");
        approve.setInputTypeSelect(this.top.data.approveForm.status);

        approve.changeListener.subscribe((form)=>{
            reason.setIsRequired(form.value == "re");
        });
        // approve.setinput
        this.approvalForm.push({
            baseForms:[approve]
        });
        var reason = new BaseForm("Reason (email)",'statusReason');
        reason.setIsRequired(false);
        reason.setInputTypeTextarea();
        reason.infoBottom = "*Alasan ini akan dikirim dalam format email";
        this.approvalForm.push({
            baseForms:[reason]
        })



    }



    public setReadableModalData(modalData:RoomDataInterface){


        this.readableModalData = [];

        //# data utama room
        var roomKeyValue:KeyValueInterface[] = [];
        for(var key in modalData){
            var value = modalData[key];


            if(!isArray(value) && !isObject(value) && value !='' && value){
                roomKeyValue.push({key: MyHelper.ucWord(key),value:value});
            }


        }

        //# data harga room
        modalData.get_prices.forEach(data=>{
            roomKeyValue.push({key: MyHelper.ucWord(data.unit),value:data.price});

        })

        //# foto room
        roomKeyValue.push({
            key: 'image',
            value: `<a data-fancybox="gallery" href="${ApiService.BASE_URL}${modalData.mainPhoto.path}${modalData.mainPhoto.nameLg}"><img style="vertical-align: middle" class="img-responsive" src="${ApiService.BASE_URL}${modalData.mainPhoto.path}${modalData.mainPhoto.nameSm} "/></a>`
        })
        this.readableModalData.push({
            isOpen:true,
            keyValues: [...roomKeyValue],
            title: "Room information",
        });



        //# data user
        var userKeyValue:KeyValueInterface[] = [];
        for(var key in modalData.get_user){
            var value = modalData.get_user[key];

            if(!isArray(value) && !isObject(value) && value !='' && value){
                userKeyValue.push({key: MyHelper.ucWord(key),value:value});
            }


        }
        this.readableModalData.push({
            isOpen:true,
            keyValues: [...userKeyValue],
            title: "user information"
        });



    }

    public setFilterForm(){
        this.filterForm = [];
        var status:BaseForm = new BaseForm("Status", 'cmbStatus');
        status.setInputTypeSelect(this.top.data.filter.cmbStatus)
        status.value = this.filter.cmbStatus;
        status.setIsRequired(false);
        status.changeListener.subscribe((baseForm:BaseForm)=>{
            console.log('cmbStatus',baseForm);
            this.filter.cmbStatus = baseForm.value;
        })



        this.filterForm.push({
            baseForms: [status]
        });
    }
    public getFilter(){
        this.filter.cmbStatus = "pa";

    }

    public apiExecuteGetTop(onFinished?:(response:RoomTopInterface)=>void) {

        var params = {

        };

        params = this.helperService.mergeObject(params,this.filter);

        var config: ApiConfigInterface = {
            url: ApiService.BASE_API_URL + 'module/room',
            toastMessage: 'Room module data',
            params:params,
        };


        this.apiService.get<RoomTopInterface>(config, (response) => {
            if (response.isSuccess) {
                this.top = response;
                if(onFinished){
                    onFinished(response);
                }
            }
        });
    }

    public apiExecuteDelete(selectListData: SelectListDataInterface, id: number) {

        // this.apiService;

        var param: any = {
            cmd: 'delete',
            table: selectListData.table,
            id: id,
        }

        var params: HttpParams = new HttpParams()
            .append('cmd', 'delete')
            .append('table', selectListData.table)
            .append('id', '' + id);
        var config: ApiConfigInterface = {
            url: ApiService.BASE_API_URL + 'database/select-list',
            toastMessage: 'Deleting Data',
            params: {
                cmd: 'delete',
                table: selectListData.table,
                id: '' + id,
            },
        }
        this.helperService.presentConfirmation({}, () => {
            this.helperService.presentConfirmation({message: 'If select list is deleted, search function by user will lose functionality, <p style=\'color:red;font-weight: bold;\'>ARE YOU SURE TO CONTINUE?</p>'}, () => {

                this.apiService.post<SelectListResponseInterface>(config, (response) => {

                    if (response.isSuccess) {
                        this.apiExecuteGetTop();
                        console.log(response.data.selectList);

                    }
                });
            });
        })


    }

    presentModal(selectListData: RoomDataInterface) {
        // this.setForm();
        this.modalData = selectListData;
        this.setReadableModalData(selectListData);
        this.setApprovalForm();
    }

    formSubmit(form: NgForm) {
        console.log('formSubmitRaw', form);
        if (form.valid) {
            var params = {
                cmd: 'add',
                // table: this.modalData.table,
            }
            params = this.helperService.mergeObject(params, form.value);

            this.apiFormSubmit(params);
        } else {
            // this.helperService.presentNotification("Please check mark in red",NotificationTypeInterface.danger);
            this.helperService.presentAlert({message: 'Please check mark in red', title: 'Form is not valid'});
        }
    }
    formApprovalSubmit(form:NgForm){
        console.log('formSubmitRaw', form);
        if (form.valid) {
            var params = {
                cmd: 'approve',
                id: this.modalData.id,
                // table: this.modalData.table,
            }
            params = this.helperService.mergeObject(params, form.value);

            this.apiFormSubmit(params);
        } else {
            // this.helperService.presentNotification("Please check mark in red",NotificationTypeInterface.danger);
            this.helperService.presentAlert({message: 'Please check mark in red', title: 'Form is not valid'});
        }
    }


    apiFormSubmit(params:any,message:string = "Submiting form"){
        console.log('apiFormSubmit',params);
        this.helperService.presentConfirmation({}, () => {

            var config: ApiConfigInterface = {
                url: ApiService.BASE_API_URL + 'module/room',
                params: params,
                toastMessage: 'Submitting form',
            }
            this.apiService.post<any>(config, (data) => {
                console.log(data);
                this.apiExecuteGetTop();
                this.helperService.closeModal();
                this.helperService.presentNotification('Form is submitted');
                this.userService.apiExecuteGetNotification();
            });

        });

    }
}
