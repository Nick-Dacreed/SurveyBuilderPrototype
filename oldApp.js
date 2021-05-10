let survey = document.getElementById("surveyOne");

let config = [
  {
    question: "How would you rate the experience?",
    sliderType: "multi-choice",
    points: 7,
    from: "Bad",
    to: "Good",
  },
  {
    question: "How likely are you to recommend us to a friend?",
    sliderType: "multi-choice",
    points: 5,
    from: "Unlikely",
    to: "Highly Likely",
  },
  {
    question: "How much of your character do you attribute to CBD activites?",
    sliderType: "percentage",
    points: 100,
    from: "0%",
    to: "100%",
  },
  {
    question: "Hello world!",
    sliderType: "percentage",
    points: 100,
    from: "0%",
    to: "100%",
  },
  {
    question: "Yoyoyoyoy",
    sliderType: "multi-choice",
    points: 12,
    from: "Bad",
    to: "great!",
  },
];

config.forEach(({ question, sliderType, points, from, to }) => {
  let containerDiv = document.createElement("div");
  containerDiv.className = "questionContainer";

  let output = document.createElement("div");
  output.className = "outputDiv";
  output.innerHTML = "null";

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
                }
              : {
                  "background-color": "var(--teal)",
                  color: "var(--light)",
                  border: "4px solid var(--success)",
                }
            : {
                "background-color": "var(--light)",
                color: "var(--gray-dark)",
                border: "4px solid var(--gray)",
              }
        );
      });
    containerDiv.querySelector(
      ".radioPointsDiv"
    ).style.backgroundImage = `linear-gradient(to right, var(--success) 0%, var(--teal) ${
      percHelp - 100 / (points - 1)
    }%, var(--gray) ${percHelp}%, var(--gray) 100%)`;
  };

  let questionText = document.createTextNode(`Q: ${question}`);
  let questionDiv = document.createElement("div");
  questionDiv.appendChild(questionText);
  questionDiv.className = "questionTitle";
  containerDiv.appendChild(questionDiv);

  if (sliderType === "multi-choice") {
    let radioPointsDiv = document.createElement("div");
    radioPointsDiv.className = "radioPointsDiv";

    let radioLeft = document.createElement("span");
    let leftNumber = document.createTextNode("1");
    radioLeft.appendChild(leftNumber);
    let leftLabel = document.createElement("div");
    let fromText = document.createTextNode(from);
    leftLabel.appendChild(fromText);
    radioLeft.appendChild(leftLabel);
    radioLeft.addEventListener("click", () => updateOutput(1));
    radioPointsDiv.appendChild(radioLeft);

    for (i = 0; i < points - 2; i++) {
      const thingy = i + 2;
      let radioInner = document.createElement("span");
      let number = document.createTextNode(thingy);
      radioInner.appendChild(number);
      radioInner.addEventListener("click", () => updateOutput(thingy));
      radioPointsDiv.appendChild(radioInner);
    }

    let radioRight = document.createElement("span");
    let rightNumber = document.createTextNode(points.toString());
    radioRight.appendChild(rightNumber);
    let rightLabel = document.createElement("div");
    let toText = document.createTextNode(to);
    rightLabel.appendChild(toText);
    radioRight.appendChild(rightLabel);
    radioRight.addEventListener("click", () => updateOutput(points));
    radioPointsDiv.appendChild(radioRight);

    containerDiv.appendChild(radioPointsDiv);
  }

  if (sliderType === "percentage") {
    const getBubbleStyles = (value) => {
      bubble.innerHTML = value;
      bubble.style.left = `calc(${value}% - ${value * 0.01 * 38}px)`;
    };

    let sliderDiv = document.createElement("div");
    sliderDiv.className = "sliderDiv";

    let labelLeft = document.createElement("span");
    labelLeft.innerHTML = from;
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
    labelRight.innerHTML = to;
    sliderDiv.appendChild(labelRight);

    containerDiv.appendChild(sliderDiv);
  }

  containerDiv.appendChild(output);
  survey.appendChild(containerDiv);
});
