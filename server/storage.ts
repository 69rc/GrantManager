import { type User, type InsertUser, type GrantApplication, type InsertGrantApplication, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Grant application operations
  getApplication(id: string): Promise<GrantApplication | undefined>;
  getApplicationsByUser(userId: string): Promise<GrantApplication[]>;
  getAllApplications(): Promise<GrantApplication[]>;
  createApplication(application: InsertGrantApplication): Promise<GrantApplication>;
  updateApplicationStatus(id: string, status: string, adminNotes?: string): Promise<GrantApplication>;

  // Chat message operations
  getChatMessagesByUser(userId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private applications: Map<string, GrantApplication>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.applications = new Map();
    this.chatMessages = new Map();
    this.seedData();
  }

  private seedData() {
    // Create admin user
    const adminId = randomUUID();
    const admin: User = {
      id: adminId,
      email: "admin@granthub.com",
      password: "$2a$10$rGvH9YQJXKvVKJYJLvVs4.vF8qVV8QZhHYD.YxYxYx", // "admin123"
      fullName: "Admin User",
      phoneNumber: "+1 234 567 8900",
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(adminId, admin);

    // Create demo user
    const userId = randomUUID();
    const user: User = {
      id: userId,
      email: "demo@example.com",
      password: "$2a$10$rGvH9YQJXKvVKJYJLvVs4.vF8qVV8QZhHYD.YxYxYx", // "password"
      fullName: "Demo User",
      phoneNumber: "+1 555 123 4567",
      role: "user",
      createdAt: new Date(),
    };
    this.users.set(userId, user);

    // Create sample applications
    const app1Id = randomUUID();
    const app1: GrantApplication = {
      id: app1Id,
      userId: userId,
      fullName: "Demo User",
      email: "demo@example.com",
      phoneNumber: "+1 555 123 4567",
      address: "123 Main St, San Francisco, CA 94102",
      projectTitle: "Community Education Center",
      projectDescription: "Building a community center to provide free educational resources and tutoring for underprivileged children in our neighborhood.",
      grantType: "education",
      requestedAmount: 15000,
      fileUrl: "",
      fileName: "",
      status: "under_review",
      adminNotes: "",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    };
    this.applications.set(app1Id, app1);

    const app2Id = randomUUID();
    const app2: GrantApplication = {
      id: app2Id,
      userId: userId,
      fullName: "Demo User",
      email: "demo@example.com",
      phoneNumber: "+1 555 123 4567",
      address: "123 Main St, San Francisco, CA 94102",
      projectTitle: "Small Business Expansion",
      projectDescription: "Expanding my bakery business to include a second location and hire 5 new employees.",
      grantType: "business",
      requestedAmount: 30000,
      fileUrl: "",
      fileName: "",
      status: "approved",
      adminNotes: "Great business plan with clear growth strategy. Approved for full amount.",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    };
    this.applications.set(app2Id, app2);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Grant application operations
  async getApplication(id: string): Promise<GrantApplication | undefined> {
    return this.applications.get(id);
  }

  async getApplicationsByUser(userId: string): Promise<GrantApplication[]> {
    return Array.from(this.applications.values())
      .filter((app) => app.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAllApplications(): Promise<GrantApplication[]> {
    return Array.from(this.applications.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createApplication(insertApplication: InsertGrantApplication): Promise<GrantApplication> {
    const id = randomUUID();
    const application: GrantApplication = {
      ...insertApplication,
      id,
      status: "pending",
      adminNotes: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplicationStatus(id: string, status: string, adminNotes?: string): Promise<GrantApplication> {
    const application = this.applications.get(id);
    if (!application) {
      throw new Error("Application not found");
    }
    
    const updated: GrantApplication = {
      ...application,
      status,
      adminNotes: adminNotes || application.adminNotes,
      updatedAt: new Date(),
    };
    
    this.applications.set(id, updated);
    return updated;
  }

  // Chat message operations
  async getChatMessagesByUser(userId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((msg) => msg.userId === userId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
