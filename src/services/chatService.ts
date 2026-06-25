import api from '@/lib/api';

export interface ChatMessage {
  id: number;
  operational_ticket_id: number;
  user_id: number;
  message_text: string | null;
  attachment_path: string | null;
  attachment_name: string | null;
  attachment_url?: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export const chatService = {
  /**
   * Fetch all messages for a specific booking request
   */
  async getMessages(ticketId: number | string): Promise<ChatMessage[]> {
    const response = await api.get<ChatMessage[]>(`/bookings/${ticketId}/messages`);
    return response.data;
  },

  /**
   * Send a chat message with optional file attachment
   */
  async sendMessage(
    ticketId: number | string,
    messageText?: string,
    file?: File
  ): Promise<ChatMessage> {
    if (file) {
      const formData = new FormData();
      if (messageText) {
        formData.append('message_text', messageText);
      }
      formData.append('file', file);
      
      const response = await api.post<ChatMessage>(`/bookings/${ticketId}/messages`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await api.post<ChatMessage>(`/bookings/${ticketId}/messages`, {
        message_text: messageText,
      });
      return response.data;
    }
  },

  /**
   * Download a chat file attachment
   */
  getAttachmentUrl(path: string, attachmentUrl?: string | null): string {
    if (attachmentUrl) {
      if (attachmentUrl.startsWith('http://') || attachmentUrl.startsWith('https://')) {
        return attachmentUrl;
      }
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const domainUrl = baseUrl.replace('/api', '');
      return `${domainUrl}${attachmentUrl}`;
    }
    // Fallback if attachment_url is not set
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const storageUrl = baseUrl.replace('/api', '/storage');
    return `${storageUrl}/${path}`;
  }
};

export default chatService;
