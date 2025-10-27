import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { PaymentMethod } from 'src/types';

@Controller('api')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // ============================================================================
  // USER ENDPOINTS
  // ============================================================================
  @Post('users')
  async createUser(@Body() userData: any) {
    return this.gatewayService.createUser(userData);
  }

  @Get('users')
  async getAllUsers() {
    return this.gatewayService.getAllUsers();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.gatewayService.getUser(id);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() userData: any) {
    return this.gatewayService.updateUser(id, userData);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.gatewayService.deleteUser(id);
  }

  @Get('users/:id/address')
  async getUserAddress(@Param('id') id: string) {
    return this.gatewayService.getUserAddress(id);
  }

  // ============================================================================
  // PRODUCT ENDPOINTS
  // ============================================================================
  @Post('products')
  async addProduct(@Body() productData: any) {
    return this.gatewayService.addProduct(productData);
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    return this.gatewayService.getProduct(id);
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    return this.gatewayService.updateProduct(id, productData);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.gatewayService.deleteProduct(id);
  }

  // ============================================================================
  // CATALOG ENDPOINTS
  // ============================================================================
  @Get('catalog/search')
  async searchProducts(@Query('q') query: string) {
    return this.gatewayService.searchProducts(query);
  }

  @Get('catalog/highlights')
  async getHighlights() {
    return this.gatewayService.getHighlights();
  }

  @Get('catalog/categories')
  async getCategories() {
    return this.gatewayService.getCategories();
  }

  @Get('catalog/recommendations/:userId')
  async getRecommendations(@Param('userId') userId: string) {
    return this.gatewayService.recommendProducts(userId);
  }

  @Get('catalog/related/:productId')
  async getRelatedProducts(@Param('productId') productId: string) {
    return this.gatewayService.getRelatedProducts(productId);
  }

  @Get('catalog/new-arrivals')
  async getNewArrivals() {
    return this.gatewayService.getNewArrivals();
  }

  // ============================================================================
  // CART ENDPOINTS
  // ============================================================================
  @Post('cart/:userId/items')
  async addToCart(@Param('userId') userId: string, @Body() itemData: any) {
    return this.gatewayService.addToCart(userId, itemData);
  }

  @Get('cart/:userId')
  async getCart(@Param('userId') userId: string) {
    return this.gatewayService.getCart(userId);
  }

  @Delete('cart/:userId/items/:itemId')
  async removeFromCart(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.gatewayService.removeFromCart(userId, itemId);
  }

  @Delete('cart/:userId')
  async clearCart(@Param('userId') userId: string) {
    return this.gatewayService.clearCart(userId);
  }

  @Put('cart/:userId/items/:itemId/quantity')
  async updateItemQuantity(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    return this.gatewayService.updateItemQuantity(userId, itemId, body.quantity);
  }

  // ============================================================================
  // ORDER ENDPOINTS
  // ============================================================================
  @Post('orders/place')
  async placeOrder(@Body() body: { userId: string; method: PaymentMethod }) {
    return this.gatewayService.placeOrder(body.userId, body.method);
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    return this.gatewayService.getOrder(id);
  }

  @Put('orders/:id')
  async updateOrder(@Param('id') id: string, @Body() orderData: any) {
    return this.gatewayService.updateOrder(id, orderData);
  }

  @Delete('orders/:id')
  async cancelOrder(@Param('id') id: string) {
    return this.gatewayService.cancelOrder(id);
  }

  @Get('orders/user/:userId')
  async listOrdersByUser(@Param('userId') userId: string) {
    return this.gatewayService.listOrdersByUser(userId);
  }

  // ============================================================================
  // PAYMENT ENDPOINTS
  // ============================================================================
  @Post('payments/process')
  async openPaymentProcess(@Body() body: { orderId: string; method: PaymentMethod }) {
    const paymentId = await this.gatewayService.openPaymentProcess(body.orderId, body.method);
    return { paymentId };
  }

  @Post('payments')
  async processPayment(@Body() paymentData: any) {
    return this.gatewayService.processPayment(paymentData);
  }

  @Get('payments/:id')
  async getPaymentDetails(@Param('id') id: string) {
    return this.gatewayService.getPaymentDetails(id);
  }

  @Post('payments/:id/refund')
  async refundPayment(@Param('id') id: string) {
    return this.gatewayService.refundPayment(id);
  }

  @Post('payments/:id/confirm')
  async confirmPayment(@Param('id') id: string) {
    return this.gatewayService.confirmOrder(id);
  }

  // ============================================================================
  // SHIPPING ENDPOINTS
  // ============================================================================
  @Post('shipments')
  async createShipment(@Body() shipmentData: any) {
    return this.gatewayService.createShipment(shipmentData.orderId, shipmentData);
  }

  @Get('shipments/:id')
  async getShipment(@Param('id') id: string) {
    return this.gatewayService.getShipment(id);
  }

  @Put('shipments/:id')
  async updateShipment(@Param('id') id: string, @Body() shipmentData: any) {
    return this.gatewayService.updateShipment(id, shipmentData);
  }

  @Get('shipments/:id/track')
  async trackShipment(@Param('id') id: string) {
    return this.gatewayService.trackShipment(id);
  }

  @Post('shipping/calculate')
  async calculateShipping(@Body() body: { userId: string; address: any }) {
    const cost = await this.gatewayService.calculateShippingCost(body.userId, body.address);
    return { cost };
  }

  @Put('shipments/:id/status')
  async updateShipmentStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.gatewayService.updateShipmentStatus(id, body.status);
  }

  // ============================================================================
  // REVIEW ENDPOINTS
  // ============================================================================
  @Post('reviews')
  async addReview(@Body() body: { productId: string; reviewData: any }) {
    return this.gatewayService.addReview(body.productId, body.reviewData);
  }

  @Get('reviews/product/:productId')
  async getReviews(@Param('productId') productId: string) {
    return this.gatewayService.getReviews(productId);
  }

  @Put('reviews/:id')
  async updateReview(@Param('id') id: string, @Body() reviewData: any) {
    return this.gatewayService.updateReview(id, reviewData);
  }

  @Delete('reviews/:id')
  async deleteReview(@Param('id') id: string) {
    return this.gatewayService.deleteReview(id);
  }

  // ============================================================================
  // MAIL ENDPOINTS
  // ============================================================================
  @Post('mail/send')
  async sendEmail(@Body() body: { to: string; subject: string; body: string }) {
    return this.gatewayService.sendEmail(body.to, body.subject, body.body);
  }

  @Post('mail/order-confirmation')
  async sendOrderConfirmation(@Body() body: { userId: string; orderId: string }) {
    return this.gatewayService.sendOrderConfirmation(body.userId, body.orderId);
  }

  @Post('mail/shipping-info')
  async sendShippingInformation(@Body() body: { userId: string; shipment: any }) {
    return this.gatewayService.sendShippingInformation(body.userId, body.shipment);
  }
}
