---
layout: post
todo: "needs more emphasis on the date ranges as the primary key"
---

MySQL supports several kinds of time-related datatypes.

# DATETIME - stores a date and a time
# DATE - stores a date only
# TIME - stores a time only

I can see why you'd want to store a time only, but I had trouble determining why you'd want to store a date only.

Generally, dates describe either events scheduled for the future or events that have happened in the past.

All events have a time as well. In some cases you don't know the time of an event scheduled in the future. That's one use case for a date-only field.

"Use case 1: Time is unknown"

Sometimes the specific time of an event, future or past, is less important than the amount of data that can be saved by leaving the time off. This should be rare, because we live in a time of cheap storage.

"Use case 2: Trying to save storage space"

Neither of those seems like a great reason to ignore potentially useful data.

But I've been evolving a thought process.

Often, you'll want to store a time-range, with a beginning time and an ending time. This is one place where a date-only field could be attractive as long as you're willing to only refer to a day-long period of time. If you just use a DATE field, you can refer to the entire day in one shot.

"Use case 3: Time ranges"

With DATETIME fields, you'd have to store the beginning DATETIME and the ending DATETIME as separate fields.

Or do you? Technically you could just store a DATETIME with a time of midnight. But that *is* a case of wasted data storage.

Frankly, if you use a DATETIME field, you will be tempted to store the beginning DATETIME and the ending DATETIME as separate fields, so that you can have arbitrary beginnings and endings. And now you're setting yourself up for trouble.

== The Real Trouble ==

You shouldn't have to limit yourself to a one-day period of time just to store date ranges.

But arbitrary DATETIME ranges are difficult to query and difficult to index. Oh and it's difficult to make sure they never overlap, if that's something you need. 

If you're willing to deal with a specific chunk of time, but you don't want it to be one-day long, there is a solution.

Let's say you want to create a table where every record refers to an hour of time. Just set the minutes and the seconds to 0. Your primary key values should all look like "2014-04-30 12:00:00". When you use the data, it's up to you to remember that this means "the hour of time starting at 2014-04-30 12:00:00". You can remember that, right?

That's simple enough. But what if you want 12-minute time periods? Now we're having fun.

To do that you could store the first second of each 12-minute period. Any time you need to query this database, you can round times down to the most recent first-second and search the database for that.

Let's say you want to find the 12-minute period for 2014-04-30 16:24:46, the time I'm writing this.

2014-04-30 16:24:46 = 1398875086 in "UNIX epoch time"

12 minutes = 720 seconds

1398875086 % 720 will give you the number of seconds since the last 12-minute boundary second.

1398875086 - 1398875086 % 720 = 1398875040

1398875040 = 2014-04-30 16:24:00

So the primary key is 2014-04-30 16:24:00 for the time period I'm currently in.

And that'll be the primary key until 2014-04-30 16:36:00.

This works equally well for 245-second periods.

The only draw back is that it's still possible to store dates that are not on a boundary. If someone accidentally gets a record into the database with 2014-04-30 16:36:01, it could throw off whatever calculations you're trying to generate.

== But I really wanted arbitrary periods ==

This post is about the DATE datatype, don't you remember?

Anyway, I recommend against arbitrary periods. Why do you want them? Wouldn't you rather have nice neat periods?

Honestly, until MySQL gets some awesome DATETIMERANGE datatype you're just gonna be hitting yourself in the head. If MySQL would provide such a thing, we could INDEX or UNIQUE that field and ensure that no two records overlap.

But if you want to work with arbitrary date ranges, I suppose I should write a post to explain how to do it safely. Kids today.
