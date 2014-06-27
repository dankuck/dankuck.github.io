---
layout: post
title: How to Lock an SVN Directory
---

You can lock files in svn with *svn lock*. But you cannot lock directories.

Here's a workaround.

```
svn rm ^/mydirectory/ -m "I'm locking this by removing it!"
```

Now no one can use your svn directory.

When someone (perhaps you) wants to use the directory again, they'll have to copy it from its old version back into place.

If it's someone other than you, they'll probably see your log message and realize that you're trying to reserve this directory for yourself.

## Don't Do That

Of course, that's a ridiculous idea. We need a directory locking feature in svn. The very fact that you're considering doing this points to a problem in our environment.

So what is the solution, really?

## Define a Policy

If you're interested in locking things, you must be working in a team. You're gonna need to define a policy for how your team deals with locking directories.

To do that, you'll probably need to address specific cases. 

The most common case we need to deal with in my work environment is big merges.

When it comes time to merge back a lot of changes from a branch to trunk, the person heading that up asks the others not to commit to either the branch or trunk.

It would be nice if he could just lock those two directories.

## But Computers Should Be Smarter Than That

If asking everyone not to commit is tough, perhaps because people aren't in constant communication, then it's also possible to come up with a workable policy for how the merge should be executed.

First of all, merges should already be done in a particular order:

1. Merge trunk->branch
2. Fix conflicts
3. Commit
4. Merge branch->trunk
5. Fix conflicts (should be none)
6. Commit
7. Revivify or remove the branch

This is a smooth way to run a merge.

But if someone commits to the branch between the beginning and end of that, you'll have a problem.

You can bracket the whole process with a smarter version of the idea from the top of this article. Move the branch.

1. svn mv ^/branches/...branch... ^/branches/...branch..._merge_prep -m "Preparing to merge to trunk"
2. Merge trunk->branch
3. Fix conflicts
4. Commit
5. Merge branch->trunk
6. Fix conflicts (should be none)
7. Commit
8. Remove the ...merge_prep branch
9. svn cp ^/trunk ^/branches/...branch... -m "Recreating branch after merge to trunk"

We started by moving the branch to a new location. That will prevent your less attentive teammates from committing in the meantime.

When we're done merging back to trunk, the merge_prep branch goes away. The last step is optional. If you're done with the branch, don't do it. (OTOH, why was someone trying to commit to a branch that the rest of you thought was "done"?)

That prevents mischief in your branch. What about your trunk?

## What about your trunk?

If you're also concerned that people might commit to trunk, you can also move trunk at the start and move it back to trunk at the end.

If this seems crazy, it is. There's a reason why your intuition is telling you this isn't a good solution.

If you're working with branches, you're probably already dedicated to the idea that trunk should only contain good code.

If everyone is dedicated to that idea, then commits to trunk are probably not going to be a big deal.

## What about other reasons for locking directories?

I haven't actually found other reasons to lock directories.

But if you find a reason, you'll probably want to consider whether it's worth it and then end up with some version of the above. If there's a main point to this article though, it's this: 

Make a policy and make it known.
