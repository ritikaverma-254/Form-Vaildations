const PORT = 7130;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&])[A-Za-z\d@.#$!%?&]{6,15}$/;
const firstNameRegex = /^[a-zA-Z\xC0-\uFFFF]+([ \-'][a-zA-Z\xC0-\uFFFF]+)*$/;
let name = document.getElementById("name");
let email = document.getElementById("email");
let confirmPassword = document.getElementById("confirmPassword");
let password = document.getElementById("password");
let backendMsg = document.getElementById("backendMsg");
let btn = document.getElementById("btn");
let hideConfirmPassIcon = document.getElementById("hideConfirmPass");
let showConfirmPassIcon = document.getElementById("showConfirmPass");
let showPassIcon = document.getElementById("showPass");
let hidePassIcon = document.getElementById("hidePass");

hideConfirmPassIcon.addEventListener("click", (e)=>hidePass(e,confirmPassword,showConfirmPassIcon));
showConfirmPassIcon.addEventListener("click", (e)=>showPass(e,confirmPassword,hideConfirmPassIcon));
hidePassIcon.addEventListener("click", (e)=>hidePass(e,password,showPassIcon));
showPassIcon.addEventListener("click", (e)=>showPass(e,password,hidePassIcon));

btn.addEventListener("click", (e) => {
  e.preventDefault();
  submit(e);
});

window.addEventListener("pageshow", function (event) {
  // If the page was loaded from the cache (like back button)
  if (event.persisted) {
    document.querySelector("form").reset();
  } else {
    document.querySelector("form").reset();
  }
});

function hidePass(e,field,icon) {
  field.type = "text";
  e.target.classList.add("hide");
 icon.classList.remove('hide');
}
function showPass(e,field,icon){
    field.type = "password";
  e.target.classList.add("hide");
  icon.classList.remove("hide");
}

function createFormDataObj(){
  const formData = {
    name : name.value || null,
    email : email.value || null,
    password : password.value || null
  }
  return formData;
}

function handleVaidation(key) {
  let res;
  switch (key) {
    case "name":
      res = validateName(key);
      break;
    case "email":
      res = validateEmail(key);
      break;
    case "password":
      res = validatePassword(key);
      break;
    case "confirmPassword":
      res = validateConfirmPass(key);
      break;
  }
  return res;
}

function validateName(key) {
  let errMsg = document.getElementById(`${key}Err`);
const nameVal = name.value;
  if (!isEmpty(key,nameVal, errMsg)) return false;
   else if (nameVal.length < 2 || nameVal.length > 30) {
    errMsg.textContent = `*${key} must be between 2 and 30 characters`;
    return false;
  } else if (!firstNameRegex.test(nameVal)) {
    errMsg.textContent = `*${key} name can only contain letters, hyphens, or apostrophes.`;
    return false;
  } else {
    errMsg.textContent = "";
    return true;
  }
}

function validateEmail(key) {
  let errMsg = document.getElementById(`${key}Err`);
  const emailVal = email.value;
  if (!isEmpty(key, emailVal, errMsg)) return false;
   else if (!emailRegex.test(emailVal)) {
    errMsg.textContent =
      "*Please enter a valid email address (e.g. user@example.com).";
    return false;
  } else {
    errMsg.textContent = "";
    return true;
  }
}

function validatePassword(key) {
  let errMsg = document.getElementById(`${key}Err`);
  const passVal = password.value;
  if (!isEmpty(key, passVal, errMsg)) return false; 
  else if (!passwordRegex.test(passVal)) {
    errMsg.textContent =
      "*Password must be 6-15 characters, include uppercase, lowercase,number";
    return false;
  } else {
    errMsg.textContent = "";
    return true;
  }
}

function validateConfirmPass(key) {
const passVal = password.value;
const confirmPassVal = confirmPassword.value
  let errMsg = document.getElementById(`${key}Err`);
  if (!isEmpty(key, confirmPassVal, errMsg)) return false;
  else if(passVal !== confirmPassVal){
errMsg.textContent = `*Confirm password must match the password!`;
return false;
  }
  else {
    errMsg.textContent = "";
    return true;
  }
}

function isEmpty(key, val, errMsg) {
  if (!val) {
    console.log("cp is empty");
    errMsg.textContent = `*${key} is required!`;
    return false;
  }
  return true;
}


function submit(e) {
  e.preventDefault();
  const keysName = ["name", "email", "password", "confirmPassword"];
  let isValid = true;
  let result;
  keysName.forEach((key) => {
   result = handleVaidation(key);
    if(!result) {
      isValid = false;
  }
})
  if (!isValid) return;
  fetchReq();
}

async function fetchReq() {
  btn.disabled = true;
  const usrData = createFormDataObj();
  try {
    const response = await fetch(`http://localhost:${PORT}/auth/registerUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usrData),
    });
    if (!response.ok) {
      throw new Error("Response not OK");
    }
    const msg = await response.json();
    if (msg.success) {
      console.log("in success");
      backendMsg.textContent = msg.message;
      backendMsg.classList.remove("red");
      backendMsg.classList.add("green");
        window.location.href = "./login.html";
    } else {  
      backendMsg.textContent = msg.message;
      backendMsg.classList.remove("green");
      backendMsg.classList.add("red");
    }
   btn.disabled = false;
  } catch (error) {
    console.error("Fetch failed:", error);
    backendMsg.textContent = "Something went wrong";
    btn.disabled = false;
  }
}

