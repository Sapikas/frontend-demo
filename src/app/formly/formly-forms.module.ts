import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyFormComponent } from './formly-form/formly-form.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { ObjectTypeComponent } from './templates/object.type';

export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Should have atleast ${field?.props?.minLength} characters`;
}

export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field?.props?.maxLength} characters`;
}

export function emailValidator(control: AbstractControl) {
  const { email } = control.value;
  
  // avoid displaying the message error when values are empty
  if (!email) return null;

  const isValidEmail = String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (isValidEmail) return null;
  return { fieldMatch: { message: `"${email}" is not a valid Email Address` } };
}

export function fieldMatchValidator(control: AbstractControl) {
  const { password, passwordConfirm } = control.value;

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: `Password Not Matching` } };
}

@NgModule({
  declarations: [
    FormlyFormComponent,
    ObjectTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyIonicModule,
    FormlyModule.forRoot({
      extras: { resetFieldOnHide: true },
      validators: [
        { name: 'fieldMatch', validation: fieldMatchValidator },
        { name: 'email', validation: emailValidator }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is requied' },
        { name: 'null', message: 'should be null' },
        { name: 'minlength', message: minLengthValidationMessage },
        { name: 'maxlength', message: maxLengthValidationMessage },
      ],
      types: [
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'enum', extends: 'select' },
        { name: 'object', component: ObjectTypeComponent },
      ]
    })
  ],
  bootstrap: [FormlyFormComponent],
  exports: [
    FormlyFormComponent
  ]
})
export class FormlyFormsModule { }
