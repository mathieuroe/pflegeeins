export interface ContentItem {
  slug: string;
  titel: string;
  beschreibung: string;
  kategorie: string;
  lesezeit: string;
  datum: string;
  typ: "ratgeber" | "news";
  inhalt: string;
  affiliate?: string;
}

export const RATGEBER: ContentItem[] = [
  {
    slug: "erste-30-tage-mit-pflegegrad",
    titel: "Was tust du in den ersten 30 Tagen mit Pflegegrad?",
    beschreibung: "Du hast gerade den Bescheid bekommen und weißt nicht wo anfangen? Diese Checkliste zeigt dir die wichtigsten Schritte der ersten vier Wochen.",
    kategorie: "Erste Schritte",
    lesezeit: "5 Min.",
    datum: "Mai 2026",
    typ: "ratgeber",
    inhalt: `## Die ersten 30 Tage – deine Checkliste

Der Pflegegrad-Bescheid ist da. Herzlichen Glückwunsch – auch wenn das seltsam klingt. Denn jetzt hast du offiziell Anspruch auf Leistungen die echte Entlastung bringen.

### Woche 1: Die schnellen Gewinne

**Pflegebox beantragen** – geht in 5 Minuten, kostet nichts, kommt jeden Monat. 42 € für Handschuhe, Desinfektion, Bettschutz.

**Hausnotruf prüfen** – ab PG 1, Pflegekasse zahlt 27 € / Monat. Bei vielen Anbietern: 0 € Eigenanteil.

### Woche 2: Geld nicht verfallen lassen

**Entlastungsbetrag nutzen** – 131 € / Monat für Alltagshilfe. Nicht verbrauchte Beträge werden angespart und können grundsätzlich bis zum 30. Juni des Folgejahres genutzt werden.

**Pflegegeld prüfen (ab PG 2)** – wenn Angehörige pflegen: 347–990 € / Monat direkt aufs Konto.

### Woche 3–4: Den Alltag strukturieren

- Pflegedienst-Angebote einholen falls nötig
- Wohnraumanpassungen planen (Haltegriffe, Duschumbau)
- Kostenlose Pflegeberatung bei der Pflegekasse buchen (§7a SGB XI)

### Das Wichtigste

Viele Leistungen verfallen wenn sie nicht rechtzeitig beantragt werden. Starte einfach – auch wenn noch nicht alles klar ist.`,
  },
  {
    slug: "pflegebox-beantragen",
    titel: "Pflegebox beantragen – so geht es in 5 Minuten",
    beschreibung: "Die Pflegebox ist die einfachste Leistung im Pflegesystem – und wird am häufigsten vergessen. Hier ist wie du sie in 5 Minuten beantragst.",
    kategorie: "Pflegebox",
    lesezeit: "3 Min.",
    datum: "Mai 2026",
    typ: "ratgeber",
    affiliate: "https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=ratgeber_box&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F",
    inhalt: `## Pflegebox in 5 Minuten beantragen

Die Pflegebox (§40 SGB XI) ist ein monatliches Paket mit Verbrauchsmaterialien für die häusliche Pflege. Die Pflegekasse erstattet bis zu **42 € pro Monat** – für alle Pflegegrade ab PG 1.

### Was ist drin?

- Einmalhandschuhe (Latex oder Vinyl)
- Bettschutzeinlagen / Matratzenschoner
- Händedesinfektionsmittel
- Flächendesinfektionsmittel
- Mundschutz / OP-Masken
- Einmalschürzen

### So geht's

1. Bei unserem empfohlenen Partner **Blubox** kostenlos beantragen
2. Blubox übernimmt den gesamten Antrag bei deiner Pflegekasse
3. Genehmigung kommt automatisch – erste Lieferung in 1–2 Wochen

### Was kostet das?

Nichts. Die Pflegekasse zahlt direkt an den Anbieter.`,
  },
  {
    slug: "entlastungsbetrag",
    titel: "Entlastungsbetrag: Was ist das und wer bekommt ihn?",
    beschreibung: "131 € pro Monat die viele nie nutzen. Was der Entlastungsbetrag ist, wofür du ihn einsetzen kannst und wie du ihn bekommst.",
    kategorie: "Finanzen",
    lesezeit: "4 Min.",
    datum: "April 2026",
    typ: "ratgeber",
    inhalt: `## Entlastungsbetrag – 131 € monatlich für alle ab PG 1

131 € pro Monat für qualifizierte Unterstützung im Alltag. Über 12 Monate sind das **1.572 €**.

Das Besondere: **Nicht verbrauchte Beträge werden angespart und können grundsätzlich bis zum 30. Juni des Folgejahres genutzt werden.**

### Wofür kann ich ihn nutzen?

- Alltagsbegleitung und Betreuung
- Haushaltshilfe – Einkaufen, Putzen, Kochen
- Fahrdienste zu Ärzten
- Betreuungsgruppen und Tagespflege

Wichtig: Der Anbieter muss anerkannt sein (nach Landesrecht).

### Wie komme ich ans Geld?

1. Anerkannten Anbieter finden (liva hilft)
2. Leistungen in Anspruch nehmen
3. Rechnungen einsammeln
4. Bei der Pflegekasse einreichen
5. Erstattung in 2–4 Wochen`,
  },
  {
    slug: "hausnotruf",
    titel: "Hausnotruf – wann macht er Sinn und was kostet er wirklich?",
    beschreibung: "Die Pflegekasse zahlt 27 € pro Monat. Bei vielen Anbietern zahlst du damit gar nichts. Was du wissen musst.",
    kategorie: "Sicherheit",
    lesezeit: "4 Min.",
    datum: "April 2026",
    typ: "ratgeber",
    affiliate: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=ratgeber_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F",
    inhalt: `## Hausnotruf – Sicherheit zu Hause, oft zum Nulltarif

Ein Hausnotruf ist ein kleines Gerät – oft ein Knopf am Handgelenk oder um den Hals. Ein Druck, sofort antwortet jemand.

### Wann macht er Sinn?

- Die pflegebedürftige Person ist zeitweise alleine
- Es besteht Sturzgefahr
- Pflegende Angehörige müssen zur Arbeit

### Was kostet es?

Monatliche Gebühr: meist 20–40 €. Die Pflegekasse zahlt **27 € / Monat** Zuschuss sowie einmalig bis zu **10,49 €** für die Einrichtung. Bei günstigen Anbietern: **0 € Eigenanteil**.

### Wie beantrage ich den Zuschuss?

1. Bei unserem empfohlenen Partner **smartversorgt** kostenlos beantragen
2. smartversorgt übernimmt den gesamten Antrag bei deiner Pflegekasse (§40 SGB XI)
3. Genehmigung in ca. 3–5 Werktagen – direkte Abrechnung mit der Pflegekasse`,
  },
  {
    slug: "mdk-besuch-vorbereitung",
    titel: "MD-Besuch: So bereitest du dich richtig vor",
    beschreibung: "Der MD-Besuch entscheidet über den Pflegegrad. Mit der richtigen Vorbereitung bekommst du den Pflegegrad der wirklich zutrifft.",
    kategorie: "MD-Besuch",
    lesezeit: "5 Min.",
    datum: "März 2026",
    typ: "ratgeber",
    inhalt: `## MD-Besuch – keine Angst, aber gut vorbereiten

Nach dem Pflegegrad-Antrag kommt jemand vom Medizinischen Dienst (MD, früher MDK) vorbei. Das Gespräch dauert ca. 45–60 Minuten und entscheidet über den Pflegegrad.

### Die 4 wichtigsten Tipps

**1. Alles dokumentieren**
Schreibe vorher auf was die Person NICHT mehr alleine kann. Beim Waschen, Anziehen, Kochen, Orientieren. Je konkreter desto besser. Ein Tagebuch der letzten Wochen hilft.

**2. Schlechten Tag zeigen**
Der MD bewertet was er sieht. Zeig wie es wirklich ist – nicht den guten Tag. Wenn jemand manchmal Hilfe braucht, immer davon ausgehen dass er sie braucht.

**3. Jemanden dabeihaben**
Nimm eine Vertrauensperson mit. Vier Augen sehen mehr. Und wenn jemand still dabei sitzt und mitschreibt, ist das komplett in Ordnung.

**4. Widerspruch einlegen wenn nötig**
Du hast 1 Monat Zeit. Kein Grund nötig – einfach schriftlich: „Ich lege Widerspruch ein." In ~35% aller Fälle wird heraufgestuft.`,
  },
  {
    slug: "verhinderungspflege",
    titel: "Verhinderungspflege: Urlaub für pflegende Angehörige",
    beschreibung: "Seit Juli 2025 gibt es ein gemeinsames Budget von bis zu 3.539 € pro Jahr für Verhinderungs- und Kurzzeitpflege. So funktioniert es und wer Anspruch hat.",
    kategorie: "Entlastung",
    lesezeit: "4 Min.",
    datum: "März 2026",
    typ: "ratgeber",
    inhalt: `## Verhinderungspflege – dein Recht auf Auszeit

Pflegende Angehörige leisten Enormes. Aber auch die stärksten Menschen brauchen eine Pause.

### Was ist Verhinderungspflege?

Wenn die Hauptpflegeperson verhindert ist – durch Urlaub, Krankheit oder andere Gründe – übernimmt jemand anderes die Pflege. Die Pflegekasse zahlt.

**Budget (ab 01.07.2025):** bis zu **3.539 € pro Jahr** als gemeinsames Budget für Verhinderungs- und Kurzzeitpflege (ab PG 2), bis zu **8 Wochen**.

### Wer kann die Pflege übernehmen?

- Professioneller Pflegedienst
- Verwandte (außerhalb des Haushalts, mit Einschränkungen)
- Freunde oder Nachbarn

### Wie beantrage ich es?

1. Vertretung organisieren
2. Zeitraum und Kosten dokumentieren
3. Antrag mit Belegen bei der Pflegekasse
4. Erstattung in 2–4 Wochen

**Hinweis:** Das Budget von 3.539 € gilt pro Kalenderjahr für Verhinderungs- und Kurzzeitpflege gemeinsam. Nicht genutzte Beträge verfallen zum Jahresende.`,
  },
];

