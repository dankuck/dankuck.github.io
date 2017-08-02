---
layout: post
title: "There Are No Alternatives To EXTERNAL_ID"
page_img: 
page_img_desc: ""
no_ad: 1
draft: 
---

<img src="/assets/Screen Shot 2017-08-01 at 3.00.00 PM.png" />

You may have a bunch of fields in your database called `external_id`. This may distress you.

An external ID is a unique name for a record coming from some outside source.

For example: You may need to store a record about a Facebook user. So you need to keep that user's ID in your database.

You could store that ID in a field named `id`, but really that should be the name of your own number that you made up for that user.

You could name the field `facebook_id`, but that really should be saved in case you 
have a table called `facebooks` and you need to reference one of its ids on this table.

So you use `external_id`. But you are tired of that, and you feel like it doesn't give any information to the person who reads it.

Luckily, the thesaurus has some other words you can try.

* `extraneous_id` - No, that makes it sound unimportant.
* `foreign_id` - Well, foreign ID means something else. That's not good either.
* `alien_id` - These are becoming less meaningful.
* `exterior_id` - No, exterior is a noun. What if we make an `exteriors` table? Well, it could happen.
* `independent_id` - That's almost useful actually.
* `out_id` - Um...?
* `over_id` - See above.
* `peripheral_id` - No, now people will look for a physical object.
* All the other ones are crap, too.

I guess we'll just stick with `external_id`. It's really the best option. It makes its meaning clear. This ID is from some external place. Hopefully the table's own name explains what external place.

Just don't make a table called `externals`.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">How I learned to relax and love external_id <a href="https://t.co/BLpZ1S8cah">https://t.co/BLpZ1S8cah</a> <a href="https://t.co/sGC1OyqqnJ">pic.twitter.com/sGC1OyqqnJ</a></p>&mdash; Dan Kuck-Alvarez (@dankuck) <a href="https://twitter.com/dankuck/status/892755528836894720">August 2, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
