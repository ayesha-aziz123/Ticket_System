// #! /usr/bin/env node

import { text } from "figlet";

import inquirer from "inquirer";
import { userManagement } from "./user.js";
import chalk from "chalk";

let condition = true;

//class Event
class Event {
  title: string;
  date: string;
  time: string;
  city: string;
  stock: number;

  constructor(a: string, b: string, c: string, d: string, f: number) {
    this.title = a;
    this.date = b;
    this.time = c;
    this.city = d;
    this.stock = f;
  }
}

class Event_Management {
  events: Event[] = [];

  /// create event =================>>
  async createEvent() {
    const { title, date, time, city, stock } = await inquirer.prompt([
      { name: "title", type: "input", message: "Enter event Title:" },
      {
        name: "date",
        type: "input",
        message: "Enter event date (YYYY-MM-DD):",
      },
      { name: "time", type: "input", message: "Enter event time (HH:MM):" },
      { name: "city", type: "input", message: "Enter event city:" },
      { name: "stock", type: "input", message: "Enter ticket stock:" },
    ]);
    this.events.push({ title, date, time, city, stock });
    console.log(chalk.italic.green("Event created Successfully!"));
  }

  // list event ====================>>
  async listEvent() {
    if (this.events.length !== 0) {
      console.log(chalk.italic.bold.yellowBright("*** Available Events ***:"));
      this.events.forEach((event, index) => {
        console.log(chalk.bold.greenBright(
          `${index + 1} - ${event.title} - ${event.date} - ${event.time} - ${
            event.city
          } - ${event.stock}`
        ));
      });
    }
  }

  // purchase Tickets ===============>>
  async purchaseTickets() {
    if (this.events.length === 0) {
      console.log(chalk.bold.red("No events available."));
      return;
    }

    const { eventIndex, ticketCount } = await inquirer.prompt([
      {
        name: "eventIndex",
        type: "list",
        message: "Select an event index to purchase tickets:",
        choices: this.events.map((event, index) => ({
          name: `${event.title} - ${event.date} ${event.time} in ${event.city} (Tickets Available: ${event.stock})`,
          value: index.toString(),
        })),
      },
      {
        name: "ticketCount",
        type: "number",
        message: "Enter number of tickets to purchase:",
      },
    ]);

    const event1 = this.events[parseInt(eventIndex)];

    if (event1.stock < ticketCount) {
      console.log(chalk.bold.red("Not enough tickets available."));
    } else {
      event1.stock -= ticketCount;
      console.log(chalk.italic.blueBright
        (`Successfully purchased ${ticketCount} tickets for ${event1.title}.`)
      );
    }
    return;
  }
}

export { Event_Management };

///class Admin
class Admin {
  async adminLogin() {
    const { name , email, password } = await inquirer.prompt([
      { name: "email", type: "input", message: "Enter adim email:" },
      { name: "password", type: "password", message: "Enter adim password:" },
    ]);

    if (email === email && password === password) {
      console.log(chalk.italic.green("Admin logged in Successfully !"));
      await this.manageEvents();
    } else {
      console.log(chalk.bold.red("Invalid admin credentials."));
      process.exit();
    }
  }

  async manageEvents() {
    const { action2 } = await inquirer.prompt([
      {
        name: "action2",
        type: "list",
        message: "Choose an action:",
        choices: ["Create Events", "View Events"],
      },
    ]);
    if (action2 === "Create Events") {
      await event_management.createEvent();
    } else if (action2 === "View Events") {
      event_management.listEvent();
    }
  }
}

// initializer
const usermanagement = new userManagement();
const event_management = new Event_Management();
const admin = new Admin();



// ====  main function ====
async function main() {
  do {
    const { role } = await inquirer.prompt([
      {
        name: "role",
        type: "list",
        message: "Are you a user or Admin ?",
        choices: ["User", "Admin"],
      },
    ]);
    if (role === "User") {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Select your Perform an action",
          choices: ["Sign Up", "Sign In", "Exit"],
        },
      ]);
      if (action === "Sign Up") {
        await usermanagement.signUp();
      } else if (action === "Sign In") {
        await usermanagement.logIn();
        const { Que } = await inquirer.prompt({
          name: "Que",
          type: "list",
          message: "Choose an option: ",
          choices: ["Purchase Tickets", "View Events", "Exit"],
        });
        if (Que === "Purchase Tickets") {
          await event_management.purchaseTickets();
        } else if (Que === "View Events") {
          await event_management.listEvent();
        } else if (Que === "Exit") {
          condition = false;
          console.log("EXIT...");
        }
      } else if (action === "Exit") {
        condition = false;
        console.log("Exit...");
      }

      // Admin
    } else if (role === "Admin") {
      await admin.adminLogin(); 
    }
  } while (condition);
}

main();




