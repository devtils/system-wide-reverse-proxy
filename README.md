# System-wide reverse-proxy

***TL:DR**: We're using `traefik`*

You're probably familiar with `apache` and/or `nginx` and how they're usually used and work:  
Generally speaking, as loadbalancers by routing requests with certain domains, ports, paths, query parameters and even headers to specific resources and services.

But, as convenient as they are, both `apache` and `nginx` have some down-sides when using with docker and in our approach of a closely scoped multi-project multi-environment setup:

- They must listen on port `80` and `443` exclusively.  
    In other words, you can only use one of them as the machines sole entrypoint for incoming web requests.
- You need to add/modify `apache`s/`nginx`s configuration files in order to add/change projects and environments routing config.
- After modifying configuration files, you have to reload the running services for them to reapply the configuration files.  
    Thats fine, but sometimes you need to restart the services. => downtimes
- They're not tightly integrated into our infrastructur (docker) and for the reasons above, dont really fit our requirements.

So, what we really want, is

- the same ability to route certain requests to specific resources and services,
- while keeping the routing config inside of our projects- or even project environments scope,
- and to be tightly integrated into our infrastructur (docker)
- some nice-to-have features which would make programmers daily-life easier:
    - automatically generate SSL certificates for each of our projects (or projects environments) seperately  
    For example, using letsencrypt

For that reason I've decided to use `traefik`, as it meets all criterias above, sometimes in a very satisfying way. :)

## Introduction of Traefik

*(disclaimer: extremely simplified)*

https://traefik.com/

- `traefik` is a loadbalancer similar to `apache` and `nginx` used to route certain requests to specific resources and services  
    (For example: `http://db.example.local` => `http://adminer-container:8080`)
- it requires port `:80` and/or `:443` exclusively
- it lets you keep your routing config inside of your projects:
    you configure your "routes" inside your docker containers configuration using docker `labels`
- does not require a reload/restart after addition/deletion of a project or modifications of configuration
- to be more specific, it does not *require* configuration **files** at all ;)
- as you can see, it works really well with docker
- it has built-in support for automatically generated SSL certificates using letsencrypt and it only takes a few lines to setup <3  
    Letsencrypt automatically creates valid SSL certificates ("green lock" in browser) for free and keeps them up-to-date, basically forever, as long as `traefik` and your projects containers are running.  
    **Never ever serve a website insecurely under `http://` again!**

## Before getting started (!!)

There are 3 mandatory thing required to be done before we should even consider getting started:  

- Disable/stop `apache` or `nginx` (or anything else blocking port `80` or `443`) if it currently runs on your system
- Install [docker](https://www.docker.com/get-started/)
- Install [git](https://git-scm.com/downloads)  
    For windows users, I recommend to install `git-bash` and activate context menu integration during installation, if you dont already have a more sophisticated terminal than `cmd.exe`.  
    You can open a `git-bash` terminal inside any folder using context menu.

## Getting started

We will now setup `traefik` step-by-step as our system-wide reverse-proxy.  
***Note**: This requires you to stop your running `apache` or `nginx` services.*

We will then setup an example project step-by-step. In this example we will route domain and path combinations to different containers.

In "hosted" environments like *production* or *staging*, we will use and configure the **SSL certificates via letsencrypt** feature.  
In local environments like *development* or *testing*, we will stay with insecure http for now and **don't** use a self-signed SSL certificate. You may take it as a challenge and try it out yourself. :)

### Setup traefik

Open a terminal inside your workspace and enter:
```bash
curl -s https://raw.githubusercontent.com/devtils/system-wide-reverse-proxy/master/setup.sh | bash
```
This will setup traefik for you 

CD into the newly created directory (`system-wide-reverse-proxy` by default) and execute:
```bash
docker-compose up -d
```

`traefik` will now start and continue to run in the background. You can access its logs via
```bash
docker-compose logs # or
docker-compose logs -f # keeps listening for more logs
```

And this is how you stop `traefik`
```bash
docker-compose down
```

### Setup example

Please have a look at our [examples](./examples/README.md).
