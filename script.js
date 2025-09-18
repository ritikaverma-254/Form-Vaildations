// import required from "./helper.js";



const EmailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const firstNameRegex = /^[a-zA-Z\xC0-\uFFFF]+([ \-'][a-zA-Z\xC0-\uFFFF]+)*$/;
let firstName = document.getElementById("firstName");
let firstNameErr = document.getElementById("firstNameErr");
let lastName = document.getElementById("lastName");
let lastNameErr = document.getElementById("lastNameErr");
let email = document.getElementById("email");
let emailErr = document.getElementById("emailErr");
let contact = document.getElementById("contact");
let contactErr = document.getElementById("contactErr");
let dob = document.getElementById("dob");
let dobErr = document.getElementById("dobErr");
let stdId = document.getElementById("stdId");
let stdIdErr = document.getElementById("stdIdErr");
let male = document.getElementById("male");
let female = document.getElementById("female");
let other = document.getElementById("other");
let genderErr = document.getElementById("genderErr");
let countryErr = document.getElementById("countryErr");
let streetAd  = document.getElementById("streetAd");
// let streetAdErr = document.getElementById("streetAdErr");
let country = document.getElementById("country");
let state = document.getElementById("state");
let city = document.getElementById("city");
let addressErr = document.getElementById("addressErr");
let profile = document.getElementById("profile");
let preview = document.getElementById("preview");
let previewErr = document.getElementById("previewErr");
let btn = document.getElementById("submit");
let terms = document.getElementById("terms");


document.addEventListener("DOMContentLoaded", fetchData);

country.addEventListener("change", (e) => fetchStates(e));
state.addEventListener("change", (e) => fetchCities(e));

let countries = [];
let states = [];
let cities = [];

async function fetchData() {
  const res = await fetch("./countries.json"); // The './' indicates the current directory
  countries = await res.json();
  console.log(countries);
  loadCountries();
}
async function fetchStates(e) {
  console.log(e.target.value);
  const countryId = e.target.value;

  const res = await fetch("./states.json"); // The './' indicates the current directory
  states = await res.json();
  console.log(states);
  const statesD = states.filter((el) => {
    if (el.countryId == countryId) {
      return el;
    }
  });
  console.log(statesD);
  loadStates(statesD);
}

async function fetchCities(e) {
  console.log(e.target.value);
  const stateId = e.target.value;
  const res = await fetch("./cities.json");
  cities = await res.json();
  console.log(cities);
  const citiesData = cities.filter((el) => {
    if (el.stateId == stateId) {
      return el;
    }
  });
  console.log(citiesData);
    loadCities(citiesData);
  
}

function loadCountries() {
  console.log("in");

  // country.innerHTML = '';
 
  countries.forEach((el) => {
    console.log(el);
    country.innerHTML += `
        <option value="${el.id}">${el.name}</option>
        `;
  });
}
function loadStates(states) {
  
 if(!states.length){
    state.innerHTML = '';
    state.innerHTML = `<option value="">No States available</option>`;
 }else{
  states.forEach((el) => {
    state.innerHTML += `<option value="${el.id}">${el.name}</option>`;
  });
}
}

function loadCities(cities) {
    
  if(!cities.length){
    city.innerHTML = '';
    city.innerHTML += `<option value="">No cities available</option>`
  }else{
  cities.forEach((el) => {
    city.innerHTML += `<option value="${el.id}">${el.name}</option>`;
  });
}
}

firstName.addEventListener("input", () => validatefirstName()); /**** */
firstName.addEventListener("change", () => validatefirstName());
function validatefirstName() {
  let firstNameVal = firstName.value.trim().replace(/ /g,'');
// required(firstName,firstNameErr);
  if (firstNameVal == "") {
    firstNameErr.textContent = "*First name is required";
  }else if(firstNameVal.length < 2 || firstNameVal.length > 30) {
    firstNameErr.textContent =
      "*First name must be between 2 and 30 characters";
  } else if (!firstNameRegex.test(firstNameVal)) {
    firstNameErr.textContent =
      "*First name can only contain letters, hyphens, or apostrophes.";
  } else {
    firstNameErr.textContent = "";
  }
}

lastName.addEventListener("input", () => validateLastName());
lastName.addEventListener("change", () => validateLastName()); /*****/
function validateLastName(){
   let lastNameVal = lastName.value.trim().replace(/ /g,'');
  if (lastNameVal == "") {
    lastNameErr.textContent = "*Last name is required";
  } else if (lastNameVal.length < 2 || lastNameVal.length > 30) {
    lastNameErr.textContent = "*Last name must be between 2 and 30 characters";
  } else if (!firstNameRegex.test(lastNameVal)) {
    lastNameErr.textContent =
      "*Last name can only contain letters, hyphens, or apostrophes.";
  } else {
    lastNameErr.textContent = "";
  }
}

email.addEventListener("input", () => validateEmail()); /**** */

function validateEmail() {
  let emailVal =  email.value.trim().replace(/ /g,'');
  if (emailVal == "") {
    emailErr.textContent = "*Email name is required";
  } else if (!EmailRegex.test(emailVal)) {
    emailErr.textContent =
      "*Please enter a valid email address (e.g. user@example.com).";
  } else {
    emailErr.textContent = "";
  }
}

contact.addEventListener("change", () => validatePhoneNum()); /**** */
contact.addEventListener("input", () => validatePhoneNum()); /**** */
function validatePhoneNum() {
  let contactVal = contact.value.trim().replace(/ /g,'');
  if (contactVal == "") {
    contactErr.textContent = "*Phone number is required";
  } else if (!/^\d{10}$/.test(contactVal)) {
    contactErr.textContent = "Please enter a 10-digit number only";
  } else {
    contactErr.textContent = "";
  }
}

dob.addEventListener("input", () => validateDob()); /**** */
dob.addEventListener("change", () => validateDob()); /**** */
function validateDob() {
  if (dob.value == "") {
    dobErr.textContent = "*DateOfBirth is required";
  } else {
    dobErr.textContent = "";
  }
}


[male, female, other].forEach((el) => {
  el.addEventListener("change", () => validateGender());
  el.addEventListener("input", () => validateGender());
});
function validateGender() {
  if (!male.checked && !female.checked && !other.checked) {
    genderErr.textContent = "*Gender is required";
  } else {
    genderErr.textContent = "";
  }
}



function validateAddress() {
  if (!country.value) {
    addressErr.textContent =
      "*Country is required";
  } else {
    addressErr.textContent = "";
  }
}

streetAd.addEventListener('input',validateStreet());
function validateStreet(){
  let streetAdVal = streetAd.value.trim().replace(/ /g,'');

}

    
country.addEventListener('change',()=>validateAddress());

function validateTerms() {
  btn.disabled = !terms.checked;
}
validateTerms();

terms.addEventListener("change", validateTerms);

profile.addEventListener("change", function (event) {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    if (validateFile(file)) {
      preview.hidden = false;
      const url = URL.createObjectURL(file);
      preview.innerHTML = `<img src="${url}" alt="previewFile" style="height:140px; width:150px; padding-top:3px">
        <img src="cross.svg" alt="cancel" onclick="cancelImg()" style="position:relative;bottom:57px; left:10px; background-color:red;opacity:0.8">`;
    }
  }
});
function cancelImg() {
  preview.innerHTML = "";
  preview.hidden = true;
  profile.value = '';
}

function validateFile(file) {
  if (!file) {
    return false;
  }
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 5 * 1024 * 1024;
  if (!validTypes.includes(file.type)) {
    previewErr.textContent = "*Please enter valid file type(jpeg/png/jpg)";
    return false;
  } else if (file.size > maxSize) {
    previewErr.textContent = "*Your file is larger than the max size(5mb)";
    return false;
  } else {
    previewErr.textContent = "";
    return true;
  }
}

btn.addEventListener("click", (e) => validate(e));
function validate(e) {
  e.preventDefault();
  validatefirstName();
  validateLastName();
  validateEmail();
  validatePhoneNum();
  validateDob();
  validateGender();
  validateAddress();
}


