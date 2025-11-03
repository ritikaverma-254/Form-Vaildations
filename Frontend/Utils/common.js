let isVisible = false;
function hideShowPass(e,icon){
e.target.classList.add('hide'); //hide eye vis eye
!isVisible? password.type = "text": password.type = "password"; //type:text  pass
icon.classList.remove('hide');//vis eye
if(password.type=="text") isVisible = true;
else isVisible = false;
}