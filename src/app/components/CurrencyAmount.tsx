import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { getCurrencyByCode, formatCurrencyAmount, convertCurrency } from '../../lib/currencyData';
import { Badge } from './ui/badge';

interface CurrencyAmountProps {
  amount: number;
  currency: string;
  showCode?: boolean;
  showSymbol?: boolean;
  convertTo?: string; // Optional: show converted amount
  className?: string;
  bold?: boolean;
}

export default function CurrencyAmount({
  amount,
  currency,
  showCode = true,
  showSymbol = true,
  convertTo,
  className = '',
  bold = false,
}: CurrencyAmountProps) {
  const { locale } = useLanguage();
  const currencyData = getCurrencyByCode(currency);
  
  if (!currencyData) {
    return <span className={className}>{amount.toFixed(2)}</span>;
  }

  const formattedAmount = amount.toLocaleString(locale, {
    minimumFractionDigits: currencyData.decimalDigits,
    maximumFractionDigits: currencyData.decimalDigits,
  });

  const symbol = locale === 'ar' ? currencyData.symbolNative : currencyData.symbol;

  let convertedAmount: number | null = null;
  let convertedCurrency: string | null = null;
  
  if (convertTo && convertTo !== currency) {
    convertedAmount = convertCurrency(amount, currency, convertTo);
    convertedCurrency = convertTo;
  }

  const textClass = bold ? 'font-bold' : '';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={textClass} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {showSymbol && symbol}
        {showSymbol && ' '}
        {formattedAmount}
        {showCode && (
          <span className="text-muted-foreground text-sm ml-1">
            {currency}
          </span>
        )}
      </span>
      
      {convertedAmount && convertedCurrency && (
        <Badge variant="secondary" className="text-xs">
          ≈ {formatCurrencyAmount(convertedAmount, convertedCurrency, locale)}
        </Badge>
      )}
    </div>
  );
}
