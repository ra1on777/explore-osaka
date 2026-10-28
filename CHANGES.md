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

## Zur Faktenprüfung (Region 3)
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

## Noch zu korrigieren (außerhalb der Demo, betrifft spätere Regionen)
- „Dende Town“ → „Den Den Town“ (Café-Kultur, Etappe 6).
- „Revanchmatch“ → „Revanchematch“ (Fußball, Etappe 12).
- „Makerte ya!“ → „Makete ya!“ (Shopping, Etappe 4).
- Food, Etappe 3: Oktopus wird in der Garküche (38) geholt statt am Markt (43) – Start und Ziel scheinen vertauscht.

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
