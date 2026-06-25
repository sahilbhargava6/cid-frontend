import api from '@/lib/api';

export interface Document {
  id: number;
  user_id: number;
  operational_ticket_id: number | null;
  name: string;
  file_path: string;
  file_type: string | null;
  created_at: string;
  updated_at: string;
}

export const documentService = {
  /**
   * Fetch all documents uploaded by the user
   */
  async getDocuments(): Promise<Document[]> {
    const response = await api.get<Document[]>('/documents');
    return response.data;
  },

  /**
   * Upload a new file (checks operational ticket context)
   */
  async uploadDocument(
    file: File,
    operationalTicketId?: number | string,
    customName?: string
  ): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (operationalTicketId) {
      formData.append('operational_ticket_id', String(operationalTicketId));
    }
    if (customName) {
      formData.append('name', customName);
    }

    const response = await api.post<Document>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Get secure download URL / triggers direct S3 download stream
   */
  async downloadDocument(id: number | string): Promise<void> {
    // Open download link in a new window or trigger download flow
    const token = localStorage.getItem('auth_token');
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/documents/${id}/download?token=${token || ''}`;
    
    // Create an anchor tag and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default documentService;
