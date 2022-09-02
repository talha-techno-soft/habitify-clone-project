// searchbar toggle code..
document.getElementById("search1").addEventListener("click", () => {
  document.getElementById("searchContainer2").style.display = "flex";
  document.getElementById("searchContainer1").style.display = "none";

})


document.getElementById("calander2").addEventListener("click", () => {
  document.getElementById("searchContainer2").style.display = "none";
  document.getElementById("searchContainer1").style.display = "flex";

})

document.getElementById("order2").addEventListener("click", () => {
  console.log("yajuha")
  document.getElementById("searchContainer2").style.display = "none";
  document.getElementById("searchContainer1").style.display = "flex";

})
// ******************************************************************
// active/inactive sidebar..
const btns = document.getElementsByClassName("left-sidebar-wrapper");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    const current = document.getElementsByClassName(" active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// date picker..
// $(function(){
//     $('#datetimepicker').datepicker();
//   });


//   document.getElementById("datepicker").addEventListener("click",()=>{
//     datepicker();
//   });
// ******************************************************************
// click anywhere other than search box area...
document.addEventListener("click", function (event) {
  if (event.target.closest("#search1")) return;
  if (event.target.closest("#search2")) return;
  document.getElementById("searchContainer2").style.display = "none";
  document.getElementById("searchContainer1").style.display = "flex";
})


// local storage...
// ******************************************************************
const add = document.getElementById("add");

add.addEventListener("click", addAndRenderMethod);

renderMethod();


// ******************************************************************
// addAndRenderMethod.... 
function addAndRenderMethod() {

  // setting the data...
  // let indexOfSingleRow = Math.floor(Math.random() * 100); 
  let title = document.getElementById('add-title-input').value;
  let itemJsonArray;

  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
    itemJsonArray.push([title]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  }
  else {
    // if(indexOfSingleRow === )
    itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
    itemJsonArray.push([title]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  }

  document.getElementById('add-title-input').value = '';
  renderMethod();
}

// ******************************************************************
//renderMethod...
function renderMethod() {
  let itemJsonArray;

  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  }
  else {
    itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
  }

  // getting the data...

  let singleHabitRow = document.getElementById("single-habit");
  let str = "";

  itemJsonArray.forEach((element, index) => {
    str += `<div class="dashboard-wrapper align-items-center single-habit" id="single-habit">
     <div class="dashboard-item d-flex justify-content-center align-items-center ms-2">
         <img src="logo.png" alt="">
     </div>
     <div class="dashboard-item d-flex flex-column justify-content-center mt-3 ms-2">
         <h6 id="habit-title" class="habit-title">${element[0]}</h6>
         <div class="habit-times opacity">
             <p>${index + 1} / times</p>
         </div>
     </div>
     <div class="dashboard-item border-done d-flex align-items-center mx-1 my-0 p-1">
         <div class="opacity mx-1">
             <i class="fa-solid fa-check"></i>
         </div>
         <div class="mx-1">Done</div>
     </div>
     
     <div class="dashboard-item ms-1 me-3 ">
         <div class="dropdown">
             <div class="border-done d-flex justify-content-center p-1 three-dots" type="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                 <img src="./dots.png" alt="" width="18" height="19">
             </div>
             <ul class="dropdown-menu">
                 <li><a class="dropdown-item" href="#" onclick="deleted(${index})">Delete</a></li>
                 <li><a class="dropdown-item" href="#">Check-In</a></li>
                 <li><a class="dropdown-item" href="#">Skip</a></li>
                 <li><a class="dropdown-item" href="#">Fail</a></li>
                 <li><a class="dropdown-item" href="#">Log Progress</a></li>
                 <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editModal"
                 type="button" onmousedown="editMethod(${index})">Edit</a></li>
                 <li><a class="dropdown-item" href="#">View Progress</a></li>
             </ul>
         </div>
     </div>
 </div>`

  });

  singleHabitRow.innerHTML = str;
}

// ******************************************************************
// delete method...
function deleted(item) {
  let itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
  //delete element in an array..
  itemJsonArray.splice(item, 1);
  localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  location.reload()
  renderMethod();
}


// ******************************************************************
// edit method..
function editMethod(index) {

  // getting index from local storage..
  // let itemIndex = window.localStorage.getItem("flag");
  // console.log(index)

  let itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));

  document.getElementById("edit-title-input").value = itemJsonArray[index];

  // delete inside a edit model...
  const deletebtn = document.getElementById("delete");
  deletebtn.addEventListener("click", () => deleted(index));

  // update btn inside a edit model..
  const updateBtn = document.getElementById("edit");
  updateBtn.addEventListener("click", () => editAndUpdate(index))

  // closebtn
  const closeBtn = document.getElementById("close");
  closeBtn.addEventListener('click', () => {
    location.reload()
  })

  // crossbtn
  const crossBtn = document.getElementById("cross-btn");
  crossBtn.addEventListener('click', () => {
    location.reload()
  })


}
// ******************************************************************
function editAndUpdate(item) {
  let itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
  //update array..
  itemJsonArray[item] = [document.getElementById("edit-title-input").value];
  localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  location.reload()
  renderMethod();
}

// ******************************************************************
// getting index from three-dots...

// threeDots = document.querySelectorAll(".three-dots");

// threeDots.forEach((element, index)=>{
//   element.addEventListener('click',()=>{
//     console.log("taha",index)
//     window.localStorage.setItem("flag", index);
//   })
// })

// ******************************************************************


// search ...
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {

  const inputVal = searchInput.value.toLowerCase();
  const singleHabit = document.querySelectorAll(".single-habit");
 
  Array.from(singleHabit).forEach(function (element) {

   const title=element.querySelector(".habit-title")
    // const desc = element.querySelector(".card-text").innerText;
    if (title.innerText.toLowerCase().includes(inputVal)) {
      element.style.display = "grid";
    } else {
      element.style.display = "none";
    }
  });
});