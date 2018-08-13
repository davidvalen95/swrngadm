import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {KeyValueInterface} from '../../floating-input/BaseForm';
import {HelperService} from '../../../service/helper/helper.service';

@Component({
  selector: 'app-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnInit {


  @Input('containerKeyValues') containerKeyValues:ContainerKeyValueInterface[];

  constructor(public helperService:HelperService) { }

  ngOnInit() {
    // console.log(this.containerKeyValues);

  }



}

export interface ContainerKeyValueInterface{
  title:string;
  isOpen:boolean;
  keyValues:KeyValueInterface[];
  classDisplay?: string; //col-xs-12
}