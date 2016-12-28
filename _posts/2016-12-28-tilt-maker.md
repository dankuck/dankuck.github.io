---
layout: post
title: "Tilt Solver"
page_img: "/assets/tilt.jpg"
page_img_desc: "ThinkFun Tilt"
no_ad: 1
draft: 1
---

<a href="http://www.thinkfun.com">ThinkFun</a> makes great puzzle games.

<a href="www.amazon.com/Think-Fun-1001-ThinkFun-Tilt/dp/B004INGVJ4/ref=sr_1_2?tag=dankuck-20">Tilt</a> is innovative, basic enough for a 5 year old, and complicated enough to make a 34 year old spend a weekend building a web tool to solve it. See below.

<div class="illustration">
    <img src="/assets/tilt-example.jpg" />
</div>

The goal is to get those green tiles into the hole in the middle and keep the blue ones out. And you do all of this by tilting the board so the tiles slide.

The grey ones don't move meaning they control how the others fall.

The game comes with 40 cards marked Easy to Expert. Each one shows how to setup the tiles. I'm still trying to figure out if there's some tried and true way to measure the difficulty of a card.

Solving a game is interesting for a human, but for a computer it's really straight forward. Just try all the moves.

That's what the tool below does. First it generates a card randomly.

Then it starts tilting the board. If it can tilt more than one direction, it copies the board and tilts each copy a different direction. Then it keeps going.

If a blue tile hits the center hole, it stops playing that version of the board. If all the green tokens hit the center hole, it counts that a success.

If it notices that it's back in a position that it has been in before, it stops following that path, too. That's either a circle or it's a long way to get to some path that it has already been on before.

I could have had it find the first solution and stop. That's the goal of the game. Find the fastest way to get the greens in the hole. But nah, I wanted to see what else happened.

Then it shows it all to you! If you have the game, you can try it out. Or you can just look at the pretty pictures.

<script src="https://vuejs.org/js/vue.js"></script>

<div id="tilt-maker" style="clear: both">
  <tilt></tilt>
</div>

<script type="text/javascript" src="/TiltMaker/app.js"></script>
