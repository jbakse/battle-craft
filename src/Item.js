import * as _ from "lodash";

// creatingItems

// with ordered params
// let item = new Item("sand", 1, "craft");

// with named params
// let item = new Item({name: "sand", level: 1, type: "craft"});

// using existing item (extra properties discarded)
// let item = new Item(existingItem);

// with Item.clone (extra properties preserved)
// let item = Item.clone(existingItem);

let itemId = 0;
export class Item {
    id = 0;
    name;
    level;
    type;
    elements;
    specials;

    constructor (name, level = 0, type = "craft") {
      let defaults = {
        name: "unnamed",
        level: 0,
        type: "craft",
        elements: [],
        craft: []
      }

      let params = {
        name,
        level,
        type
      }

      if (_.isObject(name)) {
        // discard extra properties
        params = _.pick(name, _.keys(defaults));
      }

      _.defaults(this, params, defaults);

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
  superglue: new Item("superglue", 2, "craft"),
  gem: new Item("gem", 2, "buff"),

  bone: new Item("bone", 1, "attack"),
  club: new Item("club", 2, "attack")

}
