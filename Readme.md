## Shako - simple file generator
[![Build Status](https://travis-ci.org/alucic/shako.svg?branch=master)](https://travis-ci.org/alucic/shako)

## Installation
```
npm install @alucic/shako -g
```

Simple usage to create timestamped file `20191104042110-add-users-table.js`
```
shako add-users-table
```

### Global Usage
```bash
shako <filename>

Options:
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  -t, --timestamp  Include timestamp in the filename   [boolean] [default: true]
  -p, --prefix     Prefix filename                        [string] [default: ""]
  -s, --suffix     Suffix filename                        [string] [default: ""]
  --template       Template file                          [string] [default: ""]
```

#### Examples:
Create a timestamped file within a directory `migrations/20191104042110-add-users-table.js`.    
Also creates a directory if it doesn't exist.
```
shako migrations/add-users-table
```

Create a file with a suffix - `tests/payment/index_test.js`
```
shako -t=false -s=_test tests/payment/index
```

Create a file using a template - `migrations/20191104042110-add-users-table.js`
```
shako --template=migration-template.js migrations/add-users-table.js
```

Prefix is executed before `timestamp` modifier - `20191106023823-prefix-your-filename.js`
```
shako -t=true -p=prefix your-filename
```

If provided, `shako` will keep existing `filename` extension.
```
shako migrations/add-users-table.php
```

### Local usage
You can install `shako` per project and include helpers in package.json `scripts`.

```
npm install @alucic/shako --save-dev
```

Assuming you have your migration and test template set, you can add custom scripts that use `shako`.
```
  "scripts": {
    "start": "node app",
    "make:migration": "shako --template=migrations/migration-template.js migrations/",
    "make:test": "shako -t=false --template=tests/test-template.js -s=_test tests/"
  },
```

`npm run make:test payment/processor.js`    
Generates `test/payment/processor_test.js` file with contents from `tests/test-template.js` file.
     
`npm run make:migration add-users-table`    
Generates `migrations/20191106023823-add-users-table.js` file with contents from `migrations/migration-template.js` file.

### Contributing

```
npm test
```
