import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { CustomHeader } from './CustomHeader'

describe('CustomHeader', () => {
    const title = 'Test';
    
    test('should render title and subtitle',()=> {
        const subtitle = 'TestSubt'
        render(<CustomHeader title = {title} subtitle={subtitle}/>);
        expect(screen.getByText(title)).toBeDefined();
        expect(screen.getByText(subtitle)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(subtitle);
    });
    test('should not render subtitle if not provided',()=> {
        const {container} = render(<CustomHeader title = {title}/>);
        
        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);

        const p = divElement?.querySelector('p');
        expect(p).toBeNull();
    });

});