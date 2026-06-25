import api from '@/lib/api';

export type ServiceType = 'tax_prep' | 'bookkeeping' | 'solar' | 'small_business' | 'procurement';
export type TicketStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';

export interface Booking {
  id: number;
  user_id: number;
  organization_id: number | null;
  assigned_to_id: number | null;
  service_type: ServiceType;
  status: TicketStatus;
  scheduled_at: string | null;
  payment_status: PaymentStatus;
  price: string | null;
  input_parameters: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  documents?: any[];
}

export interface CreateBookingPayload {
  service_type: ServiceType;
  scheduled_at?: string;
  organization_id?: number;
  input_parameters: Record<string, any>;
}

export const bookingService = {
  /**
   * Fetch all bookings for the authenticated user
   */
  async getBookings(): Promise<Booking[]> {
    const response = await api.get<Booking[]>('/bookings');
    return response.data;
  },

  /**
   * Fetch a single booking by ID
   */
  async getBooking(id: number | string): Promise<Booking> {
    const response = await api.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  /**
   * Create a new service booking
   */
  async createBooking(payload: CreateBookingPayload): Promise<Booking> {
    const response = await api.post<Booking>('/bookings', payload);
    return response.data;
  },

  /**
   * Update booking details (status, payment_status, price, input_parameters)
   */
  async updateBooking(id: number | string, payload: Partial<Booking>): Promise<Booking> {
    const response = await api.put<Booking>(`/bookings/${id}`, payload);
    return response.data;
  },

  /**
   * Update booking input parameters
   */
  async updateBookingParameters(id: number | string, parameters: Record<string, any>): Promise<Booking> {
    const response = await api.put<Booking>(`/bookings/${id}`, { input_parameters: parameters });
    return response.data;
  },
};

export default bookingService;
