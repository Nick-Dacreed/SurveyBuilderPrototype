// TARGET ELEMENTS
let builder = document.getElementById("builder");
let survey = document.getElementById("survey");

class SurveyQuestion {
  constructor(question, sliderType, points, scaleLabels, showNumbers) {
    this.question = question;
    this.sliderType = sliderType;
    this.points = points;
    this.scaleLabels = scaleLabels;
    this.showNumbers = showNumbers;
  }
}

// BUILDER DEFAULTS
let newQuestion = {
  question: "",
  sliderType: "multi-choice",
  points: 5,
  scaleLabels: [],
  showNumbers: true,
};

// CONFIG
let config = [];

// RENDERING QUESTION BUILDER
let builderDiv = document.createElement("div");
builderDiv.className = "questionContainer";

// -- Question
let questionText = document.createElement("h2");
questionText.className = "questionText";
questionText.style.display = "none";
questionText.addEventListener("click", () => {
  questionForm.style.display = "flex";
  questionText.style.display = "none";
  questionInput.focus();
});
let questionForm = document.createElement("form");
questionForm.onsubmit = (e) => {
  e.preventDefault();
  questionText.innerHTML = `Q: ${newQuestion.question}`;
  questionForm.style.display = "none";
  questionText.style.display = "flex";
};
let questionInput = document.createElement("input");
questionInput.type = "text";
questionInput.placeholder = "Add question title";
questionInput.onchange = (e) => (newQuestion.question = e.target.value);
questionInput.className = "questionInput";

// -- Type Selector
let typeSelector = document.createElement("select");
typeSelector.className = "typeSelector";
let mtch = document.createElement("option");
let perc = document.createElement("option");

mtch.value = "multi-choice";
perc.value = "percentage";

mtch.selected = true;

mtch.innerHTML = "Multi-Choice";
perc.innerHTML = "Percentage";

typeSelector.appendChild(mtch);
typeSelector.appendChild(perc);
typeSelector.onchange = (e) => {
  newQuestion.sliderType = e.target.value;
  newQuestion.scaleLabels = [];
  sliderBuilder(true);
};

// -- Early Appends
questionForm.appendChild(questionInput);
builderDiv.appendChild(questionText);
builderDiv.appendChild(questionForm);
builderDiv.appendChild(typeSelector);

