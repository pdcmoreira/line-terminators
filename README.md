Little tool to identify and convert line terminators from strings.

# Install

```
npm i line-terminators
```

# Usage

## Identify line terminators from a string
```js
import { identify } from 'line-terminators'

identify('abc\ndef') // => "LF"

identify('abc\r\ndef') // => "CRLF"

identify('abcdef') // => "NONE"
```

## Convert a string's line terminators to another format
```js
import { convert } from 'line-terminators'

convert('abc\ndef', 'CRLF') // => "abc\r\ndef"

convert('abc\r\ndef', 'LF') // => "abc\ndef"

// Also works with null or undefined instead of 'NONE'

convert('abc\r\ndef\r\nghi', 'NONE') // => "abcdefghi"
```

## Copy the line terminators from a string into another
```js
import { copy } from 'line-terminators'

copy('abc\r\ndef\r\nghi', 'tuv\nxyz') // => "tuv\r\nxyz"

copy('abc\ndef\nghi', 'tuv\r\nxyz') // => "tuv\nxyz"

// Keeps line terminators when the source string has no line terminators

copy('abcdefghi', 'tuv\nxyz') // => "tuv\nxyz"

copy('abcdefghi', 'tuv\r\nxyz') // => "tuv\r\nxyz"
```

## Real-life use case

Imagine you want to read a JSON file, manipulate it and save it.
You would probably write something as simple as:

```js
const content = JSON.parse(fs.readFileSync(filePath))

content.myProperty = 'my value'

fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
```

This should be ok for most cases, but if you are working on a Windows machine and the original file was written in a POSIX machine, then you're also changing the line terminators from LF to CRLF.

Also, imagine that `myProperty` already had `my value` in the original file. It will end up producing no changes to your content, but the file will still be different.
If you use git, you will see a file change.

You may even try to do prevent writing the file if it has no changes, like:
```js

const contentString = fs.readFileSync(filePath)

const contentObject = JSON.parse(contentString)

contentObject.myProperty = 'my value'

const result = JSON.stringify(contentObject, null, 2)

if (result === contentString) {
  return
}

fs.writeFileSync(filePath, result)

```

But `result === contentString` would evaluate to false, as the line terminators are different between those strings.

By using this little tool, you could do:

```js
// import the copy function
import { copy } from 'line-terminators'

const contentString = fs.readFileSync(filePath)

const contentObject = JSON.parse(contentString)

contentObject.myProperty = 'my value'

let result = JSON.stringify(contentObject, null, 2)

// copy the line terminators from contentString to result
result = copy(contentString, result)

if (result === contentString) {
  return
}

fs.writeFileSync(filePath, result)

```

`result === contentString` would now evaluate to true, since the `result` now uses the same line terminators as the `contentString` string.