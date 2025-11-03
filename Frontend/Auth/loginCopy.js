const PORT = 7130;
const email = document.getElementById("email");
const password = document.getElementById("password");
let passErr = document.getElementById("passErr");
const EmailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PasswordRegex =
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


hidePass.addEventListener('click',function(){
password.type = 'text';
hidePass.classList.add('hide');
showpass.classList.remove('hide');
})
showpass.addEventListener('click',function(){
  password.type = 'password';
showpass.classList.add('hide');
hidePass.classList.remove('hide');
})



function submit(e) {
  // e.preventDefault();
  const keysName = ["email", "password"];
   let allValid = true;
  let val;
  let usrData = {};

  keysName.forEach((key) => {
    val = document.getElementById(`${key}`).value;
    allValid = validate(key, val);
    usrData[key] = val;

  });
      if (!allValid) {
      allValid = false;
    } else {

      fetchReq(usrData);
    }
}

async function fetchReq(usrData) {
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
   
    // backendMsg.classList.add('red');

    if(msg.success){
      console.log("in success");
      backendMsg.textContent = msg.message;
      backendMsg.classList.remove('red');
    backendMsg.classList.add('green');

         window.location.href = "../Form/index.html";
    
    }else{
       backendMsg.textContent = msg.message;
         backendMsg.classList.remove('green');
             backendMsg.classList.add('red');
  
    }
  }
  catch(error){
    console.error("Fetch failed:", error);
    backendMsg.textContent = "Something went wrong";
  }
}

function validate(key, val) {
  let result;
  switch (key) {
    case "email":
      result = validateEmail(key, val);  //true
      break;
    case "password":
      result = validatePassword(key, val);
      break;
  }
  return result;
}

function validateEmail(key, val) {
  let err_msg = document.getElementById(`${key}Err`);
  if (!isEmpty(key, val, err_msg)) {
    return false;
  } else if (!EmailRegex.test(val)) {
    err_msg.textContent =
      "*Please enter a valid email address (e.g. user@example.com).";
    return false;
  } else {
    err_msg.textContent = "";
    return true;
  }
}
function validatePassword(key, val) {
  let err_msg = document.getElementById(`${key}Err`);
  if (!isEmpty(key, val, err_msg)) {
    return false;
  } else if (!PasswordRegex.test(val)) {
    err_msg.textContent =
      "*Password must be 6-15 characters, include uppercase, lowercase,number";
    return false;
  } else {
    err_msg.textContent = "";
    return true;
  }
}

function isEmpty(key, value, err_msg) {
  if (value == "") {
    err_msg.textContent = `*${key} is required!`;
    return false;
  }
  return true;
}

let showIcon = document.getElementById("show");

let hideIcon = document.getElementById("hide");

// showIcon.addEventListener("click", function () {
//   password.type = "text";
// });
