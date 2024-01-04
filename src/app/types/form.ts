
// vcenter表单接口
export interface IvcenterInstallModel {
  id?: number;
  vcenterHostname: string;
  username: string;
  password: string;
  pluginHostname: string;
}


// vxrail表单接口
export interface IvxrailInstallModel {
  id?: number;
  vxrailHostname: string;
  username: string;
  password: string;
}

// pi表单接口
export interface IPiInstallModel {
  hostname: string;
  apiKey:string;
  apiSecret:string;
}

// card表单接口
export interface ICardInstallModel {
  id?: number;
  hostname: string;
  username: string;
  password: string;
  linkWithPlugin?:boolean
  linkWithVxrail?:boolean
}


export type EInputInfoType = {
  inputTitle: string;
  inputTitleId: string;
  inputType: 'text' | 'password';
  inputContent: string;
  name: string;
};

export type ParamType = IvcenterInstallModel | IvxrailInstallModel| IPiInstallModel | ICardInstallModel;
export type FormStatus = 'registered' | 'unregister'
export type Code = 'PI' | 'Vcenter' | 'Vxrail' | 'Card';


export interface IFormCard <T = Array<EInputInfoType>> {
  title: string;
  placeholder: string;
  code: Code;
  inputInfo: T;
  owner: string;
  status: FormStatus;
  loading: boolean;
  register?: (params: ParamType) => any;
  update?: (params: ParamType) => any;
  unregister?: (params: ParamType) => any;
  deps?: Code[]
}
export type InputIdAndContent = Pick<EInputInfoType, 'inputContent' | 'inputTitleId'>;
export type CardInput = Pick<IFormCard<InputIdAndContent[]>, 'code' | 'inputInfo'>;
