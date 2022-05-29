import { Breakpoints, BREAKPOINTS, CustomStyles } from './tokens'

export const composeStyles = (
  arr: (string | undefined | { style: string; condition: boolean })[]
) =>
  arr
    .reduce((accum, className) => {
      if (typeof className === 'string') return [...accum, className]
      if (typeof className === 'object' && className.condition) {
        return [...accum, className.style]
      }
      return accum
    }, [] as string[])
    .join(' ')

// Generates media queries formatted for Vanilla Extract
export const responsiveStyle = (
  styles: Partial<Record<Breakpoints, CustomStyles>>,
  fallback: CustomStyles = {}
) => {
  return {
    ...fallback,
    '@media': Object.entries(styles).reduce(
      (compiled, [breakpoint, _styles]) => ({
        ...compiled,
        [BREAKPOINTS[breakpoint as Breakpoints]]: _styles,
      }),
      {} as Record<`screen and ${string}`, CustomStyles>
    ),
  }
}
