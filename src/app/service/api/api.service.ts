import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Headers} from '@angular/http';
import {UserService} from '../user/user.service';
import {HelperService, NotificationTypeInterface} from '../helper/helper.service';
import {forEach} from '@angular/router/src/utils/collection';
import {KeyValueInterface} from '../../components/floating-input/BaseForm';

@Injectable()
export class ApiService {


    // public static BASE_API_URL:string = "http://192.168.1.9:8111/sewaRuang/api/";
    // public static BASE_API_URL: string = 'http://localhost/sewaRuang/api/';
    // public static BASE_URL: string = 'http://localhost/sewaRuang/';
    //
    //
    //
    public static BASE_API_URL: string = 'https://sewaruang.id/test-site3/api/';
    public static BASE_URL: string = 'https://sewaruang.id/test-site3/';

    public baseApiUrl = ApiService.BASE_API_URL;
    public baseUrl = ApiService.BASE_URL;

    public userService: UserService;

    constructor(public httpClient: HttpClient, public helperService:HelperService) {
    }

    public setUser(userService:UserService){
        this.userService = userService;
    }

    public get<T>(config:ApiConfigInterface, onFinish: (data: T) => void) {


        console.log('apiGet', config.url, config);

        var httpParams: HttpParams = new HttpParams();
        for(var key in config.params){
            var value = config.params[key];
            httpParams = httpParams.append(key,value);

        }
        this.helperService.presentToast({title:"Loading",message:config.toastMessage,type:NotificationTypeInterface.info});
        this.httpClient.get(config.url, {withCredentials:true, params: httpParams}).toPromise().then((result: T) => {
            this.showServerResponse(result);
            onFinish(result);
        }).catch((rejected) => {
            console.log(rejected, config.url);
            if(rejected.statusText && rejected.statusText.toLowerCase().indexOf("unauthorized") > -1){
               this.userService.logout();


            }else{
                this.helperService.presentNotification("Cannot fulfill request", NotificationTypeInterface.danger);

            }

        });
    }

    public post<T>(config:ApiConfigInterface, onFinish: (data: T) => void) {

        this.helperService.presentToast({title:"Loading",message:config.toastMessage,type:NotificationTypeInterface.info});
        this.httpClient.post(config.url, config.params, {withCredentials:true}).toPromise().then((result: T) => {
            this.showServerResponse(result);
            onFinish(result);
        }).catch((rejected) => {
            console.log(rejected, config.url);
            if(rejected.statusText && rejected.statusText.toLowerCase().indexOf("unauthorized") > -1){
                this.userService.logout();


            }else{
                this.helperService.presentNotification("Cannot fulfill request",NotificationTypeInterface.danger);
            }





        });
    }


    private showServerResponse(result:any){
        if(typeof result["isSuccess"] !=='undefined' &&  typeof result["message"] !== 'undefined'){
            var isSuccess:boolean = this.helperService.parseBoolean( result["isSuccess"]);
            var message:string = result["message"];
            if(message == ''){
                return;
            }
            var notificationType:NotificationTypeInterface = isSuccess ?  NotificationTypeInterface.success : NotificationTypeInterface.danger;
            this.helperService.presentToast({title:"Response",message:message,  type:notificationType});

        }
    }


}


export interface ApiBaseResponseInterface{
    message:string;
    isSuccess:boolean;

}

export interface ApiPaginationResponseInterface<T>{
    current_page: number;
    data:T;
    first_page_url:string
    from:number;
    last_page:number;
    last_page_url:string;
    next_page_url?:string;
    path:string;
    per_page:number;
    prev_page_url?:string;
    to: number;
    total:number;
}



export interface ApiConfigInterface{
    url:string;
    params?: any;
    toastMessage?:string;
    toastType?:NotificationTypeInterface;
}


export class FilterInterface {
    public cmbStatus: string = "pa";
    public page: number = 1;
    public cmbSearchBy:string = "";
    public searchValue:string = "";
    public isOpen:boolean = true;
}

export interface ApiFilterInterface{
    cmbStatus?: KeyValueInterface[];
    cmbSearchBy?: KeyValueInterface[];
    searchValue: string;
}

export interface NotificationInterface extends ApiBaseResponseInterface{

    data:{
        room: number;
        advertisement: number;
    }

}