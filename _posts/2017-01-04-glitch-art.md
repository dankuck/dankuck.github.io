---
layout: post
title: "Glitch Art"
page_img: /assets/cat.jpeg
page_img_desc: ""
no_ad: 1
draft: 1
---

<style>
.gallery {
	clear: both;
}

.gallery img {
	float: left;
	width: 250px;
	max-height: 300px;
	padding-right: 1em;
}

.gallery a {
	display: block;
	clear: both;
}
</style>

<div class="illustration">
    <img src="/assets/4497531493_5a35527ab4_b.jpg" />
    <a href="https://www.flickr.com/photos/manueluna/4497531493">A cat with no glitches</a>.
</div>

Computers are really neat when they mess up. It's called a glitch. Strongly written software will detect glitches and stop operating. The idea is that it's better to stop than to do things wrong.

But it's more fun when the computer doesn't notice the glitch or tries to work with it anyway.

Glitch art is the deliberate introduction of glitches into images and videos to cause the computer to do something weird.

Imagine you printed a photo, but rather than printing it as it's meant to be seen, instead you print the bytes as numbers. That's several dozen pages of printing for a small photo.

Now just switch two pages. And feed the whole thing back into the computer.

You might imagine that your monkeying with the data would just move one square of the picture to another location. It turns out to be more complicated than that.

<a href="/glitcher/">I built a tool</a> that does this with just two bytes. It picks two numbers at random in the data of the image and switches them.

It works best with JPG images. You load up an image, then use the + button as many times as you like. The tool picks two numbers from the file randomly and switches them. There are also two undo buttons so you can be artistic about it. If you don't like the step you just took, go back and take another. You're guaranteed to get a different result.


<div class="gallery">
    <img src="/assets/7176125763_7eac68f450_b.jpg" />
    <img src="/assets/flower.jpeg" />
    <a href="https://www.flickr.com/photos/samjudson/7176125763">A flower</a>
</div>

<div class="gallery">
    <img src="/assets/15298729678_2c07dd01ec_b.jpg" />
    <img src="/assets/moon.jpeg" />
    <a href="https://www.flickr.com/photos/astrostew/15298729678">A moon</a>
</div>

<div class="gallery">
    <img src="/assets/23208918486_0bc6604ca1_b.jpg" />
    <img src="/assets/bike.jpeg" />
    <a href="https://www.flickr.com/photos/downstream/23208918486">A man on a bike</a>
</div>

<a href="/glitcher/">The Glitcher</a> is at this link. For the next step, I'd like to give it a nice interface and have it implement several different random methods. Like occasionally changing a section of the data to random numbers.
