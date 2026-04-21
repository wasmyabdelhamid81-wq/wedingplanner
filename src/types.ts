export interface Expense {
  id: string;
  category: string;
  name: string;
  amount: number;
  paid: number;
}

export interface Guest {
  id: string;
  name: string;
  rsvp: 'attending' | 'declined' | 'pending';
  meal: string;
  table: number | null;
  partySize: number;
}

export interface Task {
  id: string;
  title: string;
  timeframe: string;
  completed: boolean;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  event: string;
  location: string;
  assignedTo: string;
  notes: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactName: string;
  phone: string;
  email: string;
  price: number;
  depositPaid: number;
  status: 'confirmed' | 'pending' | 'contacted' | 'cancelled';
  contractSigned: boolean;
  website: string;
  notes: string;
}

export interface Table {
  tableNumber: number;
  guestIds: string[];
}

export interface Seating {
  seatsPerTable: number;
  tables: Table[];
}

export interface Moodboard {
  theme: string;
  style: string;
  colorSwatches: string[];
  inspirationNotes: string;
  flowers: string;
  ceremonyVibe: string;
  receptionVibe: string;
  dressStyle: string;
  musicGenre: string;
}

export interface MenuItem {
  id: string;
  course: string;
  name: string;
  dietaryTags: string[];
  notes: string;
}

export interface Catering {
  catererId: string;
  menuItems: MenuItem[];
  notes: string;
}

export interface Attire {
  id: string;
  person: string;
  role: string;
  outfit: string;
  vendor: string;
  orderDate: string;
  fittingDates: string[];
  pickupDate: string;
  notes: string;
  status: 'shopping' | 'ordered' | 'fitting' | 'fitted' | 'ready';
}

export interface MustHaveShot {
  id: string;
  category: string;
  shot: string;
  captured: boolean;
}

export interface Photography {
  photographerId: string;
  mustHaveShots: MustHaveShot[];
  receivingLineOrder: string[];
}

export interface Gift {
  id: string;
  guestId: string | null;
  giverName: string;
  gift: string;
  value: number;
  dateReceived: string;
  thankYouSent: boolean;
  thankYouDate: string;
  notes: string;
}

export interface WeddingData {
  weddingDetails: {
    partner1: string;
    partner2: string;
    date: string;
    location: string;
  };
  budget: {
    totalBudget: number;
    expenses: Expense[];
  };
  guests: Guest[];
  tasks: Task[];
  weddingDaySchedule: ScheduleEvent[];
  vendors: Vendor[];
  seating: Seating;
  moodboard: Moodboard;
  catering: Catering;
  attire: Attire[];
  photography: Photography;
  gifts: Gift[];
}
