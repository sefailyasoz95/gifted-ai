import { supabase } from '@/lib/supabase';
import { Visitor } from '@/types/visitor';

interface IpResponse {
  ip: string;
}

export async function trackVisitor(): Promise<Visitor | null> {
  try {
    // Get visitor IP from a service
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json() as IpResponse;
    
    if (!ipData.ip) {
      throw new Error('Failed to get IP address');
    }

    // Get or create visitor record
    const { data: existingVisitor } = await supabase
      .from('visitors')
      .select()
      .eq('ip_address', ipData.ip)
      .single();

    if (existingVisitor) {
      // Update existing visitor
      const { data: updatedVisitor } = await supabase
        .from('visitors')
        .update({
          visit_count: existingVisitor.visit_count + 1,
          last_visit_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          app: true
        })
        .eq('id', existingVisitor.id)
        .select()
        .single();

      return updatedVisitor;
    } else {
      // Create new visitor
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
      
      const { data: newVisitor } = await supabase
        .from('visitors')
        .insert({
          ip_address: ipData.ip,
          user_agent: userAgent,
          visit_count: 1,
          first_visit_at: new Date().toISOString(),
          last_visit_at: new Date().toISOString(),
          app: true
        })
        .select()
        .single();

      return newVisitor;
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return null;
  }
}
