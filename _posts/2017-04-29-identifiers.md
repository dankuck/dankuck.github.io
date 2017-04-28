---
layout: post
title: "The Trouble With Tags"
page_img: /assets/tag.png
page_img_desc: ""
no_ad: 1
draft: 1
---

Last year I lead a project to produce a web service that included a lot of tag-type data.

Along with all the major data, like `posts` and `stories`, there were `keywords`, `categories`, and a few variations on that theme. A tag is a simple phrase attached to data to help categorize and find it.

Since these tags are really just strings with foreign keys attached, the API gives and recieves them by name instead of using an id which would be traditional. The names make the API simple and transparent.

But I went a little too far. I didn't know when to stop.

It started with `content_providers`. It's only kind of like a tag. In the database structure, it has just a name and some foreign keys. That's the same structure as the other tag tables.

But conceptually, it's very different. It's an umbrella that much of the rest of the data hangs from.

And there are sub-providers that have a lot more information involved. URL's, TTL's, and other configurations. That should have been a clue. But I went ahead and identified `content_providers` and the sub-providers by name.

The trouble came to light after the whole thing was built and the product team said "Let's make the name field editable." Sounded fine.

But it turns out, when you're using the name field as an identifier, it's not fine to make the name field editable.

Suddenly a bunch of operations that stored the old name started failing.

When dealing with real tag-type data, if the client enters a search for a particular tag, any changes in the data should be improvements. The client should now be able to find what they want more easily and more often.

When dealing with real tag-type data, there is no extra configuration that lives with the tag. No baggage.

So I learned something about identifiers. Next time, I'll have these rules of thumb to know whether I'm really dealing with tags. If I'm not, then I'll make sure to use some constant identifier.

<div class="illustration">
    <img src="/assets/slug-1569009_960_720.jpg" />
    If anything happens, Desmond will be my constant.
</div>

There is a middle-ground. For these structures that are tag-like but have baggage and might need to change their names, the best identifier is a slug. 

A slug is a string identifier based on the name of the item. `this-is-an-example`. It's easy to read and it doesn't change, even if the name does.

A slug doesn't make sense for real tags. They are their names.

A slug might not make sense for a post. Maybe a regular integer id makes sense there.

A slug makes perfect sense for that middle ground.