export const NEWS: ContentItem[] = [
  {
    slug: "pflegereform-2026-reformplaene-der-bundesregierung",
    titel: "Pflegereform 2026: Reformpläne der Bundesregierung",
    beschreibung: "Bundesregierung plant umfassende Änderungen",
    kategorie: "Politik",
    lesezeit: "3 Min.",
    datum: "August 2026",
    typ: "news",
    inhalt: `## Pflegereform 2026: Ein Überblick über die Pläne der Bundesregierung
Die Bundesregierung plant eine umfassende **Pflegereform**, um das deutsche **Pflegesystem** zu stabilisieren. Die Reform soll insbesondere die **pflegende Angehörige** entlasten und die **Pflegeleistungen** verbessern.

## Hintergrund
Der Bedarf an **Pflegepersonal** steigt kontinuierlich, während gleichzeitig ein Mangel an qualifizierten Pflegekräften besteht. Die **Pflegekasse** steht vor großen finanziellen Herausforderungen, da die Ausgaben für die **Pflegeversicherung** stetig steigen.

## Reformpläne
Die Bundesregierung plant, das **Pflegekompetenzgesetz** zu überarbeiten, um den **Pflegeberuf** attraktiver zu machen. Zudem sollen die **Pflegesätze** angepasst werden, um eine faire Vergütung für die Pflegekräfte zu gewährleisten. Die Reform soll auch die **Verhinderungspflege** und die **Kurzzeitpflege** verbessern.

## Auswirkungen auf pflegende Angehörige
Die Reform soll insbesondere die **pflegenden Angehörigen** entlasten, indem sie eine bessere Unterstützung durch die **Pflegekasse** erhalten. Zudem sollen die **Pflegeleistungen** verbessert werden, um eine bessere Versorgung der Pflegebedürftigen zu gewährleisten.

Quelle: BMG, Juli 2026`,
  },
  {
    slug: "pflegereform-bundesregierung-plant-umfassende-aenderungen",
    titel: "Pflegereform: Bundesregierung plant umfassende Änderungen",
    beschreibung: "Reform soll Pflegebedürftige und Beitragszahler betreffen",
    kategorie: "Politik",
    lesezeit: "3 Min.",
    datum: "August 2026",
    typ: "news",
    inhalt: `## Pflegereform: Bundesregierung plant umfassende Änderungen
Die Bundesregierung plant eine umfassende **Pflegereform**, die sowohl Pflegebedürftige als auch Beitragszahler betreffen wird. Laut **Gesundheitsministerin Nina Warken** soll die Reform dazu beitragen, die **Pflegeversicherung** langfristig zu stabilisieren.
## Hintergrund
Der Bedarf an **Pflegeleistungen** steigt aufgrund der demografischen Entwicklung stetig. Gleichzeitig gibt es einen Mangel an **Pflegefachkräften**. Die Bundesregierung sieht sich daher gezwungen, die **Pflegereform** voranzutreiben.
## Pläne der Bundesregierung
Die Bundesregierung plant, die **Beiträge zur Pflegeversicherung** zu erhöhen, um die Finanzierung der Pflege zu sichern. Zusätzlich sollen die **Leistungen der Pflegeversicherung** ausgeweitet werden, um Pflegebedürftige besser zu unterstützen.
## Kritik und Widerstand
Die geplante **Pflegereform** stößt jedoch auf Kritik und Widerstand. Einige Kritiker argumentieren, dass die Reform die **Beitragszahler** zu stark belasten würde. Andere fordern, dass die Bundesregierung mehr tun sollte, um den **Mangel an Pflegefachkräften** zu bekämpfen.
Quelle: BMG, Juli 2026`,
  },
  {
    slug: "pflegereform-2026",
    titel: "Pflegereform 2026: Was sich für Betroffene ändert",
    beschreibung: "Die Bundesregierung plant weitere Änderungen bei der Pflegeversicherung. Was Betroffene jetzt wissen müssen.",
    kategorie: "Politik",
    lesezeit: "3 Min.",
    datum: "Juni 2026",
    typ: "news",
    inhalt: `## Pflegereform 2026 – die wichtigsten Änderungen

Die Pflegeversicherung steht vor weiteren Reformen. Hier sind die aktuellen Entwicklungen die Betroffene kennen sollten.

### Was bereits gilt (ab 01.07.2025)

Das kombinierte Budget aus Verhinderungspflege und Kurzzeitpflege ist bereits in Kraft. Statt getrennter Töpfe gibt es jetzt ein gemeinsames Budget von **bis zu 3.539 € pro Jahr**.

### Was diskutiert wird

- Dynamisierung der Leistungsbeträge (jährliche Anpassung an die Inflation)
- Verbesserungen bei der Einstufung von Demenzerkrankten
- Entlastung pflegender Angehöriger durch mehr Beratungsangebote

### Was das für dich bedeutet

Wenn du aktuell Leistungen beziehst: Prüfe ob du alle Budgets voll ausschöpfst. Viele Familien lassen jedes Jahr Hunderte Euro auf dem Tisch liegen.`,
  },
  {
    slug: "pflegegeld-erhoehung-2025",
    titel: "Pflegegeld wurde erhöht – die neuen Beträge im Überblick",
    beschreibung: "Seit Januar 2025 wurden die Pflegegeldbeträge angehoben. Hier sind die aktuellen Zahlen für alle Pflegegrade.",
    kategorie: "Leistungen",
    lesezeit: "2 Min.",
    datum: "Januar 2025",
    typ: "news",
    inhalt: `## Pflegegeld 2026 – die aktuellen Beträge

Die Pflegegeldbeträge gelten unverändert seit Januar 2025 und bleiben 2026 stabil.

### Die aktuellen Beträge

- **PG 2:** 347 € / Monat
- **PG 3:** 599 € / Monat
- **PG 4:** 800 € / Monat
- **PG 5:** 990 € / Monat

### Wer bekommt Pflegegeld?

Pflegegeld gibt es ab PG 2 wenn die Pflege privat – also durch Angehörige oder Freunde – organisiert wird. Es gibt keine strengen Bedingungen. Ein formloser Antrag bei der Pflegekasse reicht.`,
  },
  {
    slug: "kombiniertes-budget-verhinderungspflege",
    titel: "Neues kombiniertes Budget: Verhinderungspflege + Kurzzeitpflege",
    beschreibung: "Seit 01. Juli 2025 gibt es ein gemeinsames Budget für Verhinderungspflege und Kurzzeitpflege. Was das konkret bedeutet.",
    kategorie: "Leistungen",
    lesezeit: "3 Min.",
    datum: "Juli 2025",
    typ: "news",
    inhalt: `## Kombiniertes Budget ab 01.07.2025

Die bisherigen Einzelbudgets für Verhinderungspflege (1.612 €) und Kurzzeitpflege (1.774 €) wurden zu einem gemeinsamen Budget zusammengefasst.

### Das neue Budget

**3.539 € pro Jahr** – frei verwendbar für:
- Verhinderungspflege (wenn die Hauptpflegeperson verhindert ist)
- Kurzzeitpflege (vorübergehende stationäre Pflege)
- Kombinationen aus beidem

### Was bedeutet das in der Praxis?

Früher musste man genau aufpassen wie viel von welchem Budget man nutzte. Jetzt gibt es einen großen flexiblen Topf. Das macht die Planung deutlich einfacher.`,
  },
  {
    slug: "mdk-wartezeiten-2026",
    titel: "MD-Wartezeiten: So lange dauert es aktuell",
    beschreibung: "Die Wartezeiten auf den MD-Besuch variieren stark je nach Region. Aktuelle Daten und Tipps was du tun kannst.",
    kategorie: "MD-Besuch",
    lesezeit: "2 Min.",
    datum: "April 2026",
    typ: "news",
    inhalt: `## MD-Wartezeiten 2026 – was ist normal?

Der MD hat gesetzlich 25 Arbeitstage Zeit um nach Antragstellung den Besuch durchzuführen. In der Praxis variiert das stark.

### Aktuelle Lage

In städtischen Gebieten: oft 3–5 Wochen. In ländlichen Regionen: vereinzelt bis zu 8 Wochen.

### Was du tun kannst

**Bei dringendem Bedarf:** Du kannst bei der Pflegekasse auf eine Beschleunigung hinweisen. Bei Krankenhausentlassung oder akutem Pflegebedarf gibt es Sonderregelungen – der MD muss dann innerhalb weniger Tage kommen.

**In der Zwischenzeit:** Leistungen die nicht an den MD-Besuch gebunden sind (z.B. Pflegebox, Hausnotruf) können bereits jetzt beantragt werden.`,
  },
  {
    slug: "widerspruch-pflegegrad",
    titel: "Pflegegrad zu niedrig? So legst du erfolgreich Widerspruch ein",
    beschreibung: "Rund 35 Prozent aller Widersprüche gegen einen Pflegegrad-Bescheid führen zu einer Höherstufung. So gehst du vor – Schritt für Schritt.",
    kategorie: "Widerspruch",
    lesezeit: "4 Min.",
    datum: "Mai 2026",
    typ: "news",
    inhalt: `## Widerspruch gegen den Pflegegrad – wann und wie es sich lohnt

Du hast den Bescheid bekommen und das Ergebnis fühlt sich falsch an? Das passiert häufiger als man denkt. Laut Statistiken der Pflegekassen führt rund **ein Drittel aller Widersprüche** zu einer Höherstufung. Es lohnt sich also, diesen Weg zu gehen.

### Wann ist Widerspruch sinnvoll?

- Der zuerkannte Pflegegrad entspricht nicht dem tatsächlichen Hilfebedarf
- Der Gutachter des Medizinischen Dienstes hat wesentliche Einschränkungen nicht oder falsch erfasst
- Die Pflegesituation hat sich seit dem Besuch verschlechtert
- Du hattest keinen Beistand beim MD-Besuch und fühlst dich übergangen

### Die Frist: 1 Monat

Widerspruch muss innerhalb von **einem Monat** nach Zustellung des Bescheids eingelegt werden. Die genaue Frist steht im Bescheid selbst unter "Rechtsbehelfsbelehrung".

### So formulierst du den Widerspruch

Ein Widerspruch muss nicht begründet werden – er muss nur rechtzeitig da sein. Diese kurze Formulierung reicht vollständig aus:

**"Ich lege hiermit Widerspruch gegen den Bescheid vom [Datum], Aktenzeichen [AZ], ein."**

Schicke das Schreiben **per Einschreiben mit Rückschein** an deine Pflegekasse – so hast du einen Nachweis.

### Was danach passiert

1. Die Pflegekasse prüft den Bescheid intern
2. In vielen Fällen wird ein erneuter MD-Besuch angesetzt
3. Du kannst jetzt eine detaillierte Begründung nachreichen – dazu solltest du den "schlechten Tag" schriftlich dokumentieren
4. Entscheidung in der Regel innerhalb von 3 Monaten

### Tipp: Pflegegutachten anfordern

Du hast das Recht, das MD-Gutachten einzusehen (§ 18 Abs. 4 SGB XI). Forder es schriftlich bei deiner Pflegekasse an. Darin steht genau was bewertet wurde – und was nicht.

### Wenn der Widerspruch abgelehnt wird

Dann bleibt noch der Weg vor das Sozialgericht. Das klingt nach viel – ist aber kostenlos und du brauchst keinen Anwalt. Sozialverbände wie der VdK oder der Sozialverband Deutschland (SoVD) helfen oft kostengünstig dabei.`,
  },
  {
    slug: "pflegebeitraege-2025",
    titel: "Pflegebeiträge 2025: Was Arbeitnehmer, Eltern und Rentner zahlen",
    beschreibung: "Der Pflegebeitragssatz liegt bei 3,4 Prozent – Kinderlose zahlen 4,0 Prozent. Alle aktuellen Sätze und was sich je nach Lebenssituation ändert.",
    kategorie: "Finanzen",
    lesezeit: "3 Min.",
    datum: "März 2026",
    typ: "news",
    inhalt: `## Pflegebeiträge 2025 – wer wie viel zahlt

Seit dem 1. Juli 2023 gilt der aktuelle Pflegebeitragssatz von **3,4 Prozent**. Für Kinderlose über 23 Jahre kommt ein Zuschlag von 0,6 Prozentpunkten dazu – sie zahlen insgesamt **4,0 Prozent**.

### Beitragssätze nach Kinderzahl (2025)

Die Beiträge werden je zur Hälfte von Arbeitnehmer und Arbeitgeber getragen (je 1,7 %). Der Kinderabschlag reduziert ausschließlich den Arbeitnehmeranteil:

- **Kinderlose (über 23 J.):** 4,0 % gesamt – AN 2,3 %, AG 1,7 %
- **1 Kind:** 3,4 % – AN 1,7 %, AG 1,7 %
- **2 Kinder:** 3,15 % – AN 1,45 %, AG 1,7 %
- **3 Kinder:** 2,90 % – AN 1,20 %, AG 1,7 %
- **4 Kinder:** 2,65 % – AN 0,95 %, AG 1,7 %
- **5 oder mehr Kinder:** 2,40 % – AN 0,70 %, AG 1,7 %

Kinder werden berücksichtigt bis zum vollendeten 25. Lebensjahr.

### Besonderheit Sachsen

In Sachsen zahlen Arbeitnehmer historisch bedingt einen höheren Anteil, weil der Buß- und Bettag als Feiertag erhalten blieb: AN 2,2 %, AG 1,2 % (für Kinderlose: AN 2,8 %, AG 1,2 %).

### Was zahlen Rentner?

Rentnerinnen und Rentner zahlen den vollen Pflegebeitrag selbst – die gesetzliche Rentenversicherung übernimmt die Hälfte wie ein Arbeitgeber. Kinderlose Rentner über 23 zahlen also ebenfalls 4,0 % vom Rentenbetrag.

### Warum steigen die Beiträge?

Die Pflegeversicherung ist eine Umlageversicherung: Was heute eingezahlt wird, finanziert die heutigen Leistungen. Da die Zahl der Pflegebedürftigen steigt und die Leistungsbeträge erhöht wurden, steigen die Beitragssätze. Experten erwarten bis 2030 einen weiteren Anstieg auf bis zu 4,5 Prozent.`,
  },
  {
    slug: "entlastungsbetrag-richtig-nutzen",
    titel: "Entlastungsbetrag: 131 € pro Monat – und die meisten nutzen ihn falsch",
    beschreibung: "1.572 € pro Jahr stehen dir zu – doch viele Familien schöpfen das Budget nicht aus oder beantragen es falsch. Was du wissen musst.",
    kategorie: "Leistungen",
    lesezeit: "4 Min.",
    datum: "Februar 2026",
    typ: "news",
    inhalt: `## Entlastungsbetrag 2026 – 131 € pro Monat richtig einsetzen

Der Entlastungsbetrag (§ 45b SGB XI) ist eine der am häufigsten ungenutzten Leistungen im Pflegesystem. **Jeder mit Pflegegrad 1 bis 5 hat Anspruch** – unabhängig davon ob Pflegegeld oder Pflegesachleistungen bezogen werden.

Aktuell: **131 € pro Monat**, also bis zu **1.572 € pro Jahr**.

### Wofür kannst du ihn nutzen?

Der Betrag ist zweckgebunden – aber der Spielraum ist groß:

- Alltagsbegleitung und Betreuung (z.B. Vorlesen, Spazierengehen, Gesellschaft leisten)
- Hauswirtschaftliche Unterstützung durch anerkannte Anbieter (Einkaufen, Kochen, Putzen)
- Tages- und Nachtpflege
- Kurzzeitpflege (ergänzend zum kombinierten Budget)
- Fahrdienste zu Arzt- oder Therapieterminen

**Wichtig:** Der Anbieter muss nach Landesrecht anerkannt sein. Informelle Nachbarschaftshilfe oder Familienmitglieder aus dem eigenen Haushalt zählen nicht.

### Was passiert mit ungenutzten Beträgen?

Nicht verbrauchte Beträge werden angespart und können grundsätzlich bis zum **30. Juni des Folgejahres** genutzt werden. Wer also im zweiten Halbjahr 2026 nichts nutzt, kann das Geld noch bis Ende Juni 2027 einsetzen.

### So bekommst du das Geld

1. Anerkannten Anbieter beauftragen (deine Pflegekasse hat eine Liste)
2. Leistung in Anspruch nehmen
3. Rechnung sammeln
4. Bei der Pflegekasse einreichen
5. Erstattung in 2–4 Wochen

**Alternativ:** Einige Anbieter rechnen direkt mit der Pflegekasse ab – dann musst du nichts vorstrecken.

### Der häufigste Fehler

Viele Familien denken: "Wir schaffen das selbst, wir brauchen keine Hilfe." Der Entlastungsbetrag ist aber kein Zeichen von Schwäche – er ist ein finanzielles Recht. Und die Dienstleister die ihn abrechnen, können echte Erleichterung in den Alltag bringen.`,
  },
  {
    slug: "was-ist-pflegegrad-1",
    titel: "Was ist Pflegegrad 1? Ansprüche, Leistungen und was du jetzt tun solltest",
    beschreibung: "Pflegegrad 1 ist der Einstieg ins Pflegesystem – und bringt mehr Leistungen als die meisten wissen. Hier erfährst du alles, was du als Betroffener oder Angehöriger wissen musst.",
    kategorie: "Pflegegrad",
    lesezeit: "6 Min.",
    datum: "Juli 2026",
    typ: "news",
    affiliate: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=ratgeber_pg1_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F",
    inhalt: `## Was ist Pflegegrad 1?

Pflegegrad 1 bedeutet: Eine Person ist in ihrer Selbstständigkeit leicht beeinträchtigt. Der Medizinische Dienst (MD) hat bei der Begutachtung zwischen 12,5 und unter 27 Punkte vergeben.

Das klingt wenig – bringt aber konkrete finanzielle Leistungen, die viele komplett ungenutzt lassen.

## Welche Leistungen gibt es ab Pflegegrad 1?

### Hausnotruf – kostenlos
Die Pflegekasse zahlt bis zu 27 € pro Monat für einen Hausnotruf. Bei günstigen Anbietern entstehen keinerlei Kosten für dich. Ein Knopfdruck – und sofort ist jemand erreichbar.

### Pflegehilfsmittelbox – kostenlos
Bis zu 42 € pro Monat für Pflegeverbrauchsmittel: Einmalhandschuhe, Desinfektionsmittel, Mundschutz, Bettschutzeinlagen. Wird direkt vom Anbieter mit der Pflegekasse abgerechnet.

### Entlastungsbetrag – 131 € monatlich
Für Alltagsunterstützung durch anerkannte Dienste: Begleitung, Haushaltshilfe, Einkäufe. Nicht verbrauchte Beträge werden angespart und können grundsätzlich bis zum 30. Juni des Folgejahres genutzt werden.

### Wohnraumanpassung – bis 4.180 €
Zuschuss für barrierefreie Umbauten: Haltegriffe, Duschumbau, Türverbreiterungen. Antrag muss vor Baubeginn gestellt werden.

## Was gibt es bei Pflegegrad 1 nicht?

- Kein Pflegegeld (das gibt es erst ab Pflegegrad 2)
- Keine Pflegesachleistungen für ambulante Pflegedienste
- Kein Anspruch auf stationäre Kurzzeitpflege

## Wie wird Pflegegrad 1 festgestellt?

Der Medizinische Dienst bewertet sechs Bereiche:
1. Mobilität
2. Kognitive und kommunikative Fähigkeiten
3. Verhaltensweisen und psychische Problemlagen
4. Selbstversorgung
5. Umgang mit krankheitsbedingten Anforderungen
6. Gestaltung des Alltagslebens und soziale Kontakte

Für Pflegegrad 1 sind 12,5 bis unter 27 Punkte erforderlich.

## Was sollte ich jetzt als erstes tun?

Direkt zwei Leistungen beantragen – beide kosten dich nichts und gehen in wenigen Minuten:

**1. Hausnotruf beantragen:** Online beim Anbieter bestellen, der stellt den Antrag bei deiner Pflegekasse.

**2. Pflegebox bestellen:** Einmal anmelden, jeden Monat automatisch liefern lassen.

Beide Leistungen können rückwirkend nicht beantragt werden – je früher du anfängst, desto besser.`,
  },
  {
    slug: "pflegegrad-beantragen",
    titel: "Pflegegrad beantragen – Schritt für Schritt erklärt",
    beschreibung: "Wie du einen Pflegegrad beantragst, was beim Hausbesuch des MD wichtig ist und welche Fehler du vermeiden solltest. Mit konkreter Checkliste.",
    kategorie: "Pflegegrad",
    lesezeit: "7 Min.",
    datum: "Juli 2026",
    typ: "news",
    inhalt: `## Pflegegrad beantragen – so funktioniert es

Den Pflegegrad beantragst du bei der Pflegekasse der pflegebedürftigen Person. Die Pflegekasse ist immer an die Krankenkasse gekoppelt – wer also bei der AOK krankenversichert ist, wendet sich an die AOK-Pflegekasse.

## Schritt 1: Antrag stellen

Den Antrag kannst du:
- **Telefonisch** stellen (der Anruf reicht, um das Datum zu sichern)
- **Schriftlich** per Brief oder Fax
- **Online** über das Portal der jeweiligen Kasse

**Wichtig:** Das Antragsdatum ist entscheidend. Leistungen werden frühestens ab dem Monat der Antragstellung gewährt – also so früh wie möglich stellen, auch wenn noch nicht alles klar ist.

## Schritt 2: Begutachtung durch den MD

Innerhalb von 25 Arbeitstagen kommt ein Gutachter des Medizinischen Dienstes (MD) zu Besuch – meist zuhause, manchmal im Pflegeheim oder per Telefon.

### Was wird bewertet?

Der Gutachter schaut sich sechs Bereiche an:

| Bereich | Gewichtung |
|---|---|
| Selbstversorgung (Waschen, Essen, Ankleiden) | 40 % |
| Mobilität | 10 % |
| Kognition und Kommunikation | 15 % |
| Verhaltensweisen | 15 % |
| Krankheitsbedingte Anforderungen | 20 % |
| Alltagsgestaltung | – (fließt in andere Bereiche) |

### Tipps für den Begutachtungstermin

- **Pflegetagebuch führen** – mindestens zwei Wochen vor dem Termin. Was macht die Person alleine, wobei braucht sie Hilfe?
- **Schlechtesten Tag beschreiben** – nicht den guten Tag, sondern wie es an einem schwierigen Tag aussieht
- **Nichts übertreiben, aber auch nichts kleinreden** – ehrliche, konkrete Antworten
- **Angehörige dabei haben** – sie können ergänzen und korrigieren

## Schritt 3: Bescheid abwarten

Nach der Begutachtung bekommt die pflegebedürftige Person schriftlich Bescheid – in der Regel innerhalb von 5 Wochen nach Antragstellung.

## Was tun bei Ablehnung oder zu niedrigem Pflegegrad?

Innerhalb von **einem Monat** nach Bescheid kann Widerspruch eingelegt werden. Viele Widersprüche sind erfolgreich – vor allem wenn beim Erstkontakt Einschränkungen nicht klar kommuniziert wurden.

Kostenlose Unterstützung bieten:
- Pflegestützpunkte (bundesweit)
- Verbraucherzentralen
- Sozialverbände (VdK, SoVD)

## Nach dem Bescheid: Das Wichtigste zuerst

Sobald der Pflegegrad festgestellt ist, beantrage sofort:
- Hausnotruf (kostenlos ab PG 1)
- Pflegebox (kostenlos ab PG 1)
- Entlastungsbetrag (ab PG 1, 131 €/Monat)

Diese drei Leistungen verfallen nicht rückwirkend – aber ungenutzte Monate sind verloren.`,
  },
  {
    slug: "hausnotruf-kosten",
    titel: "Was kostet ein Hausnotruf wirklich? Alle Kosten im Überblick",
    beschreibung: "Hausnotruf-Kosten im Vergleich: Was zahlt die Pflegekasse, was bleibt als Eigenanteil? Und welche Anbieter sind wirklich kostenlos?",
    kategorie: "Hausnotruf",
    lesezeit: "5 Min.",
    datum: "Juli 2026",
    typ: "news",
    affiliate: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=ratgeber_kosten_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F",
    inhalt: `## Was kostet ein Hausnotruf?

Ein Hausnotruf-System kostet je nach Anbieter zwischen 20 und 45 € pro Monat. Die gute Nachricht: Ab Pflegegrad 1 übernimmt die Pflegekasse einen Zuschuss von bis zu **27 € pro Monat** gemäß § 40 Abs. 4 SGB XI.

Bei günstigen Anbietern bleibt damit kein Eigenanteil übrig – der Hausnotruf ist effektiv kostenlos.

## Was zahlt die Pflegekasse?

Die Pflegekasse zahlt bis zu 27 € monatlich für einen anerkannten Hausnotruf-Dienst. Voraussetzungen:
- Mindestens **Pflegegrad 1**
- Der Anbieter muss von der Pflegekasse anerkannt sein
- Du musst **alleine** leben oder für eine Zeit alleine sein

## Welche Kosten entstehen trotzdem?

| Kostenart | Betrag |
|---|---|
| Grundgebühr Anbieter | 18–45 € / Monat |
| Pflegekasse-Zuschuss | bis zu –27 € / Monat |
| Dein Eigenanteil | 0–18 € / Monat |
| Einrichtungsgebühr | 0–49 € (einmalig) |
| Sturzsensor / GPS | 5–15 € / Monat extra |

**Tipp:** Viele Anbieter verzichten auf die Einrichtungsgebühr, wenn du online bestellst.

## Günstigste Anbieter ohne Eigenanteil

Anbieter mit monatlichen Kosten unter 27 € bedeuten: du zahlst gar nichts. Dazu gehören:
- Anbieter mit Basispaket unter 27 €/Monat
- Direktabrechnung mit der Pflegekasse (kein Vorstrecken)
- Keine Mindestlaufzeit

## Einmaliger Kauf vs. monatliche Miete

Manche Anbieter verkaufen das Gerät einmalig – das klingt günstig, aber die Pflegekasse erstattet nur monatliche Mietmodelle. Beim Kauf bekommst du den Zuschuss nicht.

Immer das **Mietmodell** wählen, wenn du den Pflegekasse-Zuschuss nutzen willst.

## So beantragst du den Hausnotruf kostenlos

1. Anbieter online auswählen
2. Formular ausfüllen (5 Minuten)
3. Anbieter stellt den Antrag bei deiner Pflegekasse
4. Gerät kommt per Post – meist innerhalb von 3–5 Werktagen
5. Pflegekasse erstattet direkt an den Anbieter

Du musst nichts vorstrecken und keinen Papierkram erledigen.`,
  },
  {
    slug: "verhinderungspflege-kurzzeitpflege-2026",
    titel: "Verhinderungs- und Kurzzeitpflege 2026: Das neue gemeinsame Budget",
    beschreibung: "Seit Juli 2025 gibt es ein gemeinsames Budget für Verhinderungs- und Kurzzeitpflege: bis zu 3.539 € pro Jahr. Was das bedeutet und wie du es nutzt.",
    kategorie: "Pflegeleistungen",
    lesezeit: "6 Min.",
    datum: "Juli 2026",
    typ: "news",
    inhalt: `## Die große Änderung ab Juli 2025

Seit dem 1. Juli 2025 wurden Verhinderungspflege und Kurzzeitpflege zu einem **gemeinsamen Jahresbudget** zusammengefasst. Das Ergebnis: mehr Flexibilität und insgesamt mehr Geld.

**Das neue Budget:** Bis zu **3.539 € pro Jahr** – frei zwischen Verhinderungs- und Kurzzeitpflege aufgeteilt.

## Was ist Verhinderungspflege?

Verhinderungspflege springt ein, wenn die Hauptpflegeperson ausfällt – durch Urlaub, Krankheit oder andere Verpflichtungen. Eine Vertretung übernimmt die Pflege zuhause.

**Wer übernimmt?**
- Professionelle Pflegedienste
- Angehörige (mit Einschränkungen)
- Nachbarn, Bekannte (mit Einschränkungen)

## Was ist Kurzzeitpflege?

Kurzzeitpflege findet vorübergehend **stationär** statt – in einem Pflegeheim oder einer spezialisierten Einrichtung. Typische Situationen: nach einem Krankenhausaufenthalt, zur Entlastung der Familie.

## Voraussetzungen

- **Pflegegrad 2 bis 5**
- Mindestens 6 Monate häusliche Pflege durch eine Pflegeperson
- Antrag bei der Pflegekasse vor der ersten Inanspruchnahme

## So nutzt du das Budget

Das Budget von 3.539 € kannst du frei aufteilen:

| Nutzung | Beispiel |
|---|---|
| Nur Verhinderungspflege | 3.539 € für Vertretungspflege zuhause |
| Nur Kurzzeitpflege | 3.539 € für stationären Aufenthalt |
| Gemischt | 1.800 € Verhinderung + 1.739 € Kurzzeitpflege |

## Wann verfällt das Budget?

Das Budget gilt pro Kalenderjahr und verfällt zum 31. Dezember. Es gibt **keine** automatische Übertragung ins nächste Jahr.

**Wichtig:** Nicht genutzte Beträge sind verloren. Plane vorausschauend – auch wenn gerade keine akute Situation da ist.

## Praktischer Tipp

Viele Pflegende unterschätzen, wie schnell sie selbst an ihre Grenzen kommen. Das Budget ist da, um Pausen zu ermöglichen – nicht erst in der Notlage, sondern regelmäßig präventiv genutzt.

Sprich frühzeitig mit deiner Pflegekasse und halte gute Pflegedienste in deiner Region bereit.`,
  },
  {
    slug: "ambulante-pflege-kosten",
    titel: "Ambulante Pflege: Kosten, Finanzierung und was die Pflegekasse zahlt",
    beschreibung: "Was kostet ein ambulanter Pflegedienst? Welchen Anteil übernimmt die Pflegekasse? Und wie findest du den richtigen Anbieter in deiner Nähe?",
    kategorie: "Ambulante Pflege",
    lesezeit: "6 Min.",
    datum: "Juli 2026",
    typ: "news",
    inhalt: `## Was ist ambulante Pflege?

Ambulante Pflege bedeutet: Ein Pflegedienst kommt zu dir nach Hause und übernimmt Pflegeleistungen – von der Körperpflege bis zur Medikamentengabe. Du bleibst in deiner gewohnten Umgebung.

## Was kostet ein ambulanter Pflegedienst?

Die Kosten hängen von Pflegegrad, Leistungsumfang und Region ab. Als grobe Orientierung:

| Leistung | Stundensatz (ca.) |
|---|---|
| Grundpflege (Waschen, Anziehen) | 35–55 € / Stunde |
| Behandlungspflege (Medikamente, Verbände) | 30–50 € / Stunde |
| Hauswirtschaft | 25–40 € / Stunde |

**Monatlich** entstehen je nach Bedarf Kosten zwischen 300 und 2.500 €.

## Was zahlt die Pflegekasse?

Die Pflegekasse erstattet ambulante Pflege über **Pflegesachleistungen** – das sind feste Monatsbudgets je nach Pflegegrad:

| Pflegegrad | Pflegesachleistungen |
|---|---|
| PG 2 | bis 796 € / Monat |
| PG 3 | bis 1.497 € / Monat |
| PG 4 | bis 1.859 € / Monat |
| PG 5 | bis 2.299 € / Monat |

Der Pflegedienst rechnet direkt mit der Pflegekasse ab – du zahlst nur den Differenzbetrag.

## Kombinationsmöglichkeiten

Du kannst Pflegesachleistungen mit anderen Leistungen kombinieren:

- **Pflegegeld + Pflegesachleistungen** (anteilig, "Kombileistung")
- **Entlastungsbetrag** (131 €/Monat zusätzlich ab PG 1)
- **Verhinderungspflege** wenn der Dienst die Hauptpflegeperson vertritt

## Wie finde ich den richtigen Pflegedienst?

Worauf du achten solltest:
- MD-Bewertung des Dienstes (öffentlich einsehbar)
- Reaktionszeit bei Anfragen
- Welche Leistungen werden angeboten?
- Sind Fachkräfte ausreichend qualifiziert?
- Gibt es feste Bezugspflegekräfte?

Hol dir mindestens drei Angebote ein – die Preise variieren stark, auch bei gleicher Leistungsqualität.

## Nächster Schritt

Vergleiche Pflegedienste in deiner Region kostenlos und unverbindlich. Du bekommst passende Angebote direkt zu dir nach Hause.`,
  },
];

export function getBySlug(slug: string): ContentItem | undefined {
  return [...RATGEBER, ...NEWS].find((a) => a.slug === slug);
}
