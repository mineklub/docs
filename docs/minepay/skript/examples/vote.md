---
title: Vote
description: Eksempler på brug af MinePay Vote System.
---

```skript
on mineclub vote:
    # Når en person voter på din server, behøves ikke at være online.

on mineclub vote online:
	# Når en person voter på din server, skal være online
	broadcast "&d[Vote] &f%event-offlineplayer% &7har givet en vote til serveren! &c❤"
	give 1 purple dye named "&dTak for din vote! &c❤" to player
	accept vote event-vote
```
