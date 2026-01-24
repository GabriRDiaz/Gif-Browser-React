import { describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";

import { useState } from "react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
    test("should render search bar", () => {
        const container = render(<SearchBar onQuery={() => { }} />);
        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });

    test("should call onQuery only after 700ms", async () => {

        const onQuery = vi.fn()
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        })
    });

    test("Debounce: should call only once", async () => {

        const onQuery = vi.fn()
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });
        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.change(input, { target: { value: 'tes' } });
        fireEvent.change(input, { target: { value: 'test' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        })
    });

    test("should call onQuery on button click", async () => {

        const onQuery = vi.fn()
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });

    test('should have the correct placeholder', () => {
        const value = 'Buscar';

        render(<SearchBar onQuery={() => { }} placeholder={value} />);

        expect(screen.getByPlaceholderText(value)).toBeDefined();
    });
});