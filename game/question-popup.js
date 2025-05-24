function showQuestionPopup(questionObj, onResult) {
  const popup = document.getElementById("question-popup");
  const questionText = document.getElementById("question-text");
  const choicesContainer = document.getElementById("choices-container");

  if (!popup || !questionText || !choicesContainer) {
    console.warn("Popup element không tìm thấy");
    return;
  }

  questionText.innerText = questionObj.question;
  choicesContainer.innerHTML = "";

  questionObj.choices.forEach((choice) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="choice" value="${choice}">
      ${choice}
    `;
    choicesContainer.appendChild(label);
  });

  const submitBtn = document.querySelector("#question-popup button");
  submitBtn.onclick = () => {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) {
      alert("Hãy chọn 1 đáp án!");
      return;
    }

    const isCorrect = selected.value === questionObj.answer;
    popup.classList.add("hidden");

    onResult(isCorrect);
  };

  popup.classList.remove("hidden");
}

// 🔥 Gắn vào window để có thể dùng ở bất kỳ file nào
window.showQuestionPopup = showQuestionPopup;
