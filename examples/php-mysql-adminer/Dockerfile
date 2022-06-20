FROM php:8-cli
WORKDIR /usr/src/app

# install and configure php extensions pdo and pdo_mysql
RUN docker-php-ext-install pdo pdo_mysql

# set php env
RUN cp $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/conf.d/php.ini

COPY index.php .

EXPOSE 80
ENTRYPOINT [ "php", "-S", "0.0.0.0:80", "-t", "."]
CMD ["index.php"]
