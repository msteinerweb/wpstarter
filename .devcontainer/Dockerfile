FROM mcr.microsoft.com/vscode/devcontainers/php:8.1

# Install system dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get upgrade -y \
    && apt-get install -y git libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
    locales zip unzip curl libicu-dev libonig-dev libzip-dev gnupg2 default-mysql-client \
    libmagickwand-dev libicu-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo_mysql zip exif pcntl gd
RUN pecl install imagick && docker-php-ext-enable imagick

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js 18
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Verify Node.js and NPM versions
RUN node --version
RUN npm --version

# # Install MailHog
# RUN wget --quiet -O /usr/local/bin/mailhog https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64 \
#     && chmod +x /usr/local/bin/mailhog

# # Configure to start MailHog on boot
# RUN echo '@reboot root /usr/local/bin/mailhog' | tee -a /etc/crontab

# Greeting script
RUN echo '  echo -e "\033[32m🚀 Welcome to your WPStarter dev container! Here are some instructions to get started...\033[0m"' >> /home/vscode/.bashrc \
    && echo '  echo ""' >> /home/vscode/.bashrc \
    && echo '  echo -e "\033[34mInstructions:\033[0m"' >> /home/vscode/.bashrc \
    && echo '  echo " - Update config.js with your own settings."' >> /home/vscode/.bashrc \
    && echo '  echo ""' >> /home/vscode/.bashrc \
    && echo '  echo -e "\033[34mCommands:\033[0m"' >> /home/vscode/.bashrc \
    && echo '  echo -e "\033[31mnpm run wpinstall\033[0m - Install WordPress."' >> /home/vscode/.bashrc \
    && echo '  echo -e "\033[31mnpm run dev\033[0m - Begin developing with live server."' >> /home/vscode/.bashrc \
    && echo '  echo -e "\033[31mnpm run build\033[0m - Build and export your wordpress theme."' >> /home/vscode/.bashrc \
    && echo '  echo -e "\033[31mnpm run wpbackup\033[0m - Make a backup of your current wp-content directory and the database."' >> /home/vscode/.bashrc \
    && echo '  echo -e "\033[31mnpm run wprestore\033[0m - Restore wp-content directory and database."' >> /home/vscode/.bashrc \
    && echo '  echo ""' >> /home/vscode/.bashrc \
    && echo '  echo "--------------------"' >> /home/vscode/.bashrc \
    && echo '  echo ""' >> /home/vscode/.bashrc


WORKDIR /var/www/html
