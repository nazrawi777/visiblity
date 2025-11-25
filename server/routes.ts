import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve vanilla ecommerce site from client/public/ecom/
  app.use('/ecom', express.static(path.resolve(import.meta.dirname, '..', 'client', 'public', 'ecom')));
  
  // Serve other static assets
  app.use(express.static(path.resolve(import.meta.dirname, '..', 'client', 'public')));
  
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
