import {Component, Inject, OnInit} from '@angular/core';
import {_Request} from "../../models/request";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../services/request.service";
import {RequestComponent} from "../../request/request.component";
import {Router} from "@angular/router";

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
    this.requestService.deleteRequest(this.request).subscribe(() => {
      this.CloseDialog()
    })
  }
}
