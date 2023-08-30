const form=document.querySelector('#form');
const baseurl="http://localhost:3000/"

form.addEventListener('submit',add);

async function add(e){
  try{  if(form.checkValidity()){
e.preventDefault();
const email=document.getElementById('email')
const fullname=document.getElementById('full_Name')
const password=document.getElementById('password')

const obj={
    fullname:fullname.value,
    email:email.value,
    password:password.value
}

const response=await axios.post(baseurl+"user/signup",obj)

if(response.status===201){
    console.log('Signup done');
    window.location.href = 'http://localhost:3000/signin/signin.html';}

    else{
        throw new Error("Failed to sign-up")
    }

    }else {e.preventDefault();
        form.classList.add('was-validated')
    }
}catch(err){console.log(err);
            alert(err.response.data)
            }
}