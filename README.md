<p align="center">
  <img src="https://i.ibb.co/gZ7HPdTS/Konisoft-Speedruns-Outlined-Logo.png" width="600"><br>
  
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/unity-%23000000.svg?style=for-the-badge&logo=unity&logoColor=white" alt="Unity">
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code">
  
  <br>
  
  <img src="https://img.shields.io/badge/Gource-272727?style=for-the-badge&logo=gource&logoColor=white" alt="Gource">
  <img src="https://img.shields.io/badge/Pixilart-%23FF4D6D?style=for-the-badge&logo=heart&logoColor=white" alt="Pixilart">
  <img src="https://img.shields.io/badge/Doxygen-%234A5568?style=for-the-badge&logo=icloud&logoColor=white" alt="Doxygen">
  <img src="https://img.shields.io/badge/Soundtrap-%239F7AEA?style=for-the-badge&logo=spotify&logoColor=white" alt="Soundtrap">
  <img src="https://img.shields.io/badge/REST%20API-02303A?style=for-the-badge&logo=insomnia&logoColor=white" alt="REST API">

  <br>

  <img src="https://img.shields.io/badge/Cloudflare%20R2-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare R2">
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/github/commit-activity/m/konisan111/Konisoft-Speedruns?label=COMMITS&style=flat-square&color=orange" alt="Commits">
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" alt="Jest">
</p>

<sub>Szia! Én Simi vagyok! Én foglak körbevezetni a readme-ben! q(≧▽≦q)</sub>

<h1 align="left">Konisoft Speedruns</h1>

<sub>Ez itt a platformunk leírása! ( ﾉ ﾟｰﾟ)ﾉ</sub>

<p align="left">
  A <b>Konisoft Speedruns</b> egy dedikált webes platform, ahol a játékosok mérhetik fel ügyességüket és gyorsaságukat a Konisoft által kiadott játékokban.
</p>

### 📍 A Platform Funkciói

<sub>A platformnak vannak funkciói is, képzeld el! Itt lent! 👇(◔◡◔)</sub>

- **Globális Ranglisták:** Kövesd nyomon, ki a leggyorsabb a különböző kategóriákban.
- **Felhasználói és Moderátori nézet** A felvételeket megvizsgálás után a moderátorok elfogadhatják amelyeket a játékosok látni fognak.

<img src="https://i.ibb.co/jZVbhwHy/68747470733a2f2f692e6962622e636f2f73397a67506458362f706c616e732e706e67.png" width="600"><br>

### ⚙️ Hogyan működik?

<sub>Jó kérdés, ugye? Koni leírta ide egy bővebb ismertetőben! （￣︶￣）👍　</sub>

A platform egy központi híd szerepét tölti be a játékok és a játékosok között. A Konisoft által kiadott játék(okban) (jelenleg Lumi Dungeon Of Dreadspire) a játékosok idejét fel lehet tölteni a Konisoft Speedruns platformjára videó felvételek formályában, ahol a leaderboardokon lehet versenyezni az első helyezetért.

A felhasználók egy regisztráció után feltudják tölteni a felvételt, amelyet a moderátorok fogadhatnak el, vagy utasíthanak el.
Amennyiben a felvétel hiteles, az eredménye a felhasználónak bekerül a rendszeben, névvel és idővel a listára.

### 💡 A Platform és a Játék futtatása

<sub>Ha szeretnéd kipróbálni, kövesd itt az utasításokat! \(￣︶￣\*\)</sub>

1. A Speedruns futtatásához szükség lesz a `VS Code Live Server` Extension-re.
   > ⚠️ **Az 5500-as Porton kell futtatni a weboldalt, különben a kérések blokkolva lesznek a szerverek egy részének által.**
