import openai from './config/open-ai.js'
import readlineSync from 'readline-sync';
import colors from 'colors';
async function main() {
console.log(colors.bold.green('Welcome to the Chatbot Program'));
console.log(colors.bold.green('You can start chatting with the bot.'));

const chatHistory = []; //store conversation history.
while(true) {
        const userInput = readlineSync.question(colors.yellow('You: '));

        try {
   //Contruct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({ role, content}));

            // add latest user input
            messages.push({ role: 'user', content: userInput});
            const chatCompletion = await openai.chat.completions.create({
     model: "gpt-4",
        messages: messages,
         max_tokens: 100,
     });
     // Get completion text/content
     const completionText = chatCompletion.choices[0].message.content;
           // call the API with user input
           if (userInput.toLowerCase() === 'exit') {
            console.log(colors.green('Assistant: ') + completionText);
          // Message return by Bot after exit.
        return;
            
           } 
            console.log(colors.green('Assistant: ') + completionText);
           //update history with user input and assistant response.
           chatHistory.push(['user', userInput]);
           chatHistory.push(['assistant', completionText]);
        } catch (error) {
            // dispalys error if occured.
            console.error(colors.red(error));
            
        }
    }
   
}
main();
