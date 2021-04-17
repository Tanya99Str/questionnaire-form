import {Component, OnInit} from '@angular/core';
import {FrameworkService} from '../shared/service/framework.service';
import {FrameworkDto} from '../shared/dto/framework.dto';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserDto} from '../shared/dto/user.dto';
import {FrameworkVersionDto} from '../shared/dto/frameworkVersion.dto';
import {UserService} from '../shared/service/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  frameworks: FrameworkDto[];
  oneFramework: FrameworkDto;

  userInfoFormGroup: FormGroup;
  user: UserDto = new UserDto();
  selectedFramework: FrameworkDto = new FrameworkDto();
  selectedVersion: FrameworkVersionDto = new FrameworkVersionDto();
  versions: FrameworkVersionDto[];
  users: UserDto[] = [];

  constructor(private _frameworkService: FrameworkService,
              private _userService: UserService,
              private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) {
    this.init();
  }

  init() {
    this._frameworkService.getAllFrameworks().subscribe(next => {
      this.frameworks = next;
      console.log(next);
    }, error => {
      console.error(error);
    });
    this.user.hobby = [];
    this.user.hobby[0] = '';
  }

  save() {
    this.user.firstName = this.userInfoFormGroup.get('firstName').value;
    this.user.lastName = this.userInfoFormGroup.get('lastName').value;
    this.user.email = this.userInfoFormGroup.get('email').value;
    this.user.dateOfBirth = this.configMoment(moment((<Date> this.userInfoFormGroup.get('dateOfBirth').value))).format('YYYY-MM-DD');
    this.checkEmail();
    this._userService.getAllUsers().subscribe(next => {
      this.users = next;
      console.log(next.length);
    }, error => {
      console.error(error);
    });
    console.log(this.users.length);
    this.user.id = this.genId(this.users);
    console.log(this.user.id);
    console.log(this.user);
    this._userService.saveUser(this.user).subscribe(next => {
      this.info('Користувача додано.');
      console.log(this.user);
    }, error => {
      console.error(error);
      this.info('Виникла помилка.');
    });
  }

  cancel() {
    this.userInfoFormGroup.reset();
    this.user = new UserDto();
    this.user.hobby = [];
  }

  selectFramework(event) {
    console.log(event.id);
    this.selectedFramework = event;
    this.user.framework = event.name;
    this.selectedVersion = new FrameworkVersionDto();
    this.user.frameworkVersion = '';
    this._frameworkService.getOneFrameworkById(event.id).subscribe(next => {
      this.oneFramework = next;
      console.log(next);
    }, error => {
      console.error(error);
    });
  }

  selectVersion(version: FrameworkVersionDto) {
    this.selectedVersion = version;
    this.user.frameworkVersion = version.version;
  }

  checkEmail() {
    let email = this.userInfoFormGroup.get('email').value;
    this._userService.getAllUsers().subscribe(next => {
      if (next.find(el => el.email === email)) {
        this.userInfoFormGroup.get('email').setErrors({emailIsExist: true});
      } else {
        this.userInfoFormGroup.get('email').setErrors(null);
      }
    }, error => {
      console.error(error);
    });
  }

  validationData(control: AbstractControl) {
    if (!control) {
      return;
    }
    let email = control.get('email').value;
    if (email) {
      let mRe = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
      if (!mRe.exec(email)) {
        control.get('email').setErrors({incorrect: true});
        return;
      } else {
        control.get('email').setErrors(null);
      }
    }
    return;
  }

  ngOnInit(): void {
    this.userInfoFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthday: [null]
    }, {validators: this.validationData});
  }

  configMoment(moment: moment.Moment) {
    return moment.utc(true);
  }

  genId(users: UserDto[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }

  newHobby() {
    this.user.hobby[this.user.hobby.length] = '';
    console.log(this.user);
  }

  deleteValue(e: string) {
    this.userInfoFormGroup.get(e).reset();
  }

  info(message: string) {
    this._snackBar.open(message, 'ок', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      announcementMessage: message,
      politeness: 'polite',
      direction: 'ltr'
    });
  }

}
