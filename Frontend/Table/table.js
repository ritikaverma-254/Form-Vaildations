
let tbody = document.getElementById("body");
let data; 
async function getData() {
  data = await fun();
console.log(data)

  renderTable();
}
async function renderTable() {
  const {countries, states, cities, studentData} =  data;
  tbody.innerHTML = "";
  let s = 0;
  studentData.map((obj) => {
  const profile = obj.profilePath? `http://localhost:7130/${obj.profilePath}` : "../Assets/defaultProfile.png" ;
   const city = cities.find(i=> obj.city==i.id)?.name || "-" ;
   const state =  states.find(i=> obj.state==i.id)?.name || "-" 
   const country = countries.find(i=> obj.country==i.id)?.name || "-" ;
    tbody.innerHTML += `
          <tr>
            <td>${++s}</td>
            <td><img src="${profile}" alt="" class="profile"></td>
            <td>${obj.firstName} ${obj.lastName}</td>
            <td>${obj.email}</td>
            <td>${obj.dateOfBirth}</td>
            <td>${obj.gender}</td>
            <td>${obj.address} ,${city}, ${state}, ${country}</td>
            <td>
                <button onclick="editBtn(${obj.id})" style="border:none; background:none;cursor:pointer">
                <img src="../Assets/edit.svg" alt="edit" "></button>
                <button onclick="delBtn(${obj.id})" style="background:none;border:none;padding:0;cursor:pointer;">
                    <img src="../Assets/delete.svg" alt="Delete" ">
                </button>
            </td>
       </tr>
        `;
          
  });
}
getData();


function addOrUpdate() {
  const userId = Number(document.getElementById("UserId").value);
  console.log("hello", userId);
  const idd = Number(document.getElementById("editId").value);
  console.log("id", idd);
  const title = document.getElementById("title").value;
  const completed = document.getElementById("completed").value;

  if (idd) {
    //edit existing row
    console.log(idd); //giving undefined ?
    const idx = data.findIndex((i) => i.id == idd); //giving -1?
    console.log(idx);
    data[idx] = { userId: userId, id: idd, title: title, completed: completed }; //array element values changed
    renderTable(data); //call again to render updated data\
    clear();
  } else {
    const newId = data.length ? Math.max(...data.map((i) => i.id)) + 1 : 1;
    console.log(newId);
    // data[newId] = {id:newId, name:name, email:email, address:address};
    data.push({
      userId: userId,
      id: newId,
      title: title,
      completed: completed,
    });
    renderTable();
    clear();
  }
}

function editBtn(id) {
  console.log(id);
  // const element = data.find((i) => i.id == id);
  // document.getElementById("UserId").value = element.userId;
  // document.getElementById("editId").value = element.id;
  // document.getElementById("title").value = element.title;
  // document.getElementById("completed").value = element.completed;
window.location.href = `../Form/index.html?id=${id}`;
  //navigate to form page
  //id bhejni hai user ki , response from bakend

}

function delBtn(id) {
  data = data.filter((i) => {
    if (i.id != id) {
      console.log(i);
      return i;
    }
  });
  renderTable();
}

function clear() {
  document.getElementById("UserId").value = "";
  document.getElementById("editId").value = "";
  document.getElementById("title").value = "";
  document.getElementById("completed").value = "";
}
