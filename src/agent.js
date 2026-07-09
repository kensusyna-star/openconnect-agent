// ============================================
// OPENCONNECT AGENT - Open Source RMM Agent
// Licensed under MIT License
// https://github.com/kensusyna-star/openconnect-agent
// ============================================

const WebSocket = require('ws');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    serverUrl: process.env.SERVER_URL || 'wss://localhost:8443/ws',
    sessionId: process.env.SESSION_ID || 'default-session',
    reconnectInterval: 5000,
    maxReconnectAttempts: 10,
    heartbeatInterval: 30000,
    logLevel: process.env.LOG_LEVEL || 'info'
};

// ============================================
// LOGGING
// ============================================

class Logger {
    constructor() {
        this.logDir = path.join(os.homedir(), 'AppData', 'Local', 'OpenConnect', 'logs');
        this.ensureLogDirectory();
    }

    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    log(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} [${level}] ${message}\n`;
        
        console.log(logMessage.trim());
        
        const logFile = path.join(this.logDir, 'agent.log');
        fs.appendFileSync(logFile, logMessage);
    }

    info(message) { this.log('INFO', message); }
    warn(message) { this.log('WARN', message); }
    error(message) { this.log('ERROR', message); }
}

const logger = new Logger();

// ============================================
// AGENT CLASS
// ============================================

class OpenConnectAgent {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.heartbeatTimer = null;
    }

    async start() {
        logger.info('OpenConnect Agent starting...');
        logger.info(`Version: 1.0.0`);
        logger.info(`Server: ${CONFIG.serverUrl}`);
        logger.info(`Session: ${CONFIG.sessionId}`);
        
        this.connect();
    }

    connect() {
        logger.info(`Connecting to server...`);
        
        try {
            this.ws = new WebSocket(CONFIG.serverUrl, {
                headers: {
                    'X-Session-ID': CONFIG.sessionId
                }
            });

            this.ws.on('open', () => this.onOpen());
            this.ws.on('message', (data) => this.onMessage(data));
            this.ws.on('close', () => this.onClose());
            this.ws.on('error', (error) => this.onError(error));
        } catch (error) {
            logger.error(`Connection failed: ${error.message}`);
            this.scheduleReconnect();
        }
    }

    onOpen() {
        logger.info('Connected to server');
        this.reconnectAttempts = 0;
        
        // Send initial system information
        this.sendSystemInfo();
        
        // Start heartbeat
        this.startHeartbeat();
    }

    onMessage(data) {
        try {
            const message = JSON.parse(data.toString());
            logger.info(`Received command: ${message.type}`);
            
            this.handleCommand(message);
        } catch (error) {
            logger.error(`Message processing error: ${error.message}`);
        }
    }

    onClose() {
        logger.warn('Connection closed');
        this.stopHeartbeat();
        this.scheduleReconnect();
    }

    onError(error) {
        logger.error(`Connection error: ${error.message}`);
    }

    async handleCommand(message) {
        const { type, data } = message;

        switch (type) {
            case 'ping':
                this.send({ type: 'pong' });
                break;

            case 'sysinfo':
                this.sendSystemInfo();
                break;

            case 'execute':
                await this.executeCommand(data.command);
                break;

            default:
                logger.warn(`Unknown command type: ${type}`);
        }
    }

    sendSystemInfo() {
        const info = {
            type: 'sysinfo',
            data: {
                hostname: os.hostname(),
                platform: os.platform(),
                arch: os.arch(),
                cpus: os.cpus().length,
                totalMemory: os.totalmem(),
                freeMemory: os.freemem(),
                uptime: os.uptime(),
                version: '1.0.0'
            }
        };

        this.send(info);
    }

    async executeCommand(command) {
        logger.info(`Executing command: ${command}`);

        exec(command, (error, stdout, stderr) => {
            this.send({
                type: 'command_result',
                data: {
                    command,
                    stdout,
                    stderr,
                    error: error ? error.message : null
                }
            });
        });
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }

    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            this.send({ type: 'heartbeat', timestamp: Date.now() });
        }, CONFIG.heartbeatInterval);
    }

    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    scheduleReconnect() {
        if (this.reconnectAttempts < CONFIG.maxReconnectAttempts) {
            this.reconnectAttempts++;
            logger.info(`Reconnecting in ${CONFIG.reconnectInterval}ms (attempt ${this.reconnectAttempts}/${CONFIG.maxReconnectAttempts})`);
            
            setTimeout(() => this.connect(), CONFIG.reconnectInterval);
        } else {
            logger.error('Max reconnection attempts reached. Exiting.');
            process.exit(1);
        }
    }
}

// ============================================
// MAIN
// ============================================

const agent = new OpenConnectAgent();
agent.start();

// Handle graceful shutdown
process.on('SIGINT', () => {
    logger.info('Received SIGINT, shutting down...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, shutting down...');
    process.exit(0);
});
