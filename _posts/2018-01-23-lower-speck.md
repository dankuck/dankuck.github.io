---
layout: post
title: "Your Project Deserves a Requirements Doc"
page_img: /assets/gear-1127518_960_720.png
page_img_desc: ""
no_ad: 1
draft: 
---

In the last ten years as a software developer, I've worked on two major commercial products, three supporting projects, and countless personal projects. All of these were produced without any formal requirements documentation.

We had plenty of documents. Pages of paragraphs about what the software should do. Mockups upon mockups. Tickets and feature requests and emails scattered all over and thrown away when we launched.

So why don't we have one single document that tells us what the entire software is supposed to do in a formal breakdown?

Because that's our job.

## Whose Job Is It?

The developers and architects should have the job of writing down what we are told to do in a systematic way. We owe it to ourselves to keep a document with the requirements as we understand them.

We should break down the requirements into their smallest components. We should keep them all in a single place where we can look back at them later.

And each time we create one of these or make changes, we should show the changes to the managers who requested the changes. This gives them a chance to tell us if we have misunderstood what we were asked to do.

This is what we should be doing for our own sanity.

But there's more. This doesn't just let us remind ourselves later. It lets us see what's missing.

<div class="illustration small">
    <img src="/assets/porsche-outside.png" />
    Imagining the project.

    <img src="/assets/porsche-inside.png" style="margin-top: .5em"/>
    Realizing what you forgot.
</div>

Software changes are almost universally easier said than done. And its even easier for a manager to say too little about a requirement.

When we write our own requirements document, we can notice things that were really insufficiently specified.

All this, plus the document can assist us in time estimation and unit testing, too.

So why aren't developers already doing this?

It's easy to say we're just lazy. We are and that's our virtue.

But it's more than that.

Since we already have all these documents coming from management, we generally think we have enough. Since we really can work directly from the documents we're given, we just do. Requirements specification sounds like "their job". I'm here to design beautiful code.

But if we make requirements documents our job, we can do it the right way and get a lot of value for ourselves.

With that in mind, I came up with a specification for requirements documents.

## Lower Speck

It's called <a href="http://www.lowerspeck.org/">Lower Speck</a>. It's a single text-document you keep at the base of your project. There are some light-weight rules for how to keep it in order and reference it in your code. That way you can remember later why you wrote the code just so.

After unit tests, I'd say it's the best thing you can do for any project meant to last.

I'm going to write a series of posts about what I think it can do, and what experiences we have working with it at <a href="http://thatsus.com/">That's Us</a>. Let me know if you're a developer who decides to try it. I really want your feedback.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Your Project Deserves a Requirements Doc <a href="https://t.co/spFiBGenxV">https://t.co/spFiBGenxV</a> A simple requirements doc can clear up a lot of the hassle your team has to deal with on every new software feature and bug report <a href="https://twitter.com/hashtag/LowerSpeck?src=hash&amp;ref_src=twsrc%5Etfw">#LowerSpeck</a> <a href="https://t.co/QW5HYJ0pbg">pic.twitter.com/QW5HYJ0pbg</a></p>&mdash; Dan Kuck-Alvarez (@dankuck) <a href="https://twitter.com/dankuck/status/955835666763526144?ref_src=twsrc%5Etfw">January 23, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
