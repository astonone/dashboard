export type BookmarkItem = BookmarkLink | BookmarkGroup;

export interface BookmarkLink {
  href: string;
  icon?: string;
  image?: string;
  label: string;
}

export interface BookmarkGroup {
  [groupName: string]: BookmarkItem[];
}

export interface SettingsConfig {
  backgroundImage?: string;
  weatherApiKey?: string;
  weatherCity?: string;
  clockWidget?: 'on' | 'off';
  weatherWidget?: 'on' | 'off';
  calendarWidget?: 'on' | 'off';
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}
