---
layout: post
title: "I Can't See My Software"
page_img: /assets/2568645910_8d55b4541b_b.jpg
page_img_desc: "This is a terrible way to look at information."
no_ad: 1
draft: 1
---

Last week I had a conversation with my wife Patricia about messy computer code. It turns out architects don't have to deal with messes the same way software developers do.

I was dealing with some code at work that had been copied and modified four times.

In software development we have concepts like DRY code, where DRY means Don't Repeat Yourself, and spaghetti code which describes a single file where references jump around a lot.

These aren't things in architecture.

Whether you work on architecture software or put pencil to paper, you just don't have messes caused by excessive references and duplication. It's all visual. You can see any problems right in front of you in black and white.

If we can find a useful visualization of software, it will be one that shows any problems right in front of you in black and white. It'll eliminate a lot of mess automatically.

So I've heard of software visualization before. I go searching on Google and what I find doesn't thrill me.

exmaple example exmaple

Computer code visualization hasn't caught on. And it's probably because it's not very good. It's definitely not intuitive.

For one thing, code is just too abstract. There are too many things you might want to do. A generic set of visualizations for code might just be too useless. And so a useful visualization would have to be created each time a new piece of code was written, just for that code.

There's another issue. Code visualization treats code as data. But data usually represents what has happened while code represents something that needs to happen in the future.

If you visualise code as data, you're still visualising what has happened in the past. A developer wrote the code. That's the thing that has happened in the past. That's a useful thing to know about. It could help. But it's doesn't fulfill our need: to show any problems right in front of you in black and white.

So I'm on a quest to find a way to visualize code.

Maybe this quest is ill-advised. Software and architecture are different. The analogy might not be useful at all.

Architecture is visual by nature and more concrete than software. The blue print abstraction is very close to the final result, the actual built structure.

Software design is so abstract you don't even get to see the results during most of its lifetime. When your customers use it you don't get to watch over their shoulders, so a poor abstraction leads to very unexpected concrete results.

Architecture mostly has to hold still. That's its behavior.

But code has many different behaviors. It must give different outputs for different inputs.

This may mean that every piece of code visualization has to be custom built for every piece of code.

That's OK if it does. It's alright if we can't produce one library to turn any code into useful visualizations. We can still come up with techniques for developers to produce their own visualizations.

Here's a great example that one developer used: <a href="http://worrydream.com/LadderOfAbstraction/">Up and Down the Ladder of Abstraction</a>.

It maps out the several layers of abstraction in a particular piece of code, so the developer can grasp what happens when one variable or several variables are allowed to change.

If we could teach developers how to do that for themselves, then we could reach our goal: show any problems right in front of you in black and white.

<small>Page image created by <a href="https://www.flickr.com/photos/tt2times/2568645910">Tony Werman</a>.</small>
