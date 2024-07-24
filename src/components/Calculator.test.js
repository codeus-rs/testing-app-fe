import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calculator from './Calculator';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

describe('Calculator Component', () => {
  beforeEach(() => {
    // Reset axios mock before each test
    axios.post.mockReset();
  });

  test('renders calculator with buttons and input', () => {
    render(<Calculator />);

    expect(screen.getByTestId('input-field')).toBeInTheDocument();

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  test('updates input value when buttons are clicked', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));

    expect(screen.getByTestId('input-field')).toHaveValue('12');
  });

  test('clears input and result when "C" is clicked', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));

    fireEvent.click(screen.getByText('C'));

    expect(screen.getByTestId('input-field')).toHaveValue('');
    expect(screen.queryByText(/Result:/)).not.toBeInTheDocument();
  });

  test('calculates result and displays it', async () => {
    // Mock axios.post to return a successful response
    axios.post.mockResolvedValue({
      data: { result: '42' },
    });

    render(<Calculator />);

    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    await waitFor(() => {
      expect(screen.getByText('Result: 42')).toBeInTheDocument();
    });
  });

  test('handles errors from the calculation API', async () => {
    // Mock axios.post to return an error
    axios.post.mockRejectedValue(new Error('Error calculating'));

    render(<Calculator />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    await waitFor(() => {
      expect(screen.queryByText(/Result:/)).not.toBeInTheDocument();
    });
  });
});

//Snapshot test
test('renders CurrencyConverter correctly', () => {
  const { asFragment } = render(<Calculator />);
  expect(asFragment()).toMatchSnapshot();
});
