import { render } from '@testing-library/react';
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
});