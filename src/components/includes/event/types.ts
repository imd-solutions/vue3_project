export interface Button {
  topCss?: string;
  title: string;
  icon?: string;
  css: string;
  size?: string;
  width?: string;
  undisable?: boolean;
  hide?: boolean;
  multiline?: boolean;
  btnTitle?: string;
  btnSide?: boolean;
  method: Method;
  id?: string;
}

export interface ButtonSearch {
  id: string;
  topCss: string;
  title: string;
  css: string;
  size: string;
  width: string;
  undisable: boolean;
  method: BtnMethod;
}

interface BtnMethod {
  name: string;
  action: string;
}

export interface Method {
  name: string;
  action?: string;
  additional?: string;
}
