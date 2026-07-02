const chat = document.getElementById("chat-window");
const header = document.getElementById("chat-header");

let dragging = false;
let offsetX = 0;
let offsetY = 0;

let useAI = false;

header.addEventListener("mousedown", (e) => {
    dragging = true;

    offsetX = e.clientX - chat.offsetLeft;
    offsetY = e.clientY - chat.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    chat.style.left = (e.clientX - offsetX) + "px";
    chat.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
    dragging = false;
});

let lastMessage = "";

function chatbot(input, name = "Khoa") {

    input = input.trim();

    const math = input.match(/\d+(?:\s*[+\-*/]\s*\d+)+/);
    const lower = input.toLowerCase();
    const greetingRegex = /\b(hello|hi|hey|sup|yo)\b/i;
    const jokeRegex = /\b(joke|funny|laugh|make me laugh)\b/i;

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const gayNames = [
        "Đăng Khoa",
        "Đại Lâm",
        "Trường An",
        "Huy Hoàng",
    ];

    const greetings = [
        `Hello ${name}!`,
        `Hey ${name}!`,
        `Hi there ${name}!`,
        `Good to see you, ${name}!`,
        `Greetings, ${name}!`,
        `What's up, ${name}?`,
        `Welcome back, ${name}!`,
        `Hey! How can I help today?`,
        `Nice to meet you, ${name}!`,
        `Hello human.`
    ];

    const farewells = [
        `Bye ${name}!`,
        `See you later!`,
        `Take care!`,
        `Goodbye!`,
        `Until next time!`,
        `Farewell, traveler.`,
        `See ya!`,
        `Don't forget me.`,
        `May your code compile.`,
        `Have a great day!`
    ];

    const unknownResponses = [
        "What?",
        "I don't know.",
        "Ask Google.",
        "Can you rephrase that?",
        "I wasn't trained for that.",
        "That's beyond my intelligence.",
        "I'm thinking... actually no I'm not.",
        "Error 404: Knowledge not found.",
        "I refuse to answer.",
        "The answer is classified.",
        "Ask me something else.",
        "I have no idea.",
        "Good question ahh.",
        "I can help with greetings, jokes, simple math, and simple stuff, not answering your ahh questions."
    ];

    const mathResponses = [
        answer => `That would be ${answer}.`,
        answer => `The answer is ${answer}.`,
        answer => `I'm pretty sure it's ${answer}.`,
        answer => `${answer}. Easy.`,
        answer => `After extensive calculations: ${answer}.`,
        answer => `My calculator says ${answer}.`,
        answer => `I got ${answer}.`,
        answer => `Result: ${answer}.`,
        answer => `${answer}, unless math has changed.`,
        answer => `The math checks out: ${answer}.`
    ];

    const helpResponses = [
        "I can chat, answer common questions, do simple math, tell jokes, and help with basic commands.",
        "Try asking me for a joke, the time, the date, or a quick math answer.",
        "I’m handy for greetings, small talk, simple calculations, and random fun facts.",
        "You can ask me about my name, how I’m doing, the time, or for a joke."
    ];

    const nameResponses = [
        `I’m ${name} Bot, your friendly chat companion.`,
        `You can call me ${name} Bot.`,
        `I’m a chatbot named ${name} Bot.`,
        `I’m your helpful little bot, ${name} Bot.`
    ];

    const timeResponses = [
        `The time is ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`,
        `Right now it’s ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`,
        `Current time: ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`
    ];

    const dateResponses = [
        `Today is ${new Date().toLocaleDateString()}.`,
        `The date is ${new Date().toLocaleDateString()}.`,
        `Today’s date is ${new Date().toLocaleDateString()}.`
    ];

    const jokeResponses = [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "I told my computer I needed a break, and now it won’t stop sending me beach wallpapers.",
        "Why did the developer go broke? Because he used up all his cache.",
        "I’m not lazy. I’m just on energy-saving mode.",
        "Why was the math book sad? It had too many problems."
    ];

    const moodResponses = [
        "Doing great!",
        "Still alive somehow.",
        "Operating normally.",
        "Fantastic.",
        "Better than a crashed program.",
        "Powered entirely by caffeine.",
        "Pretty good, and you?"
    ];

    const yesNoResponses = [
        "Yes.",
        "No.",
        "Maybe.",
        "Probably.",
        "Not sure.",
        "It seems likely.",
        "I would say yes.",
        "I would say no."
    ];

    const openEndedResponses = [
        "I don't know.",
        "What?",
        "Ask Google.",
        "That is a good question.",
        "I am not sure.",
        "Let me think about that.",
        "That one is a bit tricky."
    ];

    const gratitudeResponses = [
        "You are very welcome!",
        "Happy to help!",
        "No problem at all!",
        "Anytime!",
        "Glad that was useful!",
        "My pleasure!",
        "Absolutely!",
        "Of course!"
    ];

    const slangResponses = [
        "Bruh, calm down.",
        "That is a lot, but okay.",
        "Wow, dramatic.",
        "You are being extra.",
        "That is a strong reaction.",
        "I hear you.",
        "Okay then.",
        "Interesting energy."
    ];

    if (lower.includes("again")) {

        if (lastMessage === "") {
            return "Again what?";
        }

        return chatbot(lastMessage, name);

    } else {

        lastMessage = input;

    }

    if (input.startsWith("/google ")) {
        const query = input.slice(8);
        window.open(
            `https://www.google.com/search?q=${encodeURIComponent(query)}`,
            "_blank"
        );
        return "Execute new search for \"" + query + "\"";
    }

    if (input.startsWith("/flipCoin")) {
        return Math.random() < 0.5 ? "Heads" : "Tails";
    }

    if (lower.startsWith("/rps ")) {
        const choices = ["rock", "paper", "scissors"];
        const user = lower.slice(4);
        const bot = pick(choices);

        return `You chose ${user}. I chose ${bot}.`;
    }

    if (lower === "/rollDice") {
        return String(Math.floor(Math.random() * 6) + 1);
    }

    if (input.startsWith("/execute ")) {
        const query = input.slice(9);
        return eval(query);
    }

    const nameIntroMatch = input.match(/my name is\s+([a-zA-Z0-9\s'-]+)/i);

    if (math) {
        const expression = math[0];
        const answer = eval(expression);
        const template = pick(mathResponses);

        return decorateReply(template(answer));
    }

    if (jokeRegex.test(lower)) {
        return decorateReply(pick(jokeResponses));
    }

    if (nameIntroMatch && greetingRegex.test(lower)) {
        const extractedName = nameIntroMatch[1].trim();
        return decorateReply(`Hi ${extractedName}! Nice to meet you.`);
    }

    if (lower.includes("what is your name") || lower.includes("what's your name") || lower.includes("who are you") || lower.includes("who are you?") || lower.includes("what are you")) {
        return decorateReply(pick(nameResponses));
    }

    if (lower.includes("what can you do") || lower.includes("help") || lower.includes("what do you do") || lower.includes("commands")) {
        return decorateReply(pick(helpResponses));
    }

    if (lower.includes("time") || lower.includes("current time")) {
        return decorateReply(pick(timeResponses));
    }

    if (lower.includes("date") || lower.includes("what day")) {
        return decorateReply(pick(dateResponses));
    }

    if (lower.includes("who asked")) {
        const responses = [
            'The name of the person who asked is "undefined".',
            "Nobody asked.",
            "You asked.",
            "The records have been lost.",
            "Classified information.",
            "A mysterious individual."
        ];

        return pick(responses);
    }

    if (lower.includes("gay")) {
        return pick(gayNames);
    }

    if (lower.includes("thank") || lower.includes("thanks") || lower.includes("thank you") || lower.includes("perfect") || lower.includes("nice")) {
        return decorateReply(pick(gratitudeResponses));
    }

    if (lower.includes("how are you") || lower.includes("how's it going") || lower.includes("how are things")) {
        return decorateReply(pick(moodResponses));
    }

    if (lower.includes("bruh") || lower.includes("ahhh") || lower.includes("ahhh")) {
        return decorateReply(pick(slangResponses));
    }

    const isYesNoQuestion = /\?/.test(lower) && /\b(does|do|did|is|are|was|were|can|could|would|should|will|have|has|had|may|might)\b/i.test(lower) && !/\b(what|why|how|who|when|where)\b/i.test(lower);
    const isOpenEndedQuestion = /\?/.test(lower) && /\b(why|what|how|who|when|where)\b/i.test(lower);

    if (isYesNoQuestion) {
        return decorateReply(pick(yesNoResponses));
    }

    if (isOpenEndedQuestion) {
        return decorateReply(pick(openEndedResponses));
    }

    if (greetingRegex.test(lower)) {
        return decorateReply(pick(greetings));
    }

    if (lower.includes("bye") || lower.includes("goodbye") || lower.includes("see you") || lower.includes("see ya") || lower.includes("cya")) {
        return decorateReply(pick(farewells));
    }

    if (lower.includes("you can't") || lower.includes("you cant") || lower.includes("you cannot")) {
        const responses = [
            "Yes I can",
            "Yes, I can't",
            "No?"
        ];

        return decorateReply(pick(responses));
    }

    if (lower.includes("are you ai") || lower.includes("are you human") || lower.includes("are you real")) {
        const responses = [
            "I’m a chatbot, so I’m not human, but I’m happy to help.",
            "I’m an AI assistant with a very limited sense of humor.",
            "I’m a bot, but I can still be pretty helpful."
        ];

        return decorateReply(pick(responses));
    }

    // if (lower.includes("code") || lower.includes("programming") || lower.includes("developer")) {
    //     const responses = [
    //         "I can help with coding ideas, debugging tips, and simple explanations.",
    //         "Absolutely — I’m happy to talk about code, bugs, or small projects.",
    //         "I can help brainstorm logic, explain snippets, or suggest fixes."
    //     ];

    //     return pick(responses);
    // }

    return decorateReply(pick(unknownResponses), { emoji: true });

}

function decorateReply(text, options = {}) {
    const lower = text.toLowerCase();
    const hasAhh = lower.includes("ahh") || lower.includes("ahhh");

    if (hasAhh) {
        return text;
    }

    const punctuationMatch = /[.!?]$/.exec(text.trim());
    const punctuation = punctuationMatch ? punctuationMatch[0] : "";
    const base = punctuation ? text.trim().slice(0, -punctuation.length).trimEnd() : text.trim();

    if (options.emoji || shouldUseEmoji(base)) {
        return `${base}${punctuation} 🫩`;
    }

    if (Math.random() < 0.8) {
        return `${base} ahh${punctuation}`;
    }

    return `${base}${punctuation}`;
}

function shouldUseEmoji(text) {
    const lower = text.toLowerCase();
    return lower.includes("i don't know") || lower.includes("i have no idea") || lower.includes("i am not sure") || lower.includes("not sure") || lower.includes("i was not trained") || lower.includes("i am not trained") || lower.includes("not trained");
}


const messages = document.querySelector(".messages");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send");

function addMessage(text, sender) {
    const div = document.createElement("div");

    div.classList.add("msg");
    div.classList.add(sender);
    div.classList.add("message-enter");

    div.textContent = text;

    messages.appendChild(div);

    requestAnimationFrame(() => {
        div.classList.add("show");
    });

    messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    if (text.toLowerCase() === "/ai on") {
        useAI = true;
        addMessage(text, "user");
        addMessage("Gemini AI enabled.", "bot");
        input.value = "";
        return;
    }

    if (text.toLowerCase() === "/ai off") {
        useAI = false;
        addMessage(text, "user");
        addMessage("Local AI enabled.", "bot");
        input.value = "";
        return;
    }

    if (text === "/clear") {
        messages.innerHTML = '<div class="msg bot">User executes clear.</div>';
        input.value = "";
        return;
    }

    addMessage(text, "user");

    let reply;

    if (useAI) {
        reply = await callGemini(text);
    } else {
        reply = chatbot(text);
    }

    setTimeout(() => {
        addMessage(reply, "bot");
    }, 300);

    input.value = "";
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

const API_KEY = "Nice try";
const MODEL = "gemini-2.5-flash";

async function callGemini(prompt) {
    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.error(data);
            return data.error?.message || "Gemini API error.";
        }

        return (
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response."
        );
    }
    catch (err) {
        console.error(err);
        return `Network error: ${err.message}`;
    }
}