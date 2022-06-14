import { render, screen } from '@testing-library/react'

import { Button } from '../Button'

describe('tests', () => {
  it('should', () => {
    render(<Button />)
    expect(screen.getByText('Boop')).toBeInTheDocument()
  })
})
