/**
 * Grid layout using styled-components based on Grid Foundation 6
 * Still in development. Work best in horizontal layout
 */
import styled, { css } from 'styled-components';
const WIDTH      = 'width';
const HEIGHT     = 'height';
const mediaArray = [
  'small',
  'medium',
  'large',
  'min1280',
  'min1360',
  'max1280'
];

// https://stackoverflow.com/questions/49397538/typing-the-css-function-in-styled-components
/** Since css`` will add a comma (,) at the end, so we have to .join('') to remove this  */
const media = {
  small: (...args) =>
    css`
      @media screen and (max-width: 767px) {
        ${css(...args)}
      }
    `.join(''),
  medium: (...args) =>
    css`
      @media screen and (min-width: 768px) {
        ${css(...args)}
      }
    `.join(''),
  large: (...args) =>
    css`
      @media screen and (min-width: 1140px) {
        ${css(...args)}
      }
    `.join(''),
  min1360: (...args) =>
    css`
      @media screen and (min-width: 1361px) {
        ${css(...args)}
      }
    `.join(''),
  max1280: (...args) =>
    css`
      @media screen and (max-width: 1280px) {
        ${css(...args)}
      }
    `.join(''),
  min1280: (...args) =>
    css`
      @media screen and (min-width: 1281px) {
        ${css(...args)}
      }
    `.join('')
};

/** Convert to Percentage value */
const convertToPercent = value => value * 100;

/** Return value using calc() */
const returnCalcValue = (val1, val2) => `calc(${val1} - ${val2})`;

/**
 * Return `flex` property with its value according to
 * the passed props and screen size of Col components
 * Default it will return: `flex: 0 0 auto;`
 */
const setFlexProperty = (props, mediaSize = 'small') => {
  if (
    props[mediaSize] &&
    (typeof props[mediaSize] === 'string' ||
      typeof props[mediaSize] === 'object')
  ) {
    const valueDimension =
      typeof props[mediaSize] === 'object'
        ? props[mediaSize].value
        : props[mediaSize];

    switch (valueDimension) {
      case 'auto':
        return mediaSize === 'small' ? `flex: 0 0 auto;` : `flex: 1 1 0px;`;
      case 'shrink':
        return `
            flex: 0 0 auto;
            max-width: 100%;
          `;
      default:
        return `flex: 0 0 auto;`;
    }
  }

  return `flex: 0 0 auto;`;
};

/**
 * Return dimension property with its value
 * according to the direction of flex container.
 * By default it will use horizontal layout with
 * `width` property. In specific case when vertical
 * layout is being used, the returning dimension
 * will be `height`.
 *
 * When the passed prop is a object, usually this is
 * when user wants to have a gutter space between columns.
 * The dimension value will be calculated with its value
 * depending on the type of gutter: margin or padding.
 *
 * If the gutter is using margin (the row container will
 * need a negative margin), the dimension value will be
 * calculated with formula:
 * newValue = columnValue - marginSpace*2 (left and right margin)
 *
 * If the gutter is using padding (needs to defined in
 * Component with `padding: true`), The row container
 * won't need a negative margin. The dimension value will
 * be calculated as usual:
 * newValue = columnValue
 */
const setDimensionProperty = (
  props,
  dimension = 'width',
  mediaSize = 'small'
) => {
  const { valueDimension, valueGutter } =
    typeof props[mediaSize] === 'object'
      ? {
        valueDimension: props[mediaSize].value,
        valueGutter: props[mediaSize].gutter
      }
      : {
        valueDimension: props[mediaSize],
        valueGutter: 0
      };

  let valueForUndefined;
  let valueForFractionInput;
  let valueForStringInput;

  /**
   * By default there's no gutter between columns,
   * So, it doesn't need `calc` in order to calculate
   * properly value.
   * Or, the columns are defined with gutter spacing
   * using `padding`. This specific case also won't need `calc`
   * and the row container doesn't need to define a
   * negative gutter space
   */
  if (valueGutter === 0 || !!props[mediaSize].padding) {
    valueForUndefined     = '100%';
    valueForFractionInput = `${convertToPercent(valueDimension)}%`;
    valueForStringInput   = valueDimension;
  } else {
    /**
     * This case the columns will have gutter spaces
     * using `margin`. We use `calc` inside to properly
     * calculate new width.
     * The row container needs to define a gutter space
     * in this specific case.
     */
    valueForUndefined     = returnCalcValue('100%', `${valueGutter}*2`);
    valueForFractionInput = returnCalcValue(
      `${convertToPercent(valueDimension)}%`,
      `${valueGutter}*2`
    );
    valueForStringInput = returnCalcValue(valueDimension, `${valueGutter}*2`);
  }

  if (!valueDimension || (mediaSize === 'small' && valueDimension === 'auto'))
    return `${dimension}: ${valueForUndefined};`;

  if (valueDimension <= 1) return `${dimension}: ${valueForFractionInput};`;

  if (valueDimension === 'auto' || valueDimension === 'shrink')
    return `${dimension}: auto;`;

  return `${dimension}: ${valueForStringInput};`;
};

