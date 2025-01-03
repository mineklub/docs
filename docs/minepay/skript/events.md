---
title: Events 
description: Events på minepay skript plugin
---

# Events
## Butik
Disse events anvendes, når du har udviklet et produkt og sendt en forespørgsel til en person for at høre, om vedkommende ønsker at købe det.
### Events
* [mineclub] store request accept – Udløses, når en person accepterer købet.
* [mineclub] store request cancel – Udløses, når en person afviser købet.
* [mineclub] store request accept online – Udløses, når en person logger på efter at have accepteret købet.
* [mineclub] store request cancel online – Udløses, når en person logger på efter at have afvist købet.
### Placeholders
Du kan bruge følgende placeholders i dit Skript til at arbejde med MinePay:
* %event-player% - Den spiller der køber på din server. (Bruges til online event)
* %event-offlineplayer% - Den spiller der køber på din server. (Bruges til offline event)
* %id of event-request% - Det unikke ID for købsforespørgslen.
* %price of event-request% - Den samlede pris for alle produkter i forespørgslen.
* %serverstatus of event-request% - Serverens status angiver, hvor købsforespørgslen befinder sig i processen. Som standard starter den i pending. Hvis du bruger accept request event-request, skifter status til accepted, og hvis du bruger cancel request event-request, ændres status til cancelled.
* %status of event-request% - Starter som pending, og hvis spilleren accepterer købet, skifter den til accepted. Hvis spilleren annullerer købet, ændres den til cancelled.
* %products of event-request% - En liste over produkterne i købsforespørgslen.
* %title of loop-product% - Navnet på produktet, som spilleren ser i butikken.
* %id of loop-product% - Er et ID, som du selv kan definere. For eksempel, hvis en spiller køber 100 coins, kan du navngive det coins-100 for nemt at identificere det i eventet.
* %price of loop-product% - Prisen på produktet.
* %quantity of loop-product% - Antallet af produktet.
* %metadata-keys of loop-product% - Metadata Keys bruges til at opbevare visse oplysninger om produktet.
* %metadata-value "key" of loop-product% - Så du kan tjekke, hvilken værdi du har tilknyttet den specifikke key.

## Vote
Disse events anvendes, når en person voter på din server.
### Events
* [mineclub] vote - Er når en person voter på din server.
* [mineclub] vote online - Er når en person kommer online på din server efter at have votet på din server.
### Placeholders
Du kan bruge følgende placeholders i dit Skript til at arbejde med MinePay:
* %event-player% - Den spiller der voter på din server. (Bruges til online event)
* %event-offlineplayer% - Den spiller der voter på din server. (Bruges til offline event)
* %id of event-vote% - Det unikke ID for voten.