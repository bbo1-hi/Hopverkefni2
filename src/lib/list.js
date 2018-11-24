import { empty, createElement } from './helpers';
import { generateImage, generateTitle } from './converter';
import { loadSavedLectures } from './storage';

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
      console.log(item);
      this.showItem(item);
    });
  }

  addSaved(data) {
    const saved = loadSavedLectures();

    data.lectures[0].finished = saved.indexOf(data.lectures[0].slug) >= 0;

    return data;
  }

  // DT2
  /////////////////////////////////////////////
 /* 
  showData(data) {
    const image = createElement('div');
    const img = createElement('img');
    img.setAttribute('src', data.thumbnail);
    img.setAttribute('alt', '');
    image.appendChild(img);

    const category = createElement('a', data.category);
    category.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);
    const finished = createElement('h1', data.finished.toString());

    const textElement = createElement('div', category, finished);

    const finalItem = createElement('a', image, textElement);
    finalItem.setAttribute('href', '/fyrirlestur.html?slug='+data.slug)

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
      .then(data => this.addSaved(data))
      .then(data => this.showData(data))
      .catch((error) => {
        console.error(error)
        // Bæta villumeðhöndlun
      });
  }
}

