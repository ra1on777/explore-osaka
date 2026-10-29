# Änderungen gegenüber den Quelldaten

Still korrigiert (wie vereinbart) und hier dokumentiert.

## Daten
- `YUKI_SUBCLUTURE_OTAKU` → `YUKI_SUBCULTURE_OTAKU` (Tippfehler in der ID).
- Fußball, Etappe 7: Als NPC ist Coach Sakai eingetragen, der Text nennt den „Kwansei-Kapitän“. Lösung: Sakai bleibt Ansprechpartner und coacht von der Linie; der Kapitän ist der Gegner im Duell.
- Fußball, Etappe 4: „Freistoßtraining“ → Schusstraining/Elfmeter (passt zur Mechanik PENALTY_TIMING_STOP).
- Geographie, Etappe 3: Die Schätzfrage behandelt die Länge der Ōsaka Monorail (rund 28 km) statt der Höhe der Senri-Hügel; für diese gab es keine belastbare Zahl.
- Hiragana, Etappe 3: Beispielwort たこ statt なっとう (っ und Langvokal kommen erst später im Strang).
- Ortsname „Minoh“ in Texten als „Minō“ (Hepburn mit Makron).
- Nummer der Screens: Die Overlay-Spezifikation nennt 75 Haupt-Screens, das GDD 70. Tatsächlich gibt es 75 IDs (durch 2a/b/c, 32a/b, 45a/b, 56a/b). Die Engine arbeitet mit den 75 IDs.
- Dialogbox-Vorlage: Der Name „Hana“ gehört zu keiner Figur und wird nicht verwendet.

## Region 2
- Kanji 6 und 8: Das Bundle sah 林/森 und 曜 vor (nicht N5). Ersetzt durch 山 川 木 花 空 (Natur) und 時 分 半 今 午 (Uhrzeit). Wochentage werden in Kanji 7 nur über die Grundzeichen 日 月 火 水 木 金 土 und in Kana (にちようび) gezeigt.
- Kanji 2–8: Die Mechanik „Radikal/Strich wählen“ ist als Kanji-Raster umgesetzt (Bedeutung → Zeichen).
- Wortschatz 10: „にがい“ (bitter) ist nicht N5 → stattdessen „あつい“ (heiß).
- STUDENT_KWANSEI_REP heißt im Spiel „Haruto“, TORI_TETSU_TAKUMI stellt sich als Takumi mit Spitznamen „Tori“ (von Tori-Tetsu) vor.
- Bahnhöfe 2: Die Route Umeda → Tenjinbashisuji führt mit der lila Tanimachi-Linie über Higashi-Umeda (die braune Sakaisuji-Linie fährt dort nicht ab). Der Hinweis nennt deshalb die lila Linie.
- Bahnhöfe 2 und 6: Die Fahrpreise am Automaten sind vereinfachte Beispielwerte, keine aktuellen Tarife.
- Bahnhöfe 3: „Tenroku 1925“ als Endbahnhof einer Vorortbahn (Shin-Keihan, heute Hankyū Senri-Linie) – ohne genaues Streckenziel formuliert.
- Romance 3–6: Die Partnerin spricht je nach Route eigene Zeilen (Aoi/Maya); Aufgaben und Abschluss sind gemeinsam.
- Fetch-Etappen (Philosophie 7, Literatur 6): Die Gegenstände liegen in der Nakanoshima-Bibliothek (Screen 25), wie im Bundle angegeben.
- Karte Region 1: „Wohnheim“ beschriftet nach links, „Panasonic Stadium“ etwas tiefer, damit sich die Markierungen nicht mehr überlagern.

## Region 3
- Screen 36: Das Bundle nennt „Otemon Gakuin – Otemae Campus“, das Artwork zeigt aber den Namensstein 大手前大学 (Ōtemae-Universität). Im Spiel heißt der Ort neutral „Campus Ōtemae“, die Figur STUDENT_OTEMON_BIZ heißt „Mio“. Beide Namen (追手門 / 大手) bezeichnen das Haupttor der Burg – die Etappe erklärt genau das.
- Hiragana 12: Statt Hentaigana (nicht A1) alte Schreibweisen: ゑ/ゐ und Ladenschilder von rechts nach links.
- Kanji 9: 城 (nicht N5) ersetzt durch 高; Etappe behandelt 大 小 高 国.
- Kansai 8 (Museum of History) bleibt außerhalb der Demo, weil der Fetch-Ort (Screen 38) in Region 4 liegt.
- Geographie 7: Schätzfrage zur Länge des Yodo-gawa (rund 75 km) statt „fluviale Prozesse“ allgemein.
- Wahrzeichen 2: Der berühmte Läufer an der Ebisu-Brücke wird im Hinweis nur beschrieben, ohne Markennamen.

