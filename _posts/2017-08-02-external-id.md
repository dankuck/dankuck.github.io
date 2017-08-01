---
layout: post
title: "Alternatives to EXTERNAL_ID"
page_img: 
page_img_desc: ""
no_ad: 1
draft: 1
---

<img src="/assets/Screen Shot 2017-08-01 at 3.00.00 PM.png" />

You may have a bunch of fields in your database called `external_id`. This may distress you.

An external ID is a unique name for a record coming from some outside source.

For example: You may need to store a record about a Facebook user. So you need that user's id. 

You could store that ID in an `id` field, but really that should be the name of your own number that you made up for that user.

You could store that ID in a `facebook_id` field, but that really should be saved in case you 
have a table called `facebooks` and you need to reference one of its ids on this table.

So you use `external_id`. But you are tired of that an you feel like it doesn't give any information to the person who reads it.

Luckily, English has some other words you can use.

* extraneous_id: No, that makes it sound unimportant.
* foreign_id: Well, they are all foreign ids aren't they? That's not good either.
* alien_id: These are becoming less meaningful.
* exterior_id: No, exterior is a noun. What if we make an `exteriors` table? What it could happen.
* independent_id: That's almost useful actually.
* out_id: Um...?
* over_id: baddevsezwhat?
* peripheral_id: No, now people will look for a physical object.
* All the other ones are crap too.

I guess we'll just stick with `external_id`. It's really the best option. It makes its meaning clear. This ID is from some external place.

Just don't make a table called `externals`.
