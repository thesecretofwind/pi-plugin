import {
  IFormCard,
  IPiInstallModel,
  IvcenterInstallModel,
  ICardInstallModel,
  ParamType,
} from '../types/form';

// 首先导入 Angular 的依赖注入器和你的服务类
import { Injector } from '@angular/core';
import { VcenterService } from '@services/api/vcenter.service';
import { VertivCardService } from '@services/api/vertiv-card.service';
import { VertivPiService } from '@services/api/vertiv-pi.service';
import { VxRailService } from '@services/api/vxrail.service';
import { IvxrailInstallModel } from '../types/form';

import { EncryptService } from '@services/encrypt.service';
import { HttpClient } from '@angular/common/http';

// 创建一个新的依赖注入器
// const injector = Injector.create({
//   providers: [
//     { provide: HttpClient, useClass: HttpClient },
//     { provide: VcenterService, useClass: VcenterService, deps: [HttpClient] },
//     { provide: VxRailService, useClass: VxRailService, deps: [HttpClient] },
//     { provide: VertivPiService, useClass: VertivPiService, deps: [HttpClient] },
//     { provide: VertivCardService, useClass: VertivCardService, deps: [HttpClient] },
//     { provide: EncryptService, useClass: EncryptService, deps: [HttpClient] },
//   ],
// });

// const VcenterServiceInstance = injector.get(VcenterService);
// const VxRailServiceInstance = injector.get(VxRailService);
// const VertivPiServiceInstance = injector.get(VertivPiService);
// const VertivCardServiceInstance = injector.get(VertivCardService);

// type T = Exclude<ParamType, IPiInstallModel>;
type CommonModel = IvcenterInstallModel &
  IvxrailInstallModel &
  ICardInstallModel;

function entry<T extends CommonModel>(params: T): T {
  const encryptPassword = EncryptService.encrypt(params.password);
  return {
    ...params,
    password: encryptPassword,
  };
}

// 函数重载为了多个接口调用传入不同的参数，操作后返回其类型
function encrypt(params: IvcenterInstallModel): IvcenterInstallModel;
function encrypt(params: IvxrailInstallModel): IvxrailInstallModel;
function encrypt(params: ICardInstallModel): ICardInstallModel;
function encrypt(
  params: Exclude<ParamType, IPiInstallModel>
): Exclude<ParamType, IPiInstallModel> {
  // 真正实现的函数，则应该是所有需重载函数中传入参数、返回值的并集
  // 要统一对传入的参数进行操作，要是重载函数的交集(即只能对公共属性进行操作，否则会出错，除非是一个个判断是哪个类型做哪个操作)
  return entry(params as CommonModel);
}

// type IFormCardQ = Exclude<IFormCard, 'register' | 'unregister' | >

