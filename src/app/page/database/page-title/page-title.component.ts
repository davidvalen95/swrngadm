import {Component, OnInit, ViewChild} from '@angular/core';
import {isArray, isObject} from 'util';
import {HttpParams} from '@angular/common/http';
import {BaseForm, KeyValueInterface} from '../../../components/floating-input/BaseForm';
import {ContainerKeyValueInterface} from '../../../components/key-value/key-value/key-value.component';
import {HelperService} from '../../../service/helper/helper.service';
import {RoomDataInterface, RoomTopInterface} from '../../module/room/RoomApiInterface';
import {RowFloatingInputInterface} from '../../../components/floating-input/row-floating-input/row-floating-input.component';
import {FilterInterface, ApiService, ApiConfigInterface} from '../../../service/api/api.service';
import {MyHelper} from '../../../MyHelper';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../service/user/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalInterface} from '../../../app.component';
import {PageDataInterface, PageTitleTopInterface} from './PageTitleInterface';
import {SelectListDataInterface, SelectListResponseInterface} from '../select-list/select-list.component';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {


    public top: PageTitleTopInterface;
    public modalData: ModalInterface<PageDataInterface>;
    public baseForm: RowFloatingInputInterface[] = [];
    public filter: FilterInterface = new FilterInterface();
    public title: string = "Page title";
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
            this.setFilter();

            this.setFilterForm();

        });
    }

    ngOnInit() {

    }




    public setForm() {

        if(!this.modalData){
            return;
        }

        this.baseForm = [];
        var title:BaseForm = new BaseForm("Title", "title");
        title.value =  this.modalData.data.title;
        title.setIsRequired(false);
        var description:BaseForm = new BaseForm("description", "description");
        description.value =  this.modalData.data.description;
        description.setInputTypeTextarea();
        description.setIsRequired(false);

        this.baseForm.push({
            baseForms: [title,description],
        })



    }

    public setApprovalForm(){
        this.approvalForm = [];
        var approve = new BaseForm("Approval status","status");
        // approve.setInputTypeSelect(this.top.data.approveForm.status);

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
        status.setInputTypeSelect(this.top.data.filter.cmbStatus);
        status.value = this.filter.cmbStatus;
        status.setIsRequired(false);
        status.changeListener.subscribe((baseForm:BaseForm)=>{
            console.log('cmbStatus',baseForm);
            this.filter.cmbStatus = baseForm.value;
        })
        var searchBy:BaseForm = new BaseForm("Search By", 'cmbSearchBy');
        searchBy.setInputTypeSelect(this.top.data.filter.cmbSearchBy);
        searchBy.value = this.filter.cmbSearchBy;
        searchBy.setIsRequired(false);
        searchBy.changeListener.subscribe((baseForm:BaseForm)=>{
            this.filter.cmbSearchBy = baseForm.value;
        })


        var searchValue:BaseForm = new BaseForm("Search value", 'searchValue');
        searchValue.value = this.filter.searchValue;
        searchValue.setIsRequired(false);
        searchValue.changeListener.subscribe((baseForm:BaseForm)=>{
            this.filter.searchValue = baseForm.value;
        })


        this.filterForm.push({
            baseForms: [searchBy,searchValue]
        });
    }
    public setFilter(){

        this.filter.cmbSearchBy = "page";

    }

    public apiExecuteGetTop(onFinished?:(response:PageTitleTopInterface)=>void) {

        var params = {

        };

        params = this.helperService.mergeObject(params,this.filter);

        var config: ApiConfigInterface = {
            url: ApiService.BASE_API_URL + 'database/page-title',
            toastMessage: this.title + ' data',
            params:params,
        };


        this.apiService.get<PageTitleTopInterface>(config, (response:PageTitleTopInterface) => {
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
            id: ""+ id,
        }


        var config: ApiConfigInterface = {
            url: ApiService.BASE_API_URL + 'database/select-list',
            toastMessage: 'Deleting Data',
            params: param
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

    presentModal(selectListData: PageDataInterface) {
        // this.setForm();
        var title = `Edit page title for page <b>${MyHelper.ucWord(selectListData.page)}</b>`;
        this.modalData = {
            data:  selectListData,
            title: title,
            isEdit: true,
        };
        this.setForm();
    }

    formSubmit(form: NgForm) {
        console.log('formSubmitRaw', form);
        if (form.valid) {
            var params = {
                cmd: this.modalData.isEdit ? 'edit' : '',
                id: this.modalData.isEdit? this.modalData.data.id : '-1',

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
                url: ApiService.BASE_API_URL + 'database/page-title',
                params: params,
                toastMessage: 'Submitting form',
            }
            this.apiService.post<any>(config, (data) => {
                console.log(data);
                this.apiExecuteGetTop();
                this.helperService.closeModal();
                this.helperService.presentNotification('Form is submitted');
                // this.userService.apiExecuteGetNotification();
            });

        });

    }
}
