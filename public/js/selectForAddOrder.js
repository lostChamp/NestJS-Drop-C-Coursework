let selectWare = document.getElementById("selectAddWare");
let selectService = document.getElementById("selectAddService");
let divSelectWare = document.querySelector(".addWare");
let item = document.getElementById("item");
let divSelectService = document.querySelector(".addService");
let plusButton = document.getElementById("add_more_product");

if(plusButton) {
  plusButton.hidden = true;
  plusButton.addEventListener("click", () => {
    divSelectWare.innerHTML += item.innerHTML;
  });
}

if(selectService) {
  selectService.addEventListener("change", () => {
    if(!selectService.value) {
      divSelectWare.hidden = false;
    }else {
      divSelectWare.hidden = true;
    }
  });
}

if(selectWare) {
  selectWare.addEventListener("change", () => {
    if(!selectWare.value) {
      divSelectService.hidden = false;
      plusButton.hidden = true;
    }else {
      divSelectService.hidden = true;
      plusButton.hidden = false;
    }
  })
}



