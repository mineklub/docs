```skript
on store request accept:
    loop products of event-request:
        loop metadata-keys of loop-product:
            broadcast "&6[Butik] &f%event-offlineplayer% &7har lige købt ranket &b%title of loop-product% &7for &e⛃%price of loop-product%"
    accept request event-request
    
on store request cancel:
    accept request event-request


command /buyvip:
    trigger:
        set {_product} to new product
        set title of {_product} to "VIP"
        set id of {_product} to "VIP"
        set price of {_product} to 100.00
        set quantity of {_product} to 1
        set metadata-value "DATA" of {_product} to "whatever"
        send request {_product} to player
```