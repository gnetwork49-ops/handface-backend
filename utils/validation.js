const validation = {
  isEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  isStrongPassword(password) {
    return password.length >= 8;
  },

  isUsername(username) {
    return typeof username === "string" && username.length >= 3 && username.length <= 30;
  },

  isRequired(value, fieldName) {
    if (value === undefined || value === null || value === "") {
      throw new Error(`${fieldName} is required`);
    }
    return true;
  },

  isMinLength(value, min, fieldName) {
    if (typeof value === "string" && value.length < min) {
      throw new Error(`${fieldName} must be at least ${min} characters`);
    }
    return true;
  },

  isMaxLength(value, max, fieldName) {
    if (typeof value === "string" && value.length > max) {
      throw new Error(`${fieldName} must be at most ${max} characters`);
    }
    return true;
  },

  validate(Object, schema) {
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = Object[field];

      if (rules.required) {
        try {
          this.isRequired(value, field);
        } catch (e) {
          errors.push(e.message);
        }
      }

      if (value && rules.type) {
        if (rules.type === "email" && !this.isEmail(value)) {
          errors.push("Invalid email format");
        }
        if (rules.type === "password" && !this.isStrongPassword(value)) {
          errors.push("Password must be at least 8 characters");
        }
      }

      if (rules.minLength !== undefined) {
        try {
          this.isMinLength(value, rules.minLength, field);
        } catch (e) {
          errors.push(e.message);
        }
      }

      if (rules.maxLength !== undefined) {
        try {
          this.isMaxLength(value, rules.maxLength, field);
        } catch (e) {
          errors.push(e.message);
        }
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    return true;
  }
};

module.exports = validation;