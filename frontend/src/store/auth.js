import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage
const loadFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key) || null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

const authSlice = createSlice({
    name: "auth",
    initialState: { 
        isLoggedIn: loadFromLocalStorage('isLoggedIn') === 'true',
        role: loadFromLocalStorage('role') || "buyer", 
        token: loadFromLocalStorage('token') || "", 
        userId: loadFromLocalStorage('userId') || "",
        isLoading: false,
        error: null
    },
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            const { id, role, token } = action.payload;
            state.isLoggedIn = true;
            state.role = role;
            state.token = token;
            state.userId = id;
            state.isLoading = false;
            
            // Save to localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', role);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', id);
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = "buyer";
            state.token = "";
            state.userId = "";
            
            // Clear localStorage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        },
        setUser(state, action) {
            const { id, role, token } = action.payload;
            state.isLoggedIn = true;
            state.role = role;
            state.token = token;
            state.userId = id;
            
            // Persist to localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', role);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', id);
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;