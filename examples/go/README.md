# Example: Go

This is a **Getting Started template** for a dockerized Go app.

## Setup

Add contents of `.hosts` file to your OS-specific hosts file (`/etc/hosts` or `C:\Windows\system32\drivers\etc\hosts`)
> You need root/admin permissions to edit this file!

Then open a terminal inside of this folder and run:
```bash
docker-compose up
```

Wait for it to start up (until the terminal isnt spammed with log entries anymore)...

You can now access

- http://go.example.traefik.local/ or
- http://www.go.example.traefik.local/

to see a list of fruits fetched via ajax.
