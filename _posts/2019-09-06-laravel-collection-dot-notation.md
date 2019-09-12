---
layout: post
title: "Which Laravel Collection methods use dot-notation?"
page_img_desc: ""
no_ad: 1
sample_content:
draft:
notes: "https://github.com/laravel/framework/blob/5.8/src/Illuminate/Support/Arr.php, https://github.com/laravel/framework/blob/5.8/src/Illuminate/Support/Collection.php"
---

When working with Laravel's <a href="https://laravel.com/docs/5.8/collections">Collection</a> class, several of its methods allow you to use a short-hand to access nested values.

Here's an example of a structure that has nested data we want to pull out and echo.

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

But which Laravel Collection methods support dot-notation? Not all of them.

## TL;DR

<a href="#methods-that-respect-dot-notation">Most methods that accept key names</a> respect dot-notation. The <a href="#methods-that-do-not-respect-dot-notation">list of those that DON'T</a> is short: `forget`, `get`, `has`, `only`, `prepend`, `put`. Some other methods only accept callbacks, such as `map`.

Any method that accepts the same parameters as `where($key, $operator, $value)` will also respect dot-notation.

Only `pluck` and `groupBy` use the <a href="#what-about-">array-wildcard \*</a> correctly. The others will give wrong results.

## Methods that respect dot-notation

<ul style="float: left">
    <li><a href="#average">average</a></li>
    <li><a href="#avg">avg</a></li>
    <li><a href="#contains">contains</a></li>
    <li><a href="#containsstrict">containsStrict</a></li>
    <li><a href="#duplicates">duplicates</a></li>
    <li><a href="#duplicatesstrict">duplicatesStrict</a></li>
    <li><a href="#every">every</a></li>
    <li><a href="#except">except</a></li>
    <li><a href="#firstwhere">firstWhere</a></li>
    <li><a href="#groupby">groupBy</a></li>
    <li><a href="#implode">implode</a></li>
</ul>
<ul style="float: left">
    <li><a href="#keyby">keyBy</a></li>
    <li><a href="#max">max</a></li>
    <li><a href="#median">median</a></li>
    <li><a href="#min">min</a></li>
    <li><a href="#mode">mode</a></li>
    <li><a href="#partition">partition</a></li>
    <li><a href="#pluck">pluck</a></li>
    <li><a href="#pull">pull</a></li>
    <li><a href="#some">some</a></li>
    <li><a href="#sortby">sortBy</a></li>
    <li><a href="#sortbydesc">sortByDesc</a></li>
</ul>
<ul style="float: left">
    <li><a href="#sum">sum</a></li>
    <li><a href="#unique">unique</a></li>
    <li><a href="#uniquestrict">uniqueStrict</a></li>
    <li><a href="#where">where</a></li>
    <li><a href="#wherebetween">whereBetween</a></li>
    <li><a href="#wherein">whereIn</a></li>
    <li><a href="#whereinstrict">whereInStrict</a></li>
    <li><a href="#wherenotbetween">whereNotBetween</a></li>
    <li><a href="#wherenotin">whereNotIn</a></li>
    <li><a href="#wherenotinstrict">whereNotInStrict</a></li>
    <li><a href="#wherestrict">whereStrict</a></li>
</ul>

<div style="clear:both"></div>

### `average`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-average">average</a>

Dot-notation Example:

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

This method does not play nice with <a href="#what-about-">\*</a>.

### `avg`

Alias for <a href="#average">average</a>.

### `contains`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-contains">contains</a>

Dot-notation Example:

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

This method accepts the same parameters as
<a href="https://laravel.com/docs/5.8/collections#method-where">where</a>.

This method does not play nice with <a href="#what-about-">\*</a>.

### `containsStrict`

Strict-comparison version of <a href="#contains">contains</a>.

### `duplicates`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-duplicates">duplicates</a>

Dot-notation Example:

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

This method does not play nice with <a href="#what-about-">\*</a>.

