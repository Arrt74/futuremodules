const randomMovieQuotes = [
  "Come on Francis, you are better than this!",
  "Strange things are afoot at the Circle-K",
  "Great Scott!!",
  "Say my name...",
  "I am the one who knocks",
  "I am serious. And don't call me Shirley.",
  "He might be okay. [Beat. Huge explosion.] Well, no, probably not now.",
  "Leave the gun. Take the cannoli.",
  "Is that all he said?",
  `Toto, I've got a feeling we're not in Kansas anymore.`,
  "E.T. phone home.",
  "Gentlemen, it has been a privilege playing with you tonight",
  "I'll never let go. I'll never let go, Jack.",
  "The destruction might in fact be very localised, limited to merely our own galaxy.",
  "the result of which could cause a chain reaction that would unravel the very fabric of the spacetime continuum.",
  "There's only one man who can help me!",
  "I know a guy... Who knows a guy who knows another guy...",
  "Time will not slow down when something unpleasant lies ahead.",
  "Who ya gonna call?"
];

const randomMovieQuotesPositive = [
  "Most excellent!",
  "Always drink plenty of water.",
  "We are the music makers, and we are the dream of the dreams.",
  "Good times ahead.",
  "Living happily ever after.",
  "Start each day with a grateful heart."
];

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const getRandomMovieQuote = () => {
  return randomMovieQuotes[getRandomInt(randomMovieQuotes.length)];
}

export const getRandomMovieQuotePositive = () => {
  return randomMovieQuotesPositive[getRandomInt(randomMovieQuotes.length)];
}
