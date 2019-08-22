import { Component, OnInit, Inject } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs/Subscription';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  usernamePasswordAuthentication = false;
  permissions: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(public auth: Auth,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      if(user){
          this.user = user;
          this.permissions = user.app_metadata.authorization.permissions;
          this.usernamePasswordAuthentication = false;
          this.user.identities.forEach(e => {
            if(e.connection === "Username-Password-Authentication"){
              this.usernamePasswordAuthentication = true;
            }
          });
      }
  })
  }

  updatePassword(email) {
    this.auth.updatePassword(email).subscribe((e)=> {
      this.openDialog(e);
    }, error => {
      this.openDialog("An error has occured. Please try again later.")
    });
  }

  openDialog(message): void {
    const dialogRef = this.dialog.open(ChangePasswordDialog, {
      width: '250px',
      data: {message: message}
    });
  }

}

@Component({
  selector: 'dialog-change-password',
  templateUrl: 'change-password-dialog.html',
})
export class ChangePasswordDialog {

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
