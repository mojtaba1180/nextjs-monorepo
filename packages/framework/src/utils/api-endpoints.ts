/**
 * Centralized API endpoints configuration
 * All endpoints should be defined here to avoid hardcoding
 */

// Authentication endpoints
const AUTH = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/auth/verify-email",
} as const;

// User management endpoints
const USER = {
  PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/update-profile",
  CHANGE_PASSWORD: "/user/change-password",
  UPLOAD_AVATAR: "/user/upload-avatar",
} as const;

// Users management (admin)
const USERS = {
  LIST: "/admin/users",
  CREATE: "/admin/users",
  UPDATE: "/admin/users",
  DELETE: "/admin/users",
  BULK_DELETE: "/admin/users/bulk-delete",
  EXPORT: "/admin/users/export",
} as const;

// Articles/Learning content endpoints
const ARTICLES = {
  ADMIN_LEARNING_LIST: "/adminlearninglist",
  ADD_ARTICLE: "/admininsertlearningbase1",
  UPDATE_ARTICLE: "/adminupdatelearning",
  DELETE_ARTICLE: "/admindeletelearning",
  ADD_ARTICLE_DETAILS: "/admininsertlearningbase2",
  UPDATE_ARTICLE_DETAILS: "/adminupdatelearningdetails",
  GET_ARTICLE_DETAILS: "/admingetlearningdetails",
} as const;

// File management endpoints
const FILE = {
  UPLOAD: "/file/upload",
  DELETE: "/file/delete",
  GET_FILE: "/file/get",
  BULK_UPLOAD: "/file/bulk-upload",
} as const;

// Contact us endpoints
const CONTACT_US = {
  SUBMIT: "/contact/submit",
  LIST: "/admin/contact/list",
  UPDATE_STATUS: "/admin/contact/update-status",
  DELETE: "/admin/contact/delete",
} as const;

// Doctors endpoints
const DOCTORS = {
  LIST: "/doctors",
  CREATE: "/doctors",
  UPDATE: "/doctors",
  DELETE: "/doctors",
  SPECIALTIES: "/doctors/specialties",
  AVAILABILITY: "/doctors/availability",
} as const;

// Products endpoints (example)
const PRODUCTS = {
  LIST: "/products",
  CREATE: "/products",
  UPDATE: "/products",
  DELETE: "/products",
  CATEGORIES: "/products/categories",
  SEARCH: "/products/search",
} as const;

// Categories endpoints
const CATEGORIES = {
  LIST: "/categories",
  CREATE: "/categories",
  UPDATE: "/categories",
  DELETE: "/categories",
  TREE: "/categories/tree",
} as const;

/**
 * Main API endpoints object
 * Add new endpoint groups here
 */
const API_ENDPOINTS = {
  AUTH,
  USER,
  USERS,
  ARTICLES,
  FILE,
  CONTACT_US,
  DOCTORS,
  PRODUCTS,
  CATEGORIES,
} as const;

export default API_ENDPOINTS;

// Export individual endpoint groups for convenience
export {
  AUTH,
  USER,
  USERS,
  ARTICLES,
  FILE,
  CONTACT_US,
  DOCTORS,
  PRODUCTS,
  CATEGORIES,
};
