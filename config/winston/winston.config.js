import { createLogger, transports, format } from 'winston';

const logger = createLogger({
	format: format.combine(
		format.simple(),
		format.timestamp({ format: 'dddd DD/MM/YY HH:mm:ss' }),
		format.printf(
			(info) =>
				`${info.timestamp} ${info.level}: ${info.message}` +
				(info.splat !== undefined ? `${info.splat}` : ' ')
		)
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.timestamp({ format: 'YY-MM-DD HH:mm:SS' }),
				format.colorize(),
				format.simple(),
				format.label({ label: '[LOGGER]' }),
				format.printf(
					(info) =>
						`${info.label} ${info.timestamp} ${info.level}: ${info.message}` +
						(info.splat !== undefined ? `${info.splat}` : ' ')
				)
			),
			level: 'debug',
		}),
		new transports.File({
			filename: 'error.log',
			level: 'error',
			dirname: 'logs',
			zippedArchive: true,
		}),
		new transports.File({
			filename: 'combined.log',
			level: 'debug',
			dirname: 'logs',
			zippedArchive: true,
		}),
	],
});

const logLogger = (
	message,
	nomComposant = '',
	fichier = '',
	route = '',
	httpMethode = ''
) => {
	logger.log({
		level: 'info',
		message: `${fichier !== '' ? `[${fichier}] ` : ''}${
			httpMethode !== '' ? `[${httpMethode}] ` : ''
		}${route !== '' ? `[${route}] ` : ''}${
			nomComposant !== '' ? `[${nomComposant}] ` : ''
		}: ${message}`,
	});
};

const errorLogger = (
	message,
	nomComposant,
	fichier = '',
	route = '',
	httpMethode = ''
) => {
	logger.log({
		level: 'error',
		message: `${fichier !== '' ? `[${fichier}] ` : ''}${
			httpMethode !== '' ? `[${httpMethode}] ` : ''
		}${route !== '' ? `[${route}] ` : ''}${
			nomComposant !== '' ? `[${nomComposant}] ` : ''
		}: ${message}`,
	});
};

const warnLogger = (
	message,
	nomComposant,
	fichier = '',
	route = '',
	httpMethode = ''
) => {
	logger.log({
		level: 'warn',
		message: `${fichier !== '' ? `[${fichier}] ` : ''}${
			httpMethode !== '' ? `[${httpMethode}] ` : ''
		}${route !== '' ? `[${route}] ` : ''}${
			nomComposant !== '' ? `[${nomComposant}] ` : ''
		}: ${message}`,
	});
};

const verboseLogger = (
	message,
	nomComposant,
	fichier = '',
	route = '',
	httpMethode = ''
) => {
	logger.log({
		level: 'verbose',
		message: `${fichier !== '' ? `[${fichier}] ` : ''}${
			httpMethode !== '' ? `[${httpMethode}] ` : ''
		}${route !== '' ? `[${route}] ` : ''}${
			nomComposant !== '' ? `[${nomComposant}] ` : ''
		}: ${message}`,
	});
};

export { logLogger, errorLogger, warnLogger, verboseLogger };
