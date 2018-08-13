import {ApiBaseResponseInterface, ApiFilterInterface, FilterInterface} from '../../../service/api/api.service';

export interface PageTitleTopInterface extends ApiBaseResponseInterface{
    data:{
        page:PageDataInterface[];
        filter:ApiFilterInterface;
    }
}

export interface PageDataInterface{
    page:string;
    title:string;
    description:string;
    id:number;
}
