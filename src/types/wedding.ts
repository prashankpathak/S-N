export interface WeddingEvent {
  id: string;
  number: string;
  title: string;
  subTitle?: string;
  date: string;
  time: string;
  isoDateStart: string;
  isoDateEnd: string;
  venue: string;
  venueAddress: string;
  googleMapsUrl: string;
  dressCode?: {
    theme: string;
    description: string;
    swatches: {
      name: string;
      hex: string;
      sparkle?: boolean;
    }[];
  };
  note?: string;
}

export interface RsvpData {
  guestName: string;
  attendance: 'attending' | 'declined';
  guestCount: number;
  dietaryPreference?: string;
  message?: string;
  submittedAt?: string;
  passId?: string;
}
