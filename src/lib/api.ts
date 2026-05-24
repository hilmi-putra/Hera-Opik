const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";
const ADMIN_TOKEN_KEY = "hera_taufik_admin_token";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
};

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "admin";
};

export type AdminLoginResponse = {
  token: string;
  user: AdminUser;
};

export type PublicGift = {
  id: number;
  name: string;
  description: string;
  price: number;
  totalStock: number;
  purchasedCount: number;
  image: string | null;
  color: string;
  link: string;
};

export type PublicWish = {
  id: number;
  name: string;
  message: string;
  status: string;
  date: string;
};

export type AdminRsvp = {
  id: number;
  guest_name: string;
  phone_number: string | null;
  attendance_status: string;
  events: string[] | null;
  total_attendees: number;
  notes: string | null;
  created_at: string;
};

export type AdminWish = {
  id: number;
  guest_name: string;
  message: string;
  attendance_status: string;
  created_at: string;
};

export type AdminGift = {
  id: number;
  product_name: string;
  description: string | null;
  price: number;
  color: string;
  total_stock: number;
  purchased_count: number;
  availability_status: string;
  claimed_by: string | null;
  created_at: string;
};

export type AdminEvent = {
  id: string;
  title_id: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  venue_name: string;
  is_main_event: boolean;
  sort_order: number;
};

export type AdminGalleryItem = {
  id: number;
  media_url: string;
  media_type: string;
  caption_id: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type WeddingConfig = {
  groom_name: string;
  bride_name: string;
  groom_nickname: string;
  bride_nickname: string;
  wedding_date: string;
  hero_image_url: string;
  story_text_en: string;
  story_text_id: string;
  timezone: string;
};

export type DashboardPayload = {
  stats: {
    rsvpsCount: number;
    wishesCount: number;
    eventsCount: number;
    giftsCount: number;
  };
  recentRsvps: AdminRsvp[];
  recentWishes: AdminWish[];
};

export const adminTokenStorage = {
  get: () => localStorage.getItem(ADMIN_TOKEN_KEY),
  set: (token: string) => localStorage.setItem(ADMIN_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(ADMIN_TOKEN_KEY),
};

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  let body: BodyInit | undefined;

  if (options.body instanceof FormData) {
    body = options.body;
  } else if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.body);
  }

  if (options.auth) {
    const token = adminTokenStorage.get();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body,
  });

  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;

  if (!response.ok || payload.success === false) {
    throw new ApiError(payload.message || "Request failed.", response.status, payload.errors);
  }

  return (payload.data ?? payload) as T;
}

export const api = {
  getGifts: () => apiRequest<PublicGift[]>("/gifts"),
  getWishes: () => apiRequest<PublicWish[]>("/wishes"),
  submitRsvp: (payload: {
    guest_name: string;
    attendance_status: "attending" | "not_attending";
    events: string[] | null;
    total_attendees: number;
    phone_number: string | null;
    notes: string | null;
  }) => apiRequest("/rsvp", { method: "POST", body: payload }),
  claimGift: (
    giftId: number,
    payload: {
      claimed_by: FormDataEntryValue | null;
      claimed_phone: FormDataEntryValue | null;
      claimed_email: FormDataEntryValue | null;
      quantity: number;
    }
  ) => apiRequest(`/gifts/${giftId}/claim`, { method: "POST", body: payload }),
  login: (email: string, password: string) =>
    apiRequest<AdminLoginResponse>("/admin/login", {
      method: "POST",
      body: { email, password },
    }),
  me: () => apiRequest<AdminUser>("/admin/me", { auth: true }),
  logout: () => apiRequest("/admin/logout", { method: "POST", auth: true }),
  dashboard: () => apiRequest<DashboardPayload>("/admin/dashboard", { auth: true }),
  adminRsvps: () => apiRequest<AdminRsvp[]>("/admin/rsvps", { auth: true }),
  adminWishes: () => apiRequest<AdminWish[]>("/admin/wishes", { auth: true }),
  adminGifts: () => apiRequest<AdminGift[]>("/admin/gifts", { auth: true }),
  adminEvents: () => apiRequest<AdminEvent[]>("/admin/events", { auth: true }),
  adminGallery: () => apiRequest<AdminGalleryItem[]>("/admin/gallery", { auth: true }),
  weddingConfig: () => apiRequest<WeddingConfig>("/admin/config", { auth: true }),
  updateWeddingConfig: (payload: WeddingConfig) =>
    apiRequest<WeddingConfig>("/admin/config", {
      method: "PUT",
      auth: true,
      body: payload,
    }),
};
