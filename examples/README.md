# Traefik project examples

Each of the directories here is an example project. (Development environents only)

Each example project has its own README with (optional) setup instructions.

The basic requirement for all examples is, of course, getting `traefik` to run first.

***Note**: By default, all variables are set to `example`. (like usernames and passwords)*

## List of examples

The examples are more or less built on top each other. If you want to be able to follow them well, read them in order.

1. [`PHP`](./php/)
1. [`PHP MySQL Adminer`](./php-mysql-adminer/)
1. [`Go`](./go/)
1. [`Go MySQL Adminer`](./go-mysql-adminer/)
1. [`Vue`](./vue/)
1. [`Vue Go`](./vue-go/)

After you followed and tried out those examples, you should be able to setup any other frontend framework (`react`, `angular`) and also backend languages (`nodejs`, `express`, even `C/C++`, `C#` and `Java`)

You can choose to either setup specific examples by following the instructions inside their READMEs or setup all of them at once in the next section.

### Setup *all* examples

First and only once, we have to make all their custom hosts (`example/.hosts`-file) known to our system, by adding them to our `/etc/hosts` file.

I've written a small shell script (`add-hosts.sh`) which helps doing this for each example:

```bash
./add-all-hosts.sh
```

Setup all examples with their default settings using the following instructions:

```bash
find -type d -exec sh -c 'cd {}; docker-compose up -d' \;
```

***Note**: By default, all variables are set to `example`. (like usernames and passwords)*
