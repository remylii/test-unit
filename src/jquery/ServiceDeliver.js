// サンプル

let n = 0;
export default class ServiceDeliver {
  static inc() {
    console.log('call inc');
    console.log(n);

    return ++n;
  }
}
