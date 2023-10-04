import { createClient } from "@supabase/supabase-js";
import { Database } from "../types";

const supabaseUrl = "https://clspypobhhannqakvtfd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsc3B5cG9iaGhhbm5xYWt2dGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MTYzMzgsImV4cCI6MjAxMTk5MjMzOH0.w1Wh5CKw8TNEIDxR8ZAA72t-ABzjy-yZ8iBGD1uTMng";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
