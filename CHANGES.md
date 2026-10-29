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

## Faktencheck Region 4 – bestätigt
Alle Punkte bestätigt. Präzisierungen eingearbeitet:
- Shīsā: rechte Figur mit offenem Maul (hält Glück fest), linke geschlossen (sperrt Böses aus).
- Kanpai: eigenes Glas etwas tiefer halten als das des Gegenübers.
- Live House: Pflichtgetränk meist 500–600 ¥.
- Kyocera Dome: im März 1997 als „Osaka Dome“ eröffnet.
- Namba Parks: auf dem Gelände des 1998 abgerissenen Osaka-Stadions (Nankai Hawks); Strecke Namba–KIX rund 42 km (Schätzaufgabe von 43 auf 42 korrigiert), Rapi:t 34–39 min.
- Concept-Café: Fotos des Personals nur als bezahltes „Cheki“.

## Region 5
- Stadtentwicklung 5: Statt der „Bodenversiegelung“ (keine verlässliche Zahl) Schätzfrage zur Höhe von Abeno Harukas (300 m). Stadtentwicklung 14: Schätzfrage zum Jahrzehnt der nachgebauten Straße (1830er).
- Stadtentwicklung 6: Ren braucht den Fahrplan der kostenlosen Fähren (Fetch-Ziel 50 Tempozan wie im Bundle).
- Wahrzeichen 6: Der Glasboden ist im Artwork nicht zu sehen; Fotomotiv ist stattdessen die winzige Burg im Fenster. Wahrzeichen 11: Die Schwarze Sonne auf der Rückseite ist im Artwork nicht sichtbar; fotografiert wird das goldene Gesicht an der Spitze.
- Nachtleben 11: Schätzfrage zum Baujahr des heutigen Turms (1956) statt zu den Neonfarben; die Wetterfarben werden im Dialog erklärt.
- Kansai 11: Statt Besucherzahlen aus Nachbarpräfekturen (keine verlässliche Zahl) Fahrzeit Ōsaka–Kyōto mit dem JR-Spezial-Schnellzug (rund 29 min).
- Kuidaore 8: Okinawa-Soba-Brühe aus Schwein und Katsuobushi (das Bundle nennt Kombu; Kombu taucht stattdessen in Osaka Tamashii 7 auf).
- Kanji 16: 寺, 心, 手 (nicht N5) ersetzt durch 四, 天, 白, 休; 寺 nur im Dialog als Teil von 四天王寺.
- Shōgi-Rätsel: zwei klassische Matt-in-einem-Zug-Stellungen (Gold-Abwurf vor den König, „atama-kin“; Turm auf die oberste Reihe bei eingesperrtem König).
- STUDENT_OMU_LEAD heißt im Spiel „Nanami“. TOURIST_CLARA stammt aus Deutschland und spricht den Spieler auf Deutsch an.
- Romance 22: Für Aoi ist der „Dämpfer“ ein einjähriges Praktikum in Yokohama, für Maya das Ende ihres Austauschsemesters; in beiden Fällen geht auch der Spieler zurück nach Deutschland.
- Romance 28: Die Wahl (Kuss / Freundschaft) wird als Flag `ending` gespeichert.
- Café-Kultur 6 („Dende Town“) und Fußball 12 („Revanchmatch“) erscheinen im Spiel korrekt geschrieben.

