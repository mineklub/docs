---
title: Expressions 
description: Expressions på minepay skript plugin
---

# Expressions
Expressions anvendes, når du vil hente data fra en købsforespørgsel eller en vote.
## Butik
* %requests with status %strings%[ and severstatus %strings%] - Returnerer en liste over købsforespørgsler med en bestemt status. Du kan også filtrere på serverstatus.
* %id of request% - Returnerer det unikke ID for købsforespørgslen.
* %price of request% - Returnerer den samlede pris for alle produkter i forespørgslen.
* %serverstatus of request% - Returnerer serverens status, som angiver, hvor købsforespørgslen befinder sig i processen. Som standard starter den i pending. Hvis du bruger accept request, skifter status til accepted, og hvis du bruger cancel request, ændres status til cancelled.
* %status of request% - Returnerer status for købsforespørgslen. Starter som pending, og hvis spilleren accepterer købet, skifter den til accepted. Hvis spilleren annullerer købet, ændres den til cancelled.
* %new product% - Returnerer et nyt produkt, som du kan bruge til at oprette et nyt produkt.
* %products of request% - Returnerer en liste over produkterne i købsforespørgslen.
* %title of product% - Returnerer navnet på produktet, som spilleren ser i butikken.
* %id of product% - Returnerer et ID, som du selv kan definere. For eksempel, hvis en spiller køber 100 coins, kan du navngive det coins-100 for nemt at identificere det i eventet.
* %price of product% - Returnerer prisen på produktet.
* %quantity of product% - Returnerer antallet af produktet.
* %metadata-keys of product% - Returnerer metadata keys, som bruges til at opbevare visse oplysninger om produktet.
* %metadata-value "key" of product% - Returnerer værdien for den specifikke key.

## Vote
* %id of vote% - Returnerer det unikke ID for voten.
* %status of vote% - Returnerer status for voten. Starter som pending, og hvis serveren accepterer voten, skifter den til accepted.
