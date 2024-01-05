import type { PropDef } from '../helpers';
import { colorProp, paddingPropDefs, paddingValues, radiusProp } from '../helpers';
import { flexPropDefs } from './flex.props';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft'] as const;

const textFieldPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', values: variants, default: 'surface' },
  color: colorProp,
  radius: radiusProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  radius: typeof radiusProp;
};

// TODO: slot props type currently allows all padding props, which is weird
const textFieldSlotPropDefs = {
  color: colorProp,
  gap: flexPropDefs.gap,
  ...paddingPropDefs,
} satisfies {
  color: typeof colorProp;
  gap: typeof flexPropDefs.gap;
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

export { textFieldPropDefs, textFieldSlotPropDefs };
