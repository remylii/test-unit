/**
 * method
 * @param {object} data - {title: string, category: string}
 * @return {HTMLCollection<HTMLDivElement>}
 */
export function showAngelSong(data) {
  return (
`<div>
  <h3>show angel song</h3>
  <dl>
    <dt>title</dt>
    <dd>${data.title}</dd>
    <dd>[${data.category}]</dd>
  </dl>
</div>`
  );
}

export function notFoundAngelSong() {
  return `<div>不明</div>`;
}
