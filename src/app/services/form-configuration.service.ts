import { Injectable, OnInit } from '@angular/core';
import {
  IFormCard,
  IPiInstallModel,
  IvcenterInstallModel,
  ICardInstallModel,
  ParamType,
  Code,
  InputIdAndContent,
} from '../types/form';

// 首先导入 Angular 的依赖注入器和你的服务类
import { Injector } from '@angular/core';
import { VcenterService } from '@services/api/vcenter.service';
import { VertivCardService } from '@services/api/vertiv-card.service';
import { VertivPiService } from '@services/api/vertiv-pi.service';
import { VxRailService } from '@services/api/vxrail.service';
import { IvxrailInstallModel } from '../types/form';

import { EncryptService } from '@services/encrypt.service';

import { installCardStoreList } from '../constant/form'
import { Mode } from '../forms/mode';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

type CommonModel = IvcenterInstallModel &
  IvxrailInstallModel &
  ICardInstallModel;

interface A {
  a: string;
  b: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormConfigurationService {

  updateFormSubject = new BehaviorSubject<any>('');
 formAction = [
    {
      register: (params: ParamType) => this.vcenterService.post(this.encrypt(params as IvcenterInstallModel)),
      update: (params: ParamType) => this.vcenterService.put(params as IvcenterInstallModel),
      unregister: (params: ParamType) => this.vcenterService.delete(params as IvcenterInstallModel),
    },
    {
      register: (params: ParamType) => this.vxRailService.post(this.encrypt(params as IvxrailInstallModel)),
      update: (params: ParamType) => this.vxRailService.put(params as IvxrailInstallModel),
      unregister: (params: ParamType) => this.vxRailService.delete(params as IvxrailInstallModel),
    },
    {
      register: (params: ParamType) => this.vertivPiService.post(params as IPiInstallModel),
      update: (params: ParamType) => this.vertivPiService.put(params as IPiInstallModel),
      unregister: (params: ParamType) => this.vertivPiService.delete(params as IPiInstallModel),
    },
    {
      register: (params: ParamType) => this.vertivCardService.post(this.encrypt(params as ICardInstallModel)),
      update: (params: ParamType) => this.vertivCardService.put(params as ICardInstallModel),
      unregister: (params: ParamType) => this.vertivCardService.delete(params as ICardInstallModel),
    }
  ];
  updateCardMap = {
    'Vcenter': this.vcenterService.get(),
    'Vxrail': this.vxRailService.get(),
    'PI': this.vertivPiService.get(),
    'Card': this.vertivCardService.get()
  }
  keyMap = {
    'Vcenter': 'vcenterHostname',
    'PI': 'apiKey',
    'Vxrail': 'vxrailHostname',
    'Card': 'hostname'
  }
  static installCardStoreList: IFormCard[] = [];

  // static installCardStoreList:IFormCard[] = installCardStoreList.map((item, index) => ({...item, ...this.formAction[index]}));;
  // FormConfigurationService.installCardStoreList = installCardStoreList.map((item, index) => ({...item, ...this.formAction[index]}));
   installCardStoreList() {
    return installCardStoreList.map((item, index) => ({...item, ...this.formAction[index]}));
  }
  constructor( private vcenterService: VcenterService, private vxRailService: VxRailService,
    private vertivPiService: VertivPiService, private vertivCardService: VertivCardService) {
      FormConfigurationService.installCardStoreList = installCardStoreList.map((item, index) => ({...item, ...this.formAction[index]}));
    }

  // 函数重载为了多个接口调用传入不同的参数，操作后返回其类型
  encrypt(params: IvcenterInstallModel): IvcenterInstallModel;
  encrypt(params: IvxrailInstallModel): IvxrailInstallModel;
  encrypt(params: ICardInstallModel): ICardInstallModel;
  encrypt(params: Exclude<ParamType, IPiInstallModel>): Exclude<ParamType, IPiInstallModel> {
    // 真正实现的函数，则应该是所有需重载函数中传入参数、返回值的并集
    // 要统一对传入的参数进行操作，要是重载函数的交集(即只能对公共属性进行操作，否则会出错，除非是一个个判断是哪个类型做哪个操作)
    return this.encryptPassword(params as CommonModel);
  }

  encryptPassword<T extends CommonModel>(params: T): T {
    const encryptPassword = EncryptService.encrypt(params.password);
    return {...params, password: encryptPassword};
  }

  updateCardList(codes:Code[], target: Mode) {
    const requestList = codes.map(item => this.updateCardMap[item]);
    // console.log(requestList, '1111');

    forkJoin(requestList).subscribe((results) => {

        const resultList = codes
          .map((item, index) => ({
            code: item,
            key: this.keyMap[item],
            data: results[index].body,
          }))
          .forEach(item => {

            this.updateField(item.data, item.key as never, item.code, target);
          });


        const [venterdata, vxraildata, pidata, cardData ] = results.map(item => item.body);
        const venterRes = venterdata as IvcenterInstallModel | null;
        const vxrailRes = vxraildata as IvxrailInstallModel | null;
        const piRes = pidata as IPiInstallModel | null;
        const cardRes = cardData as ICardInstallModel | null;

        if (venterRes && venterRes?.vcenterHostname !== '') {
          const card = target.cardList.find(item => item.code === 'Vcenter');
          const updatedFields:InputIdAndContent[]  = Object.keys(venterRes).map(item => ({inputTitleId: item as string, inputContent: venterRes[item as keyof IvcenterInstallModel] as string}))
          card && target.updateInputField(card.inputInfo, updatedFields)
        }

        if (vxrailRes && vxrailRes?.vxrailHostname !== '') {
          const card = target.cardList.find(item => item.code === 'Vxrail');
          const updatedFields:InputIdAndContent[]  = Object.keys(vxrailRes).map(item => ({inputTitleId: item as string, inputContent: vxrailRes[item as keyof IvxrailInstallModel] as string}))
          card && target.updateInputField(card.inputInfo, updatedFields)
        }

        if (piRes && piRes.apiKey !== '') {
          const card = target.cardList.find(item => item.code === 'PI');
          const updatedFields:InputIdAndContent[]  = Object.keys(piRes).map(item => ({inputTitleId: item as string, inputContent: piRes[item as keyof IPiInstallModel] as string}))
          card && target.updateInputField(card.inputInfo, updatedFields)
        }

        if (cardRes && cardRes.hostname !== '') {
          const card = target.cardList.find(item => item.code === 'Card');
          const updatedFields:InputIdAndContent[]  = Object.keys(cardRes).map(item => ({inputTitleId: item as string, inputContent: cardRes[item as keyof ICardInstallModel] as string}))
          card && target.updateInputField(card.inputInfo, updatedFields)
        }
      }
    );
  }

  updateField<T>(updateData: T, key: keyof T, code: Code, target: Mode) {

    if (updateData && (updateData[key] as unknown as string) !== '' ) {
      const card = target.cardList.find(item => item.code === code);
      const updatedFields  = Object.keys(updateData).map(item => ({inputTitleId: item as string, inputContent: updateData[item as keyof T] as unknown as string}))

      if (card) {
        target.updateInputField(card.inputInfo, updatedFields);
        this.updateFormSubject.next({code})
      }
    }
  }
}
