import {ApiBaseResponseInterface, ApiPaginationResponseInterface} from '../../../service/api/api.service';
import {KeyValueInterface} from '../../../components/floating-input/BaseForm';
import {UserDataInterface} from '../../../service/user/user.service';

export interface RoomTopInterface extends ApiBaseResponseInterface{
    data:{
        rooms:ApiPaginationResponseInterface<RoomDataInterface[]>;
        filter: RoomFilterInterface;
        approveForm:{
            status:KeyValueInterface[]
        };
    }
}

export interface RoomDataInterface{
    address:string;
    area: number;
    buildingName:string;
    capacityClass:number;
    capacityTheatre:number;
    capacityUShape:number;
    caterings:string;
    city:string;
    created_at:string;
    description:string;
    facility:string;
    id: number;
    imagePath:string;
    mainPhoto:PhotosDataInterface;
    providerTelephone:string;
    roomFunction:string;
    roomName:string;
    status: string;
    updatedAt:string;

    get_prices:RoomPriceInterface[];
    get_user:UserDataInterface;
    get_photos:PhotosDataInterface[];
}

export interface PhotosDataInterface{
    created_at:string;
    id:number;
    isMain:boolean;
    nameLg:string;
    nameSm:string;
    path:string;
}
export interface RoomPriceInterface{
    price:number;
    unit:string;
}

export interface RoomFilterInterface{
    cmbStatus:KeyValueInterface[];
}