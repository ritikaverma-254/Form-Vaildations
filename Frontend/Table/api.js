async function fun() {
  const response = await fetch("http://localhost:7130/user/getStudentData"); //wait for response
  let data = await response.json();
  return data;
}

