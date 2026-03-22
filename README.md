# 📱 iPhone Temp Monitor PRO

A mobile-first, tech-style dashboard built to log and monitor device temperatures over time. Hosted entirely on GitHub Pages.
https://ianv49.github.io/MyTempTracker-auto/

## ✨ Features
* **Timeline Chart:** Tracks recent temperature trends with an auto-fitting view (keeps Y-axis locked). Max values are highlighted in red.
* **Pareto Chart:** Automatically sorts and displays the top 10 highest temperature peaks, complete with an automated observation summary.
* **Live Statistics:** Calculates Average and Highest temperatures instantly from the raw data log.
* **Direct Git Logging:** Uses GitHub as a serverless database by reading directly from a `data.txt` file.

## 📖 How to Use
1. **Log Data:** Open `data.txt` in your GitHub repository and add new data in the format `|HH:MM,Temp` (e.g., `|14:30,26.5`). Commit to save.
2. **View Dashboard:** Open the GitHub Pages link on your phone.
3. **Refresh:** Tap the **Refresh Data** button to pull your latest commits instantly.

*Built with HTML, CSS, Vanilla JavaScript, and Chart.js.*
