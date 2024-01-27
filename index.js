let charcount = document.getElementById('char');
let wordcount = document.getElementById('word');
let sentence = document.getElementById('sentence');
let sentenceLabel = document.getElementById('sentenceLabel');
let paragraph = document.getElementById('paragraph');
let paragraphLabel = document.getElementById('paragraphLabel');
let spaces = document.getElementById('spaces');
let spaceLabel=document.getElementById('spaceLabel')
let punctuation = document.getElementById('punctuation');
let PunctuationsLabel=document.getElementById('PunctuationsLabel')
const textArea = document.querySelector('.text-entry textarea');
const processBtn = document.getElementById('process-btn');
let UIvalues = [charcount, wordcount, sentence, paragraph,spaces, punctuation];

function init() {
    UIvalues.forEach(value => {
        if (value) {
            value.innerHTML = 0;
        }
    });
}

init();

function toggleTextType(type) {
    const wordBtn = document.getElementById('wordBtn');
    const paragraphBtn = document.getElementById('paragraphBtn');

    if (type === 'word') {
        textInput.rows = 1;
        wordBtn.classList.add('active');
        paragraphBtn.classList.remove('active');
        sentenceLabel.style.display = 'none';
        sentence.style.display = 'none';
        paragraphLabel.style.display = 'none';
        paragraph.style.display = 'none';
        spaceLabel.style.display='none';
        spaces.style.display='none';
        PunctuationsLabel.style.display='none';
        punctuation.style.display='none';
    } else if (type === 'paragraph') {
        textInput.rows = 7;
        paragraphBtn.classList.add('active');
        wordBtn.classList.remove('active');
        sentenceLabel.style.display = 'table-cell';
        sentence.style.display = 'table-cell';
        paragraphLabel.style.display = 'table-cell';
        paragraph.style.display = 'table-cell';
        spaceLabel.style.display='table-cell';
        spaces.style.display='table-cell';
        PunctuationsLabel.style.display='table-cell';
        punctuation.style.display='table-cell';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    processBtn.addEventListener('click', function () {
        let text = textArea.value;
        charcount.innerHTML = text.length;
        wordcount.innerHTML = findword(text);
        console.log(text);
        sentence.innerHTML = findsentence(text);
        paragraph.innerHTML = findparagraph(text);
        spaces.innerHTML = text.split(" ").length - 1; // Fix the typo here
        punctuation.innerHTML = findpunctuation(text);
    });
});

function findword(text) {
    let tempText = text.replace(/[.,!%&*;:"-()]/g, " ");
    tempText = tempText.replace(/[\r]/g, "").split(/\n/);
    let tempList = [];
    tempText.forEach(word => tempList.push(word.split(" ")));
    function extract(arr) {
        return arr.reduce((wordList, word) => {
            return wordList.concat(Array.isArray(word) ? extract(word) : word);
        }, []);
    }

    let wordList = extract(tempList);
    return wordList.filter(char => char !== '').length; // Fix the typo here
}

function findsentence(text) {
    const regex = /[\w)]+[.?!](\s|$)/g;
    let sencount = text.match(regex);
    return sencount ? sencount.length : 0;
}

function findpunctuation(text) {
    const regex = /[.,?;:!-'"(){}]/g;
    let punctCount = text.match(regex);
    return punctCount ? punctCount.length : 0;
}

function findparagraph(text) {
    const regex = /\n\s*\n/g;
    let paragraphCount = text.match(regex);
    return paragraphCount ? paragraphCount.length + 1 : 0;
}
