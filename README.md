# 🧭 Personal Dashboard

A sleek and customizable personal dashboard built with React, TailwindCSS and YAML configuration. Includes widgets for time, weather, and your own bookmarks.

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

The app will be available at `http://localhost:5173` by default.

---

## ⚙️ Configuration

All settings and bookmarks are configured using YAML files located in the `public/config/` folder.

### 📁 `public/config/bookmarks.yaml`

This file defines the bookmarks displayed in groups. Each group has a title and a list of links.

#### Example (flat structure):

```yaml
- Work:
    - href: https://jira.company.com
      label: Jira
      image: /images/my-img1.png
    - href: https://github.com
      label: GitHub
      icon: mdi-github

- Home:
    - href: https://gmail.com
      label: Gmail
      image: /images/my-img1.png
```

Each `link` accepts:

* `label`: Display name
* `href`: Link URL
* `icon`: (optional) an icon name from Material Design Icons
* `image`: (optional) path to a local image icon (takes priority over icon if present)

✅ Nested Groups Support
```yaml
- Deploy:
    - href: https://jenkins.example.com
      label: Jenkins
      image: /images/jenkins.png
    - Sub Deploy:
        - href: https://inner.example.com
          label: Inner Tool
          image: /images/inner.png
        - Sub Sub Deploy:
            - href: https://deep.example.com
              label: Deep Link
              image: /images/deep.png
```

---

### ⚙️ `public/config/settings.yaml`

This file controls global app settings.

#### Example:

```yaml
backgroundImage: "/images/background.jpg"
weatherApiKey: "YOUR_OPENWEATHERMAP_API_KEY"
weatherCity: "Tallinn"
```

Supported settings:

* `backgroundImage`: relative or absolute path to background image
* `weatherApiKey`: your [OpenWeatherMap](https://openweathermap.org/api) API key
* `weatherCity`: city name to show weather for

> 💡 If `weatherApiKey` or `weatherCity` are missing, the weather widget won't be shown.

---

## 🖼️ Widgets

### 🕒 Clock

* Shows current time, date and timezone based on `Europe/Tallinn`
* Auto-updates every second

### 🌦️ Weather

* Uses OpenWeatherMap API
* Displays:

    * Current temperature
    * Wind speed + direction
    * Humidity
    * Pressure
    * Icon and description of current conditions

---

## 📂 Folder Structure

```
public/
  config/
    bookmarks.yaml     # Bookmark links
    settings.yaml      # Background image and weather config
  images/
    background.jpg     # Optional background image

src/
  components/          # Clock, Weather, Bookmark cards
  utils/               # YAML loader, helper functions
  App.tsx              # Main layout
```

---

## 📦 Dependencies

* React
* Vite
* TailwindCSS
* YAML parser (`js-yaml`)
* Axios

---

## 📝 License

This project is MIT licensed. Customize and share freely.

