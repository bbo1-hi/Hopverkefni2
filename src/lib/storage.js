const LOCALSTORAGE_KEY = 'lectures';

export function loadSavedLectures() {
    const savedJsonLectures = localStorage.getItem(LOCALSTORAGE_KEY);
    const savedLectures = JSON.parse(savedJsonLectures) || [];

    return savedLectures;
}

export function SaveLecture(slug) {
    const saved = loadSavedLectures();

    const index = saved.indexOf(slug);

    if (index >= 0) {
        saved.splice(index, 1);
    } else {
        saved.push(slug);
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));

}