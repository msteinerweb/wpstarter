const childProcess = require('child_process');
const http = require('http');
const binVersionCheck = require('bin-version-check');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


/**
 * Enum for the different statuses the server can be in
 * @readonly
 * @enum {symbol}
 */
const Status = {
    NEW: Symbol('NEW'),
    STARTING: Symbol('STARTING'),
    STARTED: Symbol('STARTED'),
    FINISHED: Symbol('FINISHED'),
};


/**
 * Class representing a PHP Development Server Connection
 */
class PhpDevelopmentServerConnection {

    constructor(opts = {}) {
        this.status = Status.NEW;
        this.checkServerTries = 0;
        this.workingPort = 8000;

        // default options
        this.defaults = {
            port: 8000,
            hostname: '127.0.0.1',
            base: '.',
            bin: 'php',
            root: '/',
            stdio: 'inherit',
            configCallback: null,
            debug: false,
            logErrorsOnly: false,
            ini: null,
            ...opts,
        };
    }

    /**
     * Get the port the server is running on
     * @return {number} The port number
     */
    get port() { return this.workingPort; }


    /**
     * Check if the server is running
     * @param {string} hostname - The hostname of the server
     * @param {number} port - The port number of the server
     * @param {function} cb - Callback function to run when the check is complete
     */
    checkServer(hostname, port, cb) {
        if (this.status !== Status.STARTING) return;

        setTimeout(() => {
            http.request({
                method: 'HEAD',
                hostname,
                port,
            }, res => {
                const statusCodeType = Number(res.statusCode.toString()[0]);

                if ([2, 3, 4].includes(statusCodeType) || statusCodeType === 5) {
                    cb(true);
                } else {
                    this.checkServer(hostname, port, cb);
                }
            }).on('error', () => {
                if (++this.checkServerTries > 20) {
                    console.log(chalk.red('PHP server not started. Retrying...'));
                    cb(false);
                } else {
                    this.checkServer(hostname, port, cb);
                }
            }).end();
        }, 15);
    }

    /**
     * Shutdown the PHP Development Server
     * @param {function} cb - Callback function to run when the server has shut down
     */
    closeServer(cb = () => { }) {
        if (this.loading) {
            setTimeout(() => this.closeServer(cb), 5);
            return;
        }

        if (this.childProcess) {
            cb(this.childProcess.kill('SIGKILL'));
            this.status = Status.FINISHED;
            return;
        }

        cb();
    }

