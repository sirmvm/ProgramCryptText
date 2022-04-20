(function (){
  
  const diccionary = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat',
  };

  function cipher(str, dict) {
    const reverse = new RegExp(Object.keys(dict).join('|'), 'gi');
    return str.replace(reverse, (match) => dict[match]);

  }

  function decipher(str, dict) {
    const reverse = new RegExp(Object.values(dict).join('|'), 'gi');
    return str.replace(reverse, (match) => Object.keys(dict).find(key => dict[key] === match));

  }

  function classManager(toRemove, toAdd, name) {
    toRemove.classList.remove(name);
    toAdd.classList.add(name);
  }

  function classButton(action){
    const actionButton = document.querySelectorAll('.row col-6 button');
    if(action=='add'){
      actionButton.forEach(button => button.setAttribute('disabled', true));
    }else if(action=='remove'){
      actionButton.forEach(button => button.removeAttribute('disabled'));
    }
  }

  function validateText(text){
    const reverse = new RegExp('[A-ZA-ú]', 'g');
    if (reverse.test(text.target.value)){
      classButton('add');
    }else{
      classButton('remove');
    }
  }

  function cleanArea(textArea){
    textArea.value = '';
  }

  window.onload=()=>{
    const cryptBtn = document.getElementById('crypt-button');
    const decryptBtn = document.getElementById('decrypt-button');
    const copyBtn = document.getElementById('copy-button');

    const textArea = document.getElementById('text-area');
    const outputArea = document.getElementById('output-area');

    const textFinally = document.getElementById('text-finally');
    const noTextFinally = document.getElementById('no-text-finally');

    //actions

    textArea.addEventListener('input', validateText);
    textArea.addEventListener('paste', validateText);

    cryptBtn.addEventListener('click', ()=>{
      if(textArea.value.length>0){
        let result = cipher(textArea.value, diccionary);
        classManager(textFinally, noTextFinally, 'hidden');
        outputArea.value=result;
        cleanArea(textArea);
      }
    });

    decryptBtn.addEventListener('click', ()=>{
      if(textArea.value.length>0){
        let result = decipher(textArea.value, diccionary);
        classManager(textFinally, noTextFinally, 'hidden');
        outputArea.value=result;
        cleanArea(textArea);
      }
    });

    copyBtn.addEventListener('click', ()=>{
      outputArea.select();
      document.execCommand('copy');
    });

    
  }

})();