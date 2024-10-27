//? Taking References

const msg = document.querySelector("#message");
const totalCounter = document.querySelector("#total-counter");
const remainingCounter = document.querySelector("#remaining-counter");
const copyBtn = document.querySelector(".copyBtn");

//? applying event(s)

msg.addEventListener("input", (e) => {
  let wordLength = e.target.value.length;
  totalCounter.textContent = wordLength;
  remainingCounter.textContent = 150 - wordLength;
});

//? Copy text

const copyText = () => {
  msg.select();
  msg.setSelectionRange(0, 9999);
  //* this will copy our text => navigator.clipboard.writeText(msg.value)
  navigator.clipboard.writeText(msg.value).then(() => {
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy Text";
    }, 2000);
  });
};

copyBtn.addEventListener("click", copyText);
