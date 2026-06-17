// Validation rules for all auth forms
export const loginSchema = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    }
  }
};

export const signupSchema = (role) => ({
  firstName: {
    required: "First name is required"
  },
  lastName: {
    required: "Last name is required"
  },
  company: role === 'recruiter' ? {
    required: "Company name is required"
  } : undefined,
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message: "Include uppercase, lowercase, and number"
    }
  },
  confirmPassword: {
    required: "Please confirm password",
    validate: (value, allValues) => (value === allValues.password) || "Passwords don't match"
  }
});