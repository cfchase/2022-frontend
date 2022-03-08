import { css } from 'lit';
import type { CSSResult } from 'lit';

export const states = [
  'frame',
  'color',
  'pedals',
  'seat',
  'handles',
  'wheels',
] as const;

export const colors = [
  'Red',
  'Orange',
  'Navy',
  'Blue',
] as const;

export const bikeTypes = [
  'Road',
  'loRider',
  'wagon',
  'Tri',
  'eBike',
] as const;

export type State = typeof states[number];

export type Color = typeof colors[number];

export type BikeType = typeof bikeTypes[number];

export type VariableName =
  | 'color'
	| 'navHeight'
	| 'contentMaxWidth'

export interface Token {
	prop: CSSResult;
	value: CSSResult;
}

export const tokens: Record<VariableName, Token> = Object.freeze({
	'color': {
		prop: css`--color`,
		value: css`#6a6e72`
	},
	'navHeight': {
		prop: css`--nav-height`,
		value: css`135px`
	},
	'contentMaxWidth': {
		prop: css`--content-max-width`,
		value: css`990px`
	}
});

export function variable(name: VariableName): CSSResult {
	const { prop, value } = tokens[name];
	return css`var(${prop}, ${value})`;
};