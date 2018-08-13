














export class MyHelper{





    public static ucWord(target:string){
        if(!target){
            return "";
        }
        //# replac e_
        target = target.replace(/_/g," ");

        //# insert a space before all caps
        target = target.replace(/([A-Z])/g, ' $1');

        //# replace all after space in documents
        target = target.replace(/[\s][\w]/g, (a)=>{
            return a.toUpperCase();

        })



        target = target.replace(/^./g,(a=>{

            return a.toUpperCase()
        }))
        return target;
    }


    public static getDateFormat(dateString:string, format:'D M Y'){

        var date = new Date(dateString);
        console.log('getDateFormat',dateString,date);
        return date.toLocaleString();
    }

}

export interface FileJsonFormat{
    contentType:string;
    filename:string;
    binary:any;
    formFormat:String;
}
