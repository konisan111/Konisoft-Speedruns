<p align="center">
  <img src="https://i.ibb.co/gZ7HPdTS/Konisoft-Speedruns-Outlined-Logo.png" width="600"><br>

  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/unity-%23000000.svg?style=for-the-badge&logo=unity&logoColor=white" alt="Unity">
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code">
  <img src="https://img.shields.io/badge/REST%20API-02303A?style=for-the-badge&logo=insomnia&logoColor=white" alt="REST API">
<br>
  <img src="https://img.shields.io/github/commit-activity/m/konisan111/Konisoft-Speedruns?label=COMMITS&style=flat-square&color=orange" alt="Commits">
</p>

---

<h1 align="left">Konisoft Speedruns</h1>

<p align="left">
  A <b>Konisoft Speedruns</b> egy dedikált webes platform, ahol a játékosok mérhetik fel ügyességüket és gyorsaságukat a Konisoft által kiadott játékokban. Legyen szó egy teljes végigjátszásról, vagy egy pályarészről!
</p>

---

## 📍 A Platform Funkciói

* **Globális Ranglisták 🥇:** Kövesd nyomon, ki a leggyorsabb a különböző kategóriákban.
* **Játék Specifikus Bontás 🎮:** Külön leaderboardok minden Konisoft játékhoz.
* **Részletes Felosztás ⏳:** Mérd az idődet pályákra, fejezetekre vagy teljes játékmenetre lebontva.

---

<img src="  https://i.ibb.co/s9zgPdX6/plans.png"><br>

---

## ⚙️ Hogyan működik?

A platform egy központi híd szerepét tölti be a játékok és a játékosok között. A Konisoft által kiadott játék(okban) (jelenleg Lumi Dungeon Of Dreadspire) a játékosok idejét fel lehet tölteni a Konisoft Speedruns platformjára ahol a leaderboardokon lehet versenyezni az első helyezetért. A játék kapcsolatban áll egy adatbázissal amelyből fetchelve lesznek az adatok a frontendre, azaz a Speedruns platform felületére.

---

## 👥 Csapatfelépítés

| Szerepkör | Felelősségi kör | Tagok |
| :--- | :--- | :--- |
| **Project Leader** | Projektmenedzsment, koncepció és irányítás | Katona Konstantin |
| **Frontend Developer** | UI/UX design, webes felület fejlesztése (HTML/CSS/JS) | Orvos Tamás |
| **Game Integration** | Unity Engine kapcsolat, API adatok kezelése | Katona Konstantin |
| **Backend & DB** | Szerveroldali logika, adatbázis és hitelesítés | Orvos Tamás, Katona Konstantin |
| **QA / Tester** | Speedrun mechanikák tesztelése, bugvadászat | Orvos Tamás |

---

## 👾 Technológiák & Állapot

| Terület | Eszközök | Állapot |
| :--- | :--- | :--- |
| **Frontend** | HTML5 🟠 CSS3 🔵 JavaScript 🟡 | ❌ Tervezés fázis |
| **Backend** | REST API ☁️ Node.js (tervezett) | ❌ Tervezés fázis |
| **Adatbázis** | SQL / NoSQL 🌐 | ❌ Tervezés fázis |
| **Unity Engine Build** | Lumi Dungeon Of Dreadspire (Integrálás) 🎮 | ❌ Tervezés fázis |

---

## 🗺️ Fejlesztési Roadmap

A Konisoft Speedruns platform folyamatos fejlesztés alatt áll. Az alábbi táblázat foglalja össze a tervezett mérföldköveket és azok aktuális állapotát.

| Fázis | Feladat megnevezése | Állapot | Technikai Leírás |
| :--- | :--- | :---: | :--- |
| **1. Tervezés** | **Adatbázis Modell (ERD)** | ❌ | A felhasználók, játékidők, pályák és játékok közötti SQL/NoSQL kapcsolatok megtervezése. |
| **2. Backend** | **REST API Alapok** | ❌ | Szerveroldali végpontok (GET/POST) kialakítása a rekordok beküldéséhez és lekéréséhez. |
| **3. Integráció** | **Unity Engine Bridge** | ❌ | C# alapú rendszer fejlesztése, amely a játékból közvetlenül küldi az időeredményeket a szerverre. |
| **4. Adatbázis** | **DB Kiépítés** | ❌ | A tervezett séma megvalósítása, éles adatbázis szerver beállítása és biztonsági mentések. |
| **5. Frontend** | **Dinamikus Adatmegjelenítés** | ❌ | A statikus HTML/JS felület összekötése az API-val, hogy a ranglista automatikusan frissüljön. |
| **6. Tesztelés** | **QA** | ❌ | Unit tesztek, terheléses tesztelés és a manipulált (csalt) idők kiszűrésére szolgáló logika. |
| **7. Launch** | **Platform Release** | ❌ | A béta verzió publikálása. |

---

<p align="center">
  <img src="https://i.ibb.co/gZ7HPdTS/Konisoft-Speedruns-Outlined-Logo.png" width="120"><br>
  <sub><i>Frissítve: 2026. március 3.</i></sub><br>
  <b>Konisoft 2026</b>
</p>
