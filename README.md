# **Flayout**
#### Built by a Frontend Developer, for other developers.

A Grid layout using flexbox, powered by styled-components based on Grid Foundation 6. Support both horizontal and vertical direction with custom gutter spacing.

Feel free to download and custom media query as your own project needs.

[Live demo](https://codesandbox.io/s/yqvxqvknjj)

## Table of content
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Tips from a developer](#tips-from-a-developer)
- [Contact](#contact)
- [Further Reading](#further-reading)

## Who should you this?

Wait, another CSS grid layout? The answer is simple: YES.

This one is built completely using Styled-components, and with my attention to give maximum customization capability to the frontend developer who often deals with complicated layout which a simple grid like BS or Foundation wasn't ready or fully supported.

Pros:
- There's no need to embed an external CSS. Quick to prototype implementation.
- Easily to migrate from project to project.
- Flexible customization to your own project needs.
- Flexible media query customization, no limit to only `small`,`medium`, and `large`

Cons:
- Not really a big change to the Frontend world.
- Just consider this is another choice for grid layout in your frontend dev toolkit.



## Installation

Please treat this just an add-on to your project, you can download the source code, put it in your project and import using relative path, whatever suits you.


## Usage

### Using Flayout with Horizontal layout (Most often used)
`
import {<Row>, <Col>} from 'your/path/to/flayout/source/code';
`

`<Row>` and `<Col>` are very popular names for Row and Column Components. In order to prevent naming confliction with other CSS libs, frameworks, you can choose to import:
`
import {<FRow>, <FCol>} from 'your/path/to/flayout/source/code';
`
###### or even better, go straight into source code and change the export variable name

### Using Flayout with Vertical layout
`
import {<Row>, <VCol>} from 'your/path/to/flayout/source/code';
`

You can guess that, `V` as in Vertical.




### Basic HTML structure for Flayout:

Just like with most grid layout out there, you need to wrap columns in row. So a basic setup structure would look like this:
  ```
  <Flayout>
    <Row>
      <Col></Col>
    </Row>
  </Flayout>
  ```

or even without `<Flayout>` wrapper, it's still safe. `<Flayout>` is just for visual helper purpose. The component itself is just a simple div with `display: block` embed.

By default, the column width doesn't include gutter space. In order to apply a gutter between columns using margin (default), *you need to define object for both `row` and `columns` elements*.

Object defines for row element:
  ```
  const rowObj = {
    gutter: VALUE
  }
  ```
| Name          | Description           | Value  | Type |
| ------------- | ----------------------| ----- |----|
| gutter        | Value set for `margin` gutter space, this is usually equals to the gutter value set in Column  | * | `string` |


Object defines for column element:
  ```
  const columnObj = {
    value: VALUE,
    gutter: VALUE,
    padding: true
  }
  ```
| Name          | Description           | Value  | Type |
| ------------- | ----------------------| ----- | ---- |
| value         | Column width value    | `CSS unit`, `'auto'`, `'shrink'` and unitless value e.g `1/2`  | `string` |
| gutter        | Column gutter value  | `string` | `string` |
| padding       | Column gutter using `padding` type, <br /> *row gutter space doesn't need setting for using this type of gutter*  | `false`| `boolean` |

`CSS Unit` : any string like `10px`, `1rem` etc..


## Examples
### Example 1: Horizontal layout with dynamic grid layout
Let's just say you want a row of 3 columns.
- On a large desktop, you want a 10-column grid-based:
  - The first column is 3/10
  - The second column is 5/10
  - The third column is 2/10
- On a medium size, usually a tablet device, you want a 16-column grid-based:
  - The first column is 7/16
  - The second column is 6/16
  - The third column is 3/16
- On a small device like mobile, you want a 12-column grid-based:
  - The first column is 12/12
  - The second column is 6/12
  - The third column is 6/12

The layout setup would be like this:
  ```
    <Row>
      <Col small={12/12} medium={7/16} large={3/10}>First column</Col>
      <Col small={6/12} medium={6/16} large={5/10}>Second column</Col>
      <Col small={6/12} medium={3/16} large={2/10}>Third column</Col>
    </Row>
  ```



### Example 2: Column with `auto` and `shrink`
How about `auto` and `shrink`. Assuming we have two columns:
- On a large desktop:
  - The first column is `450px` width.
  - The second column will expand to the available space.
- On a small desktop:
  - Both column will expand full width, aka 100% percent.

The layout would be like this:
  ```
    <Row>
      <Col small="100%" large="450px">First column</Col>
      <Col small="100%" large="auto">Second column</Col>
    </Row>
  ```




### Example 3: Horizontal layout with combining of fixed width and flexible columns.

The last case I had to deal with in my project was like this. Assuming we have to wrap columns in a fixed width container of 600px.
- On large desktop:
  - The first column only needs 80px.
  - The second column always takes 50% of container
  - The third column will take the rest available space
- On small desktop:
  - All columns will expand to ist full width

You can easily guess this is a practical thing like Shopping cart table.

  ```
    <Row style={{width: '600px'}}>
      <Col small="100%" large="80px">First column</Col>
      <Col small="100%" large={6/12}>Second column</Col> <--- you can use directly a string like `50%` or any fraction unit with a result of 0.5. Here I used 6/12 for a clearer visualization
      <Col small="100%" large="auto">lorem50</Col>
    </Row>
  ```



### Example 4: Horizontal layout with **MARGIN** gutter

Assuming we want a row of two columns:
- On medium size:
  - Row will have 10px margin gutter
  - Each column will be 50% width and 10px gutter.
- On small size:
  - Row will have 20px margin gutter
  - Each column will be 50% width and 20px gutter.
  ```
  const objGutterMarginSmall = {
    value: 6/12,
    gutter: '20px',
  };

  const objGutterMarginMed = {
    value: 6/12,
    gutter: '10px',
  };

  const rowMarginMed = {
    gutter: '10px'
  };

  const rowMarginSmall = {
    gutter: '20px'
  };

  render() {
    <Row
      small={rowMarginSmall}
      medium={rowMarginMed}>
      <Col
        small={objGutterMarginSmall}
        medium{objGutterMarginMed}>First column</FCol>
      <Col
        small={objGutterMarginSmall}
        medium{objGutterMarginMed}>Second column</Col>
    </Row>
  }
  ```

And you can guess it, with the powerful usage of spreading operator in ES6, you can easily have some custom layout with margin gutter like this:
```
const rowGutterMed = {
  gutter: '10px'
};

const colMed = {
  gutter: '10px'
}
  <Row medium={rowGutterMed}>
    <Col small="shrink" medium={{...colMed, value: 2/7}}>Column A</Col>
    <Col small="shrink" medium={{...colMed, value: 4/7}}>Column B</Col>
    <Col small="shrink" medium={{...colMed, value: 1/7}}>Column C</Col>
  </Row>
  ```




### Example 5: Horizontal layout with **PADDING** gutter

Assuming we want a row of two columns:
- On medium size:
  - Each column will be 50% width and 10px gutter.
- On small size:
  - Each column will be 50% width and 20px gutter.
  ```
  const objGutterMarginSmall = {
    value: 6/12,
    gutter: '20px',
    padding: true,
  };

  const objGutterMarginMed = {
    value: 6/12,
    gutter: '10px',
    padding: true,
  };

  render() {
    <Row>
      <Col
        small={objGutterMarginSmall}
        medium{objGutterMarginMed}>First column</Col>
      <Col
        small={objGutterMarginSmall}
        medium{objGutterMarginMed}>Second column</Col>
    </Row>
  }
  ```




### Example 6: Vertical layout.

Last but not least, this also supports for vertical layout. Though practical use cases I rarely have to deal with but hopefully this is useful for someone else.

The property setups for vertical layout would be the same as Horizontal layout. **Just add `vert` props to `<Row>` and use `<VCol>` instead of `<Col> or <HCol>`**

The setup would be like this :

```
  <Row style={{height: '400px'}} vert>
    <VCol small="shrink" large="70px">First column</VCol>
    <VCol small="shrink" large="35%">Second column</VCol>
    <VCol small="shrink" large="auto">Second column</VCol>
  </Row>
```



## Tips from a developer
- When using with gutter margin, **it would be best to have the same value** for `row` and `column` gutter space (See Example 4).
- Feel free to add/customize the media query in source code to your needs, like I did with `min1280` and `max1360`. I believe this is powerful tool to deal with any responsive breakpoints. So, you can easily have something like:
  ```
  <Row>
    <Col small="auto" min1280={3/9}>Column A</Col>
    <Col small="auto" min1280={6/9}>Column B</Col>
  </Row>
  ```
- Hopefully the first 5 examples already covered the most cases where Frontend developer dealt in real world projects. Combining usages of `50px` and {3/12} fraction unit is something you would use in building small component units, like a shop cart or profile panel, if you know what I meant. So, big thanks to the powerful js.
- Most of the times, the layout won't need that complicated grid based to be implemented (like desktop is 16-column based and tablet is 24-col based). Having been and working with other web designers, I still deal with this kind of situation where he free-styled his layout. This is really a pain for frontend developer.




## Contact
- Happy to hear your thoughts via duc@cofixel.com or @ducwebakit
- Let me know if you've used this in your projects, happy to see it in real world project.


## Projects used with Flayout
- To be updated


## Further Reading
- [Foundation 6 Grid documentation](https://foundation.zurb.com/sites/docs/ "Foundation 6 Grid")

- [Styled Components Documentation](https://www.styled-components.com/ "Styled Components Documentation")




## License
Licensed under the MIT License.

See [LICENSE](./LICENSE) for more information.