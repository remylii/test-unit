/**
 * @var {object} data {name: string, age: number}
 * @return {string}
 */
export function showMyAngel(data) {
  return `<div>マイライブリーエンジェル: ${data.name} (${data.age})</div>`;
}

export function notFoundMyAngel() {
  return `<div>空っぽ</div>`;
}
