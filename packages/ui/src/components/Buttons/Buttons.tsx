import styled from 'styled-components'
import { fonts, fontSizes } from '../../foundation'

// const BUTTON_MODIFIERS = {
//   small: () => `
//     font-size: ${typeScale.helperText};
//     padding: 8px;
//   `,
//   large: () => `
//     font-size: ${typeScale.header5};
//     padding: 16px 24px;
//   `,
//   warning: ({ props }) => `
//     background: none;
//     color: ${props.theme.status.warningColor};
//     &:hover, &:focus {
//       background-color: ${props.theme.status.warningColorHover};
//       outline: 3px solid ${props.theme.status.warningColorHover};
//       outline-offset: 2px;
//       border: 2px solid transparent;
//     }

//     &:active {
//       background-color: ${props.theme.status.warningColorActive};
//     }
//   `,
//   primaryButtonWarning: ({ props }) => `
//     background-color: ${props.theme.status.warningColor};
//     color: ${props.theme.textColorInverted};
//   `,
//   secondaryButtonWarning: ({ props }) => `
//     border: 2px solid ${props.theme.status.warningColor};
//   `,
//   error: ({ props }) => `
//     background: none;
//     color: ${props.theme.status.errorColor};
//     &:hover, &:focus {
//       background-color: ${props.theme.status.errorColorHover};
//       outline: 3px solid ${props.theme.status.errorColorHover};
//       outline-offset: 2px;
//       border: 2px solid transparent;
//     }
//     &:active {
//       background-color: ${props.theme.status.errorColorActive};
//     }
//   `,
//   primaryButtonError: ({ props }) => `
//     background-color: ${props.theme.status.errorColor};
//     color: ${props.theme.textColorInverted};
//   `,
//   secondaryButtonError: ({ props }) => `
//     border: 2px solid ${props.theme.status.warningColor};
//   `,
//   success: ({ props }) => `
//     background: none;
//     color: ${props.theme.status.successColor};
//     &:hover, &:focus {
//       background-color: ${props.theme.status.successColorHover};
//       outline: 3px solid ${props.theme.status.successColorHover};
//       outline-offset: 2px;
//       border: 2px solid transparent;
//     }
//     &:active {
//       background-color: ${props.theme.status.successColorActive};
//     }
//   `,
//   primaryButtonSuccess: ({ props }) => `
//     background-color: ${props.theme.status.successColor};
//     color: ${props.theme.textColorInverted};
//   `,
//   secondaryButtonSuccess: ({ props }) => `
//     border: 2px solid ${props.theme.status.warningColor};
//   `,
// }

const Button = styled.button`
  min-width: 100px;
  font-family: ${fonts.base};
  font-size: ${fontSizes.base};
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const PrimaryBtn = styled(Button)`
  color: ${({ theme }) => theme.colors.primaryBtnColor};
  background-color: ${({ theme }) => theme.colors.primaryBtnBg};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryBtnHover};
  }
`

export const SecondaryBtn = styled(Button)`
  color: ${({ theme }) => theme.colors.secondaryBtnColor};
  background-color: ${({ theme }) => theme.colors.secondaryBtnBg};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryBtnHover};
  }
`
