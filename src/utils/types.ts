export interface BookmarkLink {
    href: string
    icon?: string
    image?: string
    label: string
}

export interface BookmarkGroup {
    [groupName: string]: BookmarkLink[]
}

export interface SettingsConfig {
    backgroundImage?: string
    weatherApiKey?: string
    weatherCity?: string
}

export interface WeatherData {
    name: string
    main: {
        temp: number
        pressure: number
        humidity: number
    }
    weather: {
        description: string
        icon: string
    }[]
    wind: {
        speed: number
        deg: number
    }
}
