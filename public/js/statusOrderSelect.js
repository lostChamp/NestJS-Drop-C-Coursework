document.addEventListener("DOMContentLoaded", () => {
  const orderStatus = document.getElementById("statusOrder");
  const trueStatus = document.getElementById("trueStatus");
  if(orderStatus && trueStatus) {
    for(let i = 0; i < orderStatus.options.length; i++) {
      if(orderStatus.options[i].value === trueStatus.value) {
        orderStatus.options[i].selected = true;
        break;
      }
    }
  }
});