### `duplicatesStrict`

Strict-comparison version of <a href="#duplicates">duplicates</a>.

### `every`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-every">every</a>

Dot-notation Example:

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

This method accepts the same parameters as
<a href="https://laravel.com/docs/5.8/collections#method-where">where</a>.

This method does not play nice with <a href="#what-about-">\*</a>.

### `except`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-except">except</a>

Dot-notation Example:

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

This method does not play nice with <a href="#what-about-">\*</a>.

### `firstWhere`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-first-where">firstWhere</a>

Dot-notation Example:

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

This method accepts the same parameters as
<a href="https://laravel.com/docs/5.8/collections#method-where">where</a>.

This method does not play nice with <a href="#what-about-">\*</a>.

### `groupBy`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-group-by">groupBy</a>

Dot-notation Example:

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

This method plays nice with \*. See <a href="#what-about-">What about \*?</a> below for an example.

### `implode`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-implode">implode</a>

Dot-notation Example:

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

This method does not play nice with <a href="#what-about-">\*</a>.

### `keyBy`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-key-by">keyBy</a>

Dot-notation Example:

```
$parks = collect([
    [
        'name' => 'Yosemite',
        'authority' => [
            'chief' => 'Gilbert',
            'technical' => 'Gandry',
        ],
    ],
    [
        'name' => 'Yellow Stone',
        'authority' => [
            'chief' => 'Gertrude',
            'technical' => 'Gillian',
        ],
    ],
]);
$parks->keyBy('authority.chief');
// [
//     'Gilbert' => [
//         'name' => 'Yosemite',
//         'authority' => [
//             'chief' => 'Gilbert',
//             'technical' => 'Gandry',
//         ],
//     ],
//     'Gertrude' => [
//         'name' => 'Yellow Stone',
//         'authority' => [
//             'chief' => 'Gertrude',
//             'technical' => 'Gillian',
//         ],
//     ],
// ]
```

This method does not play nice with <a href="#what-about-">\*</a>, but the similar <a href="#groupby">groupBy</a> does.

### `max`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-max">max</a>

Dot-notation Example:

```
$charts = collect([
    [
        'name' => 'WENUS',
        'range' => [
            'highest_value' => 59,
            'lowest_value' => 11,
        ],
    ],
    [
        'name' => 'Top 40',
        'range' => [
            'highest_value' => 40,
            'lowest_value' => 1,
        ],
    ],
]);
$charts->max('range.highest_value');
// 59
```

This one doesn't return the element that has the max value, but instead returns the value itself.

This method does not play nice with <a href="#what-about-">\*</a>.

### `median`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-median">median</a>

Dot-notation Example:

```
$lakes = collect([
    [
        'name' => 'Blue Lake',
        'customer_ratings' => ['high' => 100, 'low' => 98],
    ],
    [
        'name' => 'Moose Lake',
        'customer_ratings' => ['high' => 78, 'low' => 15],
    ],
    [
        'name' => 'Sad Lake',
        'customer_ratings' => ['high' => 99, 'low' => 80],
    ],
]);
$lakes->median('customer_ratings.high');
// 99
```

This one doesn't return the element that has the median value, but instead returns the value itself.

This method does not play nice with <a href="#what-about-">\*</a>.

### `min`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-min">min</a>

Dot-notation Example:

```
$racing_crabs = collect([
    [
        'name' => 'Charlie',
        'times' => ['fastest' => 27, 'slowest' => 51],
    ],
    [
        'name' => 'Ban mi',
        'times' => ['fastest' => 40, 'slowest' => 45],
    ],
    [
        'name' => 'Gator Hater',
        'times' => ['fastest' => 28, 'slowest' => 39],
    ],
]);
$racing_crabs->min('times.fastest');
// 27
```

This one doesn't return the element that has the min value, but instead returns the value itself.

This method does not play nice with <a href="#what-about-">\*</a>.

### `mode`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-mode">mode</a>

Dot-notation Example:

