---
layout: post
---

PHP is probably the biggest programming language on the web. You use webpages that are based on it every day, for sure.

It got that way by being highly-usable. But that doesn't mean it was well made.

For example, every language has to deal with errors. PHP has grown up around a strange mixture of different error handling. In the best cases, PHP will have options when an error is detected. 

"Sorry, you can't divide X by 0. Oh, you have some code for dealing with errors? Great, I'll let it handle this error." Then, if you're using that website it probably sends you to a page that says "Oops, something went wrong." In the meantime the program can send an email to the programmer with a detailed explanation of what you were trying to do and how PHP reached the particular line of problematic code.

That's an awfully nice way to deal with errors, in the best case. But in other cases, PHP just stops cold in its tracks. The user of the website gets to see whatever part of the page was created before the error and is faced with the question of what to do next.

Even the programmer is faced with the question of what to do next. See, that error gets dumped into a file called error_log. And the error looks like this:

[2014-05-05 13:35:00] /opt/awesome-real-program/LOL.php : 115 : Cannot call haters_gonna_hate() on a non-object.

That gobbledy-gook is clear to a programmer: On line 115 of the file LOL.php an error happened because the code tried to use a piece of data the wrong way. And it happened at 1:35 PM on Monday, Cinco de Mayo, when I was writing this.

But now what? There's very little to go on here. The programmer knows where the problem became something PHP can't handle, but he doesn't necessarily know how it got there. He might not even know what the user was trying to do, it's not like he was looking over their shoulder.

Well, programmers are smart and they can come up with a few guesses to test. But they sure could use some help.

Here's a way to help yourselves, PHP programmers.

Depending on your code structure -- let's say you're using an MVC pattern -- you can choose strategic code points to set a new error log file. For example, right before your boot strapping code hands off control to the controller, run this line:

ini_set('error_log', "/awesome-real-log-path/controller-{$controller_name}.log"); // be sure to sanitize that $controller_name

Now when you go looking at logs, you'll have to look at more files, but they will go far in helping you figure out what was going on.

You could get even more detailed. "/awesome-real-log/$controller-$action-$username-$id-$etc", but try to find some balance so you don't end up with thousands of files. You've gotta consider how you're gonna keep them all straight.

I'm using this pattern in a production environment and it makes me smile every time I need it.
