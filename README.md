Little tool to identify and convert line terminators from strings.

# Install

```
npm i line-terminators
```

# Usage

## Identify line terminators from a string
```js
import lt from 'line-terminators'

lt.identify('abc\ndef') // => "LF"

lt.identify('abc\r\ndef') // => "CRLF"

lt.identify('abcdef') // => "NONE"
```

## Convert a string's line terminators to another format
```js
import lt from 'line-terminators'

lt.convert('abc\ndef', 'CRLF') // => "abc\r\ndef"

lt.convert('abc\r\ndef', 'LF') // => "abc\ndef"

// It will keep the original line terminators if the target is NONE
lt.convert('abc\r\ndef\r\nghi', 'NONE') // => "abc\r\ndef\r\nghi"

// If you want it to delete the line terminators when the target is NONE,
// then pass the third parameter as `true`

lt.convert('abc\r\ndef\r\nghi', 'NONE', true) // => "abcdefghi"
```
Note: Passing `null` or `undefined` works the same as `'NONE'`

## Copy the line terminators from a string into another
```js
import lt from 'line-terminators'

lt.copy('abc\r\ndef\r\nghi', 'tuv\nxyz') // => "tuv\r\nxyz"

lt.copy('abc\ndef\nghi', 'tuv\r\nxyz') // => "tuv\nxyz"

// Keeps line terminators when the source string has no line terminators

lt.copy('abcdefghi', 'tuv\nxyz') // => "tuv\nxyz"

lt.copy('abcdefghi', 'tuv\r\nxyz') // => "tuv\r\nxyz"

// If you want it to delete the line terminators when the source string has no
// line terminators, then pass the third parameter as `true`

lt.copy("abcdefghi", "tuv\nxyz", true) // => "tuvxyz"
lt.copy("abcdefghi", "tuv\r\nxyz", true) // => "tuvxyz"
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

You may even try to prevent writing the file if it has no changes, like:
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
import lt from 'line-terminators'

const contentString = fs.readFileSync(filePath)

const contentObject = JSON.parse(contentString)

contentObject.myProperty = 'my value'

let result = JSON.stringify(contentObject, null, 2)

// Copy the line terminators from contentString to result
result = lt.copy(contentString, result)

if (result === contentString) {
  return
}

fs.writeFileSync(filePath, result)

```

`result === contentString` would now evaluate to true, since the `result` now uses the same line terminators as the `contentString` string.