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

    const titleElement = document.createElement('h2');
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
/*
export function generateContent(content) {
//    const contentTypes = ['text', 'image', 'heading', 'quote', 'code', 'list', 'youtube'];
    const htmlEls = content.map((item) => {
        console.log(item);
        
        switch (item.type) {
            case 'text':
                const textElement = document.createElement('p');
                textElement.appendChild(document.createTextNode(item.data));
                elements.push(textElement)

            break;
            case 'image':

            break;
            case 'heading':

            break;
            case 'quote':

            break;

            case 'code':

            break;
            case 'list':

            break;

            case 'youtube':

            break;
            default:
            break;
        }
    });

}
*/
export function generateQuote(){
    //
}

export function generateText(){

}