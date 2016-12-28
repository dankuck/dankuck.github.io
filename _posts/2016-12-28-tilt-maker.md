---
layout: post
title: "Tilt Solver"
page_img: "/assets/tilt.jpg"
page_img_desc: "ThinkFun Tilt"
no_ad: 1
draft: 1
---

<a href="http://www.thinkfun.com">ThinkFun</a> is a maker of great games. The mentally stimulating kind. All the ones I've seen are the single-player variety.

The first one I ran into was <a href="www.amazon.com/Think-Fun-1001-ThinkFun-Tilt/dp/B004INGVJ4/ref=sr_1_2?tag=dankuck-20">Tilt</a>. It's inovative, it's simple enough for a 5 year old, and it's complicated enough to make a 35 year old spend a weekend building an online tool to solve it. So I did that.

The game board is a 5&times;5 grid. It comes with a stack of challenge cards that range from Easy to Expert. Each card shows a configuration of tiles.

* Grey tiles are stationary. As you play, they do not move.
* Blue and green tiles move as you play by tilting the board.

<div class="illustration">
    <img src="/assets/tilt-example.jpg" />
</div>

The board has a hole in the middle. The objective is to tilt the board left, right, forwards, and backwards to get only the green tiles to fall into the hole. If a blue tile falls in, you lose.

If you play it, you kind of want to just keep playing until you figure this thing out.

So I wanted to figure this thing out. I built the tool here to generate new cards. And if that's not enough, it solves them by attempting every possible move.

It stops as soon as it has exhausted every possible path. It's a little smart, because it notices if it is retrying the same path over again.

<script src="https://vuejs.org/js/vue.js"></script>

<div id="tilt-maker" style="clear: both">
  <tilt></tilt>
</div>

<script type="text/javascript" src="/TiltMaker/app.js"></script>
