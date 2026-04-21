import { WeddingData } from './types';

export const defaultData: WeddingData = {
  weddingDetails: {
    partner1: 'Sophia',
    partner2: 'James',
    date: '2026-10-12',
    location: 'Rosewood Manor'
  },
  budget: {
    totalBudget: 45000,
    expenses: [
      { id: '1', category: 'Venue', name: 'Rosewood Manor', amount: 15000, paid: 5000 },
      { id: '2', category: 'Catering', name: 'Grateful Catering', amount: 12000, paid: 2000 },
      { id: '3', category: 'Photography', name: 'Lumiere Studios', amount: 4000, paid: 1000 },
      { id: '4', category: 'Attire', name: 'Wedding Dress', amount: 2500, paid: 2500 },
      { id: '5', category: 'Flowers', name: 'Petals & Co', amount: 3000, paid: 500 },
      { id: '6', category: 'Music', name: 'DJ Soundwave', amount: 1500, paid: 0 },
    ]
  },
  guests: [
    { id: '1', name: 'Alice Smith', rsvp: 'attending', meal: 'Beef', table: 1, partySize: 2 },
    { id: '2', name: 'John Doe', rsvp: 'pending', meal: '', table: null, partySize: 1 },
    { id: '3', name: 'Emma Wilson', rsvp: 'attending', meal: 'Vegetarian', table: 1, partySize: 1 },
    { id: '4', name: 'Michael Brown', rsvp: 'declined', meal: '', table: null, partySize: 2 },
    { id: '5', name: 'Sarah Connor', rsvp: 'attending', meal: 'Chicken', table: 2, partySize: 1 },
    { id: '6', name: 'David Lee', rsvp: 'attending', meal: 'Fish', table: 2, partySize: 2 },
    { id: '7', name: 'Lisa Ray', rsvp: 'pending', meal: '', table: null, partySize: 1 },
    { id: '8', name: 'Tom Hardy', rsvp: 'attending', meal: 'Beef', table: 3, partySize: 1 }
  ],
  tasks: [
    { id: '1', title: 'Book Venue', timeframe: '12+ Months', completed: true },
    { id: '2', title: 'Hire Wedding Planner', timeframe: '12+ Months', completed: true },
    { id: '3', title: 'Hire Photographer', timeframe: '10-12 Months', completed: true },
    { id: '4', title: 'Say Yes to the Dress', timeframe: '10-12 Months', completed: true },
    { id: '5', title: 'Send Save the Dates', timeframe: '6-8 Months', completed: false },
    { id: '6', title: 'Book Florist', timeframe: '6-8 Months', completed: false },
    { id: '7', title: 'Order Wedding Cake', timeframe: '4-6 Months', completed: false },
    { id: '8', title: 'Send Invitations', timeframe: '2-3 Months', completed: false }
  ],
  weddingDaySchedule: [
    { id: '1', time: '09:00', event: 'Hair & Makeup', location: 'Bridal Suite', assignedTo: 'Bridal Party', notes: 'Don\'t forget mimosas' },
    { id: '2', time: '13:00', event: 'Photographer Arrives', location: 'Bridal Suite', assignedTo: 'Photographer', notes: 'Detail shots first' },
    { id: '3', time: '14:30', event: 'First Look', location: 'Gardens', assignedTo: 'Couple', notes: 'Private moment' },
    { id: '4', time: '16:00', event: 'Ceremony', location: 'Courtyard', assignedTo: 'All', notes: 'Start exactly on time' },
    { id: '5', time: '16:45', event: 'Cocktail Hour', location: 'Terrace', assignedTo: 'Guests', notes: 'String quartet playing' },
    { id: '6', time: '18:15', event: 'Grand Entrance', location: 'Main Hall', assignedTo: 'Wedding Party', notes: 'Song: Classic Romance' },
    { id: '7', time: '18:30', event: 'Dinner Service', location: 'Main Hall', assignedTo: 'Guests', notes: 'Catering staff notified' },
    { id: '8', time: '20:00', event: 'First Dance', location: 'Dance Floor', assignedTo: 'Couple', notes: '' },
    { id: '9', time: '21:30', event: 'Cake Cutting', location: 'Main Hall', assignedTo: 'Couple', notes: '' },
    { id: '10', time: '23:45', event: 'Sparkler Send-off', location: 'Front Entrance', assignedTo: 'All', notes: 'Coordinator hands out sparklers' }
  ],
  vendors: [
    { id: '1', name: 'Rosewood Manor', category: 'Venue', contactName: 'Maria', phone: '555-0101', email: 'hello@rosewood.com', price: 15000, depositPaid: 5000, status: 'confirmed', contractSigned: true, website: 'rosewood.com', notes: 'Access begins at 8am' },
    { id: '2', name: 'Grateful Catering', category: 'Catering', contactName: 'Chef John', phone: '555-0102', email: 'john@grateful.com', price: 12000, depositPaid: 2000, status: 'confirmed', contractSigned: true, website: '', notes: 'Tasting scheduled next month' },
    { id: '3', name: 'Lumiere Studios', category: 'Photography', contactName: 'Sarah', phone: '555-0103', email: 'sarah@lumiere.com', price: 4000, depositPaid: 1000, status: 'confirmed', contractSigned: true, website: '', notes: 'Second shooter included' },
    { id: '4', name: 'Petals & Co', category: 'Flowers', contactName: 'Emily', phone: '555-0104', email: 'emily@petals.com', price: 3000, depositPaid: 500, status: 'pending', contractSigned: false, website: '', notes: 'Waiting on revised quote' },
    { id: '5', name: 'DJ Soundwave', category: 'DJ/Music', contactName: 'Mike', phone: '555-0105', email: 'mike@soundwave.com', price: 1500, depositPaid: 0, status: 'contacted', contractSigned: false, website: '', notes: 'Requested playlist options' }
  ],
  seating: {
    seatsPerTable: 8,
    tables: [
      { tableNumber: 1, guestIds: ['1', '3'] },
      { tableNumber: 2, guestIds: ['5', '6'] },
      { tableNumber: 3, guestIds: ['8'] }
    ]
  },
  moodboard: {
    theme: 'Garden Romance',
    style: 'Classic Romance',
    colorSwatches: ['#E8D5D1', '#A8B8A0', '#D4AF37', '#F5F3F0', '#3D3535'],
    inspirationNotes: 'We want the wedding to feel ethereal, romantic, and lush, but still timeless and elegant. Lots of candlelight.',
    flowers: 'Peonies, ranunculus, white roses, eucalyptus.',
    ceremonyVibe: 'Intimate, acoustic strings, natural floral arch.',
    receptionVibe: 'Warm lighting, elegant tables, upbeat dance floor.',
    dressStyle: 'A-line, lace details, Cathedral veil.',
    musicGenre: 'Strings for ceremony, Pop/Jazz blend for cocktail, upbeat party hits for reception.'
  },
  catering: {
    catererId: '2',
    menuItems: [
      { id: '1', course: 'Cocktail Hour', name: 'Mini Crab Cakes', dietaryTags: [], notes: '' },
      { id: '2', course: 'Cocktail Hour', name: 'Tomato Bruschetta', dietaryTags: ['Vegetarian', 'Vegan'], notes: '' },
      { id: '3', course: 'Starter', name: 'Spring Greens Salad', dietaryTags: ['Vegetarian', 'Gluten-Free'], notes: 'With vinaigrette on side' },
      { id: '4', course: 'Main', name: 'Herb-Roasted Beef Tenderloin', dietaryTags: ['Gluten-Free'], notes: 'Medium rare' },
      { id: '5', course: 'Main', name: 'Pan-Seared Sea Bass', dietaryTags: ['Gluten-Free'], notes: 'Lemon butter sauce' },
      { id: '6', course: 'Main', name: 'Wild Mushroom Risotto', dietaryTags: ['Vegetarian'], notes: '' }
    ],
    notes: '2 vendor meals required (Photographer, DJ)'
  },
  attire: [
    { id: '1', person: 'Sophia', role: 'Bride', outfit: 'A-Line Lace Gown', vendor: 'White Ivory Bridal', orderDate: '2025-12-01', fittingDates: ['2026-06-15', '2026-08-10'], pickupDate: '2026-09-01', notes: 'Veil included', status: 'fitting' },
    { id: '2', person: 'James', role: 'Groom', outfit: 'Navy Blue Tuxedo', vendor: 'The Black Tux', orderDate: '2026-02-14', fittingDates: ['2026-07-20'], pickupDate: '2026-09-15', notes: '', status: 'ordered' },
    { id: '3', person: 'Emma', role: 'MOH', outfit: 'Sage Chiffon Dress', vendor: 'Davids Bridal', orderDate: '2026-01-10', fittingDates: [], pickupDate: '2026-08-01', notes: '', status: 'ready' }
  ],
  photography: {
    photographerId: '3',
    mustHaveShots: [
      { id: '1', category: 'Getting Ready', shot: 'Dress hanging', captured: false },
      { id: '2', category: 'Getting Ready', shot: 'First look with bridesmaids', captured: false },
      { id: '3', category: 'Ceremony', shot: 'Groom\'s reaction', captured: false },
      { id: '4', category: 'Ceremony', shot: 'First kiss', captured: false },
      { id: '5', category: 'Portraits', shot: 'Bride and Groom alone in garden', captured: false },
      { id: '6', category: 'Portraits', shot: 'Full wedding party', captured: false },
      { id: '7', category: 'Reception', shot: 'Grand entrance', captured: false },
      { id: '8', category: 'Reception', shot: 'First dance wide shot', captured: false },
      { id: '9', category: 'Reception', shot: 'Cake cutting', captured: false }
    ],
    receivingLineOrder: ['Bride\'s Parents', 'Couple', 'Groom\'s Parents']
  },
  gifts: [
    { id: '1', guestId: '1', giverName: 'Alice Smith', gift: 'KitchenAid Mixer', value: 350, dateReceived: '2026-08-15', thankYouSent: true, thankYouDate: '2026-08-20', notes: 'Obsessed with the color!' },
    { id: '2', guestId: '5', giverName: 'Sarah Connor', gift: 'Dyson Vacuum', value: 450, dateReceived: '2026-09-01', thankYouSent: false, thankYouDate: '', notes: '' },
    { id: '3', guestId: null, giverName: 'Aunt May', gift: 'Cash ($500)', value: 500, dateReceived: '2026-09-10', thankYouSent: false, thankYouDate: '', notes: 'Honeymoon fund' }
  ]
};
