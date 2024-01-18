import classNames from 'classnames';
import * as React from 'react';
import { MarginProps, GetPropDefTypes, extractProps, marginPropDefs } from '../helpers';
import { dataListPropDefs, dataListItemPropDefs, dataListLabelPropDefs } from './data-list.props';

type DataListRootElement = HTMLDListElement;
type DataListRootOwnProps = GetPropDefTypes<typeof dataListPropDefs>;
interface DataListRootProps
  extends React.ComponentPropsWithoutRef<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<DataListRootElement, DataListRootProps>(
  (props, forwardedRef) => {
    const { className, ...dataListProps } = extractProps(props, dataListPropDefs, marginPropDefs);
    return (
      <dl
        {...dataListProps}
        ref={forwardedRef}
        className={classNames(className, 'rt-DataListRoot', 'rt-Text')}
      />
    );
  }
);
DataListRoot.displayName = 'DataListRootGrid';

type DataListItemElement = HTMLDivElement;
type DataListItemOwnProps = GetPropDefTypes<typeof dataListItemPropDefs>;
interface DataListItemProps extends React.ComponentPropsWithRef<'div'>, DataListItemOwnProps {}
const DataListItem = React.forwardRef<DataListItemElement, DataListItemProps>(
  (props, forwardedRef) => {
    const { className, ...itemProps } = extractProps(props, dataListItemPropDefs);
    return (
      <div {...itemProps} ref={forwardedRef} className={classNames(className, 'rt-DataListItem')} />
    );
  }
);
DataListItem.displayName = 'DataListItem';

type DataListLabelElement = React.ElementRef<'dt'>;
type DataListLabelOwnProps = GetPropDefTypes<typeof dataListLabelPropDefs>;
interface DataListLabelProps extends React.ComponentPropsWithRef<'dt'>, DataListLabelOwnProps {}
const DataListLabel = React.forwardRef<DataListLabelElement, DataListLabelProps>(
  (props, forwardedRef) => {
    const { className, minWidth, maxWidth, width, ...labelProps } = extractProps(
      props,
      dataListLabelPropDefs
    );
    return (
      <dt
        {...labelProps}
        ref={forwardedRef}
        className={classNames(className, 'rt-DataListLabel')}
        style={
          {
            '--data-list-label-width': width,
            '--data-list-label-min-width': minWidth,
            '--data-list-label-max-width': maxWidth,
            ...labelProps.style,
          } as React.CSSProperties
        }
      />
    );
  }
);
DataListLabel.displayName = 'DataListLabel';

type DataListDataElement = React.ElementRef<'dd'>;
interface DataListDataProps extends React.ComponentPropsWithoutRef<'dd'> {}
const DataListData = React.forwardRef<DataListDataElement, DataListDataProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <dd {...props} ref={forwardedRef} className={classNames(className, 'rt-DataListData')}>
      {children}
    </dd>
  )
);
DataListData.displayName = 'DataListData';

const DataList = Object.assign(
  {},
  {
    Root: DataListRoot,
    Item: DataListItem,
    Label: DataListLabel,
    Data: DataListData,
  }
);
export { DataList, DataListRoot, DataListItem, DataListLabel, DataListData };
export type { DataListRootProps, DataListItemProps, DataListLabelProps, DataListDataProps };
