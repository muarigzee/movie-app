import { User } from "@clerk/express";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });


// inngest function to save user data to a database

const syncUserCreation = inngest.createFunction(
    {id:'sync-user-form-clerk'},
    {event:'clerk/user.created'},
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.create(userData)
    }
)

// inngest function to delete user from database

const syncUserDeletion = inngest.createFunction(
    {id:'delete-user-with-clerk'},
    {event:'clerk/user.deleted'},
    async ({event}) => {
        const {id} = event.data
        await User.findByIdandDelete(id)
    }
)

// inngest function to update user data in database

const syncUserUpdation = inngest.createFunction(
    {id:'update-user-with-clerk'},
    {event:'clerk/user.updated'},
    async ({event}) => {
       const {id, first_name, last_name, email_addresses, image_url} = event.data
       const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.findbyIdandUpdate(id, userData)
    }
)

export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];
