document.getElementById("convertBtn").addEventListener("click", () => {

  const epoch = document.getElementById("epochInput").value;

  if (!epoch) {
    document.getElementById("result").innerText = "Enter valid epoch.";
    document.getElementById("resultBox").style.display = "block";
    return;
  }

  const date = new Date(epoch * 1000);

  const ist = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
  });

  document.getElementById("result").innerText = ist;
  document.getElementById("resultBox").style.display = "block";

});


document.getElementById("clearBtn").addEventListener("click", () => {

  document.getElementById("epochInput").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("resultBox").style.display = "none";

});


document.getElementById("copyBtn").addEventListener("click", () => {

  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text);

  const btn = document.getElementById("copyBtn");
  btn.innerText = "Copied!";

  setTimeout(()=>{
    btn.innerText = "Copy";
  },1500);

});