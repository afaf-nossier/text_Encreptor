function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
function caesarCipherEncrypt(plaintext, inputkey) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%#*@!?|&^+-/$.=0123456789";
    const input = plaintext;
    if (isNumeric(inputkey) == false) {
        inputkey = alphabet.indexOf(inputkey);
    } else {
        inputkey = parseInt(inputkey);  
        if (inputkey > 0) {
            while (inputkey > alphabet.length) {
                inputkey = inputkey - alphabet.length;
            }
        } else if (inputkey < 0) {
            while (inputkey < (0)) {

                inputkey = inputkey + alphabet.length;
            }
        }
    }
    const key = inputkey;
    let result = "";
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (alphabet.includes(char)) {
            const charIndex = alphabet.indexOf(char);
            const encryptedCharIndex = (charIndex + key) % alphabet.length;

            result += alphabet[encryptedCharIndex];
        } else {
            result += char;
        }
    }

    return result;
}

function caesarCipherDecrypt(ciphertext, inputkey) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ %#*@!?|&^+-/$.=0123456789";
    const input = ciphertext;
    if (isNumeric(inputkey) == false) {
        inputkey = alphabet.indexOf(inputkey);
    } else {
        inputkey = parseInt(inputkey);
        if (inputkey > 0) {
            while (inputkey > alphabet.length) {
                inputkey = inputkey - alphabet.length;
            }
        } else if (inputkey < 0) {
            while (inputkey <(0)) {

                inputkey = inputkey + alphabet.length;
            }
        }
    }
    const key = inputkey;
    let result = "";
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (alphabet.includes(char)) {
            const charIndex = alphabet.indexOf(char);
            const decryptedCharIndex = (charIndex - key + alphabet.length) % alphabet.length;

            result += alphabet[decryptedCharIndex];
        } else {
            result += char;
        }
    }
    return result;
}

const inputText = document.querySelector("#pmsg");
const keyInput = document.querySelector("#key");

const decryptInput = document.querySelector(".decrypt-msg");
const encrypt = document.querySelector(".encrypt");
const decrept = document.querySelector("#decrypt");



encrypt.addEventListener("click", (e) => {
    if (algorithms.value == "caesarCipher") {
        e.preventDefault();
        const originalText = inputText.value;
        const key = keyInput.value;
        const encryptedMessage = caesarCipherEncrypt(originalText, key);
        decryptInput.value = encryptedMessage;

    }
});



decrept.addEventListener("click", (e) => {
    if (algorithms.value == "caesarCipher") {
        e.preventDefault();
        const key = keyInput.value;
        const originalText = inputText.value;
        const decryptedMessage = caesarCipherDecrypt(originalText, key);
        decryptInput.value = decryptedMessage;

    }
});


const algorithms = document.querySelector("#algorithm");
const kayCaesarCipher = document.querySelector("#kays")
const keyAffine = document.querySelector(".key");


algorithms.addEventListener("change", () => {

    if (algorithms.value == "caesarCipher") {
        kayCaesarCipher.style.display = "block";
        keyAffine.style.display = "none";

    } else if (algorithms.value == "Affine") {
        keyAffine.style.display = "block";
        kayCaesarCipher.style.display = "none";

    }
    else {
        // console.log("Vigener")
        kayCaesarCipher.style.display = "block";
        keyAffine.style.display = "none";
    }


})

const btnEncrypt = document.querySelector(".btnEncrept");
const btnDecrypt = document.querySelector(".btnDecrypt");

btnEncrypt.addEventListener("click", () => {

    encrypt.style.display = "block";
    decrept.style.display = "none";
});

var spans = document.querySelector(".span");
const divEncrypt = document.querySelector(".divEncrypt");
const divDecrypt = document.querySelector(".divDecrypt");

btnDecrypt.addEventListener("click", () => {
    btnDecrypt.classList.add("active");
    btnEncrypt.classList.remove("active");

    divEncrypt.style.display = "none";
    divDecrypt.style.display = "block";

    spans.classList.add("rotate")
});


btnEncrypt.addEventListener("click", () => {
    btnDecrypt.classList.remove("active");
    btnEncrypt.classList.add("active");

    divEncrypt.style.display = "block";
    divDecrypt.style.display = "none";
    spans.classList.add("revrotate")
})


// _____________________________________________Affine______________________________________________---

function gcd(a, b) {
    if(b!==0){
    do{
        var temp = b;
        b = a % b;
        a = temp;
    }while(b!==0)
    }
    // while (b !== 0) {
    //     var temp = b;
    //     b = a % b;
    //     a = temp;
    // }
    return a;

}
// console.log( " gcd = " + gcd(192,7)); 

