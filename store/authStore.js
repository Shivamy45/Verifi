import { create } from "zustand";

// Global Auth Store
export const useAuthStore = create((set) => ({
	user: null, // Firebase user object
	loading: true, // true until Firebase auth finishes
	clearUser: () => set({ user: null, loading: false }), // clear user and stop loading
	setUser: (user) => set({ user, loading: false }), // set user and stop loading
}));
