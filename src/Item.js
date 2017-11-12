import * as _ from "lodash";

let itemId = 0;
export class Item {
    id = 0;
    name = "unnamed";
    level = 0;
    type = "craft";
    elements = [];
    specials = [];

    constructor (name, level = 0, type = "craft") {
      this.name = name;
      this.level = level;
      this.type = type;
      this.id = ++itemId;
    }

    toString () {
      return `${this.name}:${this.id}`;
    }

    static clone (item) {
      let i = _.cloneDeep(item);
      i.id = ++itemId;
      return i;
    }

    static create (name) {
      if (itemLibrary[name]) {
        return Item.clone(itemLibrary[name]);
      } else {
        return Item.clone(itemLibrary.dust);
      }
    }

    static match (info) {
      let matches = _.filter(itemLibrary, (item) => {
        return item.level <= info.level &&
            item.type === info.type;
      });
      _.sortBy(matches, ['level']);

      if (matches.length > 0) {
        return Item.clone(matches.pop());
      }

      return false;
    }
}

let itemLibrary = {
  dust: new Item("dust", 0, "attack"),
  pebble: new Item("pebble", 1, "attack"),
  rock: new Item("rock", 2, "attack"),
  boulder: new Item("boulder", 4, "attack"),
  glue: new Item("glue", 1, "craft"),
  superglue: new Item("superglue", 2, "craft")
}
