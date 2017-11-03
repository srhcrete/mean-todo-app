import { GistEditComponent } from '../edit/gist.edit.component';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Gist } from '../gist.model';
import { AppSocketIoService } from '../../app.socketIo.service';
import { GistService } from '../gist.service';
import { Component, Inject } from '@angular/core';

import {MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-gist-show',
  templateUrl: './gist.show.component.html',
  styleUrls: ['../gist.component.css']
})
export class GistShowComponent {
  constructor(private gistService: GistService, @Inject(MD_DIALOG_DATA) public gist: any, private toasterService: ToasterService,
  public dialogRef: MdDialogRef<GistShowComponent>, private appSocketIoService: AppSocketIoService, private router: Router, private dialog: MdDialog) { }

  deleteGist(){
    var gistId = this.gist._id;
    this.gistService.deleteGist(gistId)
        .subscribe(response => {
          if(response.message === "SUCCESS"){
            this.dialogRef.close({deleted: true, gistId: gistId})
            // this.router.navigate(['/gists']);
          }
    });
  }

  editGist(){
    // Close the current modal
    this.dialogRef.close({deleted: false})

    // Open a new one to edit the current gist
    let config = new MdDialogConfig(); // config
    config.data = this.gist; // Data to send to modal: gist to edit
    let dialogRef = this.dialog.open(GistEditComponent, config);
  }

}
