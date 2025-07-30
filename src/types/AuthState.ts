interface AuthState {
    isAuthenticated?: boolean;
    userId: string | null;
    email: string | null;
    role: 'admin' | 'tenant' | 'owner' | null;
}