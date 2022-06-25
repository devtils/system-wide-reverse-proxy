# Example: Vue

This is a **Getting Started template** for a dockerized Vue single page application (SPA).

The vue code was generated using `npm create vue@latest`.

There are only two things that were changed:
- the `docker-compose.yml` was added (notice the 2 traefik router configs and the `extra_hosts` entry)
- the `vite.config.ts` was modified. Specifically, the following code was added:
    ```diff
    +const hosts = require('fs').readFileSync(__dirname + '/../.hosts', 'utf-8').split(/\s/).filter(Boolean).slice(1)
     
     // https://vitejs.dev/config/
     export default defineConfig({
       plugins: [vue()],
       resolve: {
         alias: {
           '@': fileURLToPath(new URL('./src', import.meta.url))
         }
       },
    +  server: {
    +    host: '0.0.0.0', // listen on all interfaces instead of only localhost (required when running in docker)
    +    port: 80, // port to listen on to serve SPA
    +    strictPort: true, // dont try ports => fail if port is already in use
    +    hmr: {
    +      path: 'ws', // public HMR websocket path
    +      clientPort: 80, // public HMR websocket port
    +      host: hosts[0], // public HMR websocket host
    +      port: 8080, // port to actually listen on
    +    },
    +  },
     })
    ```

## Setup

Add contents of `.hosts` file to your OS-specific hosts file (`/etc/hosts` or `C:\Windows\system32\drivers\etc\hosts`)
> You need root/admin permissions to edit this file!

Then open a terminal inside of this folder and run:
```bash
docker-compose up
```

Wait for it to start up (until the terminal isnt spammed with log entries anymore)...  

You can now access

- http://vue.example.traefik.local/ or
- http://www.vue.example.traefik.local/

to see the Vue SPA frontend.

