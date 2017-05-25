import { showMyAngel, notFoundMyAngel } from './show-my-angel';

/**
 * @var {object} my_angel_data - {name: string, age: number}
 */
let my_angel_data = {};

class MyAngelContainer {
  static renderMyAngel(data) {
    my_angel_data = data;

    return showMyAngel(my_angel_data);
  }

  /**
   * @return {HTMLCollection<HTMLDivElement>} html - component
   */
  static renderEmpty() {
    return notFoundMyAngel();
  }
}

export default MyAngelContainer;
