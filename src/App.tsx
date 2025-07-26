import { useEffect, useState } from 'react';
import { loadYaml } from './utils/load-yaml';
import LinkGroup from './components/LinkGroup';
import WeatherWidget from './components/WeatherWidget';
import ClockWidget from './components/ClockWidget';
import CalendarWidget from './components/CalendarWidget';
import { BookmarkGroup, SettingsConfig } from '@/utils/types';

function App() {
  const [bookmarks, setBookmarks] = useState<BookmarkGroup[]>([]);
  const [settings, setSettings] = useState<SettingsConfig>({});

  useEffect(() => {
    loadYaml<BookmarkGroup[]>('/config/bookmarks.yaml').then(setBookmarks);
    loadYaml<SettingsConfig>('/config/settings.yaml').then(setSettings);
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="p-4">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          {settings.clockWidget !== 'off' && <ClockWidget />}
          {settings.weatherApiKey && settings.weatherCity && settings.weatherWidget !== 'off' && (
            <WeatherWidget apiKey={settings.weatherApiKey} city={settings.weatherCity} />
          )}
          {settings.calendarWidget !== 'off' && <CalendarWidget />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
          {bookmarks.map((group, idx) => (
            <LinkGroup key={idx} group={group} />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
          {bookmarks.map((group, idx) => (
            <LinkGroup key={idx} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
