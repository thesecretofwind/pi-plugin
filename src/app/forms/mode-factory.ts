import { ModeType } from "../types/mode";
import { DualMode } from "./dual-mode";
import { LegacyMode } from "./legacy-mode";
import { Mode } from "./mode";
import { SingleMode } from "./single-mode";

export  class ModeFactory {
  static createMode(mode: ModeType): Mode {
    switch(mode) {
      case ModeType.single:
        return new SingleMode();
      case ModeType.legacy:
        return new LegacyMode();
      case ModeType.dual:
        return new DualMode();
      default:
        return new Mode();
    }

  }
}
