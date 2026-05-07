export type AttendanceStatus = "will_attend" | "unable_to_attend";

export interface RSVPEntry {
  id: string;
  name: string;
  attendanceStatus: AttendanceStatus;
  selectedEvents: string[];
  guestsCount: number;
}

export interface GiftAccount {
  id: string;
  bankType: string;
  accountNumber: string;
  accountHolder: string;
}

export interface GiftRecommendation {
  id: string;
  title: string;
  purchaseLink: string;
  claimedByName?: string;
  claimedByEmail?: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
}
