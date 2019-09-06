---
layout: post
title: "Which Laravel Collection methods use dot-notation?"
page_img_desc: ""
no_ad: 1
sample_content:
draft:
---

When working with nested structures in Laravel's <a href="https://laravel.com/docs/5.8/collections">Collection</a> class, several of its methods allow you to use a short-hand to access the nested values.

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

## TL;DR

Most methods that accept key names respect dot-notation. The list of those that DON'T is short: `forget`, `get`, `has`, `only`, `prepend`, `put`.

A lot of methods that respect dot-notation work because they behave very similarly to `where`. So any method that takes those same parameters -- `where($key, [$operator, [$value]])` -- will also respect dot-notation.

Here's the list with examples.

## Methods that respect dot-notation

#### `average`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-average">average</a>

```
$students = collect([
    [
        'name' => 'Carol',
        'assessment' => [
            'created_at' => '2019-09-06',
            'score'      => 98,
        ],
    ],
    [
        'name' => 'Carl',
        'assessment' => [
            'created_at' => '2019-09-05',
            'score'      => 97,
        ],
    ],
    [
        'name' => 'Coral',
        'assessment' => [
            'created_at' => '2019-09-06',
            'score'      => 99,
        ],
    ],
]);
echo "Average Score: " . $students->average('assessment.score');
// Average Score: 98
```

#### `avg`

Alias for <a href="#average">average</a>.

#### `contains`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-contains">contains</a>

```
$owners = collect([
    [
        'name' => 'Drake',
        'books' => [
            'hates' => 'Of Mice And Men',
            'likes' => 'Great Expectations',
        ],
    ],
    [
        'name' => 'Brake',
        'books' => [
            'likes' => 'Men Explain Things To Me',
        ],
    ],
    [
        'name' => 'Blake',
        'books' => [
            'likes' => 'Snowcrash',
            'hates' => 'Wall-E Novelization',
        ],
    ],
]);
$owners->contains('books.likes', 'Snowcrash');
// true
```

#### `containsStrict`

Strict-comparison version of <a href="#contains">contains</a>.

#### `duplicates`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-duplicates">duplicates</a>

```
$employees = collect([
    [
        'name' => 'Evangeline',
        'position' => [
            'title' => 'Developer',
            'started_at' => '2004-03-02',
        ],
    ],
    [
        'name' => 'Edwin',
        'position' => [
            'title' => 'Developer',
            'started_at' => '2008-12-01',
        ],
    ],
    [
        'name' => 'Erica',
        'position' => [
            'title' => 'SysAdmin',
            'started_at' => '2015-09-12',
        ],
    ],
]);
$employees->duplicates('position.title');
// [2 => 'Developer']
```

Another undocumented feature of `duplicates` is that the largest key is preserved for each value. Use <a href="https://laravel.com/docs/5.8/collections#method-values">values</a> to reset the keys.

#### `duplicatesStrict`

Strict-comparison version of <a href="#duplicates">duplicates</a>.

#### `every`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-every">every</a>

```
$swans = collect([
    [
        'name' => 'Fredrico',
        'appearance' => [
            'color' => 'white',
            'size' => 'large',
        ],
    ],
    [
        'name' => 'Ferdinand',
        'appearance' => [
            'color' => 'white',
            'size' => 'small',
        ],
    ],
    [
        'name' => 'Fabian',
        'appearance' => [
            'color' => 'black',
            'size' => 'tiny',
        ],
    ],
]);
$swans->every('appearance.color', 'white');
// false
```

#### `except`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-except">except</a>

```
$user = collect([
    'name'       => 'Gravely',
    'created_at' => '2019-09-09',
    'photo' => [
        'url'    => 'http://lorempixel.com/400/200/',
        'width'  => 400,
        'height' => 200,
    ],
]);
$user->except('photo.width', 'photo.height', 'created_at');
// [
//     'name' => 'Gravely',
//     'photo' => [
//         'url' => 'http://lorempixel.com/400/200/',
//     ],
// ]
```

#### `firstWhere`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-first-where">firstWhere</a>

```
$houses = collect([
    [
        'name' => 'Chateau Louisiana',
        'owner' => [
            'name' => 'Hurkey',
            'owner_since' => '2019-08-07',
        ],
    ],
    [
        'name' => 'Chateau Detritus',
        'owner' => [
            'name' => 'Hardey',
            'owner_since' => '2019-08-07',
        ],
    ],
]);
$houses->firstWhere('owner.name', 'Hardey');
// [
//     'name' => 'Chateau Detritus',
//     'owner' => [
//         'name' => 'Hardey',
//         'owner_since' => '2019-08-07',
//     ],
// ]
```

#### `groupBy`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-group-by">groupBy</a>

```
$birds = collect([
    [
        'type' => 'Duck',
        'traits' => [
            'feet' => 'webbed',
            'bill' => 'broad',
        ],
    ],
    [
        'type' => 'Blue jay',
        'traits' => [
            'feet' => 'non-webbed',
            'bill' => 'slender',
        ],
    ],
    [
        'type' => 'Goose',
        'traits' => [
            'feet' => 'webbed',
            'bill' => 'slender',
        ],
    ],
]);
$birds->groupBy('traits.feet');
// [
//     'webbed' => [
//         [
//             'type' => 'Duck',
//             'traits' => [
//                 'feet' => 'webbed',
//                 'bill' => 'broad',
//             ],
//         ],
//         [
//             'type' => 'Goose',
//             'traits' => [
//                 'feet' => 'webbed',
//                 'bill' => 'slender',
//             ],
//         ],
//     ],
//     'non-webbed' => [
//         [
//             'type' => 'Blue jay',
//             'traits' => [
//                 'feet' => 'non-webbed',
//                 'bill' => 'slender',
//             ],
//         ],
//     ],
// ]
```

#### `implode`

#### `keyBy`

#### `max`

#### `median`

#### `min`

#### `mode`

#### `partition`

#### `pluck`

#### `pull`

#### `some`

#### `sortBy`

#### `sortByDesc`

#### `sum`

#### `unique`

#### `uniqueStrict`

#### `where`

#### `whereBetween`

#### `whereIn`

#### `whereInStrict`

#### `whereNotBetween`

#### `whereNotIn`

#### `whereNotInStrict`

#### `whereStrict`

## Methods that do NOT respect dot-notation

These methods work directly on the internal array without checking to see whether it is nested or whether the key passed into them contains dots.

* `forget`
* `get`
* `has`
* `only`
* `prepend`
* `put`

### PHP operations that don't respect dot-notation:

Similar to the above methods these native PHP operations only act directly on the internal array and do not change their behavior for a key with dots.

* `isset($collection['key.key'])`
* `echo $collection['key.key']`
* `$collection['key.key'] = 'value'`
* `unset($collection['key.key'])`
* `echo $collection->{'key.key'}`

## Contribution

I want to expand this list with examples of each method in action. If you want to help, you can fork <a href="https://github.com/dankuck/dankuck.github.io">the repo</a>, edit `_posts/2019-09-06-laravel-collection-dot-notation.md`, and submit a pull request.
