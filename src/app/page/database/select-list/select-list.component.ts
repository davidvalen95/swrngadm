import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiBaseResponseInterface, ApiService, ApiConfigInterface} from '../../../service/api/api.service';
import {HelperService, NotificationTypeInterface} from '../../../service/helper/helper.service';
import {HttpParams} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {RowFloatingInputInterface} from '../../../components/floating-input/row-floating-input/row-floating-input.component';
import {BaseForm} from '../../../components/floating-input/BaseForm';

export declare const $: any;


@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {


    public listData: SelectListDataInterface[];
    public modalData: SelectListDataInterface;
    public rowBaseForms:RowFloatingInputInterface[] = [];
    @ViewChild('formModal') formModal;

    constructor(public modalService: NgbModal, public apiService: ApiService, public helperService: HelperService) {


        console.log('testselectlist');
        this.apiExecuteGetList();

        this.setForms();
    }

    ngOnInit() {

    }

    public setForms(){

        this.rowBaseForms = [];
        var name:BaseForm = new BaseForm("Name", "name");

        this.rowBaseForms.push({
            baseForms: [name]
        });

    }

    public apiExecuteGetList() {

        var config: ApiConfigInterface = {
            url: ApiService.BASE_API_URL + 'database/select-list',
            toastMessage: 'List data',
        }
        this.apiService.get<SelectListResponseInterface>(config, (response) => {
            // this.helperService.presentNotification(response.message);
            // console.log(response);
            if (response.isSuccess) {
                this.listData = response.data.selectList;
                console.log(response.data.selectList);

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
                id: '' +id,
            },
        }
        this.helperService.presentConfirmation({},()=>{
            this.helperService.presentConfirmation({message: "If select list is deleted, search function by user will lose functionality, <p style='color:red;font-weight: bold;'>ARE YOU SURE TO CONTINUE?</p>"},()=>{

                this.apiService.post<SelectListResponseInterface>(config, (response) => {

                    if (response.isSuccess) {
                        this.apiExecuteGetList();
                        console.log(response.data.selectList);

                    }
                });
            });
        })



    }

    openFormModal(selectListData: SelectListDataInterface) {
        this.setForms();
        this.modalData = selectListData;
    }

    formSubmit(form:NgForm){
        console.log('formSubmitRaw',form);
        if(form.valid){
            this.helperService.presentConfirmation({},()=>{
                var params = {
                    cmd:'add',
                    table: this.modalData.table,
                }

                params = this.helperService.mergeObject(params, form.value);
                var config: ApiConfigInterface= {
                    url: ApiService.BASE_API_URL + "database/select-list",
                    params: params,
                    toastMessage: "Submitting form",
                }
                this.apiService.post<any>(config,(data)=>{
                    console.log(data);
                    this.apiExecuteGetList();
                    this.helperService.closeModal();
                    this.helperService.presentNotification("Form is submitted");
                });

            });

        }else{
            // this.helperService.presentNotification("Please check mark in red",NotificationTypeInterface.danger);
            this.helperService.presentAlert({message: "Please check mark in red",title:"Form is not valid"});
        }
    }
}


export interface SelectListResponseInterface extends ApiBaseResponseInterface {
    data: {
        selectList: SelectListDataInterface[]
    }
}

export interface SelectListDataInterface {

    key: string;
    table: string,
    value: { id: number, name: string, }[]

}