function modInverse(a, m) {
    for (var i = 1; i < m; i++) {
        if ((a * i) % m == 1) {
            return i;
        }
    }
    return 1;
}
//console.log( "aInv = " + modInverse(7,66)); --> 19

function encryptAffine(plaintext, k1, k2) {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '%', '#', '*', '@', '!', '&', '^', '+', '-', '/', '$', '.', '='];
    var size_arr = alphabet.length;
    var ciphertext = "";
    var a = parseInt(k1);
    var b = parseInt(k2);
    if (isNumeric(a) == false || isNumeric(b) == false) {
        alert("sorry ,keys should be numbers.");
        
    } else {

        if (gcd(size_arr, a) === 1) {
            for (var i = 0; i < plaintext.length; i++) {
                const char = plaintext[i];
                if (alphabet.includes(char)) {
                    const charIndex = alphabet.indexOf(char);
                    const encryptIndex = (((a * charIndex) + b) % size_arr + size_arr) % size_arr;
                    ciphertext += alphabet[encryptIndex];
                }
                else {
                    ciphertext += char;
                }
            }
            return ciphertext;
        }
        else {
            alert("sorry , can not using Affine algorithm Please check gcd.");
        }
    }
}

function decryptAffine(ciphertext, k1, k2) {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '%', '#', '*', '@', '!', '&', '^', '+', '-', '/', '$', '.', '='];
    var size_arr = alphabet.length;
    var a = parseInt(k1);
    var b = parseInt(k2);
    var aInverse = modInverse(a, size_arr);
    var plaintext = "";
    if (isNumeric(a) == false || isNumeric(b) == false) {
        alert("sorry ,keys should be numbers.");
    } else {

        if (gcd(size_arr, a) === 1) {
            for (var i = 0; i < ciphertext.length; i++) {
                const char = ciphertext[i];
                if (alphabet.includes(char)) {
                    const charIndex = alphabet.indexOf(char);
                    const decryptIndex = ((aInverse * (charIndex - b)) % size_arr + size_arr) % size_arr;
                    plaintext += alphabet[decryptIndex];
                }
                else {
                    plaintext += char;
                }
            }
            return plaintext;
        }
        else {
            alert("sorry , can not using Affine algorithm Please check gcd.");
        }
    }
}

encrypt.addEventListener("click", (e) => {
    if (algorithms.value == "Affine") {
        e.preventDefault();
        const originalText = inputText.value;
        const key1 = document.getElementById("key1").value;

        const key2 = document.getElementById("key2").value;
        // console.log(originalText)
        // console.log(key1)
        // console.log(key2)
        const encrpt_text = encryptAffine(originalText, key1, key2);
        // console.log(encrpt_text)
        decryptInput.value = encrpt_text;

    }
});


decrept.addEventListener("click", (e) => {
    if (algorithms.value == "Affine") {
        e.preventDefault();
        const key1 = document.getElementById("key1").value;

        const key2 = document.getElementById("key2").value;
        // console.log(key1)
        const originalText = inputText.value;
        // console.log(originalText)
        const decrpt_text = decryptAffine(originalText, key1, key2);
        // console.log("Decrypted:", decrpt_text);

        decryptInput.value = decrpt_text;
    }
});
// _____________________________________ vigenere__________________________________________________?

function vigenereEncrypt(plaintext, keyword) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ %#*@!?|&^+-/$.=0123456789";
    const input = plaintext;
    const key = keyword;

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (alphabet.includes(char)) {
            const charIndex = alphabet.indexOf(char);
            const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length]);
            const encryptedCharIndex = (+charIndex + +keyCharIndex) % alphabet.length;

            result += alphabet[encryptedCharIndex];
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}
function vigenereDecrypt(ciphertext, keyword) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ %#*@!?|&^+-/$.=0123456789";
    const input = ciphertext;
    const key = keyword;

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (alphabet.includes(char)) {
            const charIndex = alphabet.indexOf(char);
            const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length]);
            const decryptedCharIndex = (charIndex - keyCharIndex + alphabet.length) % alphabet.length;

            result += alphabet[decryptedCharIndex];
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

encrypt.addEventListener("click", (e) => {
    if (algorithms.value == "Vigener") {
        e.preventDefault();
        const originalText = inputText.value;
        const key = keyInput.value;
        // console.log(originalText);
        // console.log(key);
        const encrypted_Message = vigenereEncrypt(originalText, key);
        // console.log("Encrypted:", encryptedMessage); 
        decryptInput.value = encrypted_Message;


    }
});

