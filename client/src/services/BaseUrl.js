const protocol = window.location.protocol
export const baseUrl = protocol === 'http:' ?
    "http://api.abakarov" :
    "https://api.abakarov.store"
