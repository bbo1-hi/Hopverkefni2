import { empty, createElement } from './helpers';
import { generateImage, generateTitle, generateCategory } from './converter';
import { loadSavedLectures, SaveLecture } from './storage';

export default class Lecture {
    constructor() {
        this.container = document.querySelector('.lecture');
        this.url = '../lectures.json';
    }

    loadLecture(slug) {
        return fetch(this.url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Gat ekki sótt fyrirlestur');
                }
                return res.json();
            })
            .then((data) => {
                const found = data.lectures.find(i => i.slug === slug);
                console.log(found);
                if (!found) {
                    throw new Error('Fyrirlestur fannst ekki');
                }
                return found;
            });        
    }
    generateContent(content) {
        //    const contentTypes = ['text', 'image', 'heading', 'quote', 'code', 'list', 'youtube'];
        console.log("dddd", content)
        content.forEach((item) => {

            switch (item.type) {
                
                case 'text':
                    console.log('ætti að koma texti');
                    const textElement = document.createElement('p');
                    textElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(textElement);      
                break;
                
                case 'image':
                    console.log('ætti að koma MYND');
                    let imageContent = generateImage(item.data);  
                    this.container.appendChild(imageContent);            
                break;
                
                case 'heading':
                    console.log('ætti að koma HEADING');
                    const headingElement = document.createElement('h1');
                    headingElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(headingElement);             
                break;
                
                case 'quote':
                    console.log('ætti að koma QUOTE');
                    const quoteElement = document.createElement('q');
                    quoteElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(quoteElement);             
                break;
            
                case 'code':
                    console.log('ætti að koma CODE');
                    const codeElement = document.createElement('p');
                    codeElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(codeElement);             
                break;
                
                case 'list':
                    console.log('ætti að koma LIST');
                    const listElement = document.createElement('ol');
                    listElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(listElement);              
                break;
            
                case 'youtube':
                    console.log('ætti að koma VIDEO');
                    const videoElement = document.createElement('iframe');
                    videoElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(videoElement);             
                break;

                }
        });
            
    }
    showLecture(item){
      const categoryElement = generateCategory(item.category, item.slug);
      this.container.appendChild(categoryElement);    

      const titleElement = generateTitle(item.title, item.slug);
      this.container.appendChild(titleElement);
        
      let imageElement = generateImage(item.image);
      this.container.appendChild(imageElement);
      
      console.log("data", item.content)
      let contentElement = this.generateContent(item.content);
      
      this.container.appendChild(contentElement);
    }

    finished() {
        console.log('Tveir')
        const qs = new URLSearchParams(window.location.search);
        const slug = qs.get('slug');

        SaveLecture(slug);
        const saved = loadSavedLectures();
        console.log(saved);
    }

    load(){
        //console.log('hallo');
        empty(this.container); // Bætti til samræmis við load() í list.js
        const qs = new URLSearchParams(window.location.search);
        const slug = qs.get('slug');

        this.loadLecture(slug) // aftan á (slug) .then(data => console.log(data))
          .then(data => this.showLecture(data));
        // villumeðhöndlun
        // sækja fyrirlestra
        // finna réttan fyrirlestur

    }
}  


