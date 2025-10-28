export type UserRole = 'CITIZEN' | 'OFFICER' | 'ADMIN';

export type ComplaintStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';

export type ComplaintPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type ComplaintCategory = 
  | 'ROAD' 
  | 'WATER' 
  | 'ELECTRICITY' 
  | 'SANITATION' 
  | 'STREETLIGHT'
  | 'DRAINAGE'
  | 'OTHER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: UserRole[];
  createdAt: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  latitude: number;
  longitude: number;
  locationAddress: string;
  imageUrls: string[];
  raisedBy: User;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  complaintId: string;
  author: User;
  message: string;
  postedAt: string;
}

export interface Analytics {
  totalComplaints: number;
  openComplaints: number;
  inProgressComplaints: number;
  resolvedComplaints: number;
  avgResolutionTime: number;
  complaintsByCategory: Record<ComplaintCategory, number>;
  complaintsByPriority: Record<ComplaintPriority, number>;
}
