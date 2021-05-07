console.log('Service worker loaded')
let cacheData ="hermesV2"
this.addEventListener('push', (e)=>{
    const data = e.data.json();
    console.log('Push has been received')
    this.registration.showNotification(data.title, {
        body: 'Notification From HERMES',
 });
});

this.addEventListener('install', (event)=>{
    event.waitUntil(caches.open(cacheData).then((cache)=>{
        cache.addAll(['/static/js/bundle.js'])
    }))
})