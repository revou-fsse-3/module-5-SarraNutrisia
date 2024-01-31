import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '.';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar component unit testing', () => {
  test('Navbar renders correctly', () => {
    const mockPush = jest.fn();
    
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
      push: mockPush,
    }));

    const document = render(<Navbar />);
    expect(document).toMatchSnapshot();
  });
  test('Clicking on the Home button navigates to /home', () => {
    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
      push: mockPush,
    }));

    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: /Home/i }));

    expect(mockPush).toHaveBeenCalledWith('/home');
  });

  test('Clicking on the Register button navigates to /register', () => {
    const mockPush = jest.fn();
    
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
      push: mockPush,
    }));

    render(<Navbar />);
    
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(mockPush).toHaveBeenCalledWith('/register');
  });

  test('Clicking on the Register button navigates to /login', () => {
    const mockPush = jest.fn();
    
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
      push: mockPush,
    }));

    render(<Navbar />);
    
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(mockPush).toHaveBeenCalledWith('/login');
  });


});