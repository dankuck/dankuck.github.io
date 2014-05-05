---
layout: post
title: "PHP Fatal Errors Don't Have To Be So Painful"
---

PHP is probably the most common programming language on the web. You use webpages that are based on it every day, for sure.

It got so common by being highly-usable. But that doesn't mean it was well made.

For example, every language has to deal with errors. PHP has grown up around a strange mixture of different error handling. In the best cases, PHP will have options when an error is detected:

"Sorry, you can't divide X by 0. Oh, you have some code for dealing with errors? Great, I'll let it handle this error." Then, if you're using that website it probably sends you to a page that says "Oops, something went wrong." In the meantime the program can send an email to the programmer with a detailed explanation of what you were trying to do and how PHP reached the particular line of problematic code.

That's an awfully nice way to deal with errors, in the best case. But in other cases, PHP just stops cold in its tracks. The user of the website gets to see whatever work was done so far and is faced with the question of what to do next. PHP calls these *Fatal Errors*.

Even the programmer is faced with the question of what to do next. See, that error generates a message that gets dumped into a log file. And the error message looks like this:

[2014-05-05 13:35:00] /opt/awesome-real-program/LOL.php : 115 : Cannot call haters_gonna_hate() on a non-object.

That gobbledy-gook is clear to a programmer: On line 115 of the file LOL.php an error happened because the wrong kind of data got into the wrong variable. And it happened at 1:35 PM on Monday, Cinco de Mayo, when I was writing this.

But now what? There's very little to go on here. The programmer knows where the code blew up, but he doesn't necessarily know what path the code followed to get there. He might not even know what the user was trying to do, he can't watch everybody, he was playing Mortal Kombat in the break room at the time.

Well, programmers are smart and they can come up with a few guesses to test. But they sure could use some help.

Here's a way to help yourselves, PHP programmers.

Depending on your code structure -- let's say you're using an MVC pattern -- you can choose strategic code points to set a new error log file. For example, right before your boot strap code calls the controller, run this line:

ini_set('error_log', "/awesome-real-log-path/controller-{$controller_name}.log"); // be sure to sanitize that $controller_name

Now when you go looking at logs, you'll have to look at more files, but they will go far in helping you figure out what was going on.

You could get even more detailed. "/awesome-real-log/$controller-$action-$username-$id-$etc", but try to find some balance so you don't end up with thousands of files. You've gotta consider how you're gonna keep them all straight.

I'm using this pattern in a production environment and it makes me smile every time I need it.

Tell me why I'm wrong and stupid in the comments. Especially the latter. :)
