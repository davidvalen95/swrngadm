import {ApiBaseResponseInterface} from '../../../service/api/api.service';
import {UserDataInterface} from '../../../service/user/user.service';
import {PhotosDataInterface} from '../room/RoomApiInterface';

export interface AdvertisementTopInterface extends ApiBaseResponseInterface{
    data:{
        advertisementDescription:AdvertisementDescriptionDataInterface[];
        approveForm;
        activeAdvertisement: AdvertisementDataInterface[];
    }




}

export interface AdvertisementDescriptionDataInterface{
    advertistment_id: number;
    created_at: string;
    description: string;
    duration: number;
    id: number;
    invoice: string;
    isPaid: number; //0 1
    price: string;
    status: string;
    updated_at: string;

    get_advertisement: AdvertisementDataInterface;
    payments:{
        get_photo:PhotosDataInterface;
    }[]
}

export interface AdvertisementDataInterface{
    created_at: string;
    description: string;
    imagePath: string;
    link:string;
    noRef: string;
    status:string;
    targetCity :string;
    updated_at:string;
    user_id:string;
    validThrough:string;
    validUntil:string;
    viewed:string;

    get_user:UserDataInterface
    get_photo:PhotosDataInterface;

}