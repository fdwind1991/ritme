# Credits en bronnen

De oorspronkelijke bronvermeldingen blijven behouden. Versie 3.2 voegt uitgebreidere woordenlijsten en een aparte code-oefenbank toe. De vaste basislijsten van Standard v1 zijn niet gewijzigd.

## Concept en visuele basis

[TypeSpeedTest.com](https://www.typespeedtest.com/) en de tijdens het ontwerp aangeleverde screenshots vormden het vertrekpunt voor Ritme. De implementatie is zelfstandig uitgewerkt vanuit de behoefte aan bredere functionaliteit: talen, aanslagtraining, numpad, adaptieve oefeningen en persoonlijke voortgang.

Ritme is niet verbonden aan, gemaakt door, gesponsord door of goedgekeurd door TypeSpeedTest.com. Deze vermelding is geen samenwerking of aanbeveling. Namen, merken en oorspronkelijke materialen blijven bij hun respectieve rechthebbenden; deze repository geeft geen rechten op de oorspronkelijke website of haar materialen.

## Woordenlijsten

© Monkeytype contributors. Bestaande bronvermelding: [Monkeytype](https://github.com/monkeytypegame/monkeytype), GPL-3.0. De meegeleverde items staan in `data.js`; zij worden niet bij het openen van de pagina gedownload.

- Nederlands: [dutch.json](https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/dutch.json) — 199 overgenomen items.
- English: [english.json](https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/english.json) — 200 overgenomen items.
- Deutsch: [german.json](https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/german.json) — 200 overgenomen items.
- Français: [french.json](https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/french.json) — 174 overgenomen items.
- Español: [spanish.json](https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/spanish.json) — 197 overgenomen items.
- Italiano: [italian.json](https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/italian.json) — 199 overgenomen items.

De bronlinks wijzen naar de upstream-bestanden op de `master`-branch en kunnen daar wijzigen. De in deze uitgifte behouden inhoud is de daadwerkelijk meegeleverde dataset; de Standard v1-controlecodes staan ongewijzigd in `app.js`. Zie `LICENSE` voor de volledige GPL v3-tekst.

## Benchmark

Bestaande referenties in de app:

- [Aalto University: The traits of fast typists discovered by analysing 136 million keystrokes](https://www.aalto.fi/en/news/the-traits-of-fast-typists-discovered-by-analysing-136-million-keystrokes).
- [Dhakal, Feit, Kristensson & Oulasvirta, CHI 2018](https://userinterfaces.aalto.fi/136Mkeystrokes/).

De tempobanden van Ritme zijn een eigen indicatieve indeling, geen officiële norm of persoonlijke percentielrang. De bronverwijzingen en toelichting blijven in het rekenregelsvenster beschikbaar.

## Toetsindelingen

Bestaande bronverwijzingen uit de app:

- [W3C: UI Events KeyboardEvent code](https://www.w3.org/TR/uievents-code/).
- [Microsoft: German QWERTZ](https://learn.microsoft.com/en-us/globalization/keyboards/kbdgr).
- [Microsoft: French legacy AZERTY](https://learn.microsoft.com/en-us/globalization/keyboards/kbdfr).

De vingerkleuren geven een adviesindeling weer, geen meting van de daadwerkelijk gebruikte vingers.

## Licentie van deze uitgifte

De bestaande volledige GNU GPL v3-tekst staat in `LICENSE` en is ook opgenomen in `data.js` voor de licentieweergave in de app. HTML, CSS, JavaScript en deze documenten worden samen als leesbare broncode geleverd, zonder garantie. Credits en de disclaimer blijven via de footer bereikbaar.

## Uitgebreide woordenlijsten (v3.2)

De extra woorden zijn afkomstig uit de **vaste `word_list`-datasets van Faker 40.1.2**, samengevoegd met de bestaande Monkeytype-basislijsten. Er is geen Faker-runtime opgenomen. Er zijn geen woorden met een taalmodel gegenereerd.

De verwerking is deterministisch: Unicode NFC, kleine letters, splitsen van meerwoord-items, uitsluitend letters/combinerende tekens, maximaal 30 tekens en ontdubbelen. Dit is een bredere oefenwoordenlijst, **geen geverifieerde frequentieranglijst of leeftijdsgeschikte lesmethode**. De algemene en basislijsten hebben aparte resultaatprofielen; Standard v1 blijft de oorspronkelijke lijst gebruiken.

Faker: © 2012 Daniele Faraglia en bijdragers; MIT. Volledige meegeleverde licentie: [licenses/Faker-MIT.txt](licenses/Faker-MIT.txt).

| Taal | Uitgebreide lijst | Extra bron, versie 40.1.2 |
| --- | ---: | --- |
| Nederlands | 1058 | [nl_NL](https://github.com/joke2k/faker/blob/v40.1.2/faker/providers/lorem/nl_NL/__init__.py) |
| English | 974 | [en_US](https://github.com/joke2k/faker/blob/v40.1.2/faker/providers/lorem/en_US/__init__.py) |
| Deutsch | 578 | [de_DE](https://github.com/joke2k/faker/blob/v40.1.2/faker/providers/lorem/de_DE/__init__.py) |
| Français | 1388 | [fr_FR](https://github.com/joke2k/faker/blob/v40.1.2/faker/providers/lorem/fr_FR/__init__.py) |
| Español | 1025 | [es_ES](https://github.com/joke2k/faker/blob/v40.1.2/faker/providers/lorem/es_ES/__init__.py) |
| Italiano | 1216 | [it_IT](https://github.com/joke2k/faker/blob/v40.1.2/faker/providers/lorem/it_IT/__init__.py) |

Samen: **6.239 unieke items binnen de zes afzonderlijke uitgebreide lijsten**. SHA-256-controlecodes staan bij de datasets in `data.js`. Dezelfde term kan in meerdere talen bestaan; het totaal is geen telling van wereldwijd unieke woorden.

## Code-oefeningen (v3.2)

De vaste oefenbank bevat **28 brongebonden voorbeelden**: Python (8), JavaScript (8), HTML (6) en CSS (6). Elk fragment heeft een bron-URL, licentieverwijzing en inhoudshash in `RITME_DATA.codeCorpora`.

**Python:** Python Software Foundation en documentatiebijdragers, [More Control Flow Tools](https://docs.python.org/3/tutorial/controlflow.html). Python-documentatievoorbeelden zijn aanvullend onder 0BSD beschikbaar. Zie [licenses/Python-0BSD.txt](licenses/Python-0BSD.txt) en [de oorspronkelijke voorwaarden](https://docs.python.org/3/license.html). REPL-prompts en uitvoer zijn weggelaten; fragmenten worden als typetekst gebruikt.

**HTML, CSS en JavaScript:** individuele Mozilla/MDN-bijdragers. Voor codevoorbeelden hanteert MDN CC0 voor vanaf 20 augustus 2010 toegevoegde voorbeelden en MIT voor eerdere voorbeelden; de publieke site geeft volgens de beleidsuitleg geen sluitende datering per historisch voorbeeld. De bronvermeldingen en historische MIT-voorwaarden blijven daarom meegeleverd. Zie [licenses/MDN-Code-Samples.txt](licenses/MDN-Code-Samples.txt) en [MDN's codevoorwaarden](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license).

Gebruikte bronpagina's:
- [Basic concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts)
- [Basic concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts)
- [display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display)
- [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)
- [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)
- [ul](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul)
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

De voorbeelden zijn geselecteerde codeblokken of aaneengesloten codefragmenten, zonder website-HTML, verklarende artikeltekst of gegenereerde alternatieven. Alleen weergavegerelateerde witruimte en REPL-prompts zijn waar nodig aangepast. De app kiest volledige fragmenten uit deze vaste bank; ze worden nooit uitgevoerd. Het is aanslagtraining met code, geen cursus programmeren of gecertificeerde vaardigheidstest.

De GPL-3.0 van Ritme vervangt de bovenstaande bronlicenties niet. Bewaar deze vermeldingen en de map `licenses/` bij herdistributie.
