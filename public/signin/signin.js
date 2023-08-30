const login=document.querySelector('#login_btn');
const forgot_password=document.querySelector('#forgot_password');
const form=document.querySelector('#form2');
const form_reset=document.querySelector('#form3');
const baseurl="http://localhost:3000/"



login.addEventListener('click',signin)
forgot_password.addEventListener('click',show_form)

 function show_form(e){
   e.preventDefault();
   const reset_form=document.querySelector('#reset_form');
   const login_form=document.querySelector('#login_form');

  
   login_form.style.display = "none";
   reset_form.style.display = "block";
   login.removeEventListener('click',signin);
   const submit=document.querySelector('#submit');
   submit.addEventListener('click',reset);

}

async function reset(e){e.preventDefault();
    if(form_reset.checkValidity()){
    const obj={
        email:document.querySelector('#email_reset').value,
    }
    try{
    const msg=await axios.post(baseurl+'password/forgotpassword',obj)
    alert(msg.data.message)
if(msg.data.message=='email sent')window.location.href = "http://localhost:3000/signin/signin.html";
    }
    catch(err){
        alert('something went wrong try again later')}
    }else form_reset.classList.add('was-validated')}


async function signin(e){
    e.preventDefault();
    if(form.checkValidity()){
    const obj={
        email:document.querySelector('#email').value,
        password:document.querySelector('#password').value
    }
    try{
    const msg=await axios.post(baseurl+'user/login',obj)
    alert(msg.data.message)
    localStorage.setItem("token", msg.data.token);
        window.location.href = "http://localhost:3000/expense/expense.html";
    }
    catch(err){
        console.log(err.response.data);alert(err.response.data)}
    }else form.classList.add('was-validated')
}

