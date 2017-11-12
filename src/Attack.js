export class Attack {
    value = 1;
    constructor (value = 1) {
      this.value = value;
    }

    toString () {
      return `${this.value} hp`;
    }
}