## Zur Faktenprüfung (Region 5)
Nach bestem Wissen geschrieben; bitte gegenprüfen:
- Midō-suji 1937 auf 44 m verbreitert, U-Bahn darunter seit 1933.
- Shinsekai 1912: Nordteil nach Pariser Vorbild, Vergnügungspark „Luna Park“ nach Coney Island; erster Tsūtenkaku 1912 (Eiffelturm-Anklang), im Krieg abgebaut; heutiger Turm 1956, rund 103 m (108 m mit Blitzableiter).
- Wetterlicht des Tsūtenkaku: Weiß = sonnig, Orange = bewölkt, Blau = Regen.
- Riesenrad Tempozan: Beleuchtung als Wettervorhersage für den nächsten Tag (Rot = sonnig, Grün = bewölkt, Blau = Regen).
- Billiken: 1908 von einer amerikanischen Künstlerin (Florence Pretz) erfunden, „God of things as they ought to be“, seit 1912 in Shinsekai; Fußsohlen streicheln bringt Glück.
- Abeno Harukas 300 m, eröffnet 2014, lange höchstes Gebäude Japans.
- Kostenlose Stadtfähren (渡船) vor allem in Taishō, seit über hundert Jahren städtisch betrieben.
- Kyocera Dome auf dem Gelände eines ehemaligen Gaswerks.
- Stadthalle Nakanoshima (1918), gestiftet vom Börsenmakler Iwamoto Einosuke (1 Million Yen).
- Osaka Station City 2011; Umekita auf dem Gelände des früheren Güterbahnhofs Umeda, mit großem Park.
- Museum of Housing and Living: nachgebaute Straße der 1830er Jahre (Tenpō-Zeit).
- Hankai-Tram: letzte Straßenbahnlinie Ōsakas, seit über hundert Jahren, von Ebisuchō bis Sakai.
- Umeda Sky Building 1993 mit „schwebender Rolltreppe“ und Floating Garden.
- Turm der Sonne (Okamoto Tarō, 1970): goldenes Gesicht = Zukunft, Mitte = Gegenwart, Schwarze Sonne hinten = Vergangenheit.
- Kōshien-Efeu 1924 gepflanzt, beim Umbau entfernt und aus Ablegern neu gepflanzt.
- Kushikatsu: nido-zuke kinshi, Kohlblatt als Löffel. Doteyaki mit (weißer) Miso. Milch aus der Glasflasche nach dem Bad.
- Okinawa-Soba-Brühe aus Schweinefleisch und Katsuobushi. Bukubuku-chā mit Schaum aus Reis-Röstwasser und Erdnüssen.
- Chicken Ramen 1958, Cup Noodle 1971 (Andō Momofuku, Ikeda). Momiji-Tempura: Blätter rund ein Jahr in Salz eingelegt.
- Kitsune-Udon in Ōsaka im 19. Jahrhundert erfunden.
- Mizuhiki: Rot-Weiß für freudige, Schwarz-Weiß/Silber für traurige Anlässe.
- Setsuwa-Sammlung (Nihon Ryōiki) aus dem frühen 9. Jahrhundert.
- Chikamatsu: Shusse Kagekiyo 1685, Sonezaki Shinjū 1703, Kokusen'ya Kassen 1715, Shinjū Ten no Amijima 1720. Saikaku: Kōshoku Ichidai Otoko 1682. Ueda Akinari: Ugetsu Monogatari 1776.
- Sanada Yukimura als „bester Krieger Japans“ (日本一の兵), Sanada-maru im Süden der Burg.
- Endō Shūsaku, „Schweigen“ (1966), selbst Katholik.
- Shitennō-ji 593 von Prinz Shōtoku gegründet; Anordnung Tor–Pagode–Haupthalle–Lehrhalle in einer Süd-Nord-Linie; vier Einrichtungen (Kyōden-in, Hiden-in, Ryōbyō-in, Seyaku-in); Garten des Reinen Landes; steinernes Torii am Westtor, Sonnenuntergang zur Tagundnachtgleiche.
- Ryūan-ji in Minō als Ursprung einer der ältesten Lotterien Japans (Minō-tomi); En no Gyōja / Shugendō / Yamabushi.
- Ishiyama Hongan-ji: zehnjähriger Krieg gegen Oda Nobunaga, Aufgabe 1580; später Burg Ōsaka auf dem Gelände.
- Siebzehn-Artikel-Verfassung, Artikel 1 „Wa“. Ogyū Sorai: Ordnung von den alten Weisen gemacht.
- Sakata Sankichi als legendärer Shōgi-Spieler aus der Gegend.
- JR-Spezial-Schnellzug Ōsaka–Kyōto rund 29 Minuten.
- Kansai-ben: honma, akan, ōkini; Kyōto: oideyasu.
- Tenjin Matsuri am 24./25. Juli mit über hundert Booten und Feuerwerk, eines der drei großen Feste Japans.
- Takoishi über hundert Tonnen.
- Hideyoshi „Taikō“: Titel eines Regenten im Ruhestand.
- Mōkarimakka / Bochi-bochi denna; Sprichwort „Handel ist wie der Speichel einer Kuh“ (商いは牛の涎).
- OMU 2022 aus Ōsaka City University und Ōsaka Prefecture University; Wurzeln in einer Handelsschule, die Godai Tomoatsu mitgegründet hat; Godai baute auch die Handelskammer auf.
- Weltmeisterschaft 2002 im Nagai-Stadion.

## Noch zu korrigieren (außerhalb der Demo, betrifft spätere Regionen)
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
