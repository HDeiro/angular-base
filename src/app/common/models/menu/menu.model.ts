export class Menu {
  name:  string;
  route: string;
  featureFlag: string;

  static build(payload) {
    const item = new Menu();

    Object.assign(item, payload);

    return item;
  }
}
