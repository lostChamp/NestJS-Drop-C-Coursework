function selectedForWare(value, id) {
  let select = document.getElementById(id);
  let option;
  for (let i=0; i<select.options.length; i++) {
    option = select.options[i];
    if (option.value === value) {
      option.setAttribute('selected', true);
      return;
    }
  }
}