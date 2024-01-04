import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormConfigurationService } from '@services/form-configuration.service';
import { Mode } from 'src/app/forms/mode';
import { IFormCard, IPiInstallModel, ParamType } from 'src/app/types/form';

const ERRORS = {
  register: {
    registerError: 'Failed to register configuration information to ${error}',
    invalid: 'Registration failed. Please complete all entries',
    vsphereError: `Error: Please refresh and uninstall from vSphere, make sure Vertiv
    devices alarms on vSphere are uninstalled completely before
    reinstalling.`
  },
  unregister: {
    unregisterError: 'Failed to unregister',
  },
  update: {
    updateError: 'Failed to update',
    invalid: 'Failed to update. Please complete all entries',
  },
};

const SUCCESS_MSG = 'Successful Registration';

// enum OPTIONS_STATUS {
//   success = 'success',
//   registerError = 'register',
//   unregisterError = 'unregister',
//   updateError = 'update'
// }

enum OPTION_TYPE {
  register = 'register',
  unregister = 'unregister',
  update = 'update'
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  @Input() target: Mode | undefined;
  @Input()
  set card( newVal) {
    if (newVal) {
      this._card = newVal;
      this.generateForm(newVal)
    }
  }

  get card() {
    return this._card;
  };
  cardForm!: FormGroup;

  public _card!: IFormCard;
  public successMsg = SUCCESS_MSG;
  public errors = ERRORS;
  public currentOption: OPTION_TYPE = OPTION_TYPE.register;
  public status = '';
  public errorMsg: string = ''

  constructor(private fb: FormBuilder, private formConfigurationService: FormConfigurationService) { }

  ngOnInit(): void {
    this.formConfigurationService.updateFormSubject.subscribe(item => {
      if (item && item.code === this._card.code) {
        const updateFormFields = this._card.inputInfo.reduce((prev, cur) => {
            prev[cur.name] = cur.inputContent;
            return prev;
        }, {} as {[key in string]: any});
        this.cardForm.setValue(updateFormFields);
      }
    })
  }

  ngOnChange(changes: SimpleChanges) {}

  generateForm(card: IFormCard) {
    const formContorls: {[T in string]: any } = {};

    card.inputInfo.forEach(item => {
      formContorls[item.name] = [item.inputContent , Validators.required];
    })
    this.cardForm = this.fb.group(formContorls);

  }

  register() {
    this.currentOption = OPTION_TYPE.register;

    if (this.cardForm.invalid) {
      this.status = 'error';
      this.errorMsg = this.getErrorMsg('invalid');
      return;
    }
    this._card.loading = true;
    const value = this.cardForm.value;
    if (this._card.register) {
      this._card.register(value as Exclude<ParamType, IPiInstallModel>).subscribe({
        next: this.handleError,
        error: this.handleError
      });
    }
    // this._card.status = 'registered';
  }

  update() {
    this.currentOption = OPTION_TYPE.update;
    if (this.cardForm.invalid) {
      this.status = 'error';
      this.errorMsg = this.getErrorMsg('invalid');
      return;
    }

    this._card.loading = true;
    const value = this.cardForm.value;
    if (this._card.update) {
      this._card.update(value as Exclude<ParamType, IPiInstallModel>).subscribe();
    }
  }

  unregister(){
    this.currentOption = OPTION_TYPE.unregister;
    this._card.loading = true;
    const value = this.cardForm.value;
    if(this._card.unregister) {
      this._card.unregister(value as Exclude<ParamType, IPiInstallModel>).subscribe()
    }
  }

  handleSuccess(response: any) {
    this._card.loading = false;
    this.status = 'success';
    setTimeout(() => this.status = '');
  }

  handleError() {
    this._card.loading = false;
    this.status = 'error';
  }

  getLoading(option: string) {
    return this.currentOption === option && this._card.loading;
  }

  getErrorMsg(key: string) {
    const targetError = this.errors[this.currentOption];
    return targetError[key as keyof typeof targetError];
  }

}
