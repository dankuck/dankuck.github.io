---
layout: post
title: "JavaScript and Broken Promises"
page_img: /assets/js.png
page_img_desc: ""
no_ad: 1
draft:
---

I Googled to see what happens if a JavaScript Promise never resolves. Google wasn't very informative; it only gave more questions. So I'm going to work it out.

The TL;DR is that it depends on the code you give it. There are no bad consequences, such as memory leaks, unless you give it code that would have had that problem anyway.

A JavaScript <a href="https://spin.atomicobject.com/2016/02/16/how-javascript-promises-work/">Promise</a> is an object that performs some work and then passes a result to a callback that it is given. There are important details I'm leaving out, of course, but that's the gist of it.

A broken Promise is like an uncle who went to travel the world and just never came back. Technically, he hasn't come back *yet*. You don't know why. He could have died or he might be lost or he might still want to come back. All you know is, he was suppose to bring you a t-shirt. And now you have no t-shirt.

The fact is that you can't be sure he won't come back and you can't be sure that a broken Promise isn't still doing its job (unless you know what's going on inside it or you can solve the <a href="https://en.wikipedia.org/wiki/Halting_problem">Halting Problem</a>).

The rest of this is gonna be technical. Oh you thought it already was technical. Well I promise it'll be imprecise as well, okay?

You'll probably want to go learn what a Promise is before continuing.

<h3>Broken Promises</h3>

When you instantiate a Promise, you give it a closure. Your closure then receives two callbacks, one to call when your closure is done doing its work, the other to call if an error occurs.

A broken Promise is one in which your closure never calls either of those callbacks.

Consider this:

```
var p = new Promise(function (resolve, error) {
    // do nothing
});
```

That's the simplest broken Promise. It should have some code that calls `resolve(someValue)`. When that happens `someValue` is saved and can be accessed later.

But if you never call `resolve`, nothing ever happens. Later attempts to access the data will fall on deaf ears, stalled out for eternity.

An attempt to access the data looks like this:

```
p.then(function (theData) {
  console.log(theData);
});
```

This is an attempt to retrieve the data and echo it to the console.

But it'll never happen. The closure you pass to `then` will be saved and not run until `resolve` is called. But. `resolve`. Isn't. Called.

And that's it. Everything else is normal.

<h3>Memory Leaks</h3>

Some people are concerned about adverse effects, especially memory leaks. This isn't a problem. No more than usual.

A memory leak happens when data is no longer accessible but remains in memory. That is, there are no variables that refer to it. Variables are the only way to access memory after it is allocated.

A garbage collector object internal to your JavaScript engine is supposed to find and remove objects that are no longer accessible. As JavaScript programmers, we can do nothing to either cause or avoid memory leaks, unless we know about bugs in our JavaScript engines.

A Promise fills a role which, at first glance, appears to violate the spirit of this. The Promise sticks around even if no variables point to it, when you might expect it to be garbage collected, so that it can later call the closures given to `then`.

So if this happens:

```
function x() {
    var p = ... some promise code ...
    p.then(function (data) {
        console.log(data);
    });
}

x();
```

When this code runs, you know that `p` is created, it is given a closure via `then`, and finally `p` goes out of scope and you think it can be garbage collected. But since you know that Promises are meant to avoid this problem, you imagine they are immune to garbage collection. That's where you're wrong.

The key is in that hidden part, the "some promise code". If it's what we wrote in our first example, then yes, it will be garbage collected as soon as possible:

```
function x() {
    var p = new Promise(function (resolve, error) {
        // do nothing
    });
    p.then(function (data) {
        console.log(data);
    });
}

x();
```

When the Promise is created, the closure is immediately run. The `resolve` is never called. The closure finishes. The `x()` function finishes. Nothing has any references to `p` anymore, so the Promise is garbage collected.

<h3>References You Forgot</h3>

That one should be intuitive. Let's look at another one that's a little sneakier.

```
function x() {
    new Promise(function funcA (resolve, error) {
        setTimeout(function funcB () {
            resolve('some data');
        }, 10000);
    }).then(function funcC (data) {
        console.log(data);
    });
}

x();
```

Now something interesting happens. First, I took out the variable `p` so there are no obvious references to the Promise. Then I named the closures so I could talk about them clearly here.

The timeout created by `setTimeout` calls `resolve` after a 10 second wait. In those 10 seconds, the `x()` function finishes. But the Promise remains in memory. It cannot be garbage collected, because of the timeout and the almighty SCOPE.

The secret is `setTimeout` and that `resolve` callback. The `setTimeout` function must keep its closures somewhere safe until it no longer needs them. `setTimeout` itself cannot be garbage collected because it is attached to the only non-garbage-collectible object, `window`. (I checked, even if you delete the identifier `setTimeout`, it still does its job, so there's probably something smart going on under the hood to keep it alive.)

Meanwhile, the `resolve` callback has to have a reference to the Promise within it or it wouldn't be able to do the job of setting the value inside the Promise.

So the chain of references looks like this:

`window` -> `setTimeout` -> `funcB` -> `resolve` -> `Promise`

The Promise will continue to exist as long as `resolve` exists. And on up the chain, they will all exist until `setTimeout` has no further use for `funcB`.

When `setTimeout` is done, and the Promise's `then` chain is complete, there will be no further references to the Promise or any of the closures, and they will be garbage collected. No memory leaks.

But we were talking about broken Promises. So let's make one last change to that example:

```
function x() {
    new Promise(function funcA (resolve, error) {
        setTimeout(function funcB () {
            // do nothing
        }, 10000);
    }).then(function funcC (data) {
        console.log(data);
    });
}

x();
```

In this case, we still have a timeout after 10 seconds. But now we have a broken Promise. It doesn't call `resolve` or `error`. Even though it doesn't use `resolve`, it still has the *reference* to `resolve`, so for those 10 seconds, the same chain of references from above still exists. And when the timeout is complete, the references are released and garbage collection can happen.

I hope you enjoyed the ride as I thought through broken Promises and some of the concerns I've seen others have. If you have any questions, I'd love to hear them. Promises seem kind of magical, and we make some <a href="http://www.datchley.name/promise-patterns-anti-patterns/">common mistakes</a> because we don't think of them quite right. Let  me know your thoughts in the posts on Facebook or Twitter below.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">What happens when a JavaScript Promise gets broken? Nothing much. <a href="https://t.co/8HAik75jnV">https://t.co/8HAik75jnV</a> <a href="https://twitter.com/hashtag/javascript?src=hash">#javascript</a> <a href="https://twitter.com/hashtag/promise?src=hash">#promise</a> <a href="https://t.co/t8U4Js6M7i">pic.twitter.com/t8U4Js6M7i</a></p>&mdash; Dan Kuck-Alvarez (@dankuck) <a href="https://twitter.com/dankuck/status/834975531426791425">February 24, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdankuck%2Fposts%2F10210101979360264&width=500" width="500" height="520" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
