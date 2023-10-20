import { ReactElement, ReactNode } from "react";
import { useBooking } from "../features/bookings/useBooking";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          cabin_id: string | null;
          cabin_price: number | null;
          created_at: string;
          end_date: string | null;
          extras_price: number | null;
          guest_id: string | null;
          has_breakfast: boolean | null;
          id: string;
          is_paid: boolean | null;
          num_guests: number | null;
          num_nights: number | null;
          observations: string | null;
          start_date: string | null;
          status: string | null;
          total_price: number | null;
        };
        Insert: {
          cabin_id?: string | null;
          cabin_price?: number | null;
          created_at?: string;
          end_date?: string | null;
          extras_price?: number | null;
          guest_id?: string | null;
          has_breakfast?: boolean | null;
          id?: string;
          is_paid?: boolean | null;
          num_guests?: number | null;
          num_nights?: number | null;
          observations?: string | null;
          start_date?: string | null;
          status?: string | null;
          total_price?: number | null;
        };
        Update: {
          cabin_id?: string | null;
          cabin_price?: number | null;
          created_at?: string;
          end_date?: string | null;
          extras_price?: number | null;
          guest_id?: string | null;
          has_breakfast?: boolean | null;
          id?: string;
          is_paid?: boolean | null;
          num_guests?: number | null;
          num_nights?: number | null;
          observations?: string | null;
          start_date?: string | null;
          status?: string | null;
          total_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_cabin_id_fkey";
            columns: ["cabin_id"];
            referencedRelation: "cabins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      cabins: {
        Row: {
          created_at: string;
          description: string | null;
          discount: number | null;
          id: string;
          image: string | null;
          max_capacity: number | null;
          name: string | null;
          regular_price: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: string;
          image?: string | null;
          max_capacity?: number | null;
          name?: string | null;
          regular_price?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: string;
          image?: string | null;
          max_capacity?: number | null;
          name?: string | null;
          regular_price?: number | null;
        };
        Relationships: [];
      };
      guests: {
        Row: {
          country_flag: string | null;
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          national_id: string | null;
          nationality: string | null;
        };
        Insert: {
          country_flag?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          national_id?: string | null;
          nationality?: string | null;
        };
        Update: {
          country_flag?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          national_id?: string | null;
          nationality?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          breakfast_price: number | null;
          created_at: string;
          id: number;
          max_booking_length: number | null;
          max_guests_per_booking: number | null;
          min_booking_length: number | null;
        };
        Insert: {
          breakfast_price?: number | null;
          created_at?: string;
          id?: number;
          max_booking_length?: number | null;
          max_guests_per_booking?: number | null;
          min_booking_length?: number | null;
        };
        Update: {
          breakfast_price?: number | null;
          created_at?: string;
          id?: number;
          max_booking_length?: number | null;
          max_guests_per_booking?: number | null;
          min_booking_length?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type iBooking = Database["public"]["Tables"]["bookings"]["Row"];
export type iCabin = Database["public"]["Tables"]["cabins"]["Row"];
export type iGuest = Database["public"]["Tables"]["guests"]["Row"];
export type iSetting = Database["public"]["Tables"]["settings"]["Row"];

// TODO: replace iCabin with NewCabin (delete the id)
export type NewCabin = Omit<Partial<Record<keyof iCabin, string>>, "image"> & {
  image: FileList | string;
};

export interface ChildrenProps {
  children: ReactNode;
}

export interface ChildrenPropsWithId<T> {
  children: ReactElement<{ id?: T }>;
}

export type SortDirection = "asc" | "desc";

export type SortByValue<T, K extends keyof T> = `${K &
  string}-${SortDirection}`;

export type ExtractSortField<Type> = Type extends `${infer Field}-${string}`
  ? Field
  : never;

export type SingleBooking = ReturnType<typeof useBooking>;

export interface FullBooking
  extends Pick<
    iBooking,
    | "id"
    | "created_at"
    | "start_date"
    | "end_date"
    | "num_nights"
    | "num_guests"
    | "status"
    | "total_price"
  > {
  cabins: { name: iCabin["name"] } | null;
  guests: { full_name: iGuest["full_name"]; email: iGuest["email"] } | null;
}

export type RecentBookings =
  | {
      created_at: string;
      total_price: number | null;
      extras_price: number | null;
    }[]
  | undefined;
