let data = [
  {
    q: "Wie ernährst du dich?",
    one: ["Ich esse alles", 1],
    two: [
      "Pescetarisch (Verzicht von Fleisch; Fisch, Krebs- und Weichtiere sowie Milch- und Eiprodukte werden gegessen",
      3,
    ],
    three: ["Flexitarisch (eingeschränkter Fleischkonsum)", 2],
    four: ["1 Vegan (Verzicht von allen tierischen Produkten)", 5],
    five: ["Vegetarisch (Verzicht von Fleisch und Fisch)", 4],
  },
  {
    q: "Wie oft wirfst du übrig gebliebenes Essen weg?",
    one: ["1 Mal pro Woche", 3],
    two: ["Nie", 5],
    three: ["1 Mal in 2 Wochen", 4],
    four: ["Täglich", 1],
    five: ["2 bis 3 Mal pro Woche", 2],
  },
  {
    q: "Wie oft lässt du dir Essen liefern oder gehst auswärts essen?",
    one: ["Weniger als 10 Mal im Jahr", 5],
    two: ["1 Mal pro Woche", 4],
    three: ["2 bis 3 Mal pro Woche", 2],
    four: ["1 bis 2 Mal pro Monat", 4],
    five: ["Täglich", 1],
  },
  {
    q: "Wie oft fliegst du mit dem Flugzeug (private Reisen, Geschäftsreisen ausgeschlossen; hin- und Rückflug als 1x gewertet)",
    one: ["1 Mal im Jahr", 3],
    two: ["Mehr als 5 Mal im Jahr", 1],
    three: ["Nie", 5],
    four: ["Bis zu 3 Mal im Jahr", 2],
    five: ["1 Mal in 2 Jahren", 4],
  },
  {
    q: "Welche Energieeffizienzklasse haben deine elektronischen Geräte überwiegend?",
    one: ["A++ oder A+++", 5],
    two: ["B oder C", 3],
    three: ["D oder E", 2],
    four: ["F oder G", 1],
    five: ["A+ oder A", 4],
  },
  {
    q: "Welches Fortbewegungsmittel nutzt du am häufigsten für kurze Strecken? (z.B.Arztbesuche, Einkauf, ...)",
    one: ["Auto", 1],
    two: ["Zu fuß 5", 5],
    three: ["Bus oder Straßenbahn", 2],
    four: ["Fahrrad", 4],
    five: ["E-Scooter oder E-Bike", 3],
  },
  {
    q: "Welches Fortbewegungsmittel nutzt du am häufigsten für längere Strecken? (z.B.Städtetrips, Besuch von Freunden aus entfernten Orten)",
    one: ["Bus", 4],
    two: ["Fahrgemeinschaften (Auto)", 3],
    three: ["Bahn", 5],
    four: ["Flugzeug", 1],
    five: ["Auto", 2],
  },

  {
    q: "Welchen Kraftstoff benötigt dein Auto?",
    one: ["Ich habe ein E-Auto", 5],
    two: ["Alternative Kraftstoffe wie Biodiesel, Erdgas oder Bioethanol", 3],
    three: ["Benzin", 2],
    four: ["Diesel", 1],
    five: ["Ich habe kein Auto", 4],
  },
  {
    q: "Wo kaufst du deine Kleidung?",
    one: ["Ausschließlich Online (z.B. Zalando oder Asos)", 1],
    two: ["Lokal und Online (herkömmliche sowie Second Hand kleidung)", 2],
    three: ["Second Hand Plattformen im Internet (z.B. Ebay oder Vinted)", 3],
    four: ["Herkömmliche lokale Geschäfte", 4],
    five: ["Lokale Second Hand Geschäfte", 5],
  },
  {
    q: "Auf welche Weise wird bei dir zuhause geheizt?",
    one: ["Solar", 5],
    two: ["Strom", 2],
    three: ["Öl oder Gas", 1],
    four: ["Wärmepumpe", 3],
    five: ["Holzofen", 4],
  },
];

let answers = ["", "", "", "", "", "", "", "", "", ""];
// let answers = [
//   "",
//   "two",
//   "three",
//   "four",
//   "five",
//   "one",
//   "",
//   "three",
//   "four",
//   "five",
// ];

let active_question = 0;
let answer_lock = 0;
let pawSize = 330;
let question_body = document.querySelector(".question_div").querySelector("p");
let question_order = document.getElementById("question_order");
let get_next_question = document.getElementById("get_next_question");
let koala_paw = document.getElementById("koala_paw");
let koala_image = document.getElementById("koala_image");
let marker_div = document.querySelector(".marker").querySelectorAll("div");
let answer_div = document.querySelectorAll(".single_answer");
let first_page = document.getElementsByClassName("first_page")[0];
let second_page = document.getElementsByClassName("second_page")[0];

const changeMarkerPill = () => {
  marker_div.forEach((item, index) => {
    if (index == active_question) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

const changePawSize = (points) => {
  console.log(pawSize);
  switch (points) {
    case 1:
      pawSize = pawSize + 10;
      break;
    case 2:
      pawSize = pawSize + 5;
      break;
    case 3:
      null;
      break;
    case 4:
      pawSize = pawSize - 5;
      break;
    case 5:
      pawSize = pawSize - 10;
      break;
    default:
      null;
      break;
  }

  koala_paw.style.height = pawSize + "px";
};

const loadQuestion = () => {
  question_order.innerHTML = active_question + 1;

  changeMarkerPill();

  question_body.innerHTML = data[active_question].q;
  answer_div[0].innerHTML = data[active_question].one[0];
  answer_div[1].innerHTML = data[active_question].two[0];
  answer_div[2].innerHTML = data[active_question].three[0];
  answer_div[3].innerHTML = data[active_question].four[0];
  answer_div[4].innerHTML = data[active_question].five[0];
};

// POPULATING QUESTION ON LOAD
loadQuestion();

//STORING ANSWER ON CLICK

const getKey = (index) => {
  let key = ["one", "two", "three", "four", "five"];
  return key[index];
};

answer_div.forEach((item, index) => {
  item.addEventListener("click", function () {
    if (answer_lock != 1) {
      answer_lock = 1;
      answer_div[index].classList.add("active");
      answers[active_question] = getKey(index);

      let point = data[active_question][getKey(index)][1];
      changePawSize(point);
    }
  });
});

// LOADING NEXT QUESTION
get_next_question.addEventListener("click", () => {
  if (active_question < data.length - 1) {
    active_question++;

    if (active_question == 9) {
      koala_image.src = "resources/koala-mit_schild-auswertung.png";
    }

    answer_lock = 0;
    answer_div.forEach((item) => item.classList.remove("active"));
    loadQuestion();
  } else {
    first_page.classList.add("hide");
    second_page.classList.add("show");
    calcAnswer();
  }
});

//POPULATING TABLE DATA

const calcAnswer = () => {
  let table_cell = document.querySelectorAll(".table_cell");

  let index_flag = 0,
    index_flag_2 = 0;

  table_cell.forEach((item, index) => {
    if (index % 3 == 0) {
      item.innerHTML = data[index / 3].q;
    }
    if (index % 3 == 1) {
      if (answers[index_flag] == "") {
        item.innerHTML = "--";
      } else {
        item.innerHTML = data[index_flag][answers[index_flag]][0];
      }
      index_flag++;
    } else if (index % 3 == 2) {
      if (answers[index_flag_2] == "") {
        item.innerHTML = "0/5";
      } else {
        item.innerHTML = data[index_flag_2][answers[index_flag_2]][1] + "/5";
      }
      index_flag_2++;
    }
  });
};
