import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '.';

describe('Input component', () => {
  it('renders with provided props', () => {
    const placeholder = 'Enter text';
    const { getByPlaceholderText } = render(
      <Input type="text" placeholder={placeholder} />
    );

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toMatchSnapshot();
  });

  it('calls onChange callback when input value changes', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input type="text" placeholder="Enter text" onChange={onChangeMock} />
    );

    const inputElement = getByPlaceholderText('Enter text');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(onChangeMock).toHaveBeenCalled();

    expect(inputElement).toMatchSnapshot();
  });

  it('renders with additional className', () => {
    const placeholder = 'Enter text';
    const additionalClass = 'custom-class';
    const { getByPlaceholderText } = render(
      <Input
        type="text"
        placeholder={placeholder}
        className={additionalClass}
      />
    );

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toHaveClass(additionalClass);
  });
});
