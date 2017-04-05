---
layout: post
title: "Who Guessers"
page_img: 
page_img_desc: ""
no_ad: 1
draft: 1
---

Guess Who has gotten popular at my house and as it has my obsession has grown.

It's a simple elimination game. Each player has a secret card with a face and name printed on it and a secret board of cards.

On each turn, the player asks the other a Yes/No question about their character. Then they eliminate any characters on their board that don't match the answer.

```
Does your character have a beard?

No.

Then all characters with beards should be removed.
```

When you've eliminated all but one character you shout the name and win.

If you're wrong, you lose. You're usually not wrong, but you are allowed to answer when ever you like. For example, if your opponent has two cards left on their board, then they are about to win, so you might be best off just guessing.

To really determine what strategy is the best, I built a simulator.

<a href="https://dankuck.github.io/who-guessers/">Who Guessers</a>

<img src="/assets/Screen Shot 2017-04-05 at 5.57.47 PM.png" />

It allows anyone familiar with the JavaScript programming language to add a program for a new strategy. Then it makes them compete in hundreds of matches and records the statistics.

So far I've put in three strategies.

### SayAnything

This should be nearly the worst strategy ever.

SayAnything simply answers any name from its board immediately. It just guesses.

Its only clever in one way. It eliminates the name of its own card from its list. Since cards come from a single deck, its opponent must clearly not have the same card.

### PickAnyTrait

This one is currently the second worst. It looks at all the cards, and chooses one trait that any one of them has. No matter how often the trait shows up. So each time it plays it will eliminate at least one card.

This is the strategy most new players will come up with first.

### PickMostCommonTrait

This one is currently the best. It looks at all the traits that cards have and picks the most common one.

Because of the way the cards are made by Hasbro, this almost always means it divides the board into 5 or 19 cards on the first turn.

### Next

To improve this, I plan to add some statistics about the number of moves required to win and improve the logs. Each match played has a log, but it's very sparse and so it is limited in how much it can help the designer to build a better strategy.

