import { Injectable } from '@nestjs/common';
import { IMailService } from 'src/interfaces/services';
import { IShipment } from 'src/interfaces/models';

@Injectable()
export class MailService implements IMailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Simulação de envio de email
    console.log('📧 Email enviado:');
    console.log(`   Para: ${to}`);
    console.log(`   Assunto: ${subject}`);
    console.log(`   Conteúdo: ${body.substring(0, 100)}...`);
    
    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async sendBulkEmail(
    recipients: string[],
    subject: string,
    body: string,
  ): Promise<void> {
    console.log(`📧 Enviando email em massa para ${recipients.length} destinatários:`);
    console.log(`   Assunto: ${subject}`);
    
    for (const recipient of recipients) {
      await this.sendEmail(recipient, subject, body);
    }
  }

  async sendOrderConfirmation(userId: string, orderId: string): Promise<void> {
    const subject = 'Confirmação de Pedido';
    const body = `
      Olá!
      
      Seu pedido #${orderId} foi confirmado com sucesso!
      
      Você receberá um email com as informações de rastreamento assim que o pedido for enviado.
      
      Obrigado por comprar conosco!
      
      Equipe ShopWork
    `;
    
    await this.sendEmail(`user${userId}@example.com`, subject, body);
    console.log('✅ Email de confirmação de pedido enviado');
  }

  async sendClosureConfirmation(userId: string, orderId: string): Promise<void> {
    const subject = 'Pedido Finalizado';
    const body = `
      Olá!
      
      Seu pedido #${orderId} foi finalizado com sucesso!
      
      Esperamos que tenha gostado da sua compra. Não esqueça de avaliar os produtos!
      
      Obrigado por escolher a ShopWork!
      
      Equipe ShopWork
    `;
    
    await this.sendEmail(`user${userId}@example.com`, subject, body);
    console.log('✅ Email de confirmação de fechamento enviado');
  }

  async sendShippingInformation(userId: string, shipment: IShipment): Promise<void> {
    const subject = 'Informações de Envio';
    const body = `
      Olá!
      
      Seu pedido foi enviado!
      
      Código de rastreamento: ${shipment.trackingNumber}
      Transportadora: ${shipment.carrier}
      Status: ${shipment.status}
      
      Acompanhe seu pedido em: https://rastreamento.exemplo.com
      
      Equipe ShopWork
    `;
    
    await this.sendEmail(`user${userId}@example.com`, subject, body);
    console.log('✅ Email de informações de envio enviado');
  }

  async sendPasswordResetEmail(userId: string, resetToken: string): Promise<void> {
    const subject = 'Redefinição de Senha';
    const body = `
      Olá!
      
      Você solicitou a redefinição da sua senha.
      
      Use o código abaixo para redefinir sua senha:
      ${resetToken}
      
      Este código expira em 1 hora.
      
      Se você não solicitou esta redefinição, ignore este email.
      
      Equipe ShopWork
    `;
    
    await this.sendEmail(`user${userId}@example.com`, subject, body);
    console.log('✅ Email de redefinição de senha enviado');
  }
}
