export interface Doctor {
  id: number;
  name: string;
  specialty: string[];
  experience: number;
  fee: number;
  consultType: ('Video Consult' | 'In Clinic')[];
  imageUrl?: string;
}

export interface FilterState {
  search: string;
  consultType: string | null;
  specialties: string[];
  sortBy: 'fees' | 'experience' | null;
}