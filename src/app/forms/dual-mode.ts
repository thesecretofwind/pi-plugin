import { FormConfigurationService } from "@services/form-configuration.service";
import { ModeType } from "../types/mode";
import { Mode } from "./mode";


export class DualMode  extends Mode{
  public override mode = ModeType.dual;

  public progress = 0;

  public override status = 0;

  public override cardList = FormConfigurationService.installCardStoreList.filter(item => item.owner.includes(this.mode));

  constructor() {
    super();
    // console.log(FormConfigurationService.installCardStoreList);
  }
}
