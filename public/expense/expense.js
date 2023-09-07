const form=document.querySelector('#expense_Form')
const ul=document.querySelector('#ul');
let premium_btn=document.querySelector('#premium_btn');
let leaderboard_btn=null;
const download_btn=document.querySelector('#download')
const show_downloads=document.querySelector('#show_downloads')
const next=document.querySelector('#next')
const prev=document.querySelector('#prev')
const rowsperpage=document.querySelector('#rowsperpage')


if(localStorage.getItem('rows'))
rowsperpage.value=localStorage.getItem('rows');

let page=0;

const baseurl="http://localhost:3000/"

form.addEventListener('submit',add);
ul.addEventListener('click',remove);
premium_btn.addEventListener('click',buy);
download_btn.addEventListener('click',download_data)
show_downloads.addEventListener('click',show_download_history)
next.addEventListener('click',nextpage)
prev.addEventListener('click',prevpage)
rowsperpage.addEventListener('change',change_rowcount)
report_btn.addEventListener("click",report);

checkuser();
showall();

function logout(){

    localStorage.setItem("token",0)
    localStorage.setItem("row",10)
    alert('Log Out')
    location.replace('http://localhost:3000/signin/signin.html')
}

function change_rowcount(e){
    e.preventDefault()
localStorage.setItem("rows",rowsperpage.value);
}

function checkuser(){
    if(parseJwt(localStorage.getItem('token'))){
    ul_navbar=document.querySelector('#ul_navbar');
    premium_space=document.querySelector('#premium_space');
    premium_btn.removeEventListener("click", buy);
    premium_space.removeChild(premium_btn);
    premium_space.appendChild(document.createTextNode('Premium User'));
    premium_btn.id='leaderboard';
    leaderboard_btn=premium_btn;
    
    const div=document.createElement('button');
    div.classList.add('btn-group');
    div.style.backgroundColor='transparent';
    div.style.borderWidth='0px';
    leaderboard_btn.childNodes[0].data='Leaderboard'
    div.appendChild(leaderboard_btn);
   
    premium_space.appendChild(div);
    leaderboard_btn.addEventListener("click",leaderboard);

}
}

async function report(e){
   //hide leaderboard/ main form


    if(document.querySelector('#leaderboard_List'))
        document.body.removeChild(document.querySelector('#leaderboard_List')); 
    if(document.querySelector('#expense_main_div'))
        document.body.removeChild(document.querySelector('#expense_main_div')); 
        
        //show report form
        const report_div=document.querySelector('#report_div')
        report_div.style.display='block'
        const show_btn=document.querySelector('#show')
        show_btn.addEventListener('click',show_report_data)
        
        //get data via axios
       }
    
async function show_download_history(e){
        e.preventDefault()
    
        if(parseJwt(localStorage.getItem('token'))){
        const token=localStorage.getItem('token');
        try{
        const response=await axios.get(baseurl+'expense/downloadHistory',{headers:{Authorization:token}})

        ul2=document.createElement('ul')
    for(let i=0;i<response.data.length;i++){
       
    li=document.createElement('li')
    const a=document.createElement('a')
    a.href=response.data[i].url;
    a.appendChild(document.createTextNode( response.data[i].createdAt));
   
    li.appendChild(a) 
    ul2.appendChild(li);   
        
    }
    const h3=document.createElement('h4');
    h3.appendChild(document.createTextNode('Download History'))
    const div=document.createElement('div');
    div.id='history'
    div.classList.add('container')
    div.appendChild(h3);
    div.appendChild(ul2);
    document.body.appendChild(div);

        
    }catch(err){console.log(err)}
    }
    else alert('You are not a premium user!!!')
}

async function download_data(e){
    e.preventDefault()

    if(parseJwt(localStorage.getItem('token'))){
    const token=localStorage.getItem('token');
    try{const result=await axios.get(baseurl+'expense/download',{headers:{Authorization:token}})
    console.log(result);
    location.replace(result.data.file_Url);}
    catch(err){
        console.log(err.response.data.err)
        alert('Something went wrong Please try after some time')}
    }
    else alert('You are not a premium user!!!')



}
async function show_report_data(e){
   
    e.preventDefault();
    const rows=localStorage.getItem("rows");
    const token=localStorage.getItem('token');
    const result=await axios.get(baseurl+'expense',{headers:{Authorization:token}})
    
    //remove old data in table
    const table_data=document.querySelector('#table_data')
    while(table_data.firstChild)table_data.removeChild(table_data.firstChild);

    //show data
    const filterdate=new Date(document.querySelector('#date').value);
    for(let i=0;i<result.data.length;i++){
        let condition=false;
        const filter=document.querySelector('#filter').value; 
        const data_date=new Date(result.data[i].createdAt)
        if(data_date.getFullYear()==filterdate.getFullYear()){
            condition=true}
        if(condition &&(filter=='Daily'|| filter=='Monthly') ){
            if(data_date.getMonth()==filterdate.getMonth())condition=true;
             else condition=false;}
        if(condition &&filter=='Daily'){
            if(data_date.getDate()==filterdate.getDate())
            condition=true; 
            else condition=false;}
        
        if(condition){
        const tr=document.createElement('tr')
        const  td_date=document.createElement('td')
        td_date.appendChild(document.createTextNode(result.data[i].createdAt));
        tr.appendChild(td_date);
        const  td_desc=document.createElement('td')
        td_desc.appendChild(document.createTextNode(result.data[i].description));
        tr.appendChild(td_desc);
        const  td_category=document.createElement('td')
        td_category.appendChild(document.createTextNode(result.data[i].type));
        tr.appendChild(td_category);
        const  td_amount=document.createElement('td')
        td_amount.appendChild(document.createTextNode(result.data[i].amount));
        tr.appendChild(td_amount);
        table_data.appendChild(tr);}
    }
  
}
async function leaderboard(e){
    if(document.querySelector('#report_div'))
    report_div.style.display='none'
    if(!document.querySelector('#leaderboard_List')){
try{
    
    const response=await axios.get(baseurl+'premium/showLeaderboard',{headers:{Authorization:localStorage.getItem("token")}})
    
    ul2=document.createElement('ul')
    for(let i=0;i<response.data.length;i++){
        str=response.data[i].name+ ' - '+response.data[i].totalCost;
    li=document.createElement('li')
    li.appendChild(document.createTextNode(str)) 
    ul2.appendChild(li);   
        
    }
    const h3=document.createElement('h4');
    h3.appendChild(document.createTextNode('Leaderboard'))
    const div=document.createElement('div');
    div.id='leaderboard_List'
    div.classList.add('container')
    div.appendChild(h3);
    div.appendChild(ul2);
    document.body.appendChild(div);


}
catch(err){console.log(err)}


}}

