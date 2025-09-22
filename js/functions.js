function checkLength(string, length){
  return string.length >= length;
}

function checkPalindrome(string){
  string = string.toLowerCase().replaceAll(' ','');
  for (let i = 0; i < string.length / 2; i++ ){
    if(string[i] !== string[string.length-1-i])
    {
      return false;
    }
    return true;
  }
}

function getNumbers(string){
  let numbers = '';
  for (let i = 0; i < string.length; i++){
    const number = parseInt(string[i],10);
    if (!Number.isNaN(number)){
      numbers+= number.toString();
    }
  }
  return numbers;
}

getNumbers('1 кефир, 0.5 батона');
getNumbers('ECMAScript 2022');
checkPalindrome('потоп');
checkLength('fff',3);
