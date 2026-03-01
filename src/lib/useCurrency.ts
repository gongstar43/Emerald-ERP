import { useState, useEffect } from 'react';
import {
  Currency,
  ExchangeRate,
  getBaseCurrency,
  getCurrencyByCode,
  getExchangeRate,
  convertCurrency,
  formatCurrencyAmount,
  getActiveCurrencies,
} from './currencyData';

interface UseCurrencyReturn {
  baseCurrency: Currency;
  activeCurrencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (code: string) => void;
  convertAmount: (amount: number, toCurrency: string) => number;
  formatAmount: (amount: number, currencyCode?: string, locale?: string) => string;
  getRate: (fromCurrency: string, toCurrency: string) => number;
  getCurrency: (code: string) => Currency | undefined;
}

export const useCurrency = (initialCurrency?: string): UseCurrencyReturn => {
  const baseCurrency = getBaseCurrency();
  const activeCurrencies = getActiveCurrencies();
  
  const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>(() => {
    if (initialCurrency) {
      const currency = getCurrencyByCode(initialCurrency);
      if (currency) return currency;
    }
    return baseCurrency;
  });

  const setSelectedCurrency = (code: string) => {
    const currency = getCurrencyByCode(code);
    if (currency) {
      setSelectedCurrencyState(currency);
      // Store in localStorage for persistence
      localStorage.setItem('selectedCurrency', code);
    }
  };

  const convertAmount = (amount: number, toCurrency: string): number => {
    return convertCurrency(amount, selectedCurrency.code, toCurrency);
  };

  const formatAmount = (amount: number, currencyCode?: string, locale?: string): string => {
    const code = currencyCode || selectedCurrency.code;
    return formatCurrencyAmount(amount, code, locale);
  };

  const getRate = (fromCurrency: string, toCurrency: string): number => {
    return getExchangeRate(fromCurrency, toCurrency);
  };

  const getCurrency = (code: string): Currency | undefined => {
    return getCurrencyByCode(code);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const currency = getCurrencyByCode(savedCurrency);
      if (currency) {
        setSelectedCurrencyState(currency);
      }
    }
  }, []);

  return {
    baseCurrency,
    activeCurrencies,
    selectedCurrency,
    setSelectedCurrency,
    convertAmount,
    formatAmount,
    getRate,
    getCurrency,
  };
};
