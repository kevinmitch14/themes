import classNames from 'classnames';
import { withBreakpoints, getResponsiveStyles } from '../breakpoints';
import { mergeStyles } from '../merge-styles';

import type { PropDef, GetPropDefTypes } from './prop-def';

const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const paddingPropDefs = {
  p: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  px: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  py: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pt: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pr: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pb: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pl: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
} satisfies {
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

type PaddingProps = GetPropDefTypes<typeof paddingPropDefs>;

function extractPaddingProps<T extends PaddingProps>(props: T) {
  const {
    p = layoutPropDefs.p.default,
    px = layoutPropDefs.px.default,
    py = layoutPropDefs.py.default,
    pt = layoutPropDefs.pt.default,
    pr = layoutPropDefs.pr.default,
    pb = layoutPropDefs.pb.default,
    pl = layoutPropDefs.pl.default,
    ...rest
  } = props;
  return { p, px, py, pt, pr, pb, pl, rest };
}

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;
// prettier-ignore
const positionEdgeValues = ['auto', '100%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9'] as const;
// prettier-ignore
const widthHeightValues = ['auto', '100%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const flexShrinkValues = ['0', '1'] as const;
const flexGrowValues = ['0', '1'] as const;

// prettier-ignore
const layoutPropDefs = {
  ...paddingPropDefs,
  position: { type: 'enum', values: positionValues, default: undefined, responsive: true },
  inset: { type: 'enum | string', values: positionEdgeValues, default: undefined, responsive: true },
  top: { type: 'enum | string', values: positionEdgeValues, default: undefined, responsive: true },
  right: { type: 'enum | string', values: positionEdgeValues, default: undefined, responsive: true },
  bottom: { type: 'enum | string', values: positionEdgeValues, default: undefined, responsive: true },
  left: { type: 'enum | string', values: positionEdgeValues, default: undefined, responsive: true },
  width: { type: 'enum | string', values: widthHeightValues, default: undefined, responsive: true },
  height: { type: 'enum | string', values: widthHeightValues, default: undefined, responsive: true },
  flexShrink: { type: 'enum | string', values: flexShrinkValues, default: undefined, responsive: true },
  flexGrow: { type: 'enum | string', values: flexGrowValues, default: undefined, responsive: true },
  gridColumn: { type: 'string', default: undefined, responsive: true },
  gridColumnStart: { type: 'string', default: undefined, responsive: true },
  gridColumnEnd: { type: 'string', default: undefined, responsive: true },
  gridRow: { type: 'string', default: undefined, responsive: true },
  gridRowStart: { type: 'string', default: undefined, responsive: true },
  gridRowEnd: { type: 'string', default: undefined, responsive: true },
} satisfies {
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
  position: PropDef<(typeof positionValues)[number]>;
  inset: PropDef<(typeof positionEdgeValues)[number]>;
  top: PropDef<(typeof positionEdgeValues)[number]>;
  right: PropDef<(typeof positionEdgeValues)[number]>;
  bottom: PropDef<(typeof positionEdgeValues)[number]>;
  left: PropDef<(typeof positionEdgeValues)[number]>;
  width: PropDef<(typeof widthHeightValues)[number]>;
  height: PropDef<(typeof widthHeightValues)[number]>;
  flexShrink: PropDef<(typeof flexShrinkValues)[number]>;
  flexGrow: PropDef<(typeof flexGrowValues)[number]>;
  gridColumn: PropDef<string>;
  gridColumnStart: PropDef<string>;
  gridColumnEnd: PropDef<string>;
  gridRow: PropDef<string>;
  gridRowStart: PropDef<string>;
  gridRowEnd: PropDef<string>;
};

type LayoutProps = GetPropDefTypes<typeof layoutPropDefs> & {
  /** @deprecated Rename this prop to `flexShrink`. The `shrink` prop will be removed in the next major release. */
  shrink?: GetPropDefTypes<typeof layoutPropDefs>['flexShrink'];
  /** @deprecated Rename this prop to `flexGrow`. The `grow` prop will be removed in the next major release. */
  grow?: GetPropDefTypes<typeof layoutPropDefs>['flexGrow'];
};

function extractLayoutProps<T extends LayoutProps>(props: T) {
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(props);
  const {
    position = layoutPropDefs.position.default,
    width = layoutPropDefs.width.default,
    height = layoutPropDefs.height.default,
    inset = layoutPropDefs.inset.default,
    top = layoutPropDefs.top.default,
    bottom = layoutPropDefs.bottom.default,
    left = layoutPropDefs.left.default,
    right = layoutPropDefs.right.default,
    shrink = layoutPropDefs.flexShrink.default,
    grow = layoutPropDefs.flexGrow.default,
    flexShrink = layoutPropDefs.flexShrink.default,
    flexGrow = layoutPropDefs.flexGrow.default,
    gridColumn = layoutPropDefs.gridColumn.default,
    gridColumnStart = layoutPropDefs.gridColumnStart.default,
    gridColumnEnd = layoutPropDefs.gridColumnEnd.default,
    gridRow = layoutPropDefs.gridRow.default,
    gridRowStart = layoutPropDefs.gridRowStart.default,
    gridRowEnd = layoutPropDefs.gridRowEnd.default,
    ...rest
  } = paddingRest;
  return {
    ...paddingProps,
    position,
    width,
    height,
    inset,
    top,
    bottom,
    left,
    right,
    flexShrink,
    flexGrow,
    gridColumn,
    gridColumnStart,
    gridColumnEnd,
    gridRow,
    gridRowStart,
    gridRowEnd,
    rest,
  };
}

function getPaddingStyles(props: PaddingProps) {
  const [paddingClassNames, paddingCustomProperties] = getResponsiveStyles({
    className: 'rt-r-p',
    customProperty: '--padding',
    propValues: paddingValues,
    value: props.p,
  });

  const [pxClassNames, pxCustomProperties] = getResponsiveStyles({
    className: 'rt-r-px',
    customProperty: ['--padding-left', '--padding-right'],
    propValues: paddingValues,
    value: props.px,
  });

  const [pyClassNames, pyCustomProperties] = getResponsiveStyles({
    className: 'rt-r-py',
    customProperty: ['--padding-top', '--padding-bottom'],
    propValues: paddingValues,
    value: props.py,
  });

  const [ptClassNames, ptCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pt',
    customProperty: '--padding-top',
    propValues: paddingValues,
    value: props.pt,
  });

  const [prClassNames, prCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pr',
    customProperty: '--padding-right',
    propValues: paddingValues,
    value: props.pr,
  });

  const [pbClassNames, pbCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pb',
    customProperty: '--padding-bottom',
    propValues: paddingValues,
    value: props.pb,
  });

  const [plClassNames, plCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pl',
    customProperty: '--padding-left',
    propValues: paddingValues,
    value: props.pl,
  });

  return [
    classNames(
      paddingClassNames,
      pxClassNames,
      pyClassNames,
      ptClassNames,
      prClassNames,
      pbClassNames,
      plClassNames
    ),
    mergeStyles(
      paddingCustomProperties,
      pxCustomProperties,
      pyCustomProperties,
      ptCustomProperties,
      prCustomProperties,
      pbCustomProperties,
      plCustomProperties
    ),
  ] as const;
}

