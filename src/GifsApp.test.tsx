import { render } from '@testing-library/react';
import {describe,test,expect} from 'vitest';
import { GifsApp } from './GifsApp';

describe('GifsApp', ()=>{
    test('Should render components properly', ()=>{
        const {container} = render(<GifsApp/>);
        expect(container).toMatchSnapshot()

    })
})