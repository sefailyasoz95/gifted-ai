
export interface LocationInfo {
  country: string;
  countryCode: string;
  language: string;
  currency: string;
  currencySymbol: string;
}

const DEFAULT_LOCATION: LocationInfo = {
  country: 'United States',
  countryCode: 'US',
  language: 'en',
  currency: 'USD',
  currencySymbol: '$'
};

export async function getLocationInfo(): Promise<LocationInfo> {
  try {
    // Try to get location from browser's language settings
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const countryCode = browserLang.split('-')[1] || browserLang.toUpperCase();

    // Try to get more accurate location using IP geolocation
    const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();

    if (data.error) {
      throw new Error('Could not determine location');
    }

    const country = data.country_name;
    const currency = data.currency;
    const language = data.languages?.split(',')[0] || browserLang.split('-')[0];
    
    // Get currency symbol
    const formatter = new Intl.NumberFormat(browserLang, {
      style: 'currency',
      currency: currency,
    });
    const currencySymbol = formatter.format(0).replace(/[\d.,\s]/g, '');

    return {
      country,
      countryCode: data.country_code,
      language,
      currency,
      currencySymbol
    };
  } catch (error) {
    console.warn('Failed to get location info:', error);
    return DEFAULT_LOCATION;
  }
}

export function formatPrice(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}
