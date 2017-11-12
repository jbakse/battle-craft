import * as _ from "lodash";

export class Buff {
  constructor (effects = {}) {
    this.effects = effects;
  }

  toString () {
    let desc = "";
    _.forOwn(this.effects, (v, k) => {
      desc += `${k}:${v}`;
    });
    return desc;
  }
}