## Faktenprüfung Region 3 (vom Nutzer bestätigt, Präzisierungen eingearbeitet)
- Uemachi-Hochebene rund 12 km lang (Burg bis Sumiyoshi); vor rund 6000 Jahren Meeresbuchten im Westen und Osten (Kawachi).
- Naniwa-Palast (7. Jh.) direkt neben dem Museum of History.
- Burgbau ab 1583 durch Hideyoshi auf dem Gelände des Ishiyama Hongan-ji; Mauersteine teils über 100 Tonnen.
- Hauptturm 1931 mit Bürgerspenden neu gebaut; Shachihoko als Feuerschutz, meist paarweise.
- Yodo-gawa rund 75 km (Biwa-See → Seta-gawa → Uji-gawa → Yodo-gawa); neues Flussbett um 1900–1910.
- Graureiher (aosagi) am Burggraben.
- Franz Xaver 1549; Hosokawa Gracia in Ōsaka; Missionarsausweisung 1587; Verbot ab 1614; Kakure Kirishitan; Aufhebung 1873.
- Hideyoshi († 1598) als Toyokuni Daimyōjin verehrt, von den Tokugawa unterdrückt; Hōkoku-Schrein Ōsaka zuerst auf Nakanoshima, 1961 in den Burgpark verlegt.
- „Sanpō yoshi“ als Leitsatz der Ōmi-Kaufleute.
- Waagerechte Schilder vor dem Krieg oft von rechts nach links; ゑびす als alte Schreibung.

## Region 4
- Kuidaore 3: Start (Markt 43) und Fetch-Ziel (Gasse 38) bleiben wie im Bundle; erzählt wird es so, dass Gen am Markt einkauft und die Bonitoflocken an seinem Stand in der Gasse vergessen hat.
- Kanji 12: 肉 (nicht N5) entfällt; Etappe behandelt 食 飲 魚 (+ 水). Kanji 14: 店 und 物 (nicht N5) ersetzt durch 何 円 千 neben 買.
- Wortschatz 12–16, Konversation 11–18, Hiragana 13–16, Katakana 10–18 wie im Bundle; nur Formen auf N5-Niveau (ません か / ましょう, ～で, ～へ, ほしい).
- Romance 9 und 16: Die Fragen beziehen sich auf das, was die jeweilige Partnerin erzählt (Aoi bzw. Maya), daher pro Route eigene Aufgaben.
- Romance 11: Das „Missverständnis über kulturelle Direktheit“ ist für Aoi ein vor anderen ausgesprochener Witz, für Maya ein überhörtes indirektes Nein („chotto …“) – beides zum Thema kūki o yomu.
- STUDENT_KINDAI_DEV heißt im Spiel „Kōta“.
- Bahnhöfe 8: Statt Passagierzahlen (keine verlässliche Zahl) Schätzfrage zur Streckenlänge Namba – Flughafen Kansai.
- Subkultur 7: Statt Messe-Besucherzahlen die Zuschauerkapazität des Kyocera Dome beim Baseball.
- Romance 19: Schätzfrage zur Umlaufzeit des Riesenrads (rund 15 Minuten).
- Geographie 8: Kartenquiz zur Bucht (Tempozan, Yodo-Mündung, Sturmflut-Tor, künstliche Insel).
- Wahrzeichen 3 / Hinweise: Die Läufer-Reklame und das Riesenrad werden ohne Markennamen beschrieben.

## Zur Faktenprüfung (Region 4)
- Kuidaore-Sprichwort (Kyōto Kleidung, Ōsaka Essen); Takoyaki in den 1930ern in Ōsaka erfunden; Dashi aus Kombu (aus Hokkaidō) und Bonito.
- Kuromon-Markt seit fast 200 Jahren, Name nach dem schwarzen Tor eines Tempels.
- Amerikamura: Name von Läden mit US-Kleidung in den 1970ern; Sankaku-kōen.
- Live Houses mit Pflichtgetränk; Kanpai-Regel, Oshaku, Otōshi/Tsukidashi als Sitzgebühr.
- Ebisu-bashi = „Hikkake-bashi“; Fans springen 1985 in den Kanal.
- Den Den Town von „denki“; Karaoke in Kansai erfunden (Inoue Daisuke, Kōbe, Anfang der 1970er).
- Taishō: Zuwanderung aus Okinawa ab den 1920ern, rund ein Viertel der Bewohner mit Wurzeln in Okinawa; Shīsā paarweise, ein Maul offen, eins geschlossen; Sanshin; Sātā andagī.
- Namba Yasaka: Löwenkopf rund 12 m hoch; Tsunahiki-Ritual (Bezug zu Susanoo und Yamata no Orochi), im Januar.
- Manzai: Boke und Tsukkomi; „Tenka no daidokoro“ als Reishandelszentrum der Edo-Zeit.
- Kyocera Dome 1997 eröffnet, rund 36.000 Plätze beim Baseball.
- Kindai Academic Theater mit über 20.000 Comics; vollständige Zucht des Pazifischen Blauflossen-Thunfischs 2002 nach über 30 Jahren Forschung.
- Tempozan 1831 aus Baggersand des Aji-gawa, 4,53 m; Sturmflut-Bogentore 1970; Weltausstellung 2025 auf einer künstlichen Insel; Riesenrad über 100 m, Umlauf rund 15 min.
- Namba Parks auf dem Gelände eines früheren Baseballstadions; Nankai-Strecke Namba – Kansai-Flughafen gut 40 km, Express gut eine halbe Stunde.
- Oda Sakunosuke, „Meoto Zenzai“ (1940); Lokal gleichen Namens in Minami.
- Bunraku: drei Spieler pro Hauptpuppe; UNESCO-Kulturerbe.
- Ōsaka-jō Hall 1983 eröffnet (400 Jahre nach Baubeginn der Burg).
- Panna (Straßenfußball aus den Niederlanden); Kunstrasenschuhe mit Noppen.
- Roter Faden am kleinen Finger (akai ito), En-musubi.
- Concept-Café-Regeln (Fotos nur offiziell, Zeitlimit).

