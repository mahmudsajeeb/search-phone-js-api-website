const loadData  = async(searchText,dataLimit) =>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);
  const data = await res.json();
  displayLoadData(data.data,dataLimit);
  console.log(data)
}

// const loadData = (phones) =>{
//   fetch("https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089")
//   .then(res => res.json())
//   .then(data => displayLoadData(data.data))
// }

const displayLoadData = (phones,dataLimit) =>{
  // console.log(phones)
  const phonContainer = document.getElementById("phone-container");
  phonContainer.innerText =""
  // show all phone 
  const showAll = document.getElementById("showAll")
  if(dataLimit && phones.length > 10){
    phones = phones.slice(0,20)
    
    showAll.classList.remove("d-none")
  }else{
    showAll.classList.add("d-none")
  }
    
  
  // no found phone message 
  const noPhone = document.getElementById("no-found-phone")
  if(phones.length ===0){
    noPhone.classList.remove("d-none");
  }else{
    noPhone.classList.add('d-none');
  }
  // all found phone 
  phones.forEach( phone => {
  const phoneDiv =document.createElement('div')
  phoneDiv.classList.add('col')
   
  phoneDiv.innerHTML=`
  <div class="card p-4">
  <img src="${phone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">${phone.slug}</p>
    <button type="button" onclick="loadphoneDetail('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phonedetailsModal">Show Details</button>

    
  </div>
</div>
  
  `
  phonContainer.appendChild(phoneDiv)
 })
 // stop loader
 toggleloader(false) 
}

/// handle search button click 

/// common function 
const processSearch = (dataLimit) =>{
  toggleloader(true)
  // start loader 
  const searchInput = document.getElementById("searchInput").value ;
  loadData(searchInput,dataLimit)
}
document.getElementById("searchBtn").addEventListener('click', function (){
  // toggleloader(true)
  // // start loader 
  // const searchInput = document.getElementById("searchInput").value ;
  // loadData(searchInput)
  processSearch(10)
})

/// enter button keypress

const textbox = document.getElementById("searchInput");
textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

const toggleloader = (isLoading) =>{
  const loaderSection = document.getElementById("loader")
  if(isLoading){
    loaderSection.classList.remove("d-none")
  }else{
    loaderSection.classList.add('d-none')
  }
}

// show all data 
document.getElementById("btn-show-all").addEventListener("click",function(){

  processSearch()
})

const loadphoneDetail = async id =>{
  const url =  `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data)
}

const displayPhoneDetail = phone =>{
console.log(phone)
const modalTitle = document.getElementById('phonedetailsModalLabel')
modalTitle.innerText=phone.name;
// const imgPhone = document.getElementById("imgPhone");
// imgPhone.innerText= phone.image
const bodycontainer = document.getElementById('body-container');
bodycontainer.innerText =""
const bodyDiv = document.createElement('div');
bodyDiv.classList.add("col")
bodyDiv.innerHTML = `
<img  src="${phone.image}" alt="">
 <p>Release: ${phone.releaseDate ? phone.releaseDate: "No release Item" }</p>
 <p>MainFeatures: ${phone.mainFeatures ? phone.mainFeatures.storage: "No Mainfeatures" }</p>
 <p>Others: ${phone.others ? phone.others.Bluetooth : "No Others"}</p>
`     
bodycontainer.appendChild(bodyDiv)
}
loadData('s')