---
layout: post
title: "Tilt Solver"
page_img: "/assets/tilt.jpg"
page_img_desc: "ThinkFun Tilt"
no_ad: 1
draft: 1
---

<a href="http://www.thinkfun.com">ThinkFun</a> makes great puzzle games.

<a href="www.amazon.com/Think-Fun-1001-ThinkFun-Tilt/dp/B004INGVJ4/ref=sr_1_2?tag=dankuck-20">Tilt</a> is innovative, basic enough for a 5 year old, and just complicated enough to make a 34 year old spend a weekend building a web tool to solve it. See below.

<div class="illustration">
    <img src="/assets/tilt-example.jpg" />
</div>

The goal is to get those green tiles into the hole in the middle and keep the blue ones out. And you do all of this by tilting the board so the tiles slide.

The grey ones don't move, meaning they control how the others fall.

Solving a game is interesting for a human, but for a computer it's really straight forward. Just try all the moves.

That's what the tool below does. First it places tiles randomly.

Then it starts tilting the board. If it can tilt in more than one direction, it copies the board and tilts each copy in a different direction. Then it keeps going.

If a blue tile hits the center hole, it stops playing that version of the board. If all the green tokens hit the center hole, it counts that a success.

If it notices that it's back in a position that it has been in before, it stops following that path, too. That's either a circle or it's a long way to get to some path that it has already been on before.

It can find a solution pretty quickly, but then it continues. It finds <em>all</em> the solutions and all the dead ends as well.

Then it shows it all to you! Click the <b>Run</b> button below to see the puzzle solved. Or not solved, since there is not always a solution.

Maybe I'll solve another of ThinkFun's games in another post. We just got <a href="www.amazon.com/Laser-Maze-Junior-Board-Game/dp/B00T5UZ9KC/ref=sr_1_1?tag=dankuck-20">Laser Tag, Jr</a>.

<script src="https://cdn.rawgit.com/vuejs/vue/v2.1.6/dist/vue.min.js"></script>

<div id="tilt-maker" style="clear: both">
  <tilt></tilt>
</div>

<script type="text/javascript" src="/TiltMaker/app.js"></script>
