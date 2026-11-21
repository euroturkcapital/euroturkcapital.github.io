const C='etc-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 if(r.url.includes('/img/')||r.url.includes('/bg/')||r.url.includes('/icons/')){e.respondWith(caches.open(C).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{c.put(r,n.clone());return n}))));return}
 e.respondWith(fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n}).catch(()=>caches.match(r)));});
