/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Reference to:\n{\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n}"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"time\": 1678983218968,\n  \"blocks\": [\n    {\n      \"id\": \"t-g3d-5w5\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery TODO List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"8n-7v-3d6\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Use this editor to create and manage your grocery list.\"\n      }\n    },\n    {\n      \"id\": \"4b-9z-0x5\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"Milk\",\n          \"Eggs\",\n          \"Bread\",\n          \"Cheese\"\n        ]\n      }\n    },\n    {\n      \"id\": \"4a-9w-2e6\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"You can add, delete, and edit items on your grocery list.\"\n      }\n    }\n  ],\n  \"version\": \"2.8.1\"\n}\n```\n\n**Explanation:**\n\n* **`time`:** Timestamp indicating when the data was created.\n* **`blocks`:** Array of blocks representing the content of the editor.\n* **`version`:** Version of the Editor.js library used.\n\n**Blocks:**\n\n* **`header` (id: \"t-g3d-5w5\")**:  A level 1 heading for the \"Grocery TODO List\".\n* **`paragraph` (id: \"8n-7v-3d6\")**:  A paragraph explaining the purpose of the editor.\n* **`list` (id: \"4b-9z-0x5\")**:  An unordered list containing initial grocery items (Milk, Eggs, Bread, Cheese). This is where the user can add, delete, and edit their list items.\n* **`paragraph` (id: \"4a-9w-2e6\")**:  Another paragraph providing instructions on how to manage the list.\n\n**Customization:**\n\nThis template provides a basic structure. You can customize it further by:\n\n* **Adding more blocks:**  Include different types of blocks like headings, paragraphs, images, quotes, etc., to enhance the grocery list experience.\n* **Using plugins:**  Explore Editor.js plugins to add functionalities like checkboxes for marking items as completed,  adding quantities, or grouping items into categories.\n* **Styling:**  Apply CSS to create a visually appealing and user-friendly grocery list interface. \n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());
  
  