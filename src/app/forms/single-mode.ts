import { FormConfigurationService } from '@services/form-configuration.service';
import { Mode } from './mode';
import { ModeType } from '../types/mode';


export class SingleMode  extends Mode {
  public override mode = ModeType.single;

  public progress = 0;

  public override status = 0;

  public override cardList = FormConfigurationService.installCardStoreList.filter(item => item.owner.includes(this.mode));

  constructor() {
    super();
  }

}


