---
layout: post
title: "Computer Code Visualization"
page_img: matrix code.jpg
page_img_desc: ""
no_ad: 1
draft: 1
---

Last week, I tried to have a conversation with my wife Patricia about messy computer code. It turns out architects don't have to deal with messes the same way software developers do.

I was dealing with some code at work that had been copied and modified four times.

In software development we have concepts like DRY code, where DRY means Don't Repeat Yourself, and spaghetti code which describes a single file where references jump around a lot.

These aren't things in architecture.

Whether you're working on architecture software like AutoCAD or graphing things old school, you just don't have messes caused by excessive references and duplication. It's all visual. You can see any problems right in front of you in black and white.

If we can find a useful visualisation of software, it will be one that shows any problems right in front of you in black and white. It'll eliminate a lot of mess automatically.

So I've heard of software visualisation before. I go searching on Google and what I find doesn't thrill me.

exmaple example exmaple

Computer code visualization hasn't caught on. And it's probably because it's not very good. It's definitely not intuitive.

One reason might be that code is just too abstract. There are too many things you might want to do. A generic set of visualizations for code might just be too useless. And so a useful visualization would have to be created each time a new piece of code was written, just for that code.

Another reason is that code visualisation treats code as data. But data usually represents what has happened. And code represents something that needs to happen in the future.

If you visualise code as data, you're still visualising what has happened in the past. The thing that has happened in the past is that a developer wrote some code. That's a useful thing to know about. It could help. But it's doesn't fulfill the need: to show any problems right in front of you in black and white.

So I'm on a quest to find a way to visualize code.

Maybe this quest is ill-advised. Software and architecture are different. The analogy might not be useful at all.

Architecture is visual by nature and more concrete than software. It's abstraction, the blue print, is very close to the final result, the structure.

Software design is so abstract that you don't even get to see the results during most of its lifetime. Almost all of the usages of your software will be by your customers and you don't get to watch over their shoulders, so they could do things that make it behave very differently.

Architecture mostly has to hold still. That's its behavior.

But code has many different behaviors. It's expected to give different outputs for different inputs.

This may mean that every piece of code visualisation has to be custom built for every piece of code.

That's OK if it does. It's alright if we can't produce one library to simply feed in code and get out the most useful visualisation. We can still come up with techniques for how developers can produce their own visualisations.

Here's a great example that one developer used. <Car example>

It maps out the several layers of abstraction, so that the developer can grasp what happens when one variable or several variables are allowed to change.

If we could teach developers how to do that for themselves, then we could reach our goal: show any problems right in front of you in black and white.

