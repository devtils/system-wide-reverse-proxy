# Example: PHP + MySQL + Adminer

This is a **Getting Started template** for a dockerized PHP app using MySQL database and Adminer database managing tool.

## Setup

Add contents of `.hosts` file to your OS-specific hosts file (`/etc/hosts` or `C:\Windows\system32\drivers\etc\hosts`)
> You need root/admin permissions to edit this file!

Then open a terminal inside of this folder and run:
```bash
docker-compose up
```

Wait for it to start up (until the terminal isnt spammed with log entries anymore)...  

You can now access

- http://php-mysql-adminer.example.traefik.local/ or
- http://www.php-mysql-adminer.example.traefik.local/

to see a list of fruits loaded via ajax and `phpinfo();`.

You can also access

- http://db.php-mysql-adminer.example.traefik.local/ or
- http://www.db.php-mysql-adminer.example.traefik.local/

to see adminer to manage the database.