    /**
     * Starts the PHP Development Server
     *
     * @param {Object} [options={}] - Configuration options for the server.
     * @param {Function} [cb=()=>{}] - Callback function to execute after starting the server.
     */
    server(cb = () => { }) {
        // Check the current server status. The server should be either new or finished to start a new one.
        if (this.status !== Status.NEW && this.status !== Status.FINISHED) {
            return cb(new Error('You may not start a server that is starting or started.'));
        }

        // Merge default options with user-provided options.
        const options = { ...this.defaults };

        // Assign the port from options to the instance's workingPort.
        this.workingPort = options.port;

        // Construct the host string using the hostname and port.
        const host = options.hostname + ':' + options.port;

        // Prepare the command line arguments for the PHP server command.
        const args = ['-S', host, '-t', options.base];

        // If an .ini file is provided in options, include it in the server arguments.
        if (options.ini) {
            args.push('-c', options.ini);
        }

        // If a router script is provided in options, resolve its path and include it in the server arguments.
        if (options.router) {
            args.push(path.resolve(options.router));
        }

        // Check the PHP binary version.
        binVersionCheck(`"${options.bin}"`, '>=5.4', err => {
            // If the PHP version is not satisfactory, return an error to the callback.
            if (err) {
                cb(err);
                return;
            }

            // Function to check the existence of the base directory path.
            const checkPath = () => {
                // If the base directory exists, start the PHP server.
                if (fs.existsSync(options.base)) {
                    this.status = Status.STARTING;
                    this.childProcess = childProcess.spawn(options.bin, args, {
                        cwd: '.',
                        stdio: 'pipe', // Change stdio to 'pipe' to manually handle stdout
                    });

                    // Handle server output from stderr.
                    this.childProcess.stderr.on('data', data => {
                        let str = data.toString().trim();

                        if (!str) return;

                        // Filter out non-error messages, if the logErrorsOnly option is set.
                        if (options.logErrorsOnly) {
                            str = str.split('\n').filter(line =>
                                !(line.match(/\[200\]:/)
                                    || line.endsWith('Closing')
                                    || line.endsWith('Accepted')
                                    || line.endsWith('/favicon.ico - No such file or directory'))
                            ).join('\n');
                        }

                        if (!str) return;

                        // Format and log error messages.
                        const formattedDateTime = this.formatTimestamp(str);
                        this.checkAndFormatError(str, formattedDateTime);
                    });

                } else {
                    // If the base directory does not exist, retry after 100ms.
                    setTimeout(checkPath, 100);
                }
            };

            // Start checking the base directory path.
            checkPath();

            // Check if the server is running after starting it.
            this.checkServer(options.hostname, options.port, () => {
                // Once the server is running, change the status to 'STARTED'.
                this.status = Status.STARTED;

                // Execute the PHP version command.
                childProcess.exec(`${options.bin} -v`, (err, stdout) => {
                    if (!err) {

                        // Extract the PHP version from the command output.
                        const phpVersion = stdout.split('\n')[0];

                        // Log the PHP version.
                        /* eslint-disable space-in-parens */
                        console.log(chalk.gray(` ${'='.repeat(70)}` ));
                        console.log(`   PHP Build: ${chalk.green(phpVersion)}`);
                        console.log(`  Custom INI: ${options.ini ? chalk.green('Yes') : chalk.red('No')}`);
                        console.log(`  Server URL: ${chalk.green(options.hostname + ':' + options.port)}`);
                        console.log(`    Root Dir: ${chalk.green(options.base)}`);
                        if (options.router) {
                            console.log(`  Router Script: ${chalk.green(options.router)}`);
                        }
                        console.log(`  Server Start Time: ${chalk.green(new Date().toLocaleTimeString())}`);
                        console.log(chalk.gray(` ${'='.repeat(70)}` ));
                        /* eslint-enable space-in-parens */

                    }
                });

                cb();
            });
        });
    }


    /**
     * Format the timestamp in the server output
     * @param {string} str - The string containing the timestamp
     * @return {string} The formatted timestamp
     */
    formatTimestamp(str) {
        const timestampPattern = /^\[\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} \d{4}\]/;
        let formattedDateTime = '';

        if (str.match(timestampPattern)) {
            const rawDateTime = str.split(']')[0].replace('[', '');
            const [_day, _month, _date, time, _year] = rawDateTime.split(' ');
            const [hours, minutes, seconds] = time.split(':');
            formattedDateTime = `${hours}:${minutes}:${seconds}`;
        }

        return formattedDateTime;
    }

    /**
     * Check for and format errors in the server output
     * @param {string} str - The string containing the server output
     * @param {string} formattedDateTime - The formatted timestamp
     */
    checkAndFormatError(str, formattedDateTime) {
        const errorPrefixes = [
            'PHP Fatal error:',
            'PHP Warning:',
            'PHP Notice:',
            'PHP Deprecated:',
            'PHP Parse error:',
        ];

        for (let prefix of errorPrefixes) {
            if (!str.includes(prefix)) continue;

            const errorMessage = str.split(`${prefix} `)[1];
            let details = prefix;

            const formattedStr = `[${chalk.gray(formattedDateTime)}] ${details}\n${chalk.red(errorMessage)}`;

            console.log(formattedStr);
            break;
        }
    }
}

module.exports = PhpDevelopmentServerConnection;
