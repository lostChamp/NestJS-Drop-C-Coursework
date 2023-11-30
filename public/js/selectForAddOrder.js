let selectWare = document.getElementById("selectAddWare");
let selectService = document.getElementById("selectAddService");
let divSelectWare = document.querySelector(".addWare");
let divSelectService = document.querySelector(".addService");

selectWare.addEventListener("change", () => {
  if(!selectWare.value) {
    divSelectService.hidden = false;
  }else {
    divSelectService.hidden = true;
  }
})

selectService.addEventListener("change", () => {
  if(!selectService.value) {
    divSelectWare.hidden = false;
  }else {
    divSelectWare.hidden = true;
  }
})