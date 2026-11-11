import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('connected', { message: 'Connected to FIREWALL SOC Telemetry Gateway', timestamp: new Date().toISOString() });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe_telemetry')
  handleSubscribe(client: Socket, payload: any) {
    client.join('telemetry_room');
    return { status: 'subscribed', room: 'telemetry_room' };
  }

  broadcastAlert(alert: any) {
    this.server.emit('security_alert', alert);
  }

  broadcastScanProgress(moduleId: string, progress: number, step: string) {
    this.server.emit('scan_progress', { moduleId, progress, step, timestamp: new Date().toISOString() });
  }

  broadcastSystemMetric(metric: any) {
    this.server.emit('system_metric', metric);
  }
}
