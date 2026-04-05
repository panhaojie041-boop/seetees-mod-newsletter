# Workflow automazione ore 12:00

## Obiettivo
Pubblicare ogni giorno una news moda breve in italiano su SeeteeS MOD Newsletter.

## Fonti pubbliche affidabili iniziali
- Vogue Business
- Business of Fashion
- WWD
- FashionUnited
- Harper's Bazaar
- ELLE

## Formato obbligatorio del post
- Titolo
- Data
- Lead breve
- 3 punti chiave
- Paragrafo `Perché conta`
- 2 fonti citate

## Regole editoriali
- Niente copia integrale delle fonti.
- Contenuto breve, originale e leggibile.
- Selezionare una sola notizia principale del giorno.
- Se le fonti non sono abbastanza solide o attuali, meglio non pubblicare contenuto debole.

## Passi operativi giornalieri
1. Cercare 3-5 fonti moda del giorno.
2. Scegliere la notizia più rilevante.
3. Scrivere titolo, lead, 3 punti, spiegazione breve e fonti.
4. Generare il file HTML del post usando `template-post.html`.
5. Aggiornare `index.html`, `archive.html` e `posts.json` con la nuova notizia in cima.
6. Pubblicare il contenuto sul repository GitHub Pages.

## Prompt operativo sintetico per l'agente
Ogni giorno alle 12:00 Europe/Rome cerca le notizie moda pubbliche più rilevanti della giornata. Usa solo fonti affidabili. Scegli una sola notizia forte, scrivi un post originale in italiano con formato breve, aggiorna i file del sito `seetees-mod-newsletter` e pubblica il risultato su GitHub Pages. Se non trovi notizie solide, non inventare: crea un aggiornamento prudente oppure salta la pubblicazione.
