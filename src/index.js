import Discord from 'discord.js';
import 'dotenv/config';
import yargs from 'yargs';
import config from './config/config.js';
import Bot from './Bot.js';

// create bot
const client = new Bot({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});

// parse arguments
const args = yargs(process.argv.slice(2))
    .options({
        d: {
            alias: 'debug',
            describe: 'Enable debug mode',
            type: 'boolean',
        },
        v: {
            alias: 'verbose',
            describe: 'Enable verbose output',
            type: 'boolean',
        },
        r: {
            alias: 'register',
            describe: 'Registers application (slash and context menu) commands',
            type: 'boolean',
        },
        c: {
            alias: 'clean',
            describe: 'Unregisters application (slash and context menu) commands',
            type: 'boolean',
        },
        g: {
            alias: 'guild',
            describe: '-r and -c default to global, give the id of a guild to do perform -r and -c in a guild',
            type: 'string',
        },
    }).argv;
const {
    debug,
    verbose,
    register,
    clean,
    guild,
} = args;

config.debug = debug;
config.verbose = verbose;

const options = {
    clean,
    doRegisterSlashCommands: register,
    guildId: guild,
};

// start the bot
client.start(config.token, options);
