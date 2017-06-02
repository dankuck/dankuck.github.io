---
layout: post
title: "Database Reporting Is Hard"
page_img: 
page_img_desc: ""
no_ad: 1
draft: 
---

The king of data storage is a kind of software called a relational database. MySQL, MS SQL, Postgre, and Oracle are some popular examples. They keep data in tables with rows and columns.

Say you have an account on a website. There's a row in a table in a database somewhere with your name, your signup date, and your encrypted password.

Say you put lots of photos on that website. Each one has a row in another table in the database with the location of the photo and your account id.

Relational databases handle all of this with ease. They even have a way to group rows together and get averages and sums for reporting.

In one way they make that easy. But in another way they are terrible at it.

That kind of thing -- grouping records together and making calculations -- is called aggregation and it can get really slow. 

Say I have one million users and I want to know the average number of photos they have posted. The fastest way to do this is to group the photos together by their account id, count them, and then get the average of that. It looks like this:

```sql
SELECT AVG(photo_count)
FROM (
    SELECT COUNT(*) 
    FROM photos
    GROUP BY account_id
)
```

It's a typical kind of request. But it's a pain in the butt to make it run. The database just wasn't ready for that. To answer that request it will have to make a new file with about a million records in it. Databases are slow at that.

And the more complicated your request, the slower it gets. For example, maybe you want the average number of photos just for people born before 1990. It gets even slower as you add requirements.

And oddly, there is no great advice on how to solve this problem. There's no magic bullet. You can't simply configure the database to tell it "I plan to be grouping by `photos.account_id` a lot, so could you plan on that?"

The best strategy I've heard of is to keep a running count in another separate table. E.g., every time a photo row is added to the photos table, go over to the photos_count table and add 1 to the count field.

This is a workable strategy. But it's not very friendly to the programmers who have to build and maintain it. There isn't a simple way to set this up. Instead it requires some careful thought. It may be quick to think up, but it's not effortless.

And it's prone to errors. So it needs to have a refresh option that occasionally pulls all the data again, the slow way, and rebuilds the counting table.

The weirdest part is that I can't find a lot of discussion about this. Even though I have to make slow reports like these once or twice a year, I haven't found much advice for doing it right. There was nothing about it in any of my college classes.

Maybe I just haven't found the right search terms. I'd figure that if someone knows what to do here -- maybe someone who took a few more databases classes -- they would have mentioned something about it on Stack Overflow in response to some question.

I hope someone will tell me they know the answer and that I've been missing something obvious in my search for this. In the meantime, I'll probably be solving this problem myself in a generalizable way for the Laravel PHP framework.
