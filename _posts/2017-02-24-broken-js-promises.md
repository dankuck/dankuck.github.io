---
layout: post
title: "JavaScript and Broken Promises"
page_img: 
page_img_desc: ""
no_ad: 1
draft: 1
---

I was curious what happens if a JavaScript Promise never resolves. Google wasn't very informative; it only gave more questions. So I'm going to work it out.

The TL;DR is that it depends on the code you give it. There are no bad consequences, such as memory leaks unless you give it code that would have had that problem anyway.

A JavaScript Promise is an object that performs some work and then passes a result to a callback that it is given. There are important details I'm leaving out, of course, but that's the gist of it.

A broken Promise is like an uncle who went to travel the world and just never came back. Technically, he hasn't come back yet. You don't know why. He could have died or he might be lost or he might not want to come back. All you know is, he was suppose to bring you a t-shirt. And now you have no t-shirt.

The rest of this is gonna be technical.

When you instantiate a Promise, you give it a closure. Your closure then receives two callbacks, one to call when your closure is done doing its work, the other to call if an error occurs.

A broken Promise is one in which your closure never calls either of those callbacks.

Consider this:

```
var p = new Promise(function (resolve, error) {
    // do nothing
});
```

That's the simplest broken Promise. It should have some code that calls `resolve()`. When that happens the value you give is save and can be accessed later.

But if you never call `resolve`, nothing ever happens. Later attempts to access the data will fall on deaf ears, stalled out for eternity.

An attempt to access the data looks like this:

```
p.then(function (theData) {
  console.log(theData);
});
```

This is an attempt to retrieve the data and echo it to the console.

But it'll never happen. The closure you pass to `then` will be saved and not run until `resolve` is called.

And that's it. Everything else is normal.

Some people are concerned about adverse effects, especially memory leaks. This isn't really a problem.

A memory leak happens when data is no longer accessible but remains in memory. That is, there are no variables that refer to it. Variables are the only way to access memory after it is allocated.

A garbage collector object internal to your JavaScript engine is supposed to find and remove objects that are no longer accessible. As JavaScript programmers there isn't anything we can do to either cause or avoid memory leaks, unless we know about bugs in our JavaScript engines.

A Promise has a job which, at first glance, appears to violate the spirit of this. The Promise sticks around even if no variables point to it, when you might expect it to be garbage collected, so that it can later call the closures given to `then`.

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

When this code runs, you know that `p` is created, it is given a `then` and then `p` goes out of scope and you think it can be garbage collected. But since you know that Promises are meant to avoid this problem, you think they are immune to garbage collection. That's where you're wrong.

The key is in that hidden part, the "some promise code". If it's what we wrote above, then yes, it will be garbage collected.

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

That one should be intuitive. Let's look at another one that's a little sneakier.

```
function x() {
    var p = new Promise(function (resolve, error) {
        setTimeout(function () {
            resolve('some data');
        }, 10000);
    });
    p.then(function (data) {
        console.log(data);
    });
}

x();
```

Now something interesting happens. The timeout created by `setTimeout` calls `resolve` after a 10 second wait. In those 10 seconds, the `x()` function finishes. But the `p` variable is not released. It cannot be garbage collected, because of the timeout and the almighty SCOPE.

