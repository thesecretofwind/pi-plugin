import { isNgTemplate } from "@angular/compiler";
import { CardInput, Code, EInputInfoType, IFormCard, InputIdAndContent } from "../types/form";
import { ModeType } from "../types/mode";


export class Mode {

  mode: ModeType = ModeType.single;
  status = 0;

  cardList: IFormCard[] = [];
  constructor(){}


  trigger() {}

  updateCard(input: CardInput[]) {

    for (const initedCard of this.cardList) {
      const target = input.find(item => item.code === initedCard.code);
      if (target) {
        this.updateInputField(initedCard.inputInfo, target.inputInfo);
      }
    }
  }

  updateInputField(initedFields: EInputInfoType[], updatedFields:InputIdAndContent[],) {

    for (const initField of initedFields) {
      const targetField = updatedFields.find(item => item.inputTitleId === initField.name);;

      if(targetField) {
        initField.inputContent = targetField.inputContent;
      }
    }

  }


  clearCard() {

    for (const card of this.cardList) {
      for (let inputfield of card.inputInfo) {
        inputfield.inputContent = ''
      }
    }
  }
}
