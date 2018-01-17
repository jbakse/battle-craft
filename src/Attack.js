export class Attack {
    value = 1;
    leftovers = [];

    constructor (value = 1) {
      this.value = value;
    }

    toString () {
      return `${this.value} hp`;
    }
}
