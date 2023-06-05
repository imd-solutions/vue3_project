export interface InputTextTypes {
  name: string;
  inputData?: string;
  placeHolder?: string;
  type?: string;
  value?: string;
  label: string;
  topCss?: string;
  cssClass: string;
  inputClass?: string;
  icon?: object;
  error?: boolean;
  errorMessage?: object;
  validation: object;
}

export interface CheckBoxTypes {
  name: string;
  title: string;
  checkBoxCss: string;
}

export interface Icon {
  faIcon: string;
}

export interface ErrorMessage {
  email: boolean;
  numeric: boolean;
  decimal: boolean;
  minLength: boolean;
  monthYear: boolean;
  required: boolean;
}
