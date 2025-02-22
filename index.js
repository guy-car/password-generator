let characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let originalCharacters = [...characters]

const genBtn = document.getElementById("gen-btn")
let pwdElOne = document.getElementById("pwd-el-one")
let pwdElTwo = document.getElementById("pwd-el-two")
const pwdLength = document.querySelector(".settings")
const checkboxes = document.querySelectorAll(".switch input")
const includeNumbers = document.querySelector("#include-numbers")
const includeSymbols = document.querySelector("#include-symbols")

// Listens for tweaks made by the user to how the password is generated
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
    console.log(checkbox.id + " " + checkbox.checked)
    tweak()
    })
});

// Tweaks the characters array to user preference
function tweak() {
    // Always reset to the full original set first, and only filter if necessary
    characters = [...originalCharacters];

    if (!includeNumbers.checked) {
        characters = characters.filter(char => !/[0-9]/.test(char));
    }
    if (!includeSymbols.checked) {
        characters = characters.filter(char => !/[~`!@#$%^&*()_\-+=\[\]{}|:;<>?,./]/.test(char));
    }

    // After tweaking, regenerate the password
    generateRandomPassword();
}


// Sets the password length and listens to changes by user
let num = Number(pwdLength.min)
pwdLength.value = num
pwdLength.addEventListener("input", () =>{
    num = Number(pwdLength.value)
    num = Math.max(8, Math.min(15, parseInt(pwdLength.value, 10)));
} )

// Generates a random password by drawing from characters list and stores value
function generateRandomPassword() {
    let randomPassword = ""
    for (let i = 0; i < num; i++) {
        randomPassword += characters[Math.floor(Math.random() * characters.length)]
    }
    return randomPassword
}

// Runs the above function twice upon clicking and displays them on screen
genBtn.addEventListener("click", function() {
    pwdElOne.textContent = generateRandomPassword()
    pwdElTwo.textContent = generateRandomPassword()
})

// Allows user to copy generated password to clipboard
pwdElOne.addEventListener("click", () => {
    navigator.clipboard.writeText(pwdElOne.textContent)
    pwdElOne.textContent = "Copied!"
})
pwdElTwo.addEventListener("click", () => {
    navigator.clipboard.writeText(pwdElTwo.textContent)
    pwdElTwo.textContent = "Copied!"
})