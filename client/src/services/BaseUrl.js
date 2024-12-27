const protocol = window.location.protocol
export const baseUrl = protocol === 'http:' ?
    "http://api.abakarov.store" :
    "https://api.abakarov.store"
