import { createElement } from './helpers';

export function generateImage(imagePath) {
    const imageElement = createElement('img');
    
    if (!imagePath) {
        imageElement.src = "../img/thumb0.jpg";
        return imageElement;
    }
    
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

export function generateCategory(category, slug){
    const link = document.createElement('a');
    link.href = `/fyrirlestur.html?slug=${slug}`;

    const categoryElement = document.createElement('p');
    categoryElement.appendChild(document.createTextNode(category));
    
    link.appendChild(categoryElement);
    return link;
}
export function generateQuote(){
    //
}

export function generateText(){

}