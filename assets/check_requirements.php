<?php

$parser = new FileParser(__DIR__ . '/requirements.lwr');

$requirements = $parser->getRequirements();

foreach (['app', 'tests', 'resources'] as $dir) {

    $grepper = new Grepper(__DIR__ . '/' . $dir);

    foreach ($requirements as $requirement) {
        if (!isset($requirement->addressed)) {
            $requirement->addressed = $grepper->findReferencesTo($requirement);
        }
    }
}

$count = count($requirements);
$addressed = 0;
$incomplete = 0;
$obsolete = 0;

foreach ($requirements as $requirement) {
    if ($requirement->obsolete) {
        $obsolete++;
    } else if ($requirement->incomplete) {
        $incomplete++;
    } else if ($requirement->addressed) {
        $addressed++;
    } 
    if ($requirement->obsolete) {
        $marker = "X";
    } else if ($requirement->incomplete) {
        $marker = "I";
    } else if (!$requirement->addressed) {
        $marker = "-";
    } else {
        $marker = " ";
    }
    echo "{$marker} {$requirement->line}\n";

}

$active_count = $count - $obsolete;
$percent = floor(100 * $addressed / $active_count);

echo "\n\n";
echo "{$percent}% addressed; {$addressed} / {$active_count} requirements addressed\n";

if ($incomplete) {
    echo "\n";
    echo "Warning: {$incomplete} requirements are incomplete\n";
}

foreach ($parser->getWarnings() as $warning) {
    echo "Warning: {$warning}\n";
}

class Grepper
{
    private $dir;

    public function __construct(string $dir)
    {
        $this->dir = $dir;
    }

    public function findReferencesTo(Requirement $requirement)
    {
        $ref = preg_replace('/\.$/', '', $requirement->ref);
        $ref = escapeshellarg('LWR\\s+' . $ref . '\\b');
        $dir = escapeshellarg($this->dir);
        return `grep -P $ref $dir -R|head -1`;
    }
}

class FileParser
{
    private $file;
    private $requirements;
    private $warnings;

    public function __construct($file)
    {
        $this->file = $file;

        $this->parse();

        $this->validate();
    }

    private function parse()
    {
        $contents = file_get_contents($this->file);

        $lines = preg_split('/\r?\n/', $contents);

        $lines = array_filter($lines, function ($line) {
            return !!trim($line);
        });

        $requirements = array_map(function ($line) {
            return new Requirement($line);
        }, $lines);

        $this->requirements = $requirements;
    }

    public function getRequirements()
    {
        return $this->requirements;
    }

    public function getWarnings()
    {
        return $this->warnings;
    }

    private function validate()
    {
        $warnings = [];

        $seen = [];

        foreach ($this->requirements as $requirement) {
            $seen[$requirement->ref][] = $requirement;
        }

        foreach ($seen as $ref => $requirements) {
            $count = count($requirements);
            if ($count > 1) {
                $warnings[] = "{$ref} is present {$count} times.\n";
            }
        }

        $this->warnings = $warnings;
    }
}

class Requirement
{
    public $ref;
    public $flags = [];
    public $text;
    public $line;
    public $incomplete = false;
    public $obsolete = false;

    public function __construct($line)
    {
        $this->line = $line;
        $next = trim($line);
        list($this->ref, $next) = preg_split('/\s+/', $next, 2);
        if (preg_match('/\((.*)\)/', $line, $flags)) {
            $this->flags = preg_split('/,/', $flags[1]);
            $next = trim(substr($next, strlen($flags[0])));
            $this->incomplete = in_array('I', $this->flags);
            $this->obsolete = in_array('X', $this->flags);
        }
        $this->text = $next;
    }
}
