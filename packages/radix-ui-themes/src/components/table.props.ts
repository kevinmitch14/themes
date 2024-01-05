import type { PropDef } from '../helpers';
import { paddingValues, paddingPropDefs } from '../helpers';

const sizes = ['1', '2', '3'] as const;
const variants = ['surface', 'ghost'] as const;

const tableRootPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', values: variants, default: 'ghost' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

const rowAlign = ['start', 'center', 'end', 'baseline'] as const;

const tableRowPropDefs = {
  align: { type: 'enum', values: rowAlign, default: undefined, responsive: true },
} satisfies {
  align: PropDef<(typeof rowAlign)[number]>;
};

const justifyValues = ['start', 'center', 'end'] as const;
const widthValues = ['auto', '100%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const tableCellPropDefs = {
  justify: { type: 'enum', values: justifyValues, default: undefined, responsive: true },
  width: { type: 'enum | string', values: widthValues, default: undefined, responsive: true },
  ...paddingPropDefs,
} satisfies {
  justify: PropDef<(typeof justifyValues)[number]>;
  width: PropDef<(typeof widthValues)[number]>;
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

export { tableRootPropDefs, tableRowPropDefs, tableCellPropDefs };
