# ── Stage 1: Astro ビルド ──────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# ── Stage 2: php:8.1-apache で配信 ────────────────
FROM php:8.1-apache

ENV PORT=8080
EXPOSE 8080

# ポート設定（ports.conf + 000-default.conf 両方）
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf \
 && sed -i "s/:80>/:8080>/" /etc/apache2/sites-enabled/000-default.conf \
 && echo "ServerName localhost" >> /etc/apache2/apache2.conf

# mod_rewrite 有効化 + AllowOverride
RUN a2enmod rewrite \
 && sed -i "s/AllowOverride None/AllowOverride All/g" /etc/apache2/apache2.conf

# /var/www/html アクセス許可
RUN printf '<Directory /var/www/html>\n  Options FollowSymLinks\n  AllowOverride All\n  Require all granted\n</Directory>\n' \
    >> /etc/apache2/apache2.conf

# Astro ビルド成果物のみコピー（Dockerfile等は含まない）
COPY --from=builder /app/dist /var/www/html

RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 755 /var/www/html
