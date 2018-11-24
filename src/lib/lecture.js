import { empty, createElement } from './helpers';
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
                    throw new Error('Gat ekki sótt fyrirlestra');
                }
                return res.json();
            })
            .then((data) => {
                const found = data.lectures.find(i => i.slug === slug);
                if (!found) {
                    throw new Error('Fyrirlestur fannst ekki');
                }
                return found;
            });
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
        console.log('hallo');
        const qs = new URLSearchParams(window.location.search);
        const slug = qs.get('slug');

        this.loadLecture(slug).then(data => console.log(data));

        // villumeðhöndlun
        // sækja fyrirlestra
        // finna réttan fyrirlestur

        const finishedButton = createElement('button', 'Finished');
        finishedButton.setAttribute('href', '/fyrirlestur.html?slug='+slug);
        finishedButton.addEventListener('click', this.finished);    
        this.container.appendChild(finishedButton);

    }
}  
