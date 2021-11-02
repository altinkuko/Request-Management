import {Component, Inject, OnInit} from '@angular/core';
import {_Request} from "../../models/request";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../services/request.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-delete-request',
  templateUrl: './delete-request.component.html',
  styleUrls: ['./delete-request.component.css']
})
export class DeleteRequestComponent implements OnInit {

  request: _Request;

  constructor(private requestService: RequestService,
              private router: Router,
              private popUp: MatDialogRef<DeleteRequestComponent>,
              private alert:AlertService,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.request = data.request;
  }

  ngOnInit(): void {
    console.log(this.request)
  }

  CloseDialog() {
    this.popUp.close(false)
  }

  deleteRequest() {
    this.requestService.deleteRequest(this.request).subscribe(data => {
      this.CloseDialog();
      // @ts-ignore
      this.alert.showError(data.message)
    })
  }
}
