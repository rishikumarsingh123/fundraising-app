const USER_ROLES = Object.freeze(["user", "admin"]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = Object.freeze({
  name: {
    type: "string",
    required: true,
    minLength: 2,
    maxLength: 80,
    trim: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: EMAIL_REGEX,
  },
  passwordHash: {
    type: "string",
    required: true,
    minLength: 8,
  },
  phone: {
    type: "string",
    required: false,
    trim: true,
    maxLength: 20,
  },
  role: {
    type: "string",
    required: false,
    enum: USER_ROLES,
    default: "user",
  },
  isActive: {
    type: "boolean",
    required: false,
    default: true,
  },
  avatarUrl: {
    type: "string",
    required: false,
    trim: true,
  },
  createdAt: {
    type: "date",
    required: false,
  },
  updatedAt: {
    type: "date",
    required: false,
  },
});

const trimIfString = (value) =>
  typeof value === "string" ? value.trim() : value;

function normalizeUserInput(payload = {}) {
  const now = new Date();

  return {
    name: trimIfString(payload.name),
    email:
      typeof payload.email === "string"
        ? payload.email.trim().toLowerCase()
        : payload.email,
    passwordHash: payload.passwordHash,
    phone: trimIfString(payload.phone),
    role: payload.role ?? userSchema.role.default,
    isActive: payload.isActive ?? userSchema.isActive.default,
    avatarUrl: trimIfString(payload.avatarUrl),
    createdAt: payload.createdAt ?? now,
    updatedAt: payload.updatedAt ?? now,
  };
}

function validateUser(payload = {}) {
  const user = normalizeUserInput(payload);
  const errors = [];

  if (!user.name || typeof user.name !== "string") {
    errors.push("name is required");
  } else {
    if (user.name.length < userSchema.name.minLength) {
      errors.push(`name must be at least ${userSchema.name.minLength} characters`);
    }

    if (user.name.length > userSchema.name.maxLength) {
      errors.push(`name must be at most ${userSchema.name.maxLength} characters`);
    }
  }

  if (!user.email || typeof user.email !== "string") {
    errors.push("email is required");
  } else if (!userSchema.email.match.test(user.email)) {
    errors.push("email must be valid");
  }

  if (!user.passwordHash || typeof user.passwordHash !== "string") {
    errors.push("passwordHash is required");
  } else if (user.passwordHash.length < userSchema.passwordHash.minLength) {
    errors.push(
      `passwordHash must be at least ${userSchema.passwordHash.minLength} characters`
    );
  }

  if (user.phone && user.phone.length > userSchema.phone.maxLength) {
    errors.push(`phone must be at most ${userSchema.phone.maxLength} characters`);
  }

  if (!USER_ROLES.includes(user.role)) {
    errors.push(`role must be one of: ${USER_ROLES.join(", ")}`);
  }

  if (typeof user.isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: user,
  };
}

module.exports = {
  USER_ROLES,
  normalizeUserInput,
  userSchema,
  validateUser,
};
