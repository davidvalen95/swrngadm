import {Injectable} from '@angular/core';
import {ApiBaseResponseInterface, ApiConfigInterface, ApiService, NotificationInterface} from '../api/api.service';
import {isSuccess} from '@angular/http/src/http_utils';
import {MyLocalStorageService} from '../my-local-storage/my-local-storage.service';
import {HelperService, NotificationTypeInterface} from '../helper/helper.service';

@Injectable()
export class UserService {

    public userData: UserDataInterface = new UserDataInterface();
    public token: string;
    public isLoggedIn: boolean = false;

    public notification:NotificationInterface;

    constructor(public apiService: ApiService,public localStorage:MyLocalStorageService, public helperService:HelperService) {
    }



    public loginLocalStorage(){
        if(this.localStorage.getEmail() && this.localStorage.getPassword()){
            this.apiExecuteLogin(this.localStorage.getEmail(), this.localStorage.getPassword());

        }
    }

    public apiExecuteLogin(email: string, password: string, ) {
        var url = `${ApiService.BASE_API_URL}login-admin`;
        var params = {email: email, password: password};

        var config: ApiConfigInterface = {
            url:url,
            params:params,
            toastMessage: "Logging in",
        }

        this.apiService.post<LoginInterface>(config, (response: LoginInterface) => {

            if (response.isSuccess) {
                this.userData = response.data.user;
                this.token = response.data.token;
                this.isLoggedIn = true;
                this.localStorage.setEmail(email);
                this.localStorage.setPassword(password);
                this.helperService.presentNotification(`Welcome back ${response.data.user.name}`);
                this.apiExecuteGetNotification();
                console.log('userLoggedIn',this);
            }else{
                this.helperService.presentNotification("Wrong username or password", NotificationTypeInterface.danger);
            }

        })

    }


    public logout() {
        this.isLoggedIn = false;
        this.token = '';
        this.userData = null;
        this.localStorage.setPassword(null);
        this.localStorage.setEmail(null);
        this.notification = null;
        console.log('logout');
    }

    apiExecuteGetNotification(){
        var config:ApiConfigInterface = {
            url: `${ApiService.BASE_API_URL}bootstrap/notification`,
            toastMessage: 'Fetching notification'
    }
        this.apiService.get<NotificationInterface>(config,(response:NotificationInterface)=>{
            this.notification = response;
        })
    }
}


export interface LoginInterface extends ApiBaseResponseInterface {

    data: {
        token: string,
        user: UserDataInterface,
    }


}


export class UserDataInterface {
    city: string = "";
    email: string = "";
    id: number = -1;
    isVerified: number =-1;
    name: string = "";
    reset: number =-1;
    telephone: string = "";

}