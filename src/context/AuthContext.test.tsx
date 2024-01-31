import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

describe('AuthContext component unit testing', () => {
    
    it('should render AuthContext with children', () => {
        
        const ChildComponent = () => {
            const { isAuthenticated, login, logout } = useAuth();
            return (
                <div>
                    <p>{`isAuthenticated: ${isAuthenticated}`}</p>
                    <button onClick={() => login('token')}>Login</button>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            );
        };

        render(
            <AuthProvider>
                <ChildComponent />
            </AuthProvider>
        );

        const isAuthenticatedElement = screen.getByText(/isAuthenticated/i);
        expect(isAuthenticatedElement).toMatchSnapshot();
    });
});