import mammoth from 'mammoth';
import xmldom from 'xmldom';
import {unscrambleWord} from './word-combinations.js';

async function init() {

  console.log((await mammoth.convertToHtml({
    path: "./demo-files/demo-input.docx"
  })).value);

  const $doc = new xmldom.DOMParser()
    .parseFromString((await mammoth.convertToHtml({
      path: "./demo-files/demo-input.docx"
    })).value);

  console.log(`Has child nodes: ${$doc.childNodes.length}`);
  Array.from($doc.getElementsByTagName('ul')).forEach($ul => {
    if ($ul.childNodes.length === 0) // it's empty.
      return;

    const targetList = Array.from($ul.childNodes)
      .map($li => $li.textContent)
      .filter(line => /^\w+/.test(line));

    console.log("original word sequence:");
    console.log(targetList);
    console.log(/^\w+/.exec('Read notes just as easily as I write them.').shift());
    if (targetList.length < $ul.childNodes.length) // not all the items have words in them
      return;
    const charSequence = targetList.map(
      line => /^\w/.exec(line).shift()
    );
    console.log("character sequence:");
    console.log(charSequence);
    console.log(unscrambleWord(charSequence))
  });

  // const INPUT = 'egac';

  console.log('unscrambled word');
}

init().then(() => console.log('See ya!')).catch(error => console.log(error));
