import { useEffect, useState } from 'react'
import { loadYaml } from './utils/load-yaml'
import LinkGroup from './components/LinkGroup'
import WeatherWidget from './components/WeatherWidget'
import ClockWidget from './components/ClockWidget'
import {BookmarkGroup, SettingsConfig} from "@/utils/types";

function App() {
    const [bookmarks, setBookmarks] = useState<BookmarkGroup[]>([])
    const [settings, setSettings] = useState<SettingsConfig>({})

    useEffect(() => {
        loadYaml<BookmarkGroup[]>("/config/bookmarks.yaml")
            .then((data) => setBookmarks(data || []))
            .catch(() => setBookmarks([]))

        loadYaml<SettingsConfig>("/config/settings.yaml")
            .then(setSettings)
            .catch(() => setSettings({}))
    }, [])

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
            <div className="relative flex justify-between items-start px-4 pt-4">
                <div className="z-10">
                    <ClockWidget />
                </div>
                <h1 className="text-2xl font-bold text-white drop-shadow z-0 text-center absolute left-1/2 -translate-x-1/2">
                    Dashboard
                </h1>
                <div className="z-10">
                    {settings?.weatherApiKey && settings?.weatherCity && (
                        <WeatherWidget apiKey={settings.weatherApiKey} city={settings.weatherCity} />
                    )}
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
    )
}

export default App