/**
 * Return a pair of gutter properties depend on
 * the dimension being used. The gutter is applied
 * on Col/Cell component.
 * The gutter property is either `margin` (default)
 * or `padding`.
 * When the dimension is `HEIGHT`, this is vertical layout.
 * So switch from `left, right` to `top, bottom`.
 * E.g:
 * "padding-left: 10px;
 *  padding-right: 10px;"
 */
const setGutterProperty = (dimension, gutterProperty, gutterValue) => {
  if (dimension === WIDTH) {
    return `
        ${gutterProperty}-left: ${gutterValue};
        ${gutterProperty}-right: ${gutterValue};
      `;
  } else {
    return `
        ${gutterProperty}-bottom: ${gutterValue};
        ${gutterProperty}-top: ${gutterValue};
      `;
  }
};

/**
 * Return a string combining of `flex` property, dimension property
 * (either `width` or `height`) and gutter property for column.
 * E.g:
 * "flex: 0 0 auto;
 *  width: '50%';
 *  margin-left: 10px;
 *  margin-right: 10px;"
 */
const setFlexAndDimension = ({ props, dimension, size }) => {
  let styles = '';
  styles += setFlexProperty(props, size);
  styles += setDimensionProperty(props, dimension, size);

  if (
    typeof props[size] === 'object' &&
    !!props[size].value &&
    !!props[size].gutter
  ) {
    if (!!props[size].padding)
      styles += setGutterProperty(dimension, 'padding', props[size].gutter);
    else styles += setGutterProperty(dimension, 'margin', props[size].gutter);
  }

  return styles;
};

/**
 * Return a pair of gutter properties. Applying for row container
 * when the gutter space type between columns is `margin`.
 * When the dimension is `HEIGHT`, this is vertical layout so
 * we switch from `left, right` to `bottom, top` axis.
 * E.g:
 * "margin-left: -10px;
 *  margin-right: -10px;"
 */
const returnNegativeGutter = (props, dimension, mediaSize) => {
  if (!!props[mediaSize]) {
    if (dimension === WIDTH)
      return `
          margin-left: -${props[mediaSize].gutter};
          margin-right: -${props[mediaSize].gutter};
        `;

    return `
        margin-bottom: -${props[mediaSize].gutter};
        margin-top: -${props[mediaSize].gutter};
      `;
  }

  return '';
};

/**
 * Iterate through the defined media array to generate
 * gutter properties for row. Usually this is the case
 * when user needs to have space between columns and the
 * type of gutter is `margin`.
 */
const generateRowGutterProperty = dimension => css`
  ${props => {
    let styles = '';

    for (const size of mediaArray) {
      if (size === 'small')
        styles += returnNegativeGutter(props, dimension, size);
      else {
        if (props[size]) {
          styles += media[size]`${returnNegativeGutter(
            props,
            dimension,
            size
          )}`;
        }
      }
    }

    return styles;
  }}
`;

/**
 * Iterate through the defined media array to generate
 * a list of according CSS being used for column(s).
 */
const generateProperty = dimension => css`
  ${props => {
    let styles = '';

    for (const size of mediaArray) {
      if (size === 'small')
        styles += setFlexAndDimension({ props, dimension, size });
      else {
        if (props[size]) {
          styles += media[size]`${setFlexAndDimension({
            props,
            dimension,
            size
          })}`;
        }
      }
    }

    return styles;
  }};
`;

const HCol = styled.div`
  min-height: 0px;
  min-width: 0px;
  ${generateProperty(WIDTH)};
`;

const Col = styled(HCol)`
  min-width: 0px;
`;

const VCol = styled.div`
  min-height: 0px;
  min-width: 0px;
  width: auto;
  ${generateProperty(HEIGHT)};
`;

const Flayout = styled.div`
  display: block;
`;

const FRow = styled.div`
  display: flex;
  flex-flow: ${props => (props.vert ? 'column nowrap' : 'row wrap')};
  ${props => generateRowGutterProperty(props.vert ? HEIGHT : WIDTH)};
`;

const Row = styled(FRow)`
  display: flex;
`;

export { Flayout, FRow, HCol, VCol, Col, Row };
