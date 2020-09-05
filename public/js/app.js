console.log("hello mate");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loc = search.value;
  msg1.textContent = "Loading....";
  msg2.innerHTML = " ";

  fetch("/weather?address=" + loc).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.innerHTML = data.forecast;
      }
    });
  });
});
