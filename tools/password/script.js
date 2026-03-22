(function(){

const output = document.getElementById("passwordOutput");
const lengthInput = document.getElementById("length");

const upper = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?/";


function generatePassword(){

  let chars = lowerChars;

  if(upper.checked) chars += upperChars;
  if(numbers.checked) chars += numberChars;
  if(symbols.checked) chars += symbolChars;

  const length = parseInt(lengthInput.value);

  let password = "";

  for(let i=0;i<length;i++){
    const randomIndex = Math.floor(Math.random()*chars.length);
    password += chars[randomIndex];
  }

  output.value = password;

}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {

  if(!output.value) return;

  navigator.clipboard.writeText(output.value);

  copyBtn.innerText = "Copied!";

  setTimeout(()=>{
    copyBtn.innerText = "Copy";
  },1500);

});

})();