import { Inngest } from "inngest";
import User from "../models/User.js";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/**
 * Clerk user creation event → Sync with MongoDB
 */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-form-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address, 
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.create(userData);
  }
);

/**
 * Clerk user deletion event → Remove from MongoDB
 */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

/**
 * Clerk user update event → Sync changes to MongoDB
 */
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses[0]?.email_address, 
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData, { new: true, upsert: true }); 
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
