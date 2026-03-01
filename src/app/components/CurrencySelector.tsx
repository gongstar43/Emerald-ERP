import React from 'react';
import { useLanguage } from '../../lib/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Currency, getActiveCurrencies } from '../../lib/currencyData';
import { Badge } from './ui/badge';

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  showSymbol?: boolean;
  filterRegion?: 'middle-east' | 'asia' | 'europe' | 'americas' | 'africa' | 'all';
}

export default function CurrencySelector({
  value,
  onChange,
  disabled = false,
  className = '',
  showSymbol = true,
  filterRegion = 'all',
}: CurrencySelectorProps) {
  const { locale } = useLanguage();
  
  const currencies = getActiveCurrencies();

  const getRegionCurrencies = () => {
    if (filterRegion === 'all') return currencies;
    
    const regionMap: Record<string, string[]> = {
      'middle-east': ['SAR', 'AED', 'KWD', 'BHD', 'OMR', 'QAR', 'JOD', 'EGP', 'LBP', 'SYP', 'IQD', 'MAD', 'TND', 'LYD', 'DZD', 'SDG', 'YER'],
      'asia': ['CNY', 'JPY', 'INR', 'KRW', 'SGD', 'MYR', 'IDR', 'THB', 'PKR', 'BDT'],
      'europe': ['EUR', 'GBP', 'CHF', 'RUB', 'TRY'],
      'americas': ['USD', 'CAD', 'MXN', 'BRL'],
      'africa': ['MAD', 'TND', 'LYD', 'DZD', 'SDG', 'ZAR'],
    };
    
    const codes = regionMap[filterRegion] || [];
    return currencies.filter(c => codes.includes(c.code));
  };

  const filteredCurrencies = getRegionCurrencies();
  const selectedCurrency = currencies.find(c => c.code === value);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue>
          {selectedCurrency && (
            <div className="flex items-center gap-2">
              {showSymbol && (
                <Badge variant="outline" className="font-mono">
                  {locale === 'ar' ? selectedCurrency.symbolNative : selectedCurrency.symbol}
                </Badge>
              )}
              <span className="font-medium">{selectedCurrency.code}</span>
              <span className="text-muted-foreground text-sm">
                - {locale === 'ar' ? selectedCurrency.nameAr : selectedCurrency.nameEn}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {filteredCurrencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono min-w-[50px] justify-center">
                {locale === 'ar' ? currency.symbolNative : currency.symbol}
              </Badge>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{currency.code}</span>
                  {currency.isBaseCurrency && (
                    <Badge variant="default" className="text-xs">
                      {locale === 'ar' ? 'أساسية' : 'Base'}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {locale === 'ar' ? currency.nameAr : currency.nameEn}
                </span>
                <span className="text-xs text-muted-foreground">
                  {locale === 'ar' ? currency.countryNameAr : currency.countryNameEn}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
