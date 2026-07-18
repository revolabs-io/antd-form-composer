import type {
  AutoCompleteProps,
  CascaderProps,
  CheckboxProps,
  ColProps,
  DatePickerProps,
  FormInstance,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  RateProps,
  SelectProps,
  SwitchProps,
  TimePickerProps,
  TransferProps,
  TreeSelectProps,
} from 'antd';
import type { ComponentProps } from 'react';
import React from 'react';

import { FormComposerListProps } from './List';

/** Compatible with antd NamePath across v4/v5/v6 without deep imports. */
export type NamePath = string | number | Array<string | number>;

export type ColSpanType = number | string | ColProps;

export type AnyObject = Record<string, any>; //eslint-disable-line

/** Fallback structural types when public antd exports differ across majors. */
type PasswordProps = ComponentProps<'input'> & AnyObject;
type SearchProps = InputProps & AnyObject;
type TextAreaProps = ComponentProps<'textarea'> & AnyObject;
type CheckboxGroupProps = AnyObject;
type RangePickerProps = AnyObject;
type MentionProps = AnyObject;
type SliderSingleProps = AnyObject;
type SliderRangeProps = AnyObject;

interface FormItemBase {
  col: ((form: FormInstance, values: AnyObject) => ColSpanType) | ColSpanType;
  itemProps:
    | ((form: FormInstance, values: AnyObject) => FormItemProps)
    | FormItemProps;
  hidden?: ((form: FormInstance, values: AnyObject) => boolean) | boolean;
}

interface FormItemAutoComplete extends FormItemBase {
  type: 'autocomplete';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AutoCompleteProps)
    | AutoCompleteProps;
}

interface FormItemCascader extends FormItemBase {
  type: 'cascader';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => CascaderProps)
    | CascaderProps;
}

interface FormItemCheckbox extends FormItemBase {
  type: 'checkbox';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => CheckboxProps)
    | CheckboxProps;
}

interface FormItemCheckboxGroup extends FormItemBase {
  type: 'checkbox';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => CheckboxGroupProps)
    | CheckboxGroupProps;
}

interface FormItemDatePicker extends FormItemBase {
  type: 'date-picker';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => DatePickerProps)
    | DatePickerProps;
}

interface FormItemRangePicker extends FormItemBase {
  type: 'range-picker';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => RangePickerProps)
    | RangePickerProps;
}

interface FormItemInput extends FormItemBase {
  type: 'text';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => InputProps)
    | InputProps;
}

interface FormItemPassword extends FormItemBase {
  type: 'password';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => PasswordProps)
    | PasswordProps;
}

interface FormItemSearch extends FormItemBase {
  type: 'search';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => SearchProps)
    | SearchProps;
}

interface FormItemTextarea extends FormItemBase {
  type: 'textarea';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => TextAreaProps)
    | TextAreaProps;
}

interface FormItemNumber extends FormItemBase {
  type: 'number';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => InputNumberProps)
    | InputNumberProps;
}

interface FormItemMentions extends FormItemBase {
  type: 'mentions';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => MentionProps)
    | MentionProps;
}

interface FormItemRadio extends FormItemBase {
  type: 'radio';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => RadioProps)
    | RadioProps;
}

interface FormItemRadioGroup extends FormItemBase {
  type: 'radio-group';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => RadioGroupProps)
    | RadioGroupProps;
}

interface FormItemRate extends FormItemBase {
  type: 'rate';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => RateProps)
    | RateProps;
}

interface FormItemSelect extends FormItemBase {
  type: 'select';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => SelectProps)
    | SelectProps;
}

interface FormItemSlider extends FormItemBase {
  type: 'slider';
  inputProps:
    | ((
        form: FormInstance,
        values: AnyObject,
      ) => SliderSingleProps | SliderRangeProps)
    | (SliderSingleProps | SliderRangeProps);
}

interface FormItemSwitch extends FormItemBase {
  type: 'switch';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => SwitchProps)
    | SwitchProps;
}

interface FormItemTimePicker extends FormItemBase {
  type: 'time-picker';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => TimePickerProps)
    | TimePickerProps;
}

interface FormItemTransfer extends FormItemBase {
  type: 'transfer';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => TransferProps<AnyObject>)
    | TransferProps<AnyObject>;
}

interface FormItemTreeSelect extends FormItemBase {
  type: 'tree-select';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => TreeSelectProps)
    | TreeSelectProps;
}

interface FormItemCustom extends FormItemBase {
  type: 'custom';
  component?: React.ComponentType<any>; //eslint-disable-line
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AnyObject)
    | AnyObject;
}

interface FormItemHidden extends FormItemBase {
  type: 'hidden';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AnyObject)
    | AnyObject;
}

interface FormListItem extends FormItemBase {
  type: 'list';
  inputProps:
    | ((form: FormInstance, values: AnyObject) => FormComposerListProps)
    | FormComposerListProps;
}

interface FormItemDynamic extends FormItemBase {
  type: string;
  component?: React.ComponentType<any>; //eslint-disable-line
  inputProps:
    | ((form: FormInstance, values: AnyObject) => AnyObject)
    | AnyObject;
}

export type FormComposerItemType =
  | FormItemAutoComplete
  | FormItemCascader
  | FormItemCheckbox
  | FormItemCheckboxGroup
  | FormItemDatePicker
  | FormItemRangePicker
  | FormItemInput
  | FormItemSearch
  | FormItemPassword
  | FormItemTextarea
  | FormItemNumber
  | FormItemMentions
  | FormItemRadio
  | FormItemRadioGroup
  | FormItemRate
  | FormItemSelect
  | FormItemSlider
  | FormItemSwitch
  | FormItemTimePicker
  | FormItemTransfer
  | FormItemTreeSelect
  | FormListItem
  | FormItemCustom
  | FormItemHidden
  | FormItemDynamic;
