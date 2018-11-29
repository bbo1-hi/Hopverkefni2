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
                    console.log('ætti að k  oma MYND');
                    const imageContent = generateImage(item.data);

                    this.container.appendChild(imageContent);

                    if (item.caption) {
                        const captionElement = document.createElement('p');
                        captionElement.appendChild(document.createTextNode(item.caption));
                        this.container.appendChild(captionElement); 
                    }
                                
                break;
                
                case 'heading':
                    console.log('ætti að koma HEADING');
                    const headingElement = document.createElement('h2');
                    headingElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(headingElement);             
                break;
                
                case 'quote':
                    console.log('ætti að koma QUOTE');
                    const quoteElement = document.createElement('q');
                    quoteElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(quoteElement);
                    if (item.attribute) {
                        const attributeElement = document.createElement('q');
                        attributeElement.appendChild(document.createTextNode(item.attribute));
                        this.container.appendChild(attributeElement); 
                    }
                            
                break;
            
                case 'code':
                    console.log('ætti að koma CODE');
                    const codeElement = document.createElement('code');
                    codeElement.appendChild(document.createTextNode(item.data));
                    this.container.appendChild(codeElement);             
                break;
                
                case 'list':
                    console.log('ætti að koma LIST');
                    const listElement = document.createElement('ol');

                    item.data.forEach(function(entry) {
                        const listItem = document.createElement('li');
                        listItem.appendChild(document.createTextNode(entry));
                        listElement.appendChild(listItem);
                        
                        console.log(listItem);
                    });

                    listElement.appendChild(document.createTextNode(item.data));

                    this.container.appendChild(listElement);              
                break;
            
                case 'youtube':
                    console.log('ætti að koma VIDEO');
                    console.log('item.data = ', item.data);

                    const videoElement = createElement('iframe');
                    videoElement.setAttribute('src', item.data);
                    videoElement.setAttribute('frameborder', 0);
                    videoElement.setAttribute('allowfullscreen', 0);
                    
                    this.container.appendChild(videoElement);             
                break;

                }
        });
            
    }
    showLecture(item){
        const imageElement = generateImage(item.image);
        console.log('item image', item.image);
        const iLink = 'url(\'' + item.image + '\')';
        console.log('why not', iLink); //fæ: "url('img/code.jpg')" ---útur þessu
        document.querySelector('.fheader').style.backgroundImage = `${iLink}`;
      //  document.querySelector('.fheader__image').appendChild(imageElement);
  
        const categoryElement = generateCategory(item.category, item.slug);
        document.querySelector('.fheader__overtitle').appendChild(categoryElement);    
  
        const titleElement = generateTitle(item.title, item.slug);
        document.querySelector('.fheader__title').appendChild(titleElement);
  

      console.log("data", item.content)
      const contentContainer = createElement('div');
      contentContainer.setAttribute('class', 'lecture__contentContainer');
      const contentElement = this.generateContent(item.content);

      contentContainer.appendChild(contentElement);
      this.container.appendChild(contentContainer);
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