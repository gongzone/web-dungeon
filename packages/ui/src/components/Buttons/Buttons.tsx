import styled from 'styled-components'
import { variant } from 'styled-system'

import {
  getKindVariant,
  getApperanceVariant,
  getSizeVariant,
} from './Buttons.variants'

interface IButtonProps {
  kind: 'primary' | 'danger'
  appearance?: 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean
  fullWidth?: boolean
}

export const Button = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${variant(getKindVariant())}
  ${(props) => variant(getApperanceVariant(props.kind))}
  ${variant(getSizeVariant())}

  ${({ iconOnly }) =>
    iconOnly &&
    `
    min-width: auto;
    height: auto;
  `}

  ${({ fullWidth }) =>
    fullWidth &&
    `
    min-width: auto;
    width: 100%;
  `}

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.gray[600]};
    background-color: ${({ theme }) => theme.colors.gray[300]};
  }
`

Button.defaultProps = {
  kind: 'primary',
  size: 'md',
  iconOnly: false,
  fullWidth: false,
}