const sliderBuilder = (bool) => {
  if (bool) {
    const removal = document.querySelector(".sliderContainer");
    removal.parentElement.removeChild(removal);
  }

  let sliderContainer = document.createElement("div");
  sliderContainer.className = "sliderContainer";

  // -- MultiChoice
  if (newQuestion.sliderType === "multi-choice") {
    let multiChoiceDiv = document.createElement("div");
    multiChoiceDiv.className = "multiChoiceDiv";

    // Points selector
    let pointsSelector = document.createElement("select");
    pointsSelector.id = "pointsSelector";
    let selectLabel = document.createElement("label");
    selectLabel.innerHTML = "Number of Points:";
    selectLabel.for = "pointsSelector";
    pointsSelector.onchange = (e) => {
      newQuestion.points = e.target.value;
      renderPoints(true);
    };

    const optionArray = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    optionArray.forEach((number) => {
      const element = document.createElement("option");
      element.value = number;
      element.innerHTML = number;
      if (number === 5) {
        element.selected = true;
      }
      pointsSelector.appendChild(element);
    });

    // Show Numbers?
    let showNumbersDiv = document.createElement("div");
    showNumbersDiv.className = "showNumbersDiv";
    let showNumbersRadio = document.createElement("input");
    showNumbersRadio.type = "radio";
    showNumbersRadio.id = "showNumbers";
    showNumbersRadio.checked = newQuestion.showNumbers;
    showNumbersRadio.onclick = () => {
      newQuestion.showNumbers = !newQuestion.showNumbers;
      showNumbersRadio.checked = newQuestion.showNumbers;
      renderPoints(true);
    };
    let showNumbersLabel = document.createElement("label");
    showNumbersLabel.for = "showNumbers";
    showNumbersLabel.innerHTML = "Show Numbers";
    showNumbersDiv.appendChild(showNumbersLabel);
    showNumbersDiv.appendChild(showNumbersRadio);

    // Rendering Radio Points
    const renderPoints = (bool) => {
      let radioPointsDiv = document.createElement("div");

      // cleanup
      if (bool) {
        radioPointsDiv = document.querySelector(".radioPointsDiv");
        radioPointsDiv.innerHTML = "";
      } else {
        radioPointsDiv.className = "radioPointsDiv";
      }

      for (i = 0; i < newQuestion.points; i++) {
        const currentPointNumber = i + 1;
        let radioInner = document.createElement("span");
        let number = document.createTextNode(currentPointNumber);

        let edit = document.createElement("form");
        edit.className = "labelEdit";
        edit.style.display = "none";
        let editPut = document.createElement("input");
        editPut.autocomplete = "off";
        editPut.id = String(currentPointNumber);

        // Labels and edits
        let label = document.createElement("div");
        label.innerHTML = "...";
        label.style.top = "40px";

        const handleSubmit = (e) => {
          e.preventDefault();

          // cleanup
          newQuestion.scaleLabels?.forEach((item, index) => {
            if (item.number == currentPointNumber) {
              newQuestion.scaleLabels.splice(index, 1);
            }
          });

          // making new labels
          const newLabel = document.getElementById(String(currentPointNumber))
            .value;
          if (newLabel !== "") {
            const labelObject = {
              label: newLabel,
              number: currentPointNumber,
            };
            newQuestion.scaleLabels.push(labelObject);
            label.innerHTML = newLabel;
          } else {
            label.innerHTML = "...";
          }
          edit.style.display = "none";
          label.style.display = "flex";
          console.log(newQuestion.scaleLabels);
        };

        edit.onsubmit = (e) => {
          handleSubmit(e);
        };
        editPut.addEventListener("focusout", (e) => {
          handleSubmit(e);
        });
        edit.appendChild(editPut);

        newQuestion.scaleLabels.forEach((item) => {
          if (item.number === currentPointNumber) {
            if (item.label === "") {
              label.innerHTML = "...";
            } else {
              label.innerHTML = item.label;
            }
          }
        });

        // Appends
        radioInner.appendChild(label);
        radioInner.appendChild(edit);
        if (newQuestion.showNumbers) {
          radioInner.appendChild(number);
        }
        radioInner.addEventListener("click", () => {
          label.style.display = "none";
          edit.style.display = "flex";
          editPut.focus();
        });
        radioPointsDiv.appendChild(radioInner);
      }
      multiChoiceDiv.appendChild(radioPointsDiv);
      multiChoiceDiv.appendChild(pointsSelector);
      multiChoiceDiv.appendChild(showNumbersDiv);
    };

    renderPoints(false);
    sliderContainer.appendChild(multiChoiceDiv);
  }

  // -- Percentage Options
  if (newQuestion.sliderType === "percentage") {
    newQuestion.scaleLabels = ["0%", "100%"];

    const getBubbleStyles = (value) => {
      bubble.innerHTML = value;
      bubble.style.left = `calc(${value}% - ${
        value * 0.01 * 21 + value * 0.01 * 4 + 6.5
      }px)`;
    };

    const handlePercLabelChange = (e, labelName, index) => {
      e.preventDefault();
      const editing = document.getElementById(labelName);
      const newLabel = document.querySelector(`#${labelName} input`).value;
      if (labelName === "leftEdit") {
        newQuestion.scaleLabels[0] = newLabel === "" ? "0%" : newLabel;
        labelLeft.innerHTML = newLabel === "" ? "0%" : newLabel;
        labelLeft.style.display = "flex";
      } else {
        newQuestion.scaleLabels[1] = newLabel === "" ? "100%" : newLabel;
        labelRight.innerHTML = newLabel === "" ? "100%" : newLabel;
        labelRight.style.display = "flex";
      }
      editing.style.display = "none";
    };

    let leftEdit = document.createElement("form");
    leftEdit.id = "leftEdit";
    leftEdit.style.display = "none";
    let leftEditPut = document.createElement("input");
    leftEdit.appendChild(leftEditPut);
    leftEdit.onsubmit = (e) => handlePercLabelChange(e, "leftEdit", 0);
    leftEditPut.addEventListener("focusout", (e) =>
      handlePercLabelChange(e, "leftEdit", 0)
    );

    let rightEdit = document.createElement("form");
    rightEdit.id = "rightEdit";
    rightEdit.style.display = "none";
    let rightEditPut = document.createElement("input");
    rightEdit.appendChild(rightEditPut);
    rightEdit.onsubmit = (e) => handlePercLabelChange(e, "rightEdit", 1);
    rightEditPut.addEventListener("focusout", (e) =>
      handlePercLabelChange(e, "rightEdit", 1)
    );

    let sliderDiv = document.createElement("div");
    sliderDiv.className = "sliderDiv";

    let labelLeft = document.createElement("span");
    labelLeft.innerHTML = newQuestion.scaleLabels[0];
    labelLeft.onclick = () => {
      leftEdit.style.display = "flex";
      labelLeft.style.display = "none";
      leftEditPut.focus();
    };
    sliderDiv.appendChild(leftEdit);
    sliderDiv.appendChild(labelLeft);

    let sliderWrap = document.createElement("div");
    sliderWrap.className = "sliderWrap";
    let slider = document.createElement("input");
    slider.type = "range";
    slider.name = "ranger";
    slider.min = "0";
    slider.max = "100";
    slider.className = "slider";
    let bubble = document.createElement("output");
    bubble.className = "bubble";
    bubble.innerHTML = slider.value;
    slider.oninput = (n) => {
      getBubbleStyles(n.target.value);
    };
    sliderWrap.appendChild(slider);
    sliderWrap.appendChild(bubble);
    sliderDiv.appendChild(sliderWrap);

    let outputBubble = document.createElement("output");
    outputBubble.for = "ranger";
    outputBubble.onforminput = "value = ranger.valueAsNumber;";

    let labelRight = document.createElement("span");
    labelRight.innerHTML = newQuestion.scaleLabels[1];
    labelRight.onclick = () => {
      rightEdit.style.display = "flex";
      labelRight.style.display = "none";
      rightEditPut.focus();
    };
    sliderDiv.appendChild(rightEdit);
    sliderDiv.appendChild(labelRight);

    sliderContainer.appendChild(sliderDiv);
  }

  builderDiv.appendChild(sliderContainer);
};
sliderBuilder();

