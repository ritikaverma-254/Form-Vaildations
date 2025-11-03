const PORT = 7130;
const email = document.getElementById("email");
const password = document.getElementById("password");
let passErr = document.getElementById("passErr");
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&])[A-Za-z\d@.#$!%?&]{6,15}$/;
let btn = document.getElementById('btn');
let showpass = document.getElementById('showPass');
let hidePass =  document.getElementById('hidePass');

btn.addEventListener("click", (e) => {
  e.preventDefault();
  submit();
});
window.addEventListener("pageshow", function (event) {
  // If the page was loaded from the cache (like back button)
  if (event.persisted) {
    document.querySelector("form").reset();
  } else {
    document.querySelector("form").reset();
  }
});


hidePass.addEventListener("click", (e)=>hideShowPass(e,showPass));
showPass.addEventListener("click", (e)=>hideShowPass(e,hidePass));

function handleValidation(key) {
  let result;
  switch (key) {
    case "email":
      result = validateEmail(key); 
      break;
    case "password":
      result = validatePassword(key);
      break;
  }
  return result;
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

function isEmpty(key, fieldval, errMsg) {
  if (!fieldval) {
    errMsg.textContent = `*${key} is required!`;
    return false;
  }
  return true;
}

function createFormDataObj(){
  const formData = {
    name : name.value || null,
    email : email.value || null,
    password : password.value || null
  }
  return formData;
}

function submit(e) {
  const keysName = ["email", "password"];
   let isValid = true;
   let result;
  keysName.forEach((key) => {
    result = handleValidation(key);
    if(!result){
      isValid = false;
    }
  });
     if(!isValid) return;
     fetchReq();
}

async function fetchReq() {
  btn.disabled = true;
    const usrData = createFormDataObj();
  try {
    console.log('LOGIN===1')
    const response = await fetch(`http://localhost:${PORT}/auth//loginUser`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(usrData)
    });

    if(!response.ok){
      throw new Error("Response not OK");
    }
    const msg = await response.json();
    if(msg.success){
      backendMsg.textContent = msg.message;
      backendMsg.classList.remove('red');
    backendMsg.classList.add('green');
         window.location.href = "../Form/index.html";
    
    }else{
       backendMsg.textContent = msg.message;
         backendMsg.classList.remove('green');
             backendMsg.classList.add('red');
  
    }
       btn.disabled = false;
  }
  catch(error){
    console.error("Fetch failed:", error);
    backendMsg.textContent = "Something went wrong";
    btn.disabled = false;
  }
}