import { empty, createElement } from './helpers';
import { generateImage, generateTitle } from './converter';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.url = '../lectures.json';
  }

  loadLectures() {
    return fetch(this.url)
      .then((res) => {
        if(!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      });
  }

  showData(data) {
    data.lectures.map((item) => {
      this.showItem(item);
    });
  }

  // DT2
  /////////////////////////////////////////////
  /*
  showList(data) {
    const image = el('div');
    const img = el('img');
    img.setAttribute('src', data.thumbnail);
    img.setAttribute('alt', '');
    image.appendChild(img);

    const category = el('a', data.category);
    category.setAttribute('href', '/fyrirlestur.html?slug='+data.slug');

    this.container.appendChild(finalItem);
  }
  */
  /////////////////////////////////////////////

  showItem(item){
    const titleElement = generateTitle(item.title, item.slug);
    this.container.appendChild(titleElement);

    let imageElement = generateImage(item.thumbnail);
    this.container.appendChild(imageElement);
  }

  load() {
    empty(this.container);
    this.loadLectures()
      .then((data) => this.showData(data));
  }
}

