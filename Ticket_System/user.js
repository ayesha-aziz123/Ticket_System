import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";
console.log(chalk.yellow(figlet.textSync("Welcome Ticket System Project !")));
class userManagement {
    users = [];
    async signUp() {
        const { name, email, password } = await inquirer.prompt([
            { name: "name", type: "input", message: "Enter your name :" },
            { name: "email", type: "input", message: "Enter your email :" },
            {
                name: "password",
                type: "password",
                message: "Enter your password:",
            },
        ]);
        const exist = this.users.find((use) => use.email === email);
        if (exist) {
            console.log(chalk.italic.bold.red("User already exist with this email!"));
            return;
        }
        this.users.push({ name, email, password });
        console.log(chalk.italic.bold.magentaBright("User signed Up Successfully!"));
    }
    async logIn() {
        const { email, password } = await inquirer.prompt([
            {
                name: "email",
                type: "input",
                message: "Enter your Email in logIn:",
            },
            {
                name: "password",
                type: "password",
                message: "Enter your Password:",
            },
        ]);
        const exist1 = this.users.find((use) => use.email === email && use.password === password);
        if (exist1) {
            console.log(chalk.italic.bold.magentaBright(`Welcome back ${exist1.name} !`));
        }
        else {
            console.log(chalk.bold.red("Invalid Credentials!"));
            process.exit();
        }
    }
}
export { userManagement };
