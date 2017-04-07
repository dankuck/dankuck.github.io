---
layout: post
title: "Simulator for Guess Who to Find the Best Strategy"
page_img: /assets/guess-who-close.jpg
page_img_desc: ""
no_ad: 1
draft: 
---

<a href="http://www.amazon.com/Winning-Moves-Games-1191-Guess/dp/B00S732WJE/ref=sr_1_2?s=toys-and-games&ie=UTF8&qid=1491586221&sr=1-2&keywords=guess+who+board+game&tag=dankuck-20">Guess Who</a> has gotten popular at my house and now I'm obsessed.

It's a simple elimination game. Each player has a secret card with a face and name printed on it and a secret board of cards.

On each turn, the player asks their opponent a Yes/No question about their secret character. Then they eliminate any characters on their board that don't match the answer.

```
Does your character have a beard?

No.
```

<div class="illustration">
    <img src="/assets/guess-who.jpg" />
    I can see those those unused deck cards. Rookie mistake, little Emily.
</div>

Then all characters with beards should be removed.

When you've eliminated all but one character you shout the name and win.

If you're wrong, you lose. In normal play, you shouldn't be wrong. But you could be wrong if you answered too early. For example, if your opponent has two cards left on their board then they are about to win, and your best move might be to guess.

So the game is all about asking the right questions. Any strategy you use will be about that.

To really determine what strategy is the best, I built a simulator.

<a href="https://dankuck.github.io/who-guessers/">Play Who Guessers Now</a>

<img src="/assets/Screen Shot 2017-04-05 at 5.57.47 PM.png" class="screenshot" />

It plays all the strategies it knows against each other in hundreds of matches and records the statistics. Anyone familiar with the JavaScript programming language can add new strategies, too.

So far I've put in three strategies.

### SayAnything

This should be nearly the worst strategy ever.

SayAnything simply answers any name from its board immediately. It just guesses.

It's only clever in one way. It won't answer with the name that's on its own card. Since your opponent can't have the same card as you, it would be foolish to guess that name.

### PickAnyTrait

This one is currently the second worst. It looks at all the cards, and chooses any trait it finds. No matter how often the trait shows up. Sometimes it only matches a single card, so only that will be eliminated (or that will be the answer).

This is the strategy most young, new players will come up with first.

### PickMostCommonTrait

This one is currently the best. It looks at all the traits that cards have and picks the most common one.

Because of the way the cards are designed by Hasbro, this means it always eliminates either 5 or 19 cards on the first turn. It's fairly predictable.

### Next Steps

My next major push will be to improve the logs. Each match played has a log, but it's very sparse and so it is limited in how much it can help the designer to build a better strategy.

