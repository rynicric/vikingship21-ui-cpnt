import React from 'react';
import { ReactElement } from 'react';
import { InputProps } from '../input/input';
export declare type DataSourceProps<T = {}> = T & {
    value: string;
};
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** Setting the suggestion fetching method */
    fetchSugg: (query: string) => DataSourceProps[] | Promise<DataSourceProps[]>;
    /** Setting the suggest displaying method */
    renderSugg?: (item: DataSourceProps) => ReactElement;
    /** Setting the callback function called when you select one item */
    onSelect?: (item: DataSourceProps) => void;
}
/**
 * This is a simple auto-complete component, please
 * provide `fetchSugg` to improve the function.
 *
 * @param props
 */
export declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