// -- Add Button
let addButton = document.createElement("button");
addButton.className = "addButton";
addButton.innerHTML = "Add Question";
addButton.addEventListener("click", () => {
  const addition = new SurveyQuestion(
    newQuestion.question === "..." ? "" : newQuestion.question,
    newQuestion.sliderType,
    newQuestion.points,
    newQuestion.scaleLabels,
    newQuestion.showNumbers
  );
  newQuestion = {
    question: "...",
    sliderType: newQuestion.sliderType,
    points: 5,
    scaleLabels: [...newQuestion.scaleLabels],
    showNumbers: true,
  };
  questionInput.value = "";
  questionForm.style.display = "none";
  questionText.style.display = "flex";
  questionText.innerHTML = newQuestion.question;
  config.push(addition);
  renderQuestions();
  sliderBuilder(true);

  console.log(config);
});

builder.appendChild(builderDiv);
builder.appendChild(addButton);

// RENDERING QUESTIONS IN CONFIG
const renderQuestions = () => {
  survey.innerHTML = "";
  config.forEach(
    ({ question, sliderType, points, showNumbers, scaleLabels }, index) => {
      let containerDiv = document.createElement("div");
      containerDiv.className = "questionContainer";

      let output = document.createElement("div");
      output.className = "outputDiv";
      output.innerHTML = "null";

      let DELETE = document.createElement("div");
      let leftX = document.createElement("div");
      leftX.className = "leftX";
      let rightX = document.createElement("div");
      rightX.className = "rightX";

      DELETE.className = "deleteButton";
      DELETE.appendChild(leftX);
      DELETE.appendChild(rightX);

      DELETE.onclick = () => {
        config.splice(index, 1);
        renderQuestions();
      };

      const updateOutput = (n) => {
        const percHelp = (100 / (points - 1)) * (n - 1);
        output.innerHTML = n;
        containerDiv
          .querySelectorAll(".radioPointsDiv span")
          .forEach((span, index) => {
            Object.assign(
              span.style,
              index + 1 <= n
                ? index + 1 == n
                  ? {
                      "background-color": "var(--teal)",
                      color: "var(--light)",
                      border: "4px solid var(--gray)",
                      "box-shadow": "none",
                    }
                  : {
                      "background-color": "var(--teal)",
                      color: "var(--light)",
                      border: "4px solid var(--success)",
                      "box-shadow": "none",
                    }
                : {
                    "background-color": "var(--light)",
                    color: "var(--gray-dark)",
                    border: "4px solid var(--gray)",
                    "box-shadow": "none",
                  }
            );
          });
        containerDiv.querySelector(
          ".radioPointsDiv"
        ).style.backgroundImage = `linear-gradient(to right, var(--success) 0%, var(--teal) ${
          percHelp - 100 / (points - 1)
        }%, var(--gray) ${percHelp - 10}%, var(--gray) 100%)`;
      };

      let questionText = document.createTextNode(`Q: ${question}`);
      let questionDiv = document.createElement("div");
      questionDiv.appendChild(questionText);
      questionDiv.className = "questionTitle";
      containerDiv.appendChild(questionDiv);

      if (sliderType === "multi-choice") {
        let radioPointsDiv = document.createElement("div");
        radioPointsDiv.className = "radioPointsDiv";
        for (i = 0; i < points; i++) {
          const thingy = i + 1;
          let radioInner = document.createElement("span");
          let number = document.createTextNode(thingy);
          scaleLabels.forEach((item) => {
            if (item.number === thingy) {
              let label = document.createElement("div");
              label.innerHTML = item.label;
              if (label.above) {
                label.style.bottom = "40px";
              } else {
                label.style.top = "40px";
              }
              radioInner.appendChild(label);
            } else {
              return;
            }
          });
          showNumbers && radioInner.appendChild(number);
          radioInner.addEventListener("click", () => updateOutput(thingy));
          radioPointsDiv.appendChild(radioInner);
        }

        containerDiv.appendChild(radioPointsDiv);
      }

      if (sliderType === "percentage") {
        const getBubbleStyles = (value) => {
          bubble.innerHTML = value;
          bubble.style.left = `calc(${value}% - ${
            value * 0.01 * 21 + value * 0.01 * 4 + 6.5
          }px)`;
        };

        let sliderDiv = document.createElement("div");
        sliderDiv.className = "sliderDiv";

        let labelLeft = document.createElement("span");
        labelLeft.innerHTML = scaleLabels[0];
        sliderDiv.appendChild(labelLeft);

        let sliderWrap = document.createElement("div");
        sliderWrap.className = "sliderWrap";
        let slider = document.createElement("input");
        slider.type = "range";
        slider.name = "ranger";
        slider.min = "0";
        slider.max = "points";
        slider.className = "slider";
        let bubble = document.createElement("output");
        bubble.className = "bubble";
        bubble.innerHTML = slider.value;
        slider.oninput = (n) => {
          output.innerHTML = n.target.value;
          getBubbleStyles(n.target.value);
        };
        sliderWrap.appendChild(slider);
        sliderWrap.appendChild(bubble);
        sliderDiv.appendChild(sliderWrap);

        let outputBubble = document.createElement("output");
        outputBubble.for = "ranger";
        outputBubble.onforminput = "value = ranger.valueAsNumber;";

        let labelRight = document.createElement("span");
        labelRight.innerHTML = scaleLabels[1];
        sliderDiv.appendChild(labelRight);

        containerDiv.appendChild(sliderDiv);
      }

      containerDiv.appendChild(output);
      containerDiv.appendChild(DELETE);
      survey.appendChild(containerDiv);
    }
  );
};
