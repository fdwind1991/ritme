# Ritme

Een minimalistische typetrainer met woorden, cijfers, adaptieve aanslagoefeningen en persoonlijke voortgang. Gewone HTML, CSS en JavaScript: geen framework, package manager, buildstap of backend.

Deze repository-editie is gesplitst uit de laatste `typetest_updated.html`, inclusief de driedelige footer. De scoreberekeningen, testinstellingen, woordenlijsten, corpuscontrolecodes en bestaande sleutels voor browseropslag zijn behouden.

## Bestanden

```text
.
├── index.html               # Paginastructuur, bediening, dialogen en footer
├── styles.css               # Alle statische CSS, thema's en responsive regels
├── app.js                   # Typetest, training, scores, grafieken en opslag
├── data.js                  # Woordenlijsten, vertalingen, bestaande salt en licentietekst
├── LICENSE                  # Bestaande volledige GNU GPL v3-licentie
├── THIRD_PARTY_NOTICES.md    # Credits en bronvermeldingen
├── README.md
├── .gitignore               # Negeert lokale bestanden en persoonlijke exports
└── .nojekyll                # Voor statische publicatie op GitHub Pages
```

`index.html` laadt `styles.css` en vervolgens de twee JavaScript-bestanden met `defer`. `data.js` moet vóór `app.js` staan. Alle paden zijn relatief, zodat de app ook in een repository-submap kan staan. Er wordt geen data via `fetch()` opgehaald.

## Lokaal starten

Pak de hele map uit; houd de vier applicatiebestanden bij elkaar. Start vanuit deze map een lokale webserver, bijvoorbeeld met een reeds geïnstalleerde Python 3:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open daarna `http://127.0.0.1:8000` in je browser. Stop de server met `Ctrl+C`. De app heeft voor het oefenen geen internetdienst nodig: alle benodigde bestanden zitten in de map. Rechtstreeks openen van `index.html` kan ook, voor zover je browser lokale scripts en opslag toestaat; de lokale webserver is de voorspelbaardere ontwikkelroute.

## In een GitHub-repository plaatsen

Upload de **inhoud** van deze map naar de root van je repository. `index.html` moet dus direct in de repository staan, niet nog in een extra bovenliggende map. Upload geen persoonlijke historie-exports, back-ups of `.env`-bestanden.

### Publiceren met GitHub Pages

Na het uploaden: **Settings → Pages → Build and deployment → Deploy from a branch**. Selecteer de branch met deze bestanden, bijvoorbeeld **main**, kies **/(root)** en klik **Save**. Er is geen eigen buildscript nodig. De Pages-instellingen tonen na de publicatie de website-URL.

GitHub-documentatie: [publicatiebron instellen](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Beschikbaarheid kan afhangen van je abonnement en de zichtbaarheid van de repository; de documentatie vermeldt de voorwaarden. Een Pages-site kan publiek zijn, ook wanneer de bronrepository privé is.

Deze download maakt geen repository aan en publiceert niets automatisch.

## Je huidige voortgang meenemen

Maak in de oude app eerst een back-up via **Voortgang → Beheer → Back-up downloaden · JSON**. Open de nieuwe app en kies **Voortgang → Beheer → Importeer JSON of CSV**.

De bestaande opslagsleutels zijn bewust niet hernoemd:

```text
folkert-type-test-v1
folkert-type-settings-v1
```

De nieuwe bestandsnaam, een andere poort of een nieuw domein kan een andere browseropslag betekenen. Daarom reist je geschiedenis niet vanzelf van de oude lokale HTML naar GitHub Pages. JSON behoudt de beschikbare grafiekpunten en toetsstatistieken; CSV is beperkter. De bestaande grens van 100 opgeslagen tests is niet gewijzigd. Het ZIP-bestand bevat geen persoonlijke testresultaten.

Let bij meerdere projecten op hetzelfde domein op: de applicatie gebruikt vaste opslagsleutels. Wijzig die alleen bewust, met een migratieplan voor bestaande gegevens.

## Aanpassen

Voor kleuren, typografie, afstanden en animaties wijzig je `styles.css`. De centrale kleurvariabelen staan bovenaan. Structuur en vaste elementen staan in `index.html`; de footer behoudt de bronvermelding links, de slogan in het midden en vier popupknoppen rechts.

Alle NL/ENG/DE-teksten staan in `RITME_DATA.messages` in `data.js`. Elementen gebruiken `data-i18n` of `data-i18n-html`. Pas voor gewijzigde standaardteksten ook de Nederlandse fallback in `index.html` aan. Teksten met HTML-markup zijn vertrouwde, meegeleverde inhoud: vul deze niet met onbeveiligde gebruikersinvoer.

De ingebouwde woordenlijsten staan in `RITME_DATA.lexicons`. **Wijzig de woordenlijsten van Standard v1 niet ongemerkt**: hun controlecodes in `STANDARD_CORPORA` in `app.js` maken deel uit van het testprotocol. Een inhoudelijk gewijzigd protocol moet apart worden geversioneerd en vergeleken.

`RITME_DATA.entropy` is de ongewijzigde, openbare bouw-salt uit de vorige versie, geen wachtwoord of API-sleutel. De generator gebruikt daarnaast verse browserentropie. Een splitsing van bestanden vereist geen nieuwe salt.

De kernfuncties en rekenregels staan in `app.js`. De uitgifte bevat geen npm-afhankelijkheden. Met een reeds geïnstalleerde Node.js kun je na eigen wijzigingen de syntaxis controleren:

```bash
node --check data.js
node --check app.js
```

## Privacy en hosting

Ritme heeft geen analytics, trackers, externe fonts of API-aanroepen. De pagina laadt wel haar eigen HTML-, CSS- en JavaScript-bestanden. Scores en instellingen blijven in browseropslag; Ritme verstuurt die niet naar een server. Een hostingprovider verwerkt de gewone HTTP-verzoeken en kan toegangsgegevens loggen. [GitHub Pages vermeldt expliciet het loggen van IP-adressen voor beveiligingsdoeleinden](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection).

De volledige ingevoerde of geplakte tekst wordt niet in de geschiedenis bewaard. Scores, grafiekpunten en geaggregeerde toetsstatistieken wel. Maak eigen back-ups. Externe bronlinks openen andere websites met hun eigen voorwaarden.

Er is geen service worker toegevoegd: deze splitsing verandert de app niet in een installeerbare PWA en belooft geen offline herlaadbaarheid van een online gehoste pagina.

## Credits en licentie

Concept en visuele basis: [TypeSpeedTest.com](https://www.typespeedtest.com/). Ritme is zelfstandig uitgewerkt voor bredere functionaliteit en is geen officiële versie, samenwerking of goedgekeurde uitbreiding van TypeSpeedTest.com.

De bestaande GPL-3.0-licentie is behouden. De woordenlijsten zijn in de oorspronkelijke app toegeschreven aan de Monkeytype-bijdragers onder GPL-3.0. Zie [LICENSE](LICENSE) en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) voor de volledige licentie en de overgenomen bronvermeldingen. Scores en benchmarks blijven indicatief; Ritme is geen gecertificeerde vaardigheidstest.
