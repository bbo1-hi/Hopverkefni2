import { empty, createElement } from './helpers';
import { generateImage, generateTitle, generateCategory } from './converter';
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
    
    const fBox = createElement('div');
    fBox.setAttribute('class', 'list__card');
    const fTitill = createElement('div');  
    fTitill.setAttribute('class', 'list__card__text');
    
    const imageElement = generateImage(item.thumbnail);
    imageElement.setAttribute('href',item.slug);
    fBox.appendChild(imageElement);

    const categoryElement = generateCategory(item.category, item.slug);
    fTitill.appendChild(categoryElement);

    const titleElement = generateTitle(item.title, item.slug);
    fTitill.appendChild(titleElement);

    fBox.appendChild(fTitill);
    this.container.appendChild(fBox);
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

