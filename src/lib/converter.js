import { createElement } from './helpers';

export function generateImage(imagePath) {
    if (!imagePath) {
        return document.createElement('div');
    }

    const imageElement = createElement('img');
    imageElement.src = `../../${imagePath}`;
    return imageElement;
}

export function generateTitle(title, slug){
    const link = document.createElement('a');
    link.href = `/fyrirlestur.html?slug=${slug}`;

    const titleElement = document.createElement('h1');
    titleElement.appendChild(document.createTextNode(title));
    
    link.appendChild(titleElement);
    return link;
}

export function generateQuote(){
    //
}

export function generateText(){
    //
}