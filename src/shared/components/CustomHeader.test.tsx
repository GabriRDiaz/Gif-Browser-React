import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { CustomHeader } from './CustomHeader'

describe('CustomHeader', () => ({

    test('should render title',()=> {
    render(<CustomHeader title = 'Test' />)
});

});