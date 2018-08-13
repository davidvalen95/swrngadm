import {Component, OnInit, ViewChild} from '@angular/core';
import {isArray, isObject} from 'util';
import {BaseForm, KeyValueInterface} from '../../../components/floating-input/BaseForm';
import {ContainerKeyValueInterface} from '../../../components/key-value/key-value/key-value.component';
import {HelperService} from '../../../service/helper/helper.service';
import {PageDataInterface, PageTitleTopInterface} from '../../database/page-title/PageTitleInterface';
import {RowFloatingInputInterface} from '../../../components/floating-input/row-floating-input/row-floating-input.component';
import {ApiConfigInterface, ApiService, FilterInterface} from '../../../service/api/api.service';
import {MyHelper} from '../../../MyHelper';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../service/user/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PhotosDataInterface, RoomDataInterface} from '../room/RoomApiInterface';
import {ModalInterface} from '../../../app.component';
import {SelectListDataInterface, SelectListResponseInterface} from '../../database/select-list/select-list.component';
import {AdvertisementDescriptionDataInterface, AdvertisementTopInterface} from './AdvertisementApiInterface';

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {


    public top: AdvertisementTopInterface;
    public modalData: ModalInterface<AdvertisementDescriptionDataInterface>;
    public baseForm: RowFloatingInputInterface[] = [];
    public filter: FilterInterface = new FilterInterface();
    public title: string = 'Page title';
    public filterForm: RowFloatingInputInterface[] = [];
    public readableModalData: ContainerKeyValueInterface[] = [];
    public approvalForm: RowFloatingInputInterface[] = [];
    public onClickPagination: () => void = () => {
        this.apiExecuteGetTop((response) => {

        })
    };

    constructor(public userService: UserService, public modalService: NgbModal, public apiService: ApiService, public helperService: HelperService) {


        this.apiExecuteGetTop((response) => {
            this.setFilter();


        });
    }

    ngOnInit() {

    }


    public setForm() {

        if (!this.modalData) {
            return;
        }
        this.baseForm = [];
        var approve = new BaseForm('Approval status', 'status');
        approve.setInputTypeSelect(this.top.data.approveForm.status);

        approve.changeListener.subscribe((form) => {
            reason.setIsRequired(form.value == 're');
        });
        // approve.setinput
        this.approvalForm.push({
            baseForms: [approve]
        });
        var reason = new BaseForm('Reason (email)', 'statusReason');
        reason.setIsRequired(false);
        reason.setInputTypeTextarea();
        reason.infoBottom = '*Alasan ini akan dikirim dalam format email';
        this.baseForm.push({
            baseForms: [approve, reason]
        })


    }

    public setApprovalForm() {
        this.approvalForm = [];
        var approve = new BaseForm('Approval status', 'status');
        // approve.setInputTypeSelect(this.top.data.approveForm.status);

        approve.changeListener.subscribe((form) => {
            reason.setIsRequired(form.value == 're');
        });
        // approve.setinput
        this.approvalForm.push({
            baseForms: [approve]
        });
        var reason = new BaseForm('Reason (email)', 'statusReason');
        reason.setIsRequired(false);
        reason.setInputTypeTextarea();
        reason.infoBottom = '*Alasan ini akan dikirim dalam format email';
        this.approvalForm.push({
            baseForms: [reason]
        })


    }


    public setReadableModalData(modalData: AdvertisementDescriptionDataInterface) {


        this.readableModalData = [];

        //# data utama room
        var advertisementKeyValue: KeyValueInterface[] = [];
        for (var key in modalData.get_advertisement) {
            var value = modalData[key];
            if (!isArray(value) && !isObject(value) && value != '' && value) {
                advertisementKeyValue.push({key: MyHelper.ucWord(key), value: value});
            }
        }


        advertisementKeyValue.push({
            key: 'Photo iklan',
            value: `<a data-fancybox="gallery" href="${ApiService.BASE_URL}${modalData.get_advertisement.get_photo.path}${modalData.get_advertisement.get_photo.nameLg}"><img style="vertical-align: middle;max-width: 100px;" class="" src="${ApiService.BASE_URL}${modalData.get_advertisement.get_photo.path}${modalData.get_advertisement.get_photo.nameSm} "/></a>`
        })
        //# data harga room

        //# foto room

        this.readableModalData.push({
            isOpen: true,
            keyValues: [...advertisementKeyValue],
            title: 'Advertisement information',
        });


        var paymentKeyValue: KeyValueInterface[] = [];
        paymentKeyValue.push({key:"Duration",value: "" +modalData.duration  + " day"})
        paymentKeyValue.push({key:"Price",value: "" +modalData.price})



        modalData.payments.forEach((data, index) => {
            paymentKeyValue.push({
                key: 'Bukti pembayaran ke-' + (index + 1),
                value: `<a data-fancybox="gallery" href="${ApiService.BASE_URL}${data.get_photo.path}${data.get_photo.nameLg}"><img style="vertical-align: middle; max-width: 100px;"  src="${ApiService.BASE_URL}${data.get_photo.path}${data.get_photo.nameSm} "/></a>`
            })
        })

        this.readableModalData.push({
            isOpen: true,
            keyValues: [...paymentKeyValue],
            title: 'payment information'
        });


        //# data user
        var userKeyValue: KeyValueInterface[] = [];
        for (var key in modalData.get_advertisement.get_user) {
            var value = modalData.get_advertisement.get_user[key];

            if (!isArray(value) && !isObject(value) && value != '' && value) {
                userKeyValue.push({key: MyHelper.ucWord(key), value: value});
            }


        }
        this.readableModalData.push({
            isOpen: true,
            keyValues: [...userKeyValue],
            title: 'user information'
        });


    }

    public setFilterForm() {
        // this.filterForm = [];
        // var status:BaseForm = new BaseForm("Status", 'cmbStatus');
        // status.setInputTypeSelect(this.top.data.filter.cmbStatus);
        // status.value = this.filter.cmbStatus;
        // status.setIsRequired(false);
        // status.changeListener.subscribe((baseForm:BaseForm)=>{
        //     console.log('cmbStatus',baseForm);
        //     this.filter.cmbStatus = baseForm.value;
        // })
        // var searchBy:BaseForm = new BaseForm("Search By", 'cmbSearchBy');
        // searchBy.setInputTypeSelect(this.top.data.filter.cmbSearchBy);
        // searchBy.value = this.filter.cmbSearchBy;
        // searchBy.setIsRequired(false);
        // searchBy.changeListener.subscribe((baseForm:BaseForm)=>{
        //     this.filter.cmbSearchBy = baseForm.value;
        // })
        //
        //
        // var searchValue:BaseForm = new BaseForm("Search value", 'searchValue');
        // searchValue.value = this.filter.searchValue;
        // searchValue.setIsRequired(false);
        // searchValue.changeListener.subscribe((baseForm:BaseForm)=>{
        //     this.filter.searchValue = baseForm.value;
        // })
        //
        //
        // this.filterForm.push({
        //     baseForms: [searchBy,searchValue]
        // });
    }

    public setFilter() {

        this.filter.cmbSearchBy = 'page';

    }

    public apiExecuteGetTop(onFinished?: (response: AdvertisementTopInterface) => void) {

        var params = {};

        params = this.helperService.mergeObject(params, this.filter);

        var config: ApiConfigInterface = {
            url: ApiService.BASE_API_URL + 'module/advertisement',
            toastMessage: this.title + ' advertisement',
            params: params,
        };


        this.apiService.get<AdvertisementTopInterface>(config, (response: AdvertisementTopInterface) => {
            if (response.isSuccess) {
                this.top = response;
                if (onFinished) {
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
            id: '' + id,
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

    presentModal(selectListData: AdvertisementDescriptionDataInterface) {
        // this.setForm();
        var title = `Approval <b>${selectListData.id}</b>`;
        this.modalData = {
            data: selectListData,
            title: title,
            isApprove: true,
        };
        this.setReadableModalData(selectListData);
        this.setForm();
    }

    formSubmit(form: NgForm) {
        console.log('formSubmitRaw', form);
        if (form.valid) {
            var params = {
                cmd: this.modalData.isApprove ? 'approve' : '',
                id: this.modalData.isApprove ? this.modalData.data.id : '-1',
            }
            params = this.helperService.mergeObject(params, form.value);

            this.apiFormSubmit(params);
        } else {
            // this.helperService.presentNotification("Please check mark in red",NotificationTypeInterface.danger);
            this.helperService.presentAlert({message: 'Please check mark in red', title: 'Form is not valid'});
        }
    }

    formApprovalSubmit(form: NgForm) {
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


    apiFormSubmit(params: any, message: string = 'Submiting form') {
        console.log('apiFormSubmit', params);
        this.helperService.presentConfirmation({}, () => {

            var config: ApiConfigInterface = {
                url: ApiService.BASE_API_URL + 'module/advertisement',
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
