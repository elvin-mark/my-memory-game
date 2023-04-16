import React, { useState } from "react";
import Grid from "./Grid";
import "./Game.css";

const Game = ({ numCards }) => {
  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  const listPokemons = [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    "charmander",
    "charmeleon",
    "charizard",
    "squirtle",
    "wartortle",
    "blastoise",
    "caterpie",
    "metapod",
    "butterfree",
    "weedle",
    "kakuna",
    "beedrill",
    "pidgey",
    "pidgeotto",
    "pidgeot",
    "rattata",
    "raticate",
    "spearow",
    "fearow",
    "ekans",
    "arbok",
    "pikachu",
    "raichu",
    "sandshrew",
    "sandslash",
    // "nidoran♀",
    "nidorina",
    "nidoqueen",
    // "nidoran♂",
    "nidorino",
    "nidoking",
    "clefairy",
    "clefable",
    "vulpix",
    "ninetales",
    "jigglypuff",
    "wigglytuff",
    "zubat",
    "golbat",
    "oddish",
    "gloom",
    "vileplume",
    "paras",
    "parasect",
    "venonat",
    "venomoth",
    "diglett",
    "dugtrio",
    "meowth",
    "persian",
    "psyduck",
    "golduck",
    "mankey",
    "primeape",
    "growlithe",
    "arcanine",
    "poliwag",
    "poliwhirl",
    "poliwrath",
    "abra",
    "kadabra",
    "alakazam",
    "machop",
    "machoke",
    "machamp",
    "bellsprout",
    "weepinbell",
    "victreebel",
    "tentacool",
    "tentacruel",
    "geodude",
    "graveler",
    "golem",
    "ponyta",
    "rapidash",
    "slowpoke",
    "slowbro",
    "magnemite",
    "magneton",
    // "farfetch'd",
    "doduo",
    "dodrio",
    "seel",
    "dewgong",
    "grimer",
    "muk",
    "shellder",
    "cloyster",
    "gastly",
    "haunter",
    "gengar",
    "onix",
    "drowzee",
    "hypno",
    "krabby",
    "kingler",
    "voltorb",
    "electrode",
    "exeggcute",
    "exeggutor",
    "cubone",
    "marowak",
    "hitmonlee",
    "hitmonchan",
    "lickitung",
    "koffing",
    "weezing",
    "rhyhorn",
    "rhydon",
    "chansey",
    "tangela",
    "kangaskhan",
    "horsea",
    "seadra",
    "goldeen",
    "seaking",
    "staryu",
    "starmie",
    // "mr. Mime",
    "scyther",
    "jynx",
    "electabuzz",
    "magmar",
    "pinsir",
    "tauros",
    "magikarp",
    "gyarados",
    "lapras",
    "ditto",
    "eevee",
    "vaporeon",
    "jolteon",
    "flareon",
    "porygon",
    "omanyte",
    "omastar",
    "kabuto",
    "kabutops",
    "aerodactyl",
    "snorlax",
    "articuno",
    "zapdos",
    "moltres",
    "dratini",
    "dragonair",
    "dragonite",
    "mewtwo",
    "mew",
  ];

  const initDeck = (numCards) => {
    let tmp = [];
    for (let i = 0; i < numCards / 2; i++) {
      let idx = Math.floor(Math.random() * listPokemons.length);
      tmp.push({ state: true, value: listPokemons[idx], clickable: true });
      tmp.push({ state: true, value: listPokemons[idx], clickable: true });
    }
    tmp = shuffleArray(tmp);
    return tmp;
  };

  const showAllCards = () => {
    const tmp = [...cards];
    tmp.forEach((e) => (e.state = false));
    setCards(tmp);
  };

  const hideAllCards = () => {
    const tmp = [...cards];
    tmp.forEach((e) => (e.state = e.clickable ? true : false));
    setCards(tmp);
  };

  const handleRestart = () => {
    setGameStarted(true);
    showAllCards();
    setTimeout(hideAllCards, 5000);
  };

  const checkWin = (deck) => {
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].state) return false;
    }
    return true;
  };

  const showWinner = () => {
    setTimeout(() => {
      setScore([0, 0]);
      setCards(initDeck(numCards));
    }, 2000);
    setWinPlayer(player);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    showAllCards();
    setTimeout(hideAllCards, 5000);
  };

  const [cards, setCards] = useState(initDeck(numCards));

  const [score, setScore] = useState([0, 0]);

  const [pair, setPair] = useState([]);

  const [player, setPlayer] = useState(0);
  const [winPlayer, setWinPlayer] = useState(-1);

  const [clickable, setClickable] = useState(true);

  const [gameStarted, setGameStarted] = useState(false);

  const tapCardSound = new Audio("./tap-card.wav");
  const cardMatchSound = new Audio("./card-match.wav");
  const cardNotMatchSound = new Audio("./card-not-match.wav");

  const updateCard = (index) => {
    tapCardSound.play();
    const tmp = [...cards];
    tmp[index].state = !tmp[index].state;
    tmp[index].clickable = false;
    setCards(tmp);
    const pairTmp = [...pair];
    pairTmp.push(index);
    if (pairTmp.length == 2) {
      if (tmp[pairTmp[0]].value == tmp[pairTmp[1]].value) {
        cardMatchSound.play();
        const scoreTmp = [...score];
        scoreTmp[player] += 2;
        setScore(scoreTmp);
        setPair([]);
        if (checkWin(tmp)) {
          showWinner();
        }
      } else {
        tmp[pairTmp[0]].clickable = true;
        tmp[pairTmp[1]].clickable = true;
        setCards(tmp);
        setClickable(false);
        cardNotMatchSound.play();
        setTimeout(() => {
          const playerTmp = (player + 1) % 2;
          setPlayer(playerTmp);
          hideAllCards();
          setPair([]);
          setClickable(true);
        }, 1000);
      }
    } else {
      setPair(pairTmp);
    }
  };

  return (
    <div className="game">
      <div className="scoreboard">
        <div className="player1-score">Player 1: {score[0]}</div>
        <div>Player {player + 1}</div>
        <div className="player2-score">Player 2: {score[1]}</div>
      </div>
      <div
        className={`player-${player ? "blue" : "red"} ${
          clickable ? "" : "grid-non-clickable"
        }`}
      >
        <Grid cards={cards} updateCard={updateCard} />
      </div>
      {!gameStarted ? (
        winPlayer >= 0 ? (
          <div className="top-screen">
            <span>🎉 Winner: {winPlayer + 1} 🎉</span>
            <div style={{ width: "100%" }}>
              <button className="restart-button" onClick={handleRestart}>
                Restart Game
              </button>
            </div>
          </div>
        ) : (
          <div className="top-screen">
            <div style={{ width: "100%" }}>
              <button className="restart-button" onClick={startGame}>
                Start Game
              </button>
            </div>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Game;