decrept.addEventListener("click", (e) => {
    if (algorithms.value == "Vigener") {
        e.preventDefault();
        const key = keyInput.value;
        const originalText = inputText.value;

        const decrypted_Text = vigenereDecrypt(originalText, key);

        decryptInput.value = decrypted_Text;

    }
});

// ______________________________autokey cipher________________________________________________

function autokeyEncrypt(plaintext, key) {
    plaintext = plaintext.toUpperCase();
    key = key.toUpperCase();
    let ciphertext = '';
    let fullKey = key + plaintext;

    for (let i = 0; i < plaintext.length; i++) {
        if (plaintext[i].match(/[A-Z]/)) {
            let shift = fullKey.charCodeAt(i) - 65;
            let newChar = String.fromCharCode(((plaintext.charCodeAt(i) - 65 + shift) % 26) + 65);
            ciphertext += newChar;
        } else {
            ciphertext += plaintext[i];
        }
    }
    if (isNumeric(key) == true) {
        alert("sorry ,keys should be letter.");
    }

    return ciphertext;
}

function autokeyDecrypt(ciphertext, key) {
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();
    let plaintext = '';
    let fullKey = key;

    for (let i = 0; i < ciphertext.length; i++) {
        if (ciphertext[i].match(/[A-Z]/)) {
            let shift = fullKey.charCodeAt(i) - 65;
            let newChar = String.fromCharCode(((ciphertext.charCodeAt(i) - 65 - shift + 26) % 26) + 65);
            plaintext += newChar;
            fullKey += newChar;
        } else {
            plaintext += ciphertext[i];
        }
    }
    if (isNumeric(key) == true) {
        alert("sorry ,keys should be letter.");
    }  

    return plaintext;
}

encrypt.addEventListener("click", (e) => {

    if (algorithms.value == "AutoKey") {
        e.preventDefault();
        const originalText = inputText.value;
        const key = keyInput.value;
        // console.log(originalText);
        // console.log(key);
        const encrypted_Message = autokeyEncrypt(originalText, key);
        // console.log("Encrypted:", encryptedMessage); 
        decryptInput.value = encrypted_Message.toLowerCase();


    }
});

decrept.addEventListener("click", (e) => {
    if (algorithms.value == "AutoKey") {
        e.preventDefault();
        const key = keyInput.value;
        const originalText = inputText.value;
        const decrypted_Text = autokeyDecrypt(originalText, key);
        decryptInput.value = decrypted_Text.toLowerCase();

    }
});

// ______________________________load text _______________________________________________________________________
function loadText(event){
    event.preventDefault();
    let file= event.target.files[0];

    let reader=new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load" , function(event){
        const text=event.target.result;
        // console.log(text)
        var textFile=document.querySelector(".textarea")
        textFile.value= text ;
    })
}
// _______________________________handel encrept file .__________________________________________

let btnEncreptText= document.querySelector(".btnEncreptText");
let btnEncryptFile= document.querySelector(".btnEncryptFile");
let encreptText=document.querySelector("#encreptText");
let encreptFile=document.querySelector("#encreptFile");

const btn1 = document.querySelector("#btn");
btnEncryptFile.addEventListener("click", () => {
    btnEncryptFile.classList.add("active");
    btnEncreptText.classList.remove("active");

    encreptText.style.display="none";
    encreptFile.style.display="block";

    btn1.style.display="none";

});

btnEncreptText.addEventListener("click", () => {
    btnEncryptFile.classList.remove("active");
    btnEncreptText.classList.add("active");

    
    encreptText.style.display="block";
    encreptFile.style.display="none";

    btn1.style.display="block";
})


let encryptfileButton=document.querySelector(".encryptfile")
let encryptTexearea=document.querySelector(".textareaEn")
var textFile=document.querySelector(".textarea")
let keyF =document.querySelector("#keyF")
encryptfileButton.addEventListener("click", (e) => {
    e.preventDefault();
    const originalText = textFile.value;
    const key = keyF.value;
    if (algorithms.value == "caesarCipher") {
        const encryptedFile= caesarCipherEncrypt(originalText, key);
        encryptTexearea.value = encryptedFile;
    }

    if (algorithms.value == "Vigener") {
        const encryptedFile= vigenereEncrypt(originalText, key);
        encryptTexearea.value = encryptedFile;
    }

    if (algorithms.value == "AutoKey") {
        const encryptedFile= vigenereEncrypt(originalText, key);
        encryptTexearea.value = encryptedFile;

    }
});