# Google Sheets Verbindung einrichten (Deutsch)

## Schritt 1: Google Cloud Projekt erstellen
1. Gehe zur Google Cloud Console: https://console.cloud.google.com
2. Klicke oben links auf das Projekt-Dropdown (neben "Google Cloud")
3. Klicke auf "NEUES PROJEKT"
4. Projektname: Gib "Pushup Tracker" ein
5. Klicke auf "ERSTELLEN"
6. Warte, bis die Benachrichtigung erscheint, dass das Projekt erstellt wurde
7. Wähle das neue Projekt aus dem Projekt-Dropdown aus

## Schritt 2: Google Sheets API aktivieren
1. Gehe zur API-Bibliothek:
   - Klicke in der linken Seitenleiste auf "APIs & Dienste" → "Bibliothek"
   - Oder gehe zu: https://console.cloud.google.com/apis/library
2. Suche nach "Google Sheets API":
   - Gib "Google Sheets API" in die Suchleiste ein
   - Klicke auf "Google Sheets API" aus den Ergebnissen
3. Klicke auf den Button "AKTIVIEREN"
4. Warte, bis die API aktiviert ist

## Schritt 3: OAuth-Anmeldedaten erstellen
1. Gehe zu Anmeldedaten:
   - Klicke in der linken Seitenleiste auf "APIs & Dienste" → "Anmeldedaten"
   - Oder gehe zu: https://console.cloud.google.com/apis/credentials
2. Klicke auf "+ ANMELDEDATEN ERSTELLEN" (oben)
3. Wähle "OAuth-Client-ID" aus dem Dropdown-Menü
4. Falls eine Warnung erscheint, dass du zuerst den Zustimmungsbildschirm konfigurieren musst:
   - Klicke auf "ZUSTIMMUNGSBILDSCHIRM KONFIGURIEREN"
   - Fahre mit Schritt 4 fort
5. Falls keine Warnung erscheint:
   - Fahre mit Schritt 5 fort

## Schritt 4: OAuth-Zustimmungsbildschirm konfigurieren
1. Gehe zum OAuth-Zustimmungsbildschirm:
   - Klicke in der linken Seitenleiste auf "APIs & Dienste" → "OAuth-Zustimmungsbildschirm"
   - Oder gehe zu: https://console.cloud.google.com/apis/credentials/consent
2. Nutzertyp auswählen:
   - Du siehst zwei Optionen: "Intern" und "Extern"
   - Wähle "Extern" (damit kannst du es mit deinem persönlichen Google-Konto verwenden)
   - Klicke auf "ERSTELLEN"
3. App-Informationen ausfüllen:
   - **App-Name**: Gib "Pushup Tracker" ein
   - **Nutzer-Support-E-Mail**: Wähle deine E-Mail aus dem Dropdown-Menü
   - **App-Logo**: Überspringe dies (optional)
   - **App-Domain**: Überspringe alle drei Felder (optional)
   - **Autorisierte Domains**: Überspringe dies (optional)
   - **Kontaktinformationen des Entwicklers**: Gib deine E-Mail-Adresse ein
   - Klicke auf "SPEICHERN UND FORTFAHREN"
4. Bereiche-Seite:
   - Du siehst eine Seite über "Bereiche"
   - Klicke einfach auf "SPEICHERN UND FORTFAHREN" (füge hier keine Bereiche hinzu)
5. Testnutzer-Seite:
   - Klicke auf "+ NUTZER HINZUFÜGEN"
   - Gib deine E-Mail-Adresse ein (die du für die App verwenden wirst)
   - Klicke auf "HINZUFÜGEN"
   - Klicke auf "SPEICHERN UND FORTFAHREN"
6. Zusammenfassungs-Seite:
   - Überprüfe die Informationen
   - Klicke auf "ZURÜCK ZUM DASHBOARD"

## Schritt 5: OAuth-Client-ID erstellen
1. Gehe zurück zu Anmeldedaten:
   - Klicke in der linken Seitenleiste auf "APIs & Dienste" → "Anmeldedaten"
2. Klicke auf "+ ANMELDEDATEN ERSTELLEN" → "OAuth-Client-ID"
3. Anwendungstyp auswählen:
   - Wähle "Webanwendung" aus dem Dropdown-Menü
4. Client-ID-Details konfigurieren:
   - **Name**: Gib "Pushup Tracker Web Client" ein
   - **Autorisierte JavaScript-Quellen**:
     - Klicke auf "+ URI HINZUFÜGEN"
     - Gib für lokale Entwicklung ein: `http://localhost:8080`
     - Klicke erneut auf "+ URI HINZUFÜGEN"
     - Für die Live-Version (falls vorhanden): `https://deine-domain.com`
   - **Autorisierte Weiterleitungs-URIs**:
     - Klicke auf "+ URI HINZUFÜGEN"
     - Für lokale Entwicklung: `http://localhost:8080`
     - Klicke erneut auf "+ URI HINZUFÜGEN"
     - Für die Live-Version: `https://deine-domain.com`
5. Klicke auf "ERSTELLEN"
6. Ein Popup erscheint mit deiner Client-ID und deinem Client-Secret:
   - **WICHTIG**: Kopiere beide und speichere sie sicher
   - Du kannst sie später auch erneut abrufen

## Schritt 6: Anmeldedaten in deine App integrieren
1. Erstelle eine Konfigurationsdatei in deinem Projekt (falls noch nicht vorhanden)
2. Füge deine Client-ID hinzu:
   ```javascript
   const CLIENT_ID = 'deine-client-id-hier.apps.googleusercontent.com';
   ```
3. Aktualisiere die Berechtigungen (Scopes) bei Bedarf:
   ```javascript
   const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
   ```

## Schritt 7: Testen
1. Starte deine Anwendung
2. Versuche, dich mit Google anzumelden
3. Du solltest einen Google-Anmeldebildschirm sehen
4. Gewähre die erforderlichen Berechtigungen
5. Du solltest erfolgreich authentifiziert werden

## Fehlerbehebung

### "App nicht verifiziert" Warnung
- Das ist normal bei Apps im Testmodus
- Klicke auf "Erweitert" → "Zu [App-Name] gehen (unsicher)"
- Dies ist sicher für deine eigene App

### "Weiterleitungs-URI stimmt nicht überein"
- Stelle sicher, dass die URL in deinem Browser genau mit einem autorisierten URI übereinstimmt
- Überprüfe http vs. https
- Überprüfe Portnummern (z.B. :8080)
- Überprüfe nachgestellte Schrägstriche

### "Zugriff verweigert"
- Stelle sicher, dass deine E-Mail als Testnutzer hinzugefügt wurde
- Überprüfe, ob die Google Sheets API aktiviert ist

## Nützliche Links
- Google Cloud Console: https://console.cloud.google.com
- API-Bibliothek: https://console.cloud.google.com/apis/library
- Anmeldedaten: https://console.cloud.google.com/apis/credentials
- OAuth-Zustimmungsbildschirm: https://console.cloud.google.com/apis/credentials/consent

## Hinweise zur Sicherheit
- ⚠️ Teile niemals deine Client-ID oder dein Client-Secret öffentlich
- Speichere Anmeldedaten nicht im Quellcode (verwende Umgebungsvariablen)
- Für Produktionsumgebungen solltest du eine Verifizierung deiner App in Betracht ziehen