```
$homes = collect([
    [
        'neighborhood' => 'Clampet Estates',
        'details' => [
            'type' => 'ranch',
            'area' => 2100,
        ],
    ],
    [
        'neighborhood' => 'Fletcher Pavilion',
        'details' => [
            'type' => 'ranch',
            'area' => 3000,
        ],
    ],
    [
        'neighborhood' => 'Terrence Terraces',
        'details' => [
            'type' => 'bungalow',
            'area' => 1200,
        ],
    ],
]);
$homes->mode('details.type');
// ['ranch']
```

This one doesn't return the element that has the mode value, but instead returns the value itself in an array. If multiple values could be considered the mode, they are all present in the array.

This method does not play nice with <a href="#what-about-">\*</a>.

### `partition`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-partition">partition</a>

Dot-notation Example:

```
$cart_items = collect([
    [
        'description' => 'Cake',
        'price' => [
            'base' => 4.00,
            'tax'  => 0.28,
        ],
    ],
    [
        'description' => 'Rice',
        'price' => [
            'base' => 1.50,
            'tax'  => 0.00,
        ],
    ],
    [
        'description' => 'Limburger',
        'price' => [
            'base' => 10.00,
            'tax'  => 0.00,
        ],
    ],
]);
$cart_items->partition('price.base', '>', 3.00);
// [
//     [
//         [
//             'description' => 'Cake',
//             'price' => [
//                 'base' => 4.00,
//                 'tax'  => 0.28,
//             ],
//         ],
//         [
//             'description' => 'Limburger',
//             'price' => [
//                 'base' => 10.00,
//                 'tax'  => 0.00,
//             ],
//         ],
//     ],
//     [
//         [
//             'description' => 'Rice',
//             'price' => [
//                 'base' => 1.50,
//                 'tax'  => 0.00,
//             ],
//         ],
//     ],
// ]
```

This method accepts the same parameters as
<a href="https://laravel.com/docs/5.8/collections#method-where">where</a>.

This method does not play nice with <a href="#what-about-">\*</a>.

### `pluck`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-partition">partition</a>

Dot-notation Example:

```
$equipment = collect([
    [
        'description' => 'balls',
        'location' => [
            'building' => 4,
            'bin' => 17,
        ],
    ],
    [
        'description' => 'pads',
        'location' => [
            'building' => 2,
            'bin' => 10,
        ],
    ],
]);
$equipment->pluck('location.building');
// [4, 2]
```

This method plays nice with \*. See <a href="#what-about-">What about \*?</a> below for an example.

### `pull`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-pull">pull</a>

Dot-notation Example:

```
$system = collect([
    'name' => 'rothchild-1',
    'tasks' => [
        [
            'commmand' => 'start-jml',
        ],
        [
            'commmand' => 'start-interest-blt',
        ],
    ],
]);
$system->pull('tasks.0');
// [
//     'commmand' => 'start-jml',
// ]
// AND
// $system = [
//     'name' => 'rothchild-1',
//     'tasks' => [
//         1 => [
//             'commmand' => 'start-interest-blt',
//         ],
//     ],
// ]
```

This method does not play nice with <a href="#what-about-">\*</a>.

Notice in this example that we pulled `0` from the `tasks` array, but the
remaining element did not change its key. It's still at `1`.

### `some`

Alias for <a href="#contains">contains</a>.

### `sortBy`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-sort-by">sortBy</a>

Dot-notation Example:

```
$vegetables = collect([
    [
        'description' => 'carrots',
        'ratings' => [
            'satisfaction' => 5,
            'production' => 8,
        ],
    ],
    [
        'description' => 'brocolli',
        'ratings' => [
            'satisfaction' => 7,
            'production' => 4,
        ],
    ],
    [
        'description' => 'potate',
        'ratings' => [
            'satisfaction' => 3,
            'production' => 5,
        ],
    ],
]);
$vegetables->sortBy('ratings.satisfaction');
// [
//     [
//         'description' => 'potate',
//         'ratings' => [
//             'satisfaction' => 3,
//             'production' => 5,
//         ],
//     ],
//     [
//         'description' => 'carrots',
//         'ratings' => [
//             'satisfaction' => 5,
//             'production' => 8,
//         ],
//     ],
//     [
//         'description' => 'brocolli',
//         'ratings' => [
//             'satisfaction' => 7,
//             'production' => 4,
//         ],
//     ],
// ]
```

