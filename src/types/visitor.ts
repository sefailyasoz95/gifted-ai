export interface Visitor {
  id: string;
  ip_address: string;
  user_agent: string;
  visit_count: number;
  first_visit_at: Date;
  last_visit_at: Date;
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  created_at: Date;
  updated_at: Date;
}

export interface VisitorStats {
  totalVisitors: number;
  totalCaptions: number;
  averageCaptionsPerVisitor: number;
}
