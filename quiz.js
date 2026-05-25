var questions = [
  {
    q: "Melyik ókori szerző örökítette meg leghíresebben a Pygmalion-mítoszt?",
    options: ["Vergilius", "Ovidius", "Homérosz", "Horatius"],
    correct: 1,
    exp: "Ovidius Metamorphoses c. művének X. könyvében olvasható a Pygmalion-történet."
  },
  {
    q: "Milyen anyagból faragta Pygmalion a szobrát?",
    options: ["Márványból", "Bronzból", "Elefántcsontból", "Alabástromból"],
    correct: 2,
    exp: "Pygmalion elefántcsontból (lat. ebur) alkotta meg a szobrot."
  },
  {
    q: "Melyik istennő keltette életre Pygmalion szobrát?",
    options: ["Artemisz", "Héra", "Aphrodité / Vénusz", "Athéné"],
    correct: 2,
    exp: "Aphrodité, a szerelem istennője hallgatta meg Pygmalion imáját."
  },
  {
    q: "Melyik szigethez kapcsolódik a Pygmalion-mítosz?",
    options: ["Kréta", "Ciprus", "Lesbos", "Rhodosz"],
    correct: 1,
    exp: "A mítosz Cipruson játszódik — Aphrodité legszentebbnek tartott szigetén."
  },
  {
    q: "Mi a neve az életre kelt szobornak a késő antik hagyományban?",
    options: ["Kalüpszó", "Galatea", "Penélopé", "Ariadné"],
    correct: 1,
    exp: "A hagyomány Galateának nevezi a szobrot — jelentése: tejfehér."
  },
  {
    q: "Melyik könyvben szerepel a Pygmalion-epizód a Metamorphosesben?",
    options: ["V. könyv", "VIII. könyv", "X. könyv", "XII. könyv"],
    correct: 2,
    exp: "A Pygmalion-történet a Metamorphoses X. könyvében található."
  },
  {
    q: "Ki írta a modern Pygmalion c. színdarabot 1913-ban?",
    options: ["Oscar Wilde", "George Bernard Shaw", "Henrik Ibsen", "Anton Csehov"],
    correct: 1,
    exp: "George Bernard Shaw írta a Pygmalion c. darabot, amelyben Higgins professzor neveli Elizát."
  },
  {
    q: "Melyik musicalfilm alapja Shaw Pygmalion c. darabja?",
    options: ["Cabaret", "My Fair Lady", "West Side Story", "An American in Paris"],
    correct: 1,
    exp: "My Fair Lady (1964) Audrey Hepburn főszereplésével — 8 Oscar-díjat nyert."
  },
  {
    q: "Mi a Pygmalion-effektus a pszichológiában?",
    options: [
      "Valaki saját tükörképébe szeret bele",
      "A pozitív elvárások javítják a teljesítményt",
      "Az alkotó beleszeret saját művébe",
      "A tökéletes társ utáni vágyakozás"
    ],
    correct: 1,
    exp: "A Pygmalion-effektus: a pozitív elvárások (pl. tanár a diák felé) valóban javítják az eredményt."
  },
  {
    q: "Ki Pygmalion és Galatea gyermeke a mítosz szerint?",
    options: ["Adónisz", "Erósz", "Paphos", "Küprisz"],
    correct: 2,
    exp: "Paphos — akinek neve Ciprus egyik városának névadója — Pygmalion és Galatea gyermeke."
  }
];

var current = 0;
var score = 0;
var answered = false;

function render() {
  var q = questions[current];
  var total = questions.length;

  document.getElementById('q-counter').textContent = (current + 1) + ' / ' + total;
  document.getElementById('q-num').textContent = (current + 1) + '. kérdés';
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('q-bar').style.width = ((current + 1) / total * 100) + '%';

  var fb = document.getElementById('q-feedback');
  fb.textContent = '';
  fb.style.color = '#a09070';

  document.getElementById('btn-next').classList.add('hidden');
  answered = false;

  var optsEl = document.getElementById('q-options');
  optsEl.innerHTML = '';
  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'opt';
    btn.textContent = q.options[i];
    btn.setAttribute('data-idx', i);
    btn.addEventListener('click', handleClick);
    optsEl.appendChild(btn);
  }
}

function handleClick(e) {
  if (answered) return;
  answered = true;

  var idx = parseInt(e.currentTarget.getAttribute('data-idx'));
  var q = questions[current];
  var btns = document.querySelectorAll('.opt');

  for (var i = 0; i < btns.length; i++) {
    btns[i].disabled = true;
    if (i === q.correct) btns[i].classList.add('show-ok');
  }

  var fb = document.getElementById('q-feedback');
  if (idx === q.correct) {
    btns[idx].classList.remove('show-ok');
    btns[idx].classList.add('correct');
    score++;
    document.getElementById('q-score').textContent = score + ' pont';
    fb.style.color = '#7dca7d';
    fb.textContent = 'Helyes! — ' + q.exp;
  } else {
    btns[idx].classList.add('wrong');
    fb.style.color = '#d07070';
    fb.textContent = 'Nem jó. — ' + q.exp;
  }

  var nextBtn = document.getElementById('btn-next');
  nextBtn.classList.remove('hidden');
  nextBtn.textContent = current < questions.length - 1 ? 'Következő →' : 'Eredmény →';
}

function showResult() {
  document.getElementById('quiz-ui').style.display = 'none';
  var resultEl = document.getElementById('quiz-result');
  resultEl.classList.remove('hidden');
  document.getElementById('final-score').textContent = score + '/' + questions.length;

  var msgs = [
    [0,  3,  "A márványszobor még nem árulta el titkait... Próbáld újra!"],
    [4,  5,  "Jó kezdet! Pygmalion szeretné, ha mélyebbre ásnál."],
    [6,  7,  "Szép teljesítmény — a szobor formát ölt kezeid közt!"],
    [8,  9,  "Kiváló! Aphrodité maga is elégedett lenne."],
    [10, 10, "Tökéletes! Galatea is büszke lenne rád!"]
  ];

  var msg = msgs[0][2];
  for (var i = 0; i < msgs.length; i++) {
    if (score >= msgs[i][0] && score <= msgs[i][1]) { msg = msgs[i][2]; break; }
  }
  document.getElementById('result-msg').textContent = msg;
}

function restartQuiz() {
  current = 0;
  score = 0;
  answered = false;
  document.getElementById('q-score').textContent = '0 pont';
  document.getElementById('quiz-ui').style.display = 'block';
  document.getElementById('quiz-result').classList.add('hidden');
  render();
}

// Init
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-next').addEventListener('click', function () {
    current++;
    if (current < questions.length) {
      render();
    } else {
      showResult();
    }
  });
  render();
});
