const generateButton = document.getElementById("generateButton");
const repetitionInputsDiv = document.getElementById("repetitionInputs");
const outputTextarea = document.getElementById("outputTextarea");
const outputTextDiv = document.getElementById("outputText");
const validationMessage = document.getElementById("wordValidationMessage");
const userWordInput = document.getElementById("wordInput");

function handleGenerateButtonClick() {
  repetitionInputsDiv.innerHTML = ""; // Clear previous inputs

  const userWord = userWordInput.value;
  if (userWord.trim() === "") {
    validationMessage.textContent = "Buranı boş buraxmaq olmaz 😒";
    validationMessage.style.display = "block";
    return;
  }

  validationMessage.style.display = "none";

  for (let i = 0; i < userWord.length; i++) {
    const character = userWord[i];

    const label = document.createElement("label");
    label.textContent = `"${character}" hərfinin təkrar sayı: `;

    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.value = 1;

    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    repetitionInputsDiv.appendChild(inputContainer);
  }

  repetitionInputsDiv.classList.add("visible");

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Seçimləri Təsdiq Et! 💕";

  repetitionInputsDiv.appendChild(confirmButton);

  confirmButton.addEventListener("click", handleConfirmButtonClick);

  outputTextarea.textContent = "";
  outputTextDiv.style.visibility = "hidden";
  outputTextDiv.classList.remove("visible");
}

function handleUserWordInputKeydown(event) {
  if (event.key === "Enter") {
    generateButton.click();
  }
}

function handleConfirmButtonClick() {
  const repetitionCounts = [];
  const inputs = repetitionInputsDiv.querySelectorAll("input[type='number']");
  let zeroInputDetected = false;

  inputs.forEach((input) => {
    const repetitionCount = parseInt(input.value);

    if (repetitionCount === 0) {
      zeroInputDetected = true;
    } else {
      repetitionCounts.push(repetitionCount);
    }
  });

  if (zeroInputDetected) {
    validationMessage.textContent = "0 dəyərini daxil etmək olmaz! 😒";
    validationMessage.style.display = "block";
    return;
  } else {
    validationMessage.style.display = "none";
  }

  const userWord = userWordInput.value;
  const outputParts = [];

  for (let i = 0; i < userWord.length; i++) {
    const character = userWord[i];
    const repetitionCount = repetitionCounts[i];

    outputParts.push(
      character === " " ? " " : character.repeat(repetitionCount)
    );
  }

  outputTextarea.textContent = outputParts.join("");
  outputTextDiv.style.visibility = "visible";
  outputTextDiv.classList.add("visible");
  outputTextDiv.scrollIntoView({ behavior: "smooth" });
}

generateButton.addEventListener("click", handleGenerateButtonClick);
userWordInput.addEventListener("keydown", handleUserWordInputKeydown);

validationMessage.style.display = "none";
