import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import MockApiService from './mockData';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bfdaa8c0`;

// Export publicAnonKey for use in auth
export { publicAnonKey };

// Track if backend is available
let backendAvailable = false; // Start as false - ALWAYS USE MOCK DATA
let lastCheckTime = 0;
const CHECK_INTERVAL = 60000; // Check every 60 seconds

/**
 * Check if backend is available
 * DISABLED - Always use mock data due to SSL issues
 */
async function checkBackendAvailability(): Promise<boolean> {
  // ALWAYS RETURN FALSE - Force offline mode
  backendAvailable = false;
  console.log('🔧 Backend check disabled - using offline mode with mock data');
  return false;
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    // Always start with ANON_KEY as default
    let token = publicAnonKey;
    let tokenType = 'ANON_KEY';
    
    // Try to get a valid session
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (!sessionError && sessionData?.session?.access_token) {
        // Check if session is expired
        const expiresAt = sessionData.session.expires_at;
        const now = Math.floor(Date.now() / 1000);
        
        if (expiresAt && expiresAt > now + 60) { // Add 60 second buffer
          token = sessionData.session.access_token;
          tokenType = 'JWT';
        } else {
          // Clear expired session silently
          try {
            await supabase.auth.signOut();
          } catch (signOutError) {
            // Ignore
          }
        }
      }
    } catch (sessionError) {
      // Ignore session errors
    }

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      // If JWT failed with 401, retry with ANON_KEY
      if (!response.ok && response.status === 401 && tokenType === 'JWT') {
        // Clear the invalid session
        try {
          await supabase.auth.signOut();
        } catch (e) {
          // Ignore
        }
        
        // Retry with ANON_KEY
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
            ...options.headers,
          },
        });
        
        if (!retryResponse.ok) {
          throw new Error('BACKEND_UNAVAILABLE');
        }
        
        const retryData = await retryResponse.json();
        backendAvailable = true;
        return retryData;
      }

      if (!response.ok) {
        let errorMessage = response.statusText;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
        } catch (e) {
          try {
            errorMessage = await response.text();
            // Check if it's an SSL/Cloudflare error
            if (errorMessage.includes('<!DOCTYPE html>') || 
                errorMessage.includes('SSL') || 
                errorMessage.includes('Cloudflare') ||
                errorMessage.includes('525')) {
              backendAvailable = false;
              throw new Error('BACKEND_UNAVAILABLE');
            }
          } catch (textError) {
            // Keep the statusText
          }
        }
        throw new Error('BACKEND_UNAVAILABLE');
      }

      const data = await response.json();
      backendAvailable = true;
      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error: any) {
    // Mark backend as unavailable and use mock data
    const errorMsg = error?.message || '';
    const errorName = error?.name || '';
    
    // Check for backend unavailability signals
    if (errorMsg.includes('BACKEND_UNAVAILABLE') || 
        errorMsg.includes('Failed to fetch') || 
        errorMsg.includes('NetworkError') ||
        errorMsg.includes('aborted') ||
        errorMsg.includes('SSL') ||
        errorMsg.includes('<!DOCTYPE html>') ||
        errorName === 'AbortError' ||
        errorName === 'TypeError') {
      backendAvailable = false;
      // Don't log SSL errors to avoid console spam
      throw new Error('BACKEND_UNAVAILABLE');
    }
    
    // Only log unexpected errors
    console.error('❌ Unexpected API error:', error);
    throw error;
  }
}

/**
 * Safe API request that automatically falls back to mock data
 * Returns mock data silently when backend is unavailable
 */
export async function safeApiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  // ALWAYS use mock data - backend is disabled
  return getMockData(endpoint, options);
  
  /* Backend disabled due to SSL issues
  // If we already know backend is unavailable, return mock data immediately
  if (!backendAvailable) {
    console.log('📦 Backend unavailable, using mock data immediately for:', endpoint);
    return getMockData(endpoint, options);
  }

  try {
    return await apiRequest(endpoint, options);
  } catch (error: any) {
    if (error?.message === 'BACKEND_UNAVAILABLE') {
      console.log('📦 Backend error detected, switching to mock data for:', endpoint);
      return getMockData(endpoint, options);
    }
    
    // Only throw for unexpected errors
    throw error;
  }
  */
}

/**
 * Get mock data based on endpoint
 */
async function getMockData(endpoint: string, options: RequestInit): Promise<any> {
  const method = (options.method || 'GET').toUpperCase();
  
  // Handle GET requests
  if (method === 'GET') {
    if (endpoint.includes('/api/contacts') && !endpoint.match(/\/\d+$/)) {
      return await MockApiService.getContacts();
    } else if (endpoint.includes('/api/dashboard')) {
      return await MockApiService.getDashboardStats();
    } else if (endpoint.includes('/api/invoices')) {
      return await MockApiService.getInvoices();
    } else if (endpoint.includes('/api/businesses')) {
      return await MockApiService.getBusinesses();
    } else if (endpoint.includes('/api/tasks')) {
      return await MockApiService.getTasks();
    } else if (endpoint.includes('/api/approvals')) {
      return await MockApiService.getApprovals();
    } else if (endpoint.includes('/api/users')) {
      return await MockApiService.getUsers();
    } else if (endpoint.includes('/api/accounts')) {
      return await MockApiService.getAccounts();
    }
    
    // Default empty response for GET
    return [];
  }
  
  // Handle POST requests (create)
  if (method === 'POST') {
    if (endpoint.includes('/api/contacts')) {
      const body = JSON.parse(options.body as string);
      return await MockApiService.createContact(body);
    }
    
    // Default success response for POST
    return { success: true, id: Date.now().toString() };
  }
  
  // Handle PUT requests (update)
  if (method === 'PUT') {
    if (endpoint.includes('/api/contacts/')) {
      const id = endpoint.split('/').pop() || '';
      const body = JSON.parse(options.body as string);
      return await MockApiService.updateContact(id, body);
    }
    
    // Default success response for PUT
    return { success: true };
  }
  
  // Handle DELETE requests
  if (method === 'DELETE') {
    if (endpoint.includes('/api/contacts/')) {
      const id = endpoint.split('/').pop() || '';
      await MockApiService.deleteContact(id);
      return { success: true };
    }
    
    // Default success response for DELETE
    return { success: true };
  }
  
  // Default empty response
  return [];
}

// Export mock service for direct use
export { MockApiService };