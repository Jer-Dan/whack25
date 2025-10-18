import { React, useState, useEffect } from 'react'
import "../Styles/AISection.css"

import { GoogleGenAI } from '@google/genai';

let purposes = ["groceries", "wages", "mobile"];
let frequencies = ["day", "week", "month", "year"];

let spending = [
  {
    date: new Date("2025-10-18"),
    money: 50.50,
    purpose: 0,
    frequency: [1, 1],
  }
];

let income = [
  {
    date: new Date("2025-10-17"),
    money: 625.00,
    purpose: 1,
    frequency: [1, 2],
  }
];

function AISection() {
  const [summary, setSummary] = useState("Loading...");

  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  console.log(API_KEY);

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  useEffect(() => {
    async function genSummary() {
      let text = "You are taking the role of a financial advisor. I will provide to you your client's recent financial history, with the first section being their income, the second section being their spending and the third section being their loans. You are to provide a paragraph analysing the effectiveness of their financial habits, and another paragraph giving suggestions and changing their spending and borrowing habits as you think would improve it. Compare their spending to the average person within their income range. If no entries are provided in a section, don't comment on it. Don't use any kind of greetings, just get straight into it. Use concise wording, but provide the relevant details. Separate the paragraphs with two lines";
      text += "\n\nSection 1:";

      for (let i=0; i < income.length; i++) {
        text += `\nDate: ${income[i].date.toLocaleString("en-GB")} | Money: ${income[i].money} GBP | Purpose: ${purposes[income[i].purpose]} | Frequency of event: ${income[i].frequency[0]} time(s) per ${frequencies[income[i].frequency[1]]}`;
      }

      text += "\n\nSection 2:";
      for (let i=0; i < spending.length; i++) {
        text += `\nDate: ${spending[i].date.toLocaleString("en-GB")} | Money: ${spending[i].money} GBP | Purpose: ${purposes[spending[i].purpose]} | Frequency of event: ${spending[i].frequency[0]} time(s) per ${frequencies[spending[i].frequency[1]]}`;
      }

      text += "\n\nSection 3:";
      text += "\n N/A";

      console.log(text);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: text,
      });

      setSummary(response.text);
      console.log(response.text);
    }

    genSummary();
  });

  return (
    <div>
      <h1>AI Section</h1>

      {summary}
    </div>
  )
}

export default AISection
