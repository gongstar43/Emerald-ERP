import React from 'react';
import { useSettings } from '../../lib/settings';
import { useLanguage } from '../../lib/i18n';

interface FormattedDateTimeProps {
  date?: Date | string;
  showTime?: boolean;
  className?: string;
}

export default function FormattedDateTime({ 
  date = new Date(), 
  showTime = false,
  className = '' 
}: FormattedDateTimeProps) {
  const { settings } = useSettings();
  const { locale } = useLanguage();
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Format date based on settings
  const formatDate = (d: Date): string => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    switch (settings.language.dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return d.toLocaleDateString(locale);
    }
  };

  // Format time based on settings
  const formatTime = (d: Date): string => {
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    if (settings.language.timeFormat === '12h') {
      const hours12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return `${hours12}:${minutes} ${ampm}`;
    } else {
      const hours24 = String(hours).padStart(2, '0');
      return `${hours24}:${minutes}`;
    }
  };

  // Convert to timezone (simplified - for real implementation use date-fns-tz or similar)
  const getTimezoneOffset = (): string => {
    const timezoneMap: Record<string, string> = {
      'Asia/Riyadh': 'GMT+3',
      'Asia/Dubai': 'GMT+4',
      'Europe/London': 'GMT+0',
      'America/New_York': 'GMT-5',
      'Asia/Baghdad': 'GMT+3',
      'Africa/Cairo': 'GMT+2',
      'Asia/Amman': 'GMT+2',
    };
    return timezoneMap[settings.language.timezone] || '';
  };

  const formattedDate = formatDate(dateObj);
  const formattedTime = showTime ? formatTime(dateObj) : null;
  const timezoneInfo = showTime ? getTimezoneOffset() : null;

  return (
    <span className={className}>
      {formattedDate}
      {formattedTime && (
        <>
          {' '}
          <span className="text-muted-foreground">{formattedTime}</span>
          {timezoneInfo && (
            <span className="text-xs text-muted-foreground ml-1">({timezoneInfo})</span>
          )}
        </>
      )}
    </span>
  );
}