This method does not play nice with <a href="#what-about-">\*</a>.

### `sortByDesc`

Reverse version of <a href="#sortBy">sortBy</a>.

### `sum`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-sum">sum</a>

Dot-notation Example:

```
$bugs = collect([
    [
        'description' => 'Customer explodes',
        'time' => [
            'alloted' => 5,
            'spent' => 6,
        ],
    ],
    [
        'description' => 'Button incorrectly colored',
        'time' => [
            'alloted' => 1,
            'spent' => 3,
        ],
    ],
]);
$bugs->sum('time.spent');
// 9
```

This method does not play nice with <a href="#what-about-">\*</a>.

### `unique`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-unique">unique</a>

Dot-notation Example:

```
$aliens = collect([
    [
        'name' => 'Slime Species',
        'quick_facts' => [
            'population' => 1.4e10,
            'home' => 'Gangnam 4',
        ],
    ],
    [
        'name' => 'Dog-like Species',
        'quick_facts' => [
            'population' => 3.1e8,
            'home' => 'Kilroy 2',
        ],
    ],
    [
        'name' => 'Cat-like Species',
        'quick_facts' => [
            'population' => 2.8e7,
            'home' => 'Kilroy 2',
        ],
    ],
]);
$aliens->unique('quick_facts.home');
// [
//     [
//         'name' => 'Slime Species',
//         'quick_facts' => [
//             'population' => 1.4e10,
//             'home' => 'Gangnam 4',
//         ],
//     ],
//     [
//         'name' => 'Dog-like Species',
//         'quick_facts' => [
//             'population' => 3.1e8,
//             'home' => 'Kilroy 2',
//         ],
//     ],
// ]
```

This method does not play nice with <a href="#what-about-">\*</a>.

### `uniqueStrict`

Strict-comparison version of <a href="#unique">unique</a>.

### `where`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-where">where</a>

Dot-notation Example:

```
$countries = collect([
    [
        'name' => 'USA!',
        'people' => [
            'population' => 300e6,
            'average_age' => 38.1,
        ],
    ],
    [
        'name' => 'Canada',
        'people' => [
            'population' => 37e6,
            'average_age' => 40.8,
        ],
    ],
    [
        'name' => 'Bolivia',
        'people' => [
            'population' => 11e6,
            'average_age' => 23.1,
        ],
    ],
]);
$countries->where('people.population', '<', 100e6);
// [
//     [
//         'name' => 'Canada',
//         'people' => [
//             'population' => 37e6,
//             'average_age' => 40.8,
//         ],
//     ],
//     [
//         'name' => 'Bolivia',
//         'people' => [
//             'population' => 11e6,
//             'average_age' => 23.1,
//         ],
//     ],
// ]
```

This method does not play nice with <a href="#what-about-">\*</a>.

### `whereBetween`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-where-between">whereBetween</a>

Dot-notation Example:

```
$snakes = collect([
    [
        'name' => 'Jim',
        'traits' => [
            'breed' => 'black racer',
            'length' => 14,
        ],
    ],
    [
        'name' => 'Bruce O\'Leary',
        'traits' => [
            'breed' => 'antillean',
            'length' => 1,
        ],
    ],
]);
$snakes->whereBetween('traits.length', [10, 20]);
// [
//     [
//         'name' => 'Jim',
//         'traits' => [
//             'breed' => 'black racer',
//             'length' => 14,
//         ],
//     ],
// ]
```

This method does not play nice with <a href="#what-about-">\*</a>.

