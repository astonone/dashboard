import { useEffect, useState } from "react"
import axios from "axios"
import {WeatherData} from "@/utils/types";

const getWindDirection = (angle: number) => {
    const directions = ['↓ N', '↙ NE', '← E', '↖ SE', '↑ S', '↗ SW', '→ W', '↘ NW']
    return directions[Math.round(angle / 45) % 8]
}

const convertPressure = (hPa: number) => Math.round(hPa / 1.33)

const getIcon = (code: string) => {
    switch (code.slice(0, -1)) {
        case '01': return '☀️'
        case '02': return '🌤️'
        case '03':
        case '04': return '☁️'
        case '09': return '🌧️'
        case '10': return '🌦️'
        case '11': return '🌩️'
        case '13': return '❄️'
        case '50': return '🌫️'
        default: return '❔'
    }
}

interface Props {
    apiKey?: string
    city?: string
}

export default function WeatherWidget({ apiKey, city = "Tallinn" }: Props) {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!apiKey) {
            setError("Weather API key is missing")
            return
        }

        const fetchWeather = async () => {
            try {
                const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                    params: {
                        q: city,
                        appid: apiKey,
                        units: 'metric',
                        lang: 'en'
                    }
                })

                setWeather(data)
            } catch (err) {
                setError("Failed to fetch weather data")
                console.error(err)
            }
        }

        fetchWeather()
    }, [apiKey, city])

    if (error) return <div className="text-red-500">{error}</div>
    if (!weather) return <div className="text-white">Loading...</div>

    const icon = getIcon(weather.weather[0].icon)

    return (
        <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-lg shadow-md border border-white/10 w-fit text-sm">
            <div className="text-lg">{icon} {weather.name}</div>
            <div>{weather.weather[0].description}</div>
            <div>🌡 {weather.main.temp} °C</div>
            <div>💨 {weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}</div>
            <div>💧 {weather.main.humidity}% humidity</div>
            <div>🔽 {convertPressure(weather.main.pressure)} mmHg</div>
        </div>
    )
}
