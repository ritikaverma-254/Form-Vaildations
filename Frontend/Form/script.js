// import required from "./helper.js";
const PORT = 7130;
const EmailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const firstNameRegex = /^[a-zA-Z\xC0-\uFFFF]+([ \-'][a-zA-Z\xC0-\uFFFF]+)*$/;
const keysName = [
  "firstName",
  "lastName",
  "email",
  "contact",
  "dob",
  "gender",
  "country",
];


let firstName = document.getElementById("firstName");
console.log(firstName.value);
let firstNameErr = document.getElementById("firstNameErr");
let lastName = document.getElementById("lastName");
let lastNameErr = document.getElementById("lastNameErr");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let dob = document.getElementById("dob");
let dobErr = document.getElementById("dobErr");
let selectedGender;
const radios = document.querySelectorAll('input[name="gender"]');
console.log(radios)
let genderErr = document.getElementById("genderErr");
let countryErr = document.getElementById("countryErr");
let streetAd = document.getElementById("streetAd");
// let streetAdErr = document.getElementById("streetAdErr");
let country = document.getElementById("country");
console.log(country)
let state = document.getElementById("state");
let city = document.getElementById("city");
let addressErr = document.getElementById("addressErr");
let profile = document.getElementById("profile");
let preview = document.getElementById("preview");
let previewErr = document.getElementById("previewErr");
let btn = document.getElementById("submit");
let terms = document.getElementById("terms");
let selectedFile;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)
document.addEventListener("DOMContentLoaded",()=> {
  id? getData(id) : fetchAddress('countries');
});
country.addEventListener("change", (e) => fetchAddress('states',country.value));
state.addEventListener("change", (e) => fetchAddress('cities',country.value,state.value));
btn.addEventListener("click", (e) => {
id? handleEditFormSub(): submit(e);
});
window.addEventListener("pageshow", function (event) {
  // If the page was loaded from the cache (like back button)
  if (event.persisted) {
    document.querySelector("form").reset();
  } else {
    document.querySelector("form").reset();
  }
});
terms.addEventListener("change", validateTerms);
validateTerms();

let countries = [];
let states = [];
let cities = [];

async function fetchAddress(type , countryId, stateId,cityId) {
  console.log("fetchAddressIn---");
  let queryString ;
  const params = {};
     params.type  = type;
    params.countryId = countryId;
    params.stateId = stateId
     console.log(params)
     let data;
     let res;
  switch(type){
    case "countries":
      console.log("in countries",params)
       queryString = new URLSearchParams(params).toString();
   res = await fetch(`http://localhost:7130/user/getLocationData?${queryString}`); // The './' indicates the current directory
 data = await res.json();
  console.log("countries===", data)
  renderAddress(data.countries, country,countryId);
    break;  

  case "states":
   console.log("in states",params)
   queryString = new URLSearchParams(params).toString();
     res = await fetch(`http://localhost:7130/user/getLocationData?${queryString}`); // The './' indicates the current directory
  data = await res.json();
  console.log(stateId)
  renderAddress(data.states, state,stateId);
    break;

  case "cities":
      console.log("in cities",params)
        queryString = new URLSearchParams(params).toString();
     res = await fetch(`http://localhost:7130/user/getLocationData?${queryString}`); // The './' indicates the current directory
  data = await res.json();
  console.log(cityId)
  renderAddress(data.cities, city,cityId);
    break;
  }
}


function renderAddress(data, val,key) {
console.log("key======",key)
  console.log("in renderdata"); 
  console.log('data===',data)
  val.innerHTML = "";
  if (!data.length) {
    val.innerHTML = "";
    val.innerHTML += `<option value="">Not available</option>`;
  }
  else {
    val.innerHTML += `<option value="">--Select--</option>`;
    data.forEach((el) => {
     if(key && key==el.id){
                val.innerHTML += `<option value="${el.id}" selected>${el.name}</option>`;

      }else  val.innerHTML += `<option value="${el.id}">${el.name}</option>`;      
    });
  }
}

function validateForm(key) {
  console.log("validateform", key);

  let result;
  switch (key) {
    case "firstName":
      result = validateName(key);
      console.log(key, result);
      break;
    case "lastName":
      result = validateName(key);
      console.log(key, result);
      break;
    case "email":
      result = validateEmail(key);
      console.log(key, result);
      break;
    case "contact":
      result = validatePhoneNum(key);
      console.log(key, result);
      break;
    case "dob":
      result = validateDob(key);
      console.log(key, result);
      break;
    case "gender":
      result = validateGender(key);
      console.log(key, result);
      break;
    case "country":
      result = validateAddress(key);
      console.log(key, result);
      break;
  }
  return result;
}

function validateName(key) {
  let fieldVal = document.getElementById(key).value;
  let errMsg = document.getElementById(`${key}Err`);

  if (!isEmpty(key, fieldVal, errMsg)) {
    console.log("firstIn");
    return false;
  } else if (fieldVal.length < 2 || fieldVal.length > 30) {
    console.log("===", "firstIn");
    errMsg.textContent = `*${key} name must be between 2 and 30 characters`;
    return false;
  } else if (!firstNameRegex.test(fieldVal)) {
    errMsg.textContent = `*${key} name can only contain letters, hyphens, or apostrophes.`;
    return false;
  } else {
    errMsg.textContent = "";
    return true;
  }
}

function isEmpty(key, fieldVal, errMsg) {
  if (!fieldVal) {
    console.log('innnnn',key,fieldVal,errMsg)
    errMsg.textContent = `*${key} is required.`;
    return false;
  }
  return true;
}

function validateEmail(key) {
    let fieldVal = document.getElementById(key).value;
  let errMsg = document.getElementById(`${key}Err`);
  if (!isEmpty(key, fieldVal, errMsg)) {
    return false;
  } else if (!EmailRegex.test(fieldVal)) {
    errMsg.textContent =
      "*Please enter a valid email address (e.g. user@example.com).";
    return false;
  } else {
    errMsg.textContent = "";
    return true;
  }
}

function validatePhoneNum(key) {
     let fieldVal = document.getElementById(key).value;
  let errMsg = document.getElementById(`${key}Err`);
  if (!isEmpty(key, fieldVal, errMsg)) {
    return false;
  } else if (!/^\d{10}$/.test(fieldVal)) {
    errMsg.textContent = "Please enter a 10-digit number only";
    return false;
  } else {
    errMsg.textContent = "";
    return true;
  }
}

function validateDob(key) {
let fieldVal = document.getElementById(key).value;
  let errMsg = document.getElementById(`${key}Err`); 
  if (!isEmpty(key, fieldVal, errMsg)) {
    return false;
  } else {
    errMsg.textContent = "";
    return true;
  }
}

function validateGender(key) {
   let errMsg = document.getElementById(`${key}Err`); 
  let el = document.querySelector('input[name="gender"]:checked');
  if(el) el = el.id;
  if (!isEmpty(key, el, errMsg)) {
    return false;
  } else {
    errMsg.textContent = "";
    selectedGender = el;
    console.log(selectedGender)
    return true;
  }
}

function validateAddress(key) {
  let fieldVal = document.getElementById(key).value;
  console.log(fieldVal);
  if (!isEmpty(key, fieldVal, addressErr)){
    return false;
  } else {
    addressErr.textContent = "";
    return true;
  }
}

function validateTerms() {
  btn.disabled = !terms.checked;
}

profile.addEventListener("change",()=>showPreview() );

function showPreview() {
  const file = profile.files[0];
  if (file) {
    if (validateFile(file)) {
      preview.hidden = false;
      selectedFile = file;
      console.log(selectedFile)
    const url = URL.createObjectURL(file);
     showPreviewImg(url);
    }
  }
return file;
}
function showPreviewImg(url){
   preview.innerHTML = `<img src="${url}" alt="previewFile" style="height:140px; width:150px; padding-top:3px">
        <img src="../Assets/cross.svg" alt="cancel" onclick="cancelImg()" style="position:relative;bottom:57px; left:10px; background-color:red;opacity:0.8">`;
}
function cancelImg() {
  preview.innerHTML = "";
  preview.hidden = true;
  profile.value = "";
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

function createFormObj(){
  const usrData = {
    firstName : firstName.value ||null,
    lastName : lastName.value||null,
    email : email.value||null,
    contact : contact.value||null,
    dateOfBirth : dob.value||null,
    gender : selectedGender||null,
    address : streetAd.value||null,
    country : country.value||null,
    state : state.value||null,
    city : city.value||null,
  }
  return usrData;
}

function formData(){
const formDataObj = createFormObj();
console.log("formDataObj==",formDataObj);
const formData = new FormData();

if(selectedFile){
  console.log("file",selectedFile);
  const safeName = selectedFile.name.replace(/\s+/g, '_');
  formData.append('profile',selectedFile,`${Date.now()}_${safeName}`);  
}
formData.append('formData',JSON.stringify(formDataObj));

return formData;
}

async function fetchReq(formData){
  try {
    const response = await fetch(`http://localhost:7130/user/submitFormData`, {
      method: "POST",
      body: formData
    });
    if(!response.ok){
      console.log('Response is not OK');
    }
    const res = await response.json();
    console.log(res,res.status);
    if(res.success){
         window.location.href = "../Table/table.html";

  }
}
  catch(error){
     console.error("Fetch failed:", error);
  }
}


function submit(e) {
  e.preventDefault();
  let allValid = true;
let result;
  keysName.forEach((key) => {
    result =  validateForm(key);
    if(!result){
      allValid = false;
    }
  });
  if (allValid) {
    const usrData = formData();
    fetchReq(usrData);
  }else{
    console.log("data is not valid");
  }

}




//editForm 
let studentData = [];
function appendData(data){
  firstName.value = data?.firstName || "";
  lastName.value = data?.lastName || "";
  email.value = data?.email || "";
  contact.value = data?.contact || "";
  dob.value = data?.dateOfBirth || "";
  streetAd.value = data?.address || "";
  
  radios.forEach(radio=>{
   if(radio.id==data?.gender){
    radio.checked = true;
   }
  })

  preview.hidden = false;
  const url = `http://localhost:7130/${data?.profilePath}`;
showPreviewImg(url);
}

async function getData(id){
  console.log("getDataIn--")
  const response = await fetch(`http://localhost:7130/user/getDataById?id=${id}`)
  const data = await response.json();
  console.log(data.studentData)
  studentData = data.studentData;
  const countryId = data.studentData.country;
  const stateId = data.studentData.state;
  const cityId = data.studentData.city;
fetchAddress('countries',countryId);
fetchAddress('states',countryId,stateId);
fetchAddress('cities',countryId,stateId,cityId);
// fetchAddress('states',);
  appendData(studentData);

}

async function handleEditFormSub(){
   let allValid = true;
   let result;
  keysName.forEach((key) => {
    result =  validateForm(key);
    if(!result){
      allValid = false;
    }
    if(!allValid) return;
const currentData = createFormObj();
const updatedData = new FormData();
Object.entries(currentData).forEach(([key, value]) => {
      if (value !== studentData[key]) updatedData.append(key, value);
    });
  });
  if(selectedFile){
  console.log("file",selectedFile);
  const safeName = selectedFile.name.replace(/\s+/g, '_');
  updatedData.append('profile',selectedFile,`${Date.now()}_${safeName}`);  
}

const response = await fetch(`http://localhost:7130/user/editFormData?id=${id}`,{
method: 'POST',
  body:updatedData
})

try{
  const data = await response.json();
  if(!response.ok){
 throw new Error(`HTTP error! status: ${response.status}`); 
}
console.log("****",data);
}
catch(error){
  console.log("Error:",error)
}
}

