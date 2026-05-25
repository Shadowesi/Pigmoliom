const questions = [
  {
    q: "Melyik ókori szerző örökítette meg leghíresebben a Pygmalion-mítoszt?",
    options: ["Vergilius", "Ovidius", "Homérosz", "Horatius"],
    correct: 1,
    exp: "Ovidius Metamorphoses (Átváltozások) c. művének X. könyvében olvasható a Pygmalion-történet."
  },
  {
    q: "Milyen anyagból faragta Pygmalion a szobrát?",
    options: ["Márványból", "Bronzból", "Elefántcsontból", "Alabástromból"],
    correct: 2,
    exp: "Pygmalion elefántcsontból (lat. ebur) alkotta meg a szobrot — ez szimbolizálja a tisztaságot és az átváltozást."
  },
  {
    q: "Melyik istennő keltette életre Pygmalion szobrát?",
    options: ["Artemisz", "Héra", "Aphrodité / Vénusz", "Athéné"],
    correct: 2,
    exp: "Aphrodité, a szerelem istennője hallgatta meg Pygmalion imáját és keltette életre Galateát."
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
    exp: "Ovidius nem adja meg a szobor nevét, de a hagyomány Galateának nevezi — jelentése „tejfehér"."
  },
  {
    q: "Melyik könyvben szerepel a Pygmalion-epizód a Metamorphosesben?",
    options: ["V. könyv", "VIII. könyv", "X. könyv", "XII. könyv"],
    correct: 2,
    exp: "A Pygmalion-történet a Metamorphoses X. könyvében található, amelyet Orpheus mesél el."
  },
  {
    q: "Ki írta a modern Pygmalion c. színdarabot (1913)?",
    options: ["Oscar Wilde", "George Bernard Shaw", "Henrik Ibsen", "Anton Csehov"],
    correct: 1,
    exp: "George Bernard Shaw 1913-ban írta Pygmalion c. darabját, amelyben Higgins professzor neveli Eliza Doolittle-t."
  },
  {
    q: "Melyik Oscar-díjas musicalfilm alapja Shaw Pygmalion c. darabja?",
    options: ["Cabaret", "My Fair Lady", "West Side Story", "An American in Paris"],
    correct: 1,
    exp: "My Fair Lady (1964) Audrey Hepburn főszereplésével — Shaw darabjának adaptációja, 8 Oscar-díjjal."
  },
  {
    q: "Mi a „Pygmalion-effektus" a pszichológiában?",
    options: [
      "Valaki saját tükörképébe szeret bele",
      "A pozitív elvárások javítják a teljesítményt",
      "Az alkotó beleszeret saját művébe",
      "A tökéletes társ utáni vágyakozás"
    ],
    correct: 1,
    exp: "A Pygmalion-effektus: a pozitív elvárások (pl. tanár → diák) valóban javítják az eredményt."
  },
  {
    q: "Ki az utóda Pygmalionnak és Galateának a mítosz szerint?",
    options: ["Adónisz", "Erósz", "Paphos", "Küprisz"],
    correct: 2,
    exp: "Paphos — akinek neve Ciprus egyik legfontosabb városának névadója — Pygmalion és Galatea gyermeke."
  }
];

let current = 0;
let score = 0;
let answered = false;

function render() {
  const q = questions[current];
  document.getElementById('q-counter').textContent = `${current + 1} / 10`;
  document.getElementById('q-num').textContent = `${current + 1}. kérdés`;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('q-bar').style.width = `${(current + 1) * 10}%`;
  document.getElementById('q-feedback').textContent = '';
  document.getElementById('btn-next').classList.add('hidden');
  answered = false;

  const optsEl = document.getElementById('q-options');
  optsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.textContent = opt;
    btn.onclick = () => pick(i);
    optsEl.appendChild(btn);
  });
}

function pick(idx) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const btns = document.querySelectorAll('.opt');

  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('show-ok');
  });

  const fb = document.getElementById('q-feedback');
  if (idx === q.correct) {
    btns[idx].classList.remove('show-ok');
    btns[idx].classList.add('correct');
    score++;
    document.getElementById('q-score').textContent = `✦ ${score}`;
    fb.style.color = '#7dca7d';
    fb.textContent = '✓ Helyes! — ' + q.exp;
  } else {
    btns[idx].classList.add('wrong');
    fb.style.color = '#d07070';
    fb.textContent = '✗ Nem jó. — ' + q.exp;
  }

  const btn = document.getElementById('btn-next');
  btn.classList.remove('hidden');
  btn.textContent = current < 9 ? 'Következő →' : 'Eredmény →';
}

document.getElementById('btn-next').addEventListener('click', () => {
  current++;
  if (current < questions.length) {
    render();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById('quiz-ui').style.display = 'none';
  const r = document.getElementById('quiz-result');
  r.classList.remove('hidden');
  document.getElementById('final-score').textContent = `${score}/10`;

  const msgs = [
    [0, 3, "A márványszobor még nem árulta el titkait... Próbáld újra!"],
    [4, 5, "Jó kezdet! Pygmalion szeretné, ha mélyebbre ásnál."],
    [6, 7, "Szép teljesítmény — a szobor formát ölt kezeid közt!"],
    [8, 9, "Kiváló! Aphrodité maga is elégedett lenne."],
    [10, 10, "Tökéletes! Galatea is büszke lenne rád!"]
  ];

  let msg = msgs[0][2];
  for (const [lo, hi, text] of msgs) {
    if (score >= lo && score <= hi) { msg = text; break; }
  }
  document.getElementById('result-msg').textContent = msg;
}

function restartQuiz() {
  current = 0; score = 0; answered = false;
  document.getElementById('q-score').textContent = '✦ 0';
  document.getElementById('quiz-ui').style.display = 'block';
  document.getElementById('quiz-result').classList.add('hidden');
  render();
}

render();
