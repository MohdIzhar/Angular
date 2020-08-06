import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';

import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  constructor(private dataService: DataService) {}

  originalUserSettings: UserSettings = {
    name: null,
    emailoffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };
  userSettings: UserSettings = { ...this.originalUserSettings };

  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }
}
