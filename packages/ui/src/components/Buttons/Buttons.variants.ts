interface IKindVariant {
  prop: string
  variants: {
    [key: string]: {
      color: string
      bg: string
      '&:hover': {
        bg: string
      }
    }
  }
}

export const getKindVariant = () => {
  const kindVariant: IKindVariant = {
    prop: 'kind',
    variants: {
      primary: {
        color: 'white.base',
        bg: 'primary.400',
        '&:hover': {
          bg: 'primaryHover.400',
        },
      },
      danger: {
        color: 'white.base',
        bg: 'error.300',
        '&:hover': {
          bg: 'error.400',
        },
      },
    },
  }

  return kindVariant
}

export const getApperanceVariant = (kind: string) => {
  const { variants } = getKindVariant()

  const apperanceVariant = {
    prop: 'appearance',
    variants: {
      outline: {
        color: variants[kind].bg,
        bg: 'white.base',
        border: `2px solid ${variants[kind].bg}`,
        '&:hover': {
          bg: 'gray.400',
        },
      },
      ghost: {
        color: variants[kind].bg,
        bg: 'transparent',
        '&:hover': {
          color: variants[kind]['&:hover'].bg,
          bg: 'transparent',
        },
      },
    },
  }

  return apperanceVariant
}

export const getSizeVariant = () => {
  const sizeVariant = {
    prop: 'size',
    variants: {
      sm: {
        minWidth: '85px',
        height: '36px',
        padding: '10px',
        fontSize: 'sm',
        borderRadius: '2px',
      },
      md: {
        minWidth: '105px',
        height: '40px',
        padding: '12px',
        fontSize: 'md',
        borderRadius: '3px',
      },
      lg: {
        minWidth: '120px',
        height: '46px',
        fontSize: 'lg',
        padding: '16px',
        borderRadius: '4px',
      },
    },
  }

  return sizeVariant
}
