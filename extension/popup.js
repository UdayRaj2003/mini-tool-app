const input = document.getElementById("epochInput");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

// Convert function
function convertEpoch() {
  const value = input.value.trim();

  if (!value || isNaN(value)) {
    resultText.innerText = "Please enter a valid number.";
    resultBox.style.display = "block";
    return;
  }

  let epoch = Number(value);

  // Auto detect seconds (10 digit) vs milliseconds (13 digit)
  if (value.length === 10) {
    epoch = epoch * 1000;
  }

  const date = new Date(epoch);

  if (isNaN(date.getTime())) {
    resultText.innerText = "Invalid epoch value.";
    resultBox.style.display = "block";
    return;
  }

  const ist = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
  });

  resultText.innerText = ist;
  resultBox.style.display = "block";
}

// Convert button
document.getElementById("convertBtn").addEventListener("click", convertEpoch);

// Enter key support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    convertEpoch();
  }
});

// Clear button
document.getElementById("clearBtn").addEventListener("click", () => {
  input.value = "";
  resultText.innerText = "";
  resultBox.style.display = "none";
});

// Copy button with feedback
copyBtn.addEventListener("click", () => {
  const text = resultText.innerText;

  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1000);
  });
});