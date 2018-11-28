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

    data.lectures.finished = saved.indexOf(data.lectures.slug) >= 0;

    return data;
  }


  showItem(item){
    const elImage = createElement('img')
    elImage.classList.add('FF')
    elImage.setAttribute('src', url)
    let imageElement = generateImage(item.thumbnail);
    this.container.appendChild(imageElement);

    const titleElement = generateTitle(item.title, item.slug);
    this.container.appendChild(titleElement);
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

