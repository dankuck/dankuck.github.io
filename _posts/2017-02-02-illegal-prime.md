---
layout: post
title: "Illegal Prime"
page_img: 
page_img_desc: ""
no_ad: 1
draft: 1
---

A friend on Facebook posted the link to <a href="https://en.wikipedia.org/wiki/Illegal_prime">Illegal Prime on Wikipedia</a> and asked this:

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fzdravko.smilevski%2Fposts%2F10154832887404002&width=500" width="500" height="646" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>

<div style="display: none">
    can someone clarify this:
    [One of the earliest illegal prime numbers was generated in March 2001 by Phil Carmody. Its binary representation corresponds to a compressed version of the C source code of a computer program implementing the DeCSS decryption algorithm, which can be used by a computer to circumvent a DVD's copy protection.]
    why is it important that the _binary_ representation of this prime number match the compressed version of the c _source_ code? that seems rather arbitrary.
    how do you even achieve that?
</div>

Here's how I responded:

They probably tried compressing the source code several ways until they got a prime number. Just for funsies. 

The word binary is superfluous. All numbers have a binary form and a decimal form. And all programs can be expressed as numbers in either form. Mentioning binary helped the author clarify that they were relating a number to a computer program.

The reason they used source code is because it has much more ability to compress than compiled code. Which means it can be compressed in different ways, and they could look for a prime number (because prime numbers are fun I guess). Source code is also agnostic about what type of computer it runs on, so it has the greatest reach. I.e., symbolically it is more free, and part of the point of this was to give DVD data freedom.