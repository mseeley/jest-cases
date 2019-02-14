<a name="cases"></a>

## cases(describeEntryTitle, cases, callback) ⇒ <code>void</code>
Utility to create data-driven test variants.

**Kind**: global function  
**Returns**: <code>void</code> - Triggers side effects, returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| describeEntryTitle | <code>string</code> | The title given to the `describe` entry. |
| cases | <code>object</code> \| <code>array</code> | An object of `test` name to parameters or an array of test parameters. |
| callback | <code>function</code> | The callback responsible for assertions. |

**Example** *(Generate test names automatically)*  
```js
// Assert sums equal to 42. Names the created tests `case 0` and `case 1`
cases("sums of 42", [[40, 2], [21, 21]], ([i, j]) =>
  expect(i + j).toEqual(42)
);
```
**Example** *(Provide bespoke names for tests)*  
```js
// Assert day of week is < 7. Names the created tests `mon` and `tues`
cases("days of week", { sun: 0, mon: 1 }, (dayOfWeek) =>
  expect(dayOfWeek < 7)
);
```
**Example** *(Use async/await)*  
```js
cases("async/await", ['config.json', 'config.yaml'], async url => {
  const response = await readFile(url);
  expect(response).toMatchSnapshot();
});
```
**Example** *(Use the done callback)*  
```js
cases("async callback", [100, 200], (delay, done) => {
  const start = Date.now();
  setTimeout(() => {
    expect(Date.now() - start).toBeGreaterThanOrEqual(delay);
    done();
  }, delay);
});
```

* [cases(describeEntryTitle, cases, callback)](#cases) ⇒ <code>void</code>
    * [.only()](#cases.only)
    * [.skip()](#cases.skip)
    * [.inline(cases, callback)](#cases.inline) ⇒ <code>void</code>
        * [.only()](#cases.inline.only)
        * [.skip()](#cases.inline.skip)

<a name="cases.only"></a>

### cases.only()
A variation of `cases` that will output a `describe.only` entry. The
arguments accepted and behaviors are identical to `cases`.

**Kind**: static method of [<code>cases</code>](#cases)  
**See**: [cases](#cases)  
<a name="cases.skip"></a>

### cases.skip()
A variation of `cases` that will output a `describe.skip` entry. The
arguments accepted and behaviors are identical to `cases`.

**Kind**: static method of [<code>cases</code>](#cases)  
**See**: [cases](#cases)  
<a name="cases.inline"></a>

### cases.inline(cases, callback) ⇒ <code>void</code>
A variation of `cases` that avoids outputting a `describe` entry. Instead
`test` entries are outputted inline. This is useful to nest tests within an
existing `describe` entry.

**Kind**: static method of [<code>cases</code>](#cases)  
**Returns**: <code>void</code> - Triggers side effects, returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| cases | <code>object</code> \| <code>array</code> | An object of `test` name to parameters or an array of test parameters. |
| callback | <code>function</code> | The callback responsible for assertions. |

**Example** *(Generate test names automatically)*  
```js
// Assert sums equal to 42. Names the created tests `case 0` and `case 1`
cases.inline([[40, 2], [21, 21]], ([i, j]) => { expect(i + j).toEqual(42); });
```
**Example** *(Provide bespoke names for tests)*  
```js
// Assert day of week is < 7. Names the created tests `mon` and `tues`
cases.inline({ sun: 0, mon: 1 }, (dayOfWeek) => { expect(dayOfWeek < 7); });
```

* [.inline(cases, callback)](#cases.inline) ⇒ <code>void</code>
    * [.only()](#cases.inline.only)
    * [.skip()](#cases.inline.skip)

<a name="cases.inline.only"></a>

#### inline.only()
A variation of `cases.inline` that will output a `test.only` entry. The
arguments accepted and behaviors are identical to `cases`.

**Kind**: static method of [<code>inline</code>](#cases.inline)  
**See**: [inline](#cases.inline)  
<a name="cases.inline.skip"></a>

#### inline.skip()
A variation of `cases.inline` that will output a `test.skip` entry. The
arguments accepted and behaviors are identical to `cases`.

**Kind**: static method of [<code>inline</code>](#cases.inline)  
**See**: [inline](#cases.inline)  