## Noch zu korrigieren (außerhalb der Demo, betrifft spätere Regionen)
- „Dende Town“ → „Den Den Town“ (Café-Kultur, Etappe 6).
- „Revanchmatch“ → „Revanchematch“ (Fußball, Etappe 12).
- „Makerte ya!“ → „Makete ya!“ (Shopping, Etappe 4).

## Zur Faktenprüfung (Region 1)
Nach bestem Wissen geschrieben; bitte bei Gelegenheit gegenprüfen:
- Machikanesuchus: Fund 1964, rund 400.000 Jahre alt, ca. 7 m lang; ein Gedenkstein am Campus ist erzählerisch gesetzt.
- Ōsaka-Gruppe als Untergrund der Hügel im Norden Ōsakas.
- Minō-Wasserfall rund 33 m (laut „200 Fakten“ Nr. 107).
- Kwansei Gakuin: 1889 von Walter R. Lambuth in Kōbe gegründet, 1929 nach Nishinomiya umgezogen.
- Kansai-Universität: 1886 als Rechtsschule gegründet; Boissonade; Bürgerliches Gesetzbuch von 1898 mit deutschem Einfluss.
- Kaitokudō 1724, Tekijuku 1838 als Wurzeln der Handai.
- Handai: rund 25 Fremdsprachen an der Fakultät für Fremdsprachen (Campus Minō).
- Kōshien 1924 eröffnet, Name vom 甲子-Jahr.
- Colonel-Sanders-Statue 1985 im Dōtonbori, 2009 wiedergefunden; Japan-Series-Sieg der Tigers 2023.
- Kobayashi Ichizō: Hankyū, Takarazuka-Revue.
- Panasonic Stadium Suita überwiegend durch Spenden finanziert.

## Faktenprüfung Region 2 (vom Nutzer bestätigt, Präzisierungen eingearbeitet)
- „Naniwa no happyaku-ya-bashi“ (808 Brücken), Brücken der Edo-Zeit überwiegend von Kaufleuten finanziert.
- Ōkawa teilt sich an der Ostspitze von Nakanoshima in Dōjima-gawa und Tosabori-gawa; Reisbörse Dōjima (1730).
- Dōtonbori-Kanal: Baubeginn 1612 durch Yasui Dōton, Fertigstellung 1615.
- Tekijuku-Register mit über 600 Namen; Fukuzawa Yukichi auf dem 10.000-Yen-Schein (1984–2024).
- Nishida Kitarō, „Zen no kenkyū“ (1911), reine Erfahrung; Kamo no Chōmei, „Hōjōki“ (1212).
- Kaitokudō 1724 von Kaufleuten gegründet; Hyakunin Isshu von Fujiwara no Teika.
- Kaiserliche Universität Ōsaka 1931; Kansai Hōritsu Gakkō 1886; Kwansei-Uhrturm (Vories, um 1929), Motto „Mastery for Service“.
- Nakanoshima-Bibliothek 1904; Umeda Sky Building 173 m, Dach am Boden montiert und hochgezogen.
- Tenjinbashisuji rund 2,6 km, über 600 Läden; Tenroku-Station 1925.
- Senri New Town: Erstbezug 1962. Monorail: Umstieg zur Saito-Linie in Banpaku-kinen-kōen, Shibahara-handaimae für Toyonaka.
- Bashō 1644 Iga – Oku no Hosomichi 1689 – gestorben 1694 in Ōsaka; Chikamatsu „Sonezaki Shinjū“ 1703.
- Nel Drip = Flanellfilter; Kissaten-„Morning Set“.
- Kein Trinkgeld in japanischen Restaurants; Kushikatsu-Soße nur einmal tunken.