export const installCardStoreList: IFormCard[] = [
  {
    title: 'INSTALLPAGE.VCENTERTITLE',
    code: 'Vcenter',
    placeholder: 'INSTALLPAGE.VCENTERDES',
    owner: 'single-legacy-dual',
    status: 'unregister',
    loading: false,
    // order: 0,
    inputInfo: [
      {
        inputTitle: 'VCENTERPLUGIN.HOSTIP',
        inputTitleId: 'VCHostIp',
        inputType: 'text',
        inputContent: '',
        name: 'vcenterHostname'
      },
      {
        inputTitle: 'VCENTERPLUGIN.USERNAME',
        inputTitleId: 'VCUserName',
        inputType: 'text',
        inputContent: '',
        name: 'username'
      },
      {
        inputTitle: 'VCENTERPLUGIN.PASSWORD',
        inputTitleId: 'VCPassword',
        inputType: 'password',
        inputContent: '',
        name: 'password'
      },
      {
        inputTitle: 'VCENTERPLUGIN.PLUGINHOSTIP',
        inputTitleId: 'VCPluginIp',
        inputType: 'text',
        inputContent: '',
        name: 'pluginHostname'
      },
    ],
    // register: (params: ParamType) =>
    //   VcenterServiceInstance.post(encrypt(params as IvcenterInstallModel)),
    // update: (params: ParamType) =>
    //   VcenterServiceInstance.put(params as IvcenterInstallModel),
    // unregister: (params: ParamType) =>
    //   VcenterServiceInstance.delete(params as IvcenterInstallModel),
  },
  {
    title: 'INSTALLPAGE.VXRAILTITLE',
    code: 'Vxrail',
    placeholder: 'INSTALLPAGE.VXRAILDES',
    owner: 'single-dual',
    status: 'unregister',
    loading: false,
    // order: 1,
    inputInfo: [
      {
        inputTitle: 'VxRail Host Name/IP',
        inputTitleId: 'VXHostIp',
        inputType: 'text',
        inputContent: '',
        name: 'vxrailHostname'
      },
      {
        inputTitle: 'VxRail UserName',
        inputTitleId: 'VXUserName',
        inputType: 'text',
        inputContent: '',
        name: 'username'
      },
      {
        inputTitle: 'VxRail Password',
        inputTitleId: 'VXPassword',
        inputType: 'password',
        inputContent: '',
        name: 'password'
      },
    ],
    // register: (params: ParamType) =>
    //   VxRailServiceInstance.post(encrypt(params as IvxrailInstallModel)),
    // update: (params: ParamType) =>
    //   VxRailServiceInstance.put(params as IvxrailInstallModel),
    // unregister: (params: ParamType) =>
    //   VxRailServiceInstance.delete(params as IvxrailInstallModel),
  },
  {
    title: 'INSTALLPAGE.PITITLE',
    code: 'PI',
    placeholder: 'INSTALLPAGE.PIDES',
    owner: 'single-legacy-dual',
    status: 'unregister',
    loading: false,
    // order: 2,
    inputInfo: [
      {
        inputTitle: 'PICONFIGURE.PIHOSTIP',
        inputTitleId: 'PIHostIp',
        inputType: 'text',
        inputContent: '1233',
        name: 'hostname'
      },
      {
        inputTitle: 'PICONFIGURE.PIAPIKEY',
        inputTitleId: 'apiKey',
        inputType: 'text',
        inputContent: '2233',
        name: 'apiKey'
      },
      {
        inputTitle: 'PICONFIGURE.PISECRET',
        inputTitleId: 'apiSecret',
        inputType: 'password',
        inputContent: '3344',
        name: 'apiSecret'
      },
    ],
    // register: (params: ParamType) =>
    //   VertivPiServiceInstance.post(params as IPiInstallModel),
    // update: (params: ParamType) =>
    //   VertivPiServiceInstance.put(params as IPiInstallModel),
    // unregister: (params: ParamType) =>
    //   VertivPiServiceInstance.delete(params as IPiInstallModel),
  },
  {
    title: 'INSTALLPAGE.CARDTITLE',
    code: 'Card',
    placeholder: 'INSTALLPAGE.CARDDES',
    owner: 'single',
    status: 'unregister',
    loading: false,
    // order: 3,
    inputInfo: [
      {
        inputTitle: 'Card Host Name/IP',
        inputTitleId: 'CardIp',
        inputType: 'text',
        inputContent: '',
        name: 'hostname'
      },
      {
        inputTitle: 'Card UserName',
        inputTitleId: 'CardUserName',
        inputType: 'text',
        inputContent: '',
        name: 'username'
      },
      {
        inputTitle: 'Card Password',
        inputTitleId: 'CardPassword',
        inputType: 'password',
        inputContent: '',
        name: 'password'
      },
    ],
    // register: (params: ParamType) =>
    //   VertivCardServiceInstance.post(encrypt(params as ICardInstallModel)),
    // update: (params: ParamType) =>
    //   VertivCardServiceInstance.put(params as ICardInstallModel),
    // unregister: (params: ParamType) =>
    //   VertivCardServiceInstance.delete(params as ICardInstallModel),
  },
];
