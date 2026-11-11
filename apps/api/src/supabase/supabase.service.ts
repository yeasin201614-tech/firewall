import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  public client: SupabaseClient | null = null;
  public isAvailable = false;

  constructor() {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && key && !url.includes('your-project') && !key.includes('your-anon-key')) {
      try {
        this.client = createClient(url, key, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        });
        this.isAvailable = true;
        this.logger.log(`Supabase client initialized successfully with ${url}`);
      } catch (err: any) {
        this.logger.warn(`Failed to initialize Supabase client: ${err.message}`);
      }
    } else {
      this.logger.log('Supabase URL/Key not configured. Operating in standalone resilient mode.');
    }
  }

  getClient(): SupabaseClient | null {
    return this.client;
  }
}