async function buy(e){
    e.preventDefault();
    try {
        const token=localStorage.getItem('token')
        const result=await axios.get(baseurl+'order/buy',{headers:{Authorization:token}});
    var options={
        'key':result.data.key_id,
        'order_id':result.data.id,
        'handler':async function(response){
            axios.post(baseurl+'order/changeStatus',{order_id:response.razorpay_order_id,payment_id:response.razorpay_payment_id},{headers:{Authorization:localStorage.getItem('token')}})
            .then((res)=>{alert(res.data.message)
                localStorage.setItem("token",res.data.token);
                location.reload();
        })}
    }
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function (response){
        axios.post(baseurl+'order/changeStatus',{order_id:options.order_id},{headers:{Authorization:localStorage.getItem('token')}})
        .then(()=>{alert('payment failed')})
    })

}catch(err){console.log(err)}
}

async function add(e){
    e.preventDefault();
    if(form.checkValidity()){
        const token=localStorage.getItem('token'); 
        let obj={description:document.querySelector('#description').value,
        amount:document.querySelector('#amount').value,
        type:document.querySelector('#type').value
    }

try{const token=localStorage.getItem('token');    
    const result=await axios.post(baseurl+'expense',obj,{headers:{Authorization:token}})
if(result){
    obj.id=result.data
    show(obj);
}
}
catch(err){console.log(err)}

    }else{form.classList.add('was-validated')}

}

async function showall(){
    try{
        let rows=localStorage.getItem("rows");
if(!rows){rows=10;localStorage.setItem(rows,10)}
        const token=localStorage.getItem('token');
    const result=await axios.get(baseurl+'expense'+'?page='+(page+1)+'&rows='+rows,{headers:{Authorization:token}})
    page++;
    const ul=document.querySelector('#ul')
    while(ul.firstChild)ul.removeChild(ul.firstChild)
        for(let i=0;i<result.data.length;i++){
            show(result.data[i])
        }
        next.disabled=true;prev.disabled=true;
        if(result.data.count-rows*page>0){next.disabled=false;}
        if(page-1>0){prev.disabled=false;}
    }
    catch(err){console.log(err)}
}

function show(obj){

    const str=obj.amount+' - '+obj.description+' - '+obj.type;
    const ul=document.querySelector('#ul')
    const li=document.createElement('li');
    li.id=obj._id;
    const amt=document.createElement('input');
    amt.type='number';
    amt.value=obj.amount;
    amt.disabled=true;
    li.appendChild(document.createTextNode('Amount:'))
    li.appendChild(amt);

    const desc=document.createElement('input');
    desc.type='text';
    desc.value=obj.description;
    desc.disabled=true;
    li.appendChild(document.createTextNode('Description:'))
    li.appendChild(desc);

    const type=document.createElement('input');
    type.type='text';
    type.value=obj.type;
    type.disabled=true;
    li.appendChild(document.createTextNode('type:'))
    li.appendChild(type);

    const btn=document.createElement('button');
    btn.style.borderColor='red';
    btn.classList.add('delete')
        
    btn.appendChild(document.createTextNode('Delete'));
    li.appendChild(document.createTextNode(' . . . . .'));
    li.appendChild(btn)
    ul.appendChild(li)
}

function remove(e){
    e.preventDefault();
    
    if(e.target.classList.contains('delete')){
        const token=localStorage.getItem('token');
        axios.delete(baseurl+'expense/'+e.target.parentElement.id,{headers:{Authorization:token}})
        .then(()=>{  ul.removeChild(e.target.parentElement);})
        .catch(err=>{console.log(err)})
      
    }
}
function prevpage(e){
   page=page-2;
    showall()
    
}
function nextpage(e){

    showall()
   
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).isPremium;
}