import {Component, OnInit} from '@angular/core';
import {_Request} from "./request";
import {RequestService} from "../services/request.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  private requests: _Request[]

  constructor(private service:RequestService) {
    this.requests=new Array();
  }

  ngOnInit(): void {
    this.service.getRequestsForUser().subscribe(
      data=>{
        console.log(data);
        this.requests=data;
      }
    )
  }

}
