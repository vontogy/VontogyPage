// Shared types and utilities between frontend and backend
// Add shared types, constants, or utilities here as needed

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface HealthCheck {
  status: string;
  timestamp: string;
}
