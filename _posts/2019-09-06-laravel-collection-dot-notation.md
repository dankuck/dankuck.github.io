---
layout: post
title: "Which Laravel Collection methods use dot-notation?"
page_img_desc: ""
no_ad: 1
sample_content:
draft: 1
---

When working with nested structures in Laravel's Collection class, several of its methods allow you to use a short-hand to access the nested values.

Here's an example with some nested structures. We just want one part of each.

```
$employees = collect([
    [
        'name' => 'Terry',
        'login' => [
            'username' => 'thelms@example.com',
            'password_hash' => '352663636',
        ],
    ],
    [
        'name' => 'Vic',
        'login' => [
            'username' => 'vchance@example.com',
            'password_hash' => '84888B277',
        ],
    ],
]);
echo 'Users: ' . $employees->implode('login.username', '; ');
// Users: thelms@example.com; vchance@example.com
```

The documentation for Laravel Collections doesn't tell you which methods support dot-notation. So I figured it out.

## Methods that respect dot-notation
* averge
* avg
* contains
* containsStrict
* duplicates
* duplicatesStrict
* every
* except
* firstWhere
* forget
* groupBy
* implode
* keyBy
* max
* median
* min
* mode
* partition
* pluck
* pull
* some
* sortBy
* sortByDesc
* sum
* unique
* uniqueStrict
* where
* whereBetween
* whereIn
* whereInStrict
* whereNotBetween
* whereNotIn
* whereNotInStrict
* whereStrict

## Methods that do NOT respect dot-notation

These methods work directly on the internal array without checking to see whether it is nested or whether the key passed into them contains dots.

* get
* has
* only
* prepend
* put

### PHP operations that don't respect dot-notation:

Similar to the above methods these native PHP operations only act directly on the internal array and do not change their behavior for a key with dots.

* isset($collection['key.key']);
* echo $collection['key.key'];
* $collection['key.key'] = 'value';
* unset($collection['key.key']);
* echo $collection->{'key.key'};

## Contribution

I want to expand this list with examples of each method in action. If you want to help, you can fork <a href="https://github.com/dankuck/dankuck.github.io">the repo</a> and edit `_posts/2019-09-06-laravel-collection-dot-notation.md`.