2. Indítsd el a Render REST API-t az alábbi linkkel: [Konisoft Speedruns REST API](https://konisoftspeedruns.onrender.com/)
   > Fontos hogy megvárd ameddig elindul a szolgáltatás. Akkor lesz kész, miután megjelent egy statisztikai kijelzés a szerver állapotáról.
3. A Speedruns készen áll a használatra. Regisztrálj egy fiókat!
   > Mivel van Google Auth támogatása a platformnak, lehet Google fiókot is használni a regisztráláskor!
4. Csomagold ki a `0.26.3.24.zip`-et, ebben lesz a játék.
   > A kicsomagolt fájlokat nem szabad átnevezni vagy kitenni a mappájukból!
5. Töltsd le a LiveSplitet, ez lesz a másodperc számláló a futamodhoz! [👉 Letöltés](https://livesplit.org)
   > Ez egy ingyenes program, ezt használják hivatalosan időmérésre!
6. Konfiguráld be a LiveSplitet!
   > Adni kell egy keybindot amivel elindítani, és megállítani lehet a számlálást!
7. Töltsd le és telepítsd az OBS-t. [👉 Letöltés](https://obsproject.com/)
   > Ez lesz a felvételt készítő program, **lehet persze mást is használni.**
8. Indítsd el a játékot, indítsd el az OBS-t, és a számlálót!
   > Itt jön a lényeg, vedd fel a legyorsabb idődet!
9. A kész felvételt a Speedruns oldalán az Upload Video megnyomásával lehet feltenni.
   > Add meg az időt is manuálisan, ezzel könnyebb dolguk lesz a moderátoroknak.
10. Várj ameddig elfogadják a moderátorok.
    > **Mivel még nem éles, és nyilván nem kapunk értesítést róla, itt van a fiókom, ezzel el lehet fogadni: `konisan1111@gmail.com | almafa12A `**
11. Gratulálok! Megvan a legelső eredményed a táblázatban!
    > Röviden-Tömören ennyi a lényeg.

### 👥 Csapatfelépítés

<sub>Pfhuu... volt itt mit csinálni bőven, ugye? (°ー°〃)</sub>

<p align="center">
<img src="https://i.ibb.co/r28zSkJS/profiles.png" width="600">
</p>

| Szerepkör                    | Felelősségi kör                                       | Tagok                          |
| :--------------------------- | :---------------------------------------------------- | :----------------------------- |
| **Project Leader**           | Projektmenedzsment, koncepció és irányítás            | Katona Konstantin              |
| **Frontend Developer**       | UI/UX design, webes felület fejlesztése (HTML/CSS/JS) | Orvos Tamás                    |
| **Backend & DB**             | Szerveroldali logika, adatbázis és hitelesítés        | Katona Konstantin              |
| **QA / Tester**              | Speedrun mechanikák tesztelése, bugvadászat           | Orvos Tamás                    |
| **Design és Grafika (Lumi)** | Pixelartok, UI, Grafikai Elemek, Shaderek             | Katona Konstantin              |
| **Kódolás (Lumi)**           | C# Scripting                                          | Katona Konstantin, Orvos Tamás |

### 👾 Technológiák & Állapot

<sub>Itt van sok-sok cucc amit használtak a projekthez a srácok. Nézd meg! (_^▽^_)</sub>

| Terület                        | Eszközök                                 | Állapot      |
| :----------------------------- | :--------------------------------------- | :----------- |
| **Frontend**                   | HTML5 🟠 CSS3 🔵 JavaScript 🟡           | ✔ Elkészült! |
| **Backend**                    | REST API ☁️ Node.js (tervezett) / Render | ✔ Elkészült! |
| **Adatbázis**                  | MongoDB 🌐 Cloudflare R2 🟠              | ✔ Elkészült! |
| **Lumi Dungeon Of Dreadspire** | Unity Engine, Pixilart, Soundtrap        | ✔ Elkészült! |
| **Diagrammok**                 | Doxygen 🔵, MongoDB 🟢                   | ✔ Elkészült! |

### 🗺️ Fejlesztési Roadmap

<sub>Ez itt egy táblázat a munkafolyamatokról! ( ﾉ ﾟｰﾟ)ﾉ</sub>

A Konisoft Speedruns platform folyamatos fejlesztés alatt áll. Az alábbi táblázat foglalja össze a tervezett mérföldköveket és azok aktuális állapotát.

| Fázis               | Feladat megnevezése                   | Leadandó / Kimenet (Output)            | Állapot |
| :------------------ | :------------------------------------ | :------------------------------------- | :-----: |
| **1. Tervezés**     | Csapatalkotás és szerepkörök (2-3 fő) | Munkamegosztási terv                   |    ✔    |
|                     | Problémafelvetés és funkcionális terv | Szoftver céljának leírása              |    ✔    |
|                     | Technológiai stack kiválasztása       | Rendszerarchitektúra vázlat            |    ✔    |
|                     | Adatbázis tervezése                   | Adatbázismodell-diagram (ER)           |    ✔    |
| **2. Fejlesztés**   | RESTful szerver (API) megvalósítása   | Szerveroldali forráskód                |    ✔    |
|                     | Kliensoldali fejlesztés (Web/Mobil)   | Kliensoldali forráskód                 |    ✔    |
|                     | CRUD funkciók és adattárolás          | Működő szoftveralkalmazás              |    ✔    |
|                     | Clean Code felülvizsgálat             | Tiszta, dokumentált kód                |    ✔    |
|                     | Lumi Technikusi verzió                | Debuggolt, értékelésre elkészített kód |    ✔    |
| **3. Dokumentálás** | Műszaki és felhasználói leírás        | **Szoftveralkalmazás dokumentációja**  |   ❌    |
|                     | Adatbázis exportálása                 | **Adatbázis dump (.sql)**              |    ✔    |

<sub>Esetleg ha azon gondolkoztál mit keresek itt, még én sem tudom... ━━(￣ー￣\*|||━━</sub>

### 📸 Frontend Screenshotok

<sub>UUU KÉPEEEK! o(\*≧▽≦)ツ┏━┓</sub>

Itt találhatóak a platformról készült screenshotok. Világos és Sötét témában is operál a weboldal, illetve van rajta Magyar, és Angol fordítási lehetőség.

<p align="center">
  <img src="https://i.ibb.co/V037y6tz/lobby.png" width="48%">
  <img src="https://i.ibb.co/SX6KMXW8/login.png" width="48%">
</p>
<p align="center">
  <img src="https://i.ibb.co/zH5KmmWJ/mod.png" width="48%">
  <img src="https://i.ibb.co/zhH20kpw/profiles.png" width="48%">
</p>

### 🌐 Adatbázis (ER) Diagramm és Architektúra

<sub>MÉG TÖBB KÉÉÉÉÉP!!! Valami ER diagramm vagy micsoda ˋ( ° ▽、° ) </sub>

dbDiagram generált képek, egy ER és egy architektúra egészen a böngészőtől az összes szerverig, és hostig.

<p align="center">
  <img src="https://i.ibb.co/8DnWWHq7/mongodb.png" width="20%">
  <img src="https://i.ibb.co/pjYGCZ6P/systemarchitecture.png" width="20%">
</p>

### 🟠 Cloudflare R2

<sub>Úgy hallottam hogy a szerver Koni bankkártyájába került _heh..._ (￣▽￣)"</sub>

Cloudflare R2-t használtunk a nagyobb, videó fájlok, illetve a profilképek tárolására.
Az alábbi képeken látható a traffic a szerveren.

<p align="center">
  <img src="https://i.ibb.co/v6P1QK52/Screenshot-2026-03-30-141800.png" width="20%">
  <img src="https://i.ibb.co/vCYdScXV/image.png" width="20%">
</p>

### 🧪 Jest Tesztek

A Speedruns Platform teszeléséhez a JS JEST Testing Framework-öt használtuk fel.

A futtatáshoz az `npm run test` parancsot kell használni!

<p align="left">
  <img src="https://i.ibb.co/Q7RWNZkj/2026-04-17-144016.png" width="50%"><br>
</p>

### 🎮 Lumi Dungeon Of Dreadspire

<sub>UUUU A LÉNYEG! Itt van a srácoknak a legelső játéka! ヾ(≧▽≦\*)o</sub>

<p align="center">
  <img src="https://i.ibb.co/M5hbCs4R/lumi.png" width="100%"><br>
</p>

A **Lumi: Dungeon of Dreadspire** a Konisoft Speedruns elsődlegesen támogatott játéka. Egy fokozatosan nehezedő puzzle-platformer, ahol a logikádra és a gyorsaságodra is szükséged lesz.

<sub>Tudtad, hogy a Szekszárdi Neumann versenyen idén első helyezetett kapott a játék? (ﾉ◕ヮ◕)ﾉ\*:･ﾟ✧</sub>

### 🎮 Játékmenet & Irányítás

<sub>Itt láthatsz infókat a játékról \(￣︶￣\*\))</sub>

- **Cél:** Lumi, és barátainak kiszabadítása a dungeonökből.
- **Irányítás:** WASD vagy Nyílbillentyűk.
- **Controller Support:** Teljes körű kontroller támogatás a még gördülékenyebb élményért.

<sub>Csak úgy megjegyzem hogy a fejlesztője szívesen szívatja a játékosokat, de nem tőlem tudod! (✿◠‿◠)</sub>

### 📥 Letöltés

- **Játék letöltése (Build):** [GitHub Releases](https://github.com/konisan111/Konisoft-Speedruns/releases)

### 📸 Screenshotok a játékról.

<sub>Tudod, hogy mik ezek? KÉPEEEEK!!! DE SOK KÉÉÉÉP!!! ☆*: .｡. o(≧▽≦)o .｡.:*☆</sub>

<p align="center">
  <img src="https://i.ibb.co/wNpRf4bb/lumi-live.gif" width="96%">
</p>
<p align="center">
  <img src="https://i.ibb.co/JPFz45j/Screenshot-2026-04-01-081213.png" width="48%">
  <img src="https://i.ibb.co/5p43cXp/Screenshot-2026-04-01-081224.png" width="48%">
</p>
<p align="center">
  <img src="https://i.ibb.co/mC00QxzY/Screenshot-2026-04-01-081233.png" width="48%">
  <img src="https://i.ibb.co/5x5B4Q4m/Screenshot-2026-04-01-081244.png" width="48%">
</p>
<p align="center">
  <img src="https://i.ibb.co/rGsNHT32/Screenshot-2026-04-01-081258.png" width="48%">
  <img src="https://i.ibb.co/G32SWgLv/Screenshot-2026-04-01-081305.png" width="48%">
</p>
<p align="center">
  <img src="https://i.ibb.co/MyfCf3Kf/Screenshot-2026-04-01-081318.png" width="48%">
  <img src="https://i.ibb.co/8nHSYRkz/Screenshot-2026-04-01-081332.png" width="48%">
</p>
<p align="center">
  <img src="https://i.ibb.co/rKqxzJsF/Screenshot-2026-04-01-081350.png" width="48%">
  <img src="https://i.ibb.co/7JvG0Mpt/Screenshot-2026-04-01-081410.png" width="48%">
</p>

### 🔵 DOXYGEN, C# kódok, és Diagrammok

<sub>A srácok generáltak egy doxygen diagrammot a kódokról, szerintem nagyon menci! o(_￣︶￣_)o</sub>

A repositoryban létrehoztunk egy teljes doxygen diagramm generálást a Lumi Dungeon Of Dreadspire játék forráskódjának scriptjeihez. Ezek a kódok nyersen megtalálhatóak a `.\lumi\scripts` mappán belül!

> Érdemes a Doxygen-t az index.html-el elindítani a `.\doxygen\` mappából, innen már mindent látni fognak.

<p align="center">
  <img src="https://i.ibb.co/hFTv2BKk/Screenshot-2026-03-30-143134.png" width="48%">
  <img src="https://i.ibb.co/Hfm0bCfG/Screenshot-2026-03-30-143152.png" width="48%">
  <img src="https://i.ibb.co/HLKpJFby/Screenshot-2026-03-30-143206.png" width="48%">
  <img src="https://i.ibb.co/mFcMyh8J/Screenshot-2026-03-30-143223.png" width="48%">
</p>

### 📈 Gource Gráf

Ebben a YouTube videóban található meg a Gource gráfja a projektnek!
A repositoriban is elérhető (`.\gource\gource-codebase.mp4`)

<a href="https://youtu.be/-HaoTEvjkh8">
    <img src="https://img.youtube.com/vi/-HaoTEvjkh8/maxresdefault.jpg" alt="Video Banner" width="48%">
</a>

### 📘 Trello Táblázat

Az alábbi linkeken megtalálhatóak a projektnek a Trello táblázatai:

Speedruns: https://trello.com/b/SfeDl7XR/konisoft-speedruns

Lumi: https://trello.com/b/rZ2EhQsF/lumi-dungeon-of-dreadspire

### ⚠️ FONTOS MEGJEGYZÉS! ⚠️

<sub>Ejha, ez fontosnak néz ki!!! （⊙ｏ⊙）</sub>

Mivel a játékot ki fogjuk adni Steamen, és más platformokon, ezért a teljes forráskódot nem fogjuk kiadni, csak is a játéknak a kódjait. (`.\lumi\scripts`)
**Megértésüket köszönjük!**
Jó szórakozást a játékhoz! 🥳 (meg kitartást, kelleni fog 🥹)

<p align="center">
  <img src="https://i.ibb.co/gZ7HPdTS/Konisoft-Speedruns-Outlined-Logo.png" width="200"><br>
  <sub><i>Frissítve: 2026. március 29.</i></sub><br>
  <b>Konisoft 2024-2026</b>
</p>

<sub>A végére is értünk! Remélem jó társaságod voltam erre a röpke 4.67 percre! (✿◠‿◠)</sub>
<sub>Még találkozunk! ( eskü nem a főgonosza leszek a Konisoft jelenleg is készülő játékának... (￣\_￣|||) )</sub>
<sub>Addig is, Sziaaaaa!!! ヾ(≧▽≦\*)o</sub>
