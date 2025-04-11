
export interface Source {
  title: string;
  url: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  saved?: boolean;
  sources?: Source[];
  apiUrl?: string; // Thêm trường này để lưu thông tin API URL
}
