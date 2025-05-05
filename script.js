const questions = document.getElementById("question");
let i = 0;
let j = 0;
let a = 1;
let maxVal;
const total = {
  Medical: 0,
  Technical: 0,
  Creative: 0,
  Business: 0,
  Public_Services: 0,
  Skilled_Trades: 0,
};

const field = [
  "Medical",
  "Technical",
  "Creative",
  "Business",
  "Public Services",
  "Skilled Trades",
];

const information = {
  0: "career",
  1: "description",
  2: "required_skills",
  3: "education",
  4: "average_salary_inr",
  5: "industry",
};

function showQuestion() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("questionPage").style.display = "block";
  nextQuestion();
}

function nextQuestion() {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions.textContent = `${a}. ${data[field[i]][j]}`;
      j++;
      a++;
    });

  if (i != 0 || j != 0) {
    getResult();
  }
  if (j > 9) {
    i++;
    j = 0;
    if (i == 6) {
      i = 0;
      resutlScreen();
      document.getElementById("questionPage").style.display = "none";
    }
  }
}

function getResult() {
  const selected = document.querySelector('input[name="Answer"]:checked');
  switch (i) {
    case 0:
      total.Medical = total.Medical + Number(selected.value);
      break;
    case 1:
      total.Technical = total.Technical + Number(selected.value);
      break;
    case 2:
      total.Creative = total.Creative + Number(selected.value);
      break;
    case 3:
      total.Business = total.Business + Number(selected.value);
      break;
    case 4:
      total.Public_Services = total.Public_Services + Number(selected.value);
      break;
    case 5:
      total.Skilled_Trades = total.Skilled_Trades + Number(selected.value);
      break;
  }

  setInterval(() => {
    selected.checked = false;
  }, 180);
}

function resutlScreen() {
  const urResult = document.getElementById("urResult");
  const med = document.getElementById("med");
  const tec = document.getElementById("tec");
  const cre = document.getElementById("cre");
  const bus = document.getElementById("bus");
  const pub = document.getElementById("pub");
  const ski = document.getElementById("ski");
  const resultPage = document.getElementById("resultPage");
  maxVal = Object.entries(total).reduce(
    (max, current) => {
      return current[1] > max[1] ? current : max;
    },
    ["", -Infinity]
  );
  resultPage.style.display = "block";
  med.innerText = "🟩".repeat(total.Medical / 5);
  tec.innerText = "🟩".repeat(total.Technical / 5);
  cre.innerText = "🟩".repeat(total.Creative / 5);
  bus.innerText = "🟩".repeat(total.Business / 5);
  pub.innerText = "🟩".repeat(total.Public_Services / 5);
  ski.innerText = "🟩".repeat(total.Skilled_Trades / 5);
  urResult.textContent = maxVal[0];
}
function careerSlide() {
  resultPage.style.display = "none";
  const final = document.getElementById("final");
  final.style.display = "block";
  loadSlide();
}

function loadSlide() {
  const uResult = document.getElementById("uResult");
  uResult.textContent = maxVal[0];
  const info = document.querySelectorAll(".info");
  console.log(info);
  fetch("career.json")
    .then((response) => response.json())
    .then((data) => {
      let h = 0;
      for (let k = 0; k < 10; k++) {
        for (let l = 0; l < 6; l++) {
          info[h].innerText = data[maxVal[0]][k][information[l]];
          h++;
        }
        linkUpdate(data);
      }
    });
}

function linkUpdate(data) {
  const links = document.querySelectorAll(".link");
  for (let m = 0; m < 10; m++) {
    links[m].href = `
https://www.google.com/search?q=${data[maxVal[0]][m].career}
`;
  }
}
