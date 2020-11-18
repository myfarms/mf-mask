import { InjectionToken } from '@angular/core';

export const MFMASK_CONFIG = new InjectionToken('MFMASK_CONFIG');

interface IPatterns {
  [pattern: string]: RegExp;
}

interface IMasks {
  [name: string]: string;
}

export interface IConfig {
  patterns: IPatterns;
  preparedMasks: IMasks;
}

export const initialConfig: IConfig = {
  patterns: {
    A: new RegExp(/[a-z]/),
    9: new RegExp(/[0-9]/)
  },
  preparedMasks: {
    PHONE: '(999) 999-9999'
  }
};