### `whereIn`

Laravel Docs: <a href="https://laravel.com/docs/5.8/collections#method-where-in">whereIn</a>

Dot-notation Example:

```
$bears = collect([
    [
        'name' => 'Grizzly',
        'ratings' => [
            'danger' => 'high',
            'cuddliness' => 'low',
        ],
    ],
    [
        'name' => 'Teddy',
        'ratings' => [
            'danger' => 'low',
            'cuddliness' => 'high',
        ],
    ],
]);
$bears->whereIn('ratings.danger', ['high', 'medium']);
// [
//     [
//         'name' => 'Grizzly',
//         'ratings' => [
//             'danger' => 'high',
//             'cuddliness' => 'low',
//         ],
//     ],
// ]
```

This method does not play nice with <a href="#what-about-">\*</a>.

### `whereInStrict`

Strict-comparison version of <a href="#wherein">whereIn</a>.

### `whereNotBetween`

Reverse version of <a href="#wherebetween">whereBetween</a>.

### `whereNotIn`

Reverse version of <a href="#wherein">whereIn</a>.

### `whereNotInStrict`

Reverse and strict-comparison version of <a href="#wherein">whereIn</a>.

### `whereStrict`

Strict-comparison version of <a href="#where">where</a>.

## Methods that do NOT respect dot-notation

These methods work directly on a Collection's internal array without checking to see whether the keys passed in contain dots.

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

## What about \*?

When we want to act on every element of a nested array, dot-notation lets us use an asterisk (\*) wildcard, with some caveats:

* The element \* searches through must be an array or Collection.
* Each use of \* creates an array or null result in the core code, and most methods cannot deal with it.
* If something in the key path is missing, the result Collection will have nulls in some spots instead of arrays.

Because of these caveats, the only two methods that support \* well are <a href="#pluck">pluck</a> and <a href="#groupby">groupBy</a>. Other methods will simply return bad results.

```
$players = collect([
    [
        'name' => 'XDestroyY',
        'achievements' => [
            [
                'description' => 'Collect 400 Chipples',
                'difficulty' => 2,
            ],
            [
                'description' => 'Pass the Mork',
                'difficulty' => 5,
            ],
            [
                // why is this one empty? ¯\_(ツ)_/¯
            ],
        ],
    ],
    [
        'name' => 'BunnyNewb',
        // no achievements
    ],
]);
$players->pluck('achievements.*.description')
// [
//     [
//         "Collect 400 Chipples",
//         "Pass the Mork",
//         null,
//     ],
//     null,
// ]
```

You may need to `flatten` and/or `filter` the Collection to get the results you want.

```
$players->pluck('achievements.*.description')->flatten()->filter();
// [
//     "Collect 400 Chipples",
//     "Pass the Mork",
// ]
```

When the `groupBy` method encounters a \*, it will group each item into all the group names that result.

```
$players->groupBy('achievements.*.description');
// [
//     'Collect 400 Chipples' => [
//         [
//             'name' => 'XDestroyY',
//             ... the whole array ...
//         ],
//     ],
//     'Pass the Mork' => [
//         [
//             'name' => 'XDestroyY',
//             ... the whole array ...
//         ],
//     ],
//     '' => [
//         [
//             'name' => 'BunnyNewb',
//             ... the whole array ...
//         ],
//         [
//             'name' => 'XDestroyY',
//             ... the whole array ...
//         ],
//     ],
// ]
```

Notice in the above example that the nulls that `pluck` would produce were turned into `''` and used as a group name.

Some methods that cannot use \* can still be applied elegantly by using the \* in a `pluck` call first. Some that work well that way are `average`, `contains`, `duplicates`, `every`, `implode`, `max`, `median`, `min`, `mode`, and `sum`.

```
$players->contains('achievements.*.description', 'Collect 400 Chipples')
// false

$players
    ->pluck('achievements.*.description')
    ->flatten()
    ->contains('Collect 400 Chipples')
// true
```
