import {Component, Input, OnInit} from '@angular/core';
import {FilterInterface, ApiPaginationResponseInterface} from '../../../service/api/api.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    public pagination: ApiPaginationResponseInterface<any>;
    public paginationLogic: PaginationLogicInterface;

    @Input('filter') public filter: FilterInterface;
    @Input('onClick') public onClick:()=>void;
    @Input('pagination')
    public set setPagination(pagination: ApiPaginationResponseInterface<any>) {
        this.pagination = pagination;
        this.setPaginationLogic();
    }

    constructor() {


    }

    ngOnInit() {
        this.setPaginationLogic();
    }


    setPaginationLogic() {
        /*
           * totalData	: data dari table
           * fetch		: data per page
           * threshold	: deretan pagination
           * last			: pagination terakhir
           *
           * start	: terawal dari current
           * end		: terjuh dari pagination
           *
           *
           */
        var totalData = this.pagination.total;
        var perPage = this.pagination.per_page;
        var threshold = 3;
        var last = Math.ceil(totalData / perPage);
        var current = this.pagination.current_page;

        var start = (current - threshold >= threshold ? current - threshold : 1);
        var end = (current + threshold >= last ? last : current + threshold);


        var range: number[] = [];
        for (var i = start; i <= end; i++) {
            range.push(i);
        }

        this.paginationLogic = {
            current: current,
            start: start,
            end: end,
            range: range,
        }

        console.log('paginationLogic', this.paginationLogic);
    }

    getList(target: number) {
        this.filter.page = target;
        console.log(this.filter);
        if(this.onClick){
            this.onClick();
        }
    }
}


interface PaginationLogicInterface {
    start: number;
    end: number;
    current: number;
    range: number[];
}