function getLayoutStyles(props: LayoutProps) {
  const [paddingClassNames, paddingCustomProperties] = getPaddingStyles(props);

  const [widthClassNames, widthCustomProperties] = getResponsiveStyles({
    className: 'rt-r-w',
    customProperty: '--width',
    propValues: layoutPropDefs.width.values,
    value: props.width,
  });

  const [heightClassNames, heightCustomProperties] = getResponsiveStyles({
    className: 'rt-r-h',
    customProperty: '--height',
    propValues: layoutPropDefs.height.values,
    value: props.height,
  });

  const positionClassNames = withBreakpoints(props.position, 'rt-r-position');

  const [insetClassNames, insetCustomProperties] = getResponsiveStyles({
    className: 'rt-r-inset',
    customProperty: '--inset',
    propValues: layoutPropDefs.inset.values,
    value: props.inset,
  });

  const [insetTopClassNames, insetTopCustomProperties] = getResponsiveStyles({
    className: 'rt-r-top',
    customProperty: '--top',
    propValues: layoutPropDefs.top.values,
    value: props.top,
  });

  const [insetRightClassNames, insetRightCustomProperties] = getResponsiveStyles({
    className: 'rt-r-right',
    customProperty: '--right',
    propValues: layoutPropDefs.right.values,
    value: props.right,
  });

  const [insetBottomClassNames, insetBottomCustomProperties] = getResponsiveStyles({
    className: 'rt-r-bottom',
    customProperty: '--bottom',
    propValues: layoutPropDefs.bottom.values,
    value: props.bottom,
  });

  const [insetLeftClassNames, insetLeftCustomProperties] = getResponsiveStyles({
    className: 'rt-r-left',
    customProperty: '--left',
    propValues: layoutPropDefs.left.values,
    value: props.left,
  });

  const [flexShrinkClassNames, flexShrinkCustomProperties] = getResponsiveStyles({
    className: 'rt-r-fs',
    customProperty: '--flex-shrink',
    propValues: layoutPropDefs.flexShrink.values,
    value: props.flexShrink ?? props.shrink,
  });

  const [flexGrowClassNames, flexGrowCustomProperties] = getResponsiveStyles({
    className: 'rt-r-fg',
    customProperty: '--flex-grow',
    propValues: layoutPropDefs.flexGrow.values,
    value: props.flexGrow ?? props.grow,
  });

  const [gridColumnClassNames, gridColumnCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gc',
    customProperty: '--grid-column',
    value: props.gridColumn,
  });

  const [gridColumnStartClassNames, gridColumnStartCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gcs',
    customProperty: '--grid-column-start',
    value: props.gridColumnStart,
  });

  const [gridColumnEndClassNames, gridColumnEndCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gce',
    customProperty: '--grid-column-end',
    value: props.gridColumnEnd,
  });

  const [gridRowClassNames, gridRowCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gr',
    customProperty: '--grid-row',
    value: props.gridRow,
  });

  const [gridRowStartClassNames, gridRowStartCustomProperties] = getResponsiveStyles({
    className: 'rt-r-grs',
    customProperty: '--grid-row-start',
    value: props.gridRowStart,
  });

  const [gridRowEndClassNames, gridRowEndCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gre',
    customProperty: '--grid-row-end',
    value: props.gridRowEnd,
  });

  return [
    classNames(
      positionClassNames,
      paddingClassNames,
      widthClassNames,
      heightClassNames,
      insetClassNames,
      insetTopClassNames,
      insetRightClassNames,
      insetBottomClassNames,
      insetLeftClassNames,
      flexShrinkClassNames,
      flexGrowClassNames,
      gridColumnClassNames,
      gridColumnStartClassNames,
      gridColumnEndClassNames,
      gridRowClassNames,
      gridRowStartClassNames,
      gridRowEndClassNames
    ),
    mergeStyles(
      paddingCustomProperties,
      widthCustomProperties,
      heightCustomProperties,
      insetCustomProperties,
      insetTopCustomProperties,
      insetRightCustomProperties,
      insetBottomCustomProperties,
      insetLeftCustomProperties,
      flexShrinkCustomProperties,
      flexGrowCustomProperties,
      gridColumnCustomProperties,
      gridColumnStartCustomProperties,
      gridColumnEndCustomProperties,
      gridRowCustomProperties,
      gridRowStartCustomProperties,
      gridRowEndCustomProperties
    ),
  ] as const;
}

export {
  // Padding props
  paddingPropDefs,
  paddingValues,
  extractPaddingProps,
  getPaddingStyles,

  // Layout props
  layoutPropDefs,
  extractLayoutProps,
  getLayoutStyles,
};

export type { PaddingProps, LayoutProps };
