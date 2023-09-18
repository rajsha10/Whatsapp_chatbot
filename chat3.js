const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const client = new Client({ authStrategy: new LocalAuth() });
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is Ready!");
});

client.initialize();

const configuration = new Configuration({
  apiKey: process.env.SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

async function runCompletion(message) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 3000,
  });
  return completion.data.choices[0].text;
}

client.on("message", async (message) => {
  console.log(message.body);

  const messageHandlers = {

    //casuals
    hello: (message) => {
      message.reply("🤖\n Hello! How can I assist you?");
    },
    hi: (message) => {
      message.reply("🤖\n Hi! How can I assist you?");
    },
    whoareyou: (message) => {
      message.reply("🤖\n I am a WhatsApp chatbot. You can call me buddy. How can I help you today?");
    },
    whatareyou: (message) => {
      message.reply("🤖\n I am a WhatsApp chatbot. You can call me buddy. How can I help you today?");
    },
    you: (message) => {
      message.reply("🤖\n I am a WhatsApp chatbot. You can call me buddy. How can I help you today?");
    },
    whomadeyou: (message) => {
      message.reply("🤖\n I am a WhatsApp chatbot made by Raj, Ayan, Subhashis, and Jishnu.");
    },
    whocreatedyou: (message) => {
      message.reply("🤖\n I am a WhatsApp chatbot made by Raj, Ayan, Subhashis, and Jishnu.");
    },
    whyyouweremade: (message) => {
      message.reply("🤖\n I was created to assist and provide support to users in the WhatsApp group."+
      "\nMy purpose is to enhance communication, offer information, and automate certain tasks within the group."+
      "\nI can answer questions, provide updates, and provides you with the best help possible to your question."+
      "\nBy having me in the group, the aim is to improve the overall experience of the group members and make interactions more convenient and efficient."+
      "\nIf you have any specific questions or need assistance, feel free to ask!");
    },
    whyisyourpurpose: (message) => {
      message.reply("🤖\n I was created to assist and provide support to users in the WhatsApp group."+
      "\nMy purpose is to enhance communication, offer information, and automate certain tasks within the group."+
      "\nI can answer questions, provide updates, and provides you with the best help possible to your question."+
      "\nBy having me in the group, the aim is to improve the overall experience of the group members and make interactions more convenient and efficient."+
      "\nIf you have any specific questions or need assistance, feel free to ask!");
    },
    why: (message) => {
      message.reply("🤖\n I was created to assist and provide support to users in the WhatsApp group."+
      "\nMy purpose is to enhance communication, offer information, and automate certain tasks within the group."+
      "\nI can answer questions, provide updates, and provides you with the best help possible to your question."+
      "\nBy having me in the group, the aim is to improve the overall experience of the group members and make interactions more convenient and efficient."+
      "\nIf you have any specific questions or need assistance, feel free to ask!");
    },
    thankyou: (message) => {
      message.reply("🤖 \nYou're welcome!\nIf you have any more questions, feel free to ask. I'm here to help!");
    },
    goodmorning: (message) => {
      message.reply("🤖\nGood morning, sunshine!\nHow can I assist you today?");
    },
    goodafternoon: (message) => {
      message.reply("🤖\nGood afternoon!\nHow can I assist you today?");
    },
    goodafternoon: (message) => {
      message.reply("🤖\nGood evening!\nHow can I assist you today?");
    },
    goodnight: (message) => {
      message.reply("🤖\nWishing you a peaceful night and a beautiful tomorrow. Sleep tight and wake up refreshed. Goodnight!");
    },
    whatisyourname: (message) => {
      message.reply("🤖\n I am a whatsapp chatbot! I was not given a name... But you can call me buddy\nHow can I help you?");
    },
    name: (message) => {
      message.reply("🤖\n I am a whatsapp chatbot! I was not given a name... But you can call me buddy\nHow can I help you?");
    },
    
  
    //commands
    help: (message) => {
      message.reply("🤖\n I am a WhatsApp chat bot."+ 
      "\nTo use me, start asking questions with '!'For example, '!Where is Bhutan?'"+ 
      "\nI can only read the questions starts with an exclamation mark ('!')."+
      "\nTo know more about me reply with '!info'");
    },
    info: (message) => {
      const rep = "🤖\n\ I am a WhatsApp chatbot, you can call me buddy.."+
      "\nI was created to assist and provide support to users in the WhatsApp group."+
      "\nMy purpose is to enhance communication, offer information, and automate certain tasks within the group. I can answer questions, provide updates, and provides you with the best help possible to your question."+
      "\nBy having me in the group, the aim is to improve the overall experience of the group members and make interactions more convenient and efficient."+
      "\nIf you have any specific questions or need assistance, feel free to ask!";
      message.reply(rep);
    },
  };

  const body = message.body.toLowerCase();

  if (body.startsWith("!")) {
    const command = body.slice(1).trim();
    const casual = command.replace(/\s/g, "");
    const handler = messageHandlers[casual];
    if (body.includes("snu") || body.includes("sister nivedita university")) {
      if (body.includes("located") || body.includes("situated") || body.includes("where is")) {
        message.reply("🤖\n DG 1/2 New Town\nAction Area 1, Kolkata - 700156\n\nWebsite link: https://snuniv.ac.in/");
      } else if (body.includes("course")) {
        message.reply("🤖\n https://snuniv.ac.in/schools-course.aspx");
      } else if (body.includes("number") || body.includes("no")) {
        message.reply("🤖\n" +
          "\n1800 2588 155 (Toll-Free)" +
          "\n+91 7595044470" +
          "\n+91 7595044471" +
          "\n+91 7595044472" +
          "\n+91 7595044473");
      } else {
        message.reply("🤖\nSister Nivedita University is a private university located in New Town, Kolkata. It was established by the Sister Nivedita University Act, 2000." +
          "\nIt is named after Sister Nivedita, a disciple of Swami Vivekananda. Concerns have been raised about the financial stability of the university following repeated demands to students to pay fees up-front on an ad hoc basis." +
          "\nWebsite link: https://snuniv.ac.in/");
      }
    } else if (casual && handler) {
        handler(message);
    } else {
      const result = await runCompletion(command);
      message.reply("🤖 " + result);
    }
  }
});
