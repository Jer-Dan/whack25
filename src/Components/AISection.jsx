import { React, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "../Styles/AISection.css";

import { GoogleGenAI } from '@google/genai';

const credit_providers = ["Experian", "Equifax", "TransUnion"];

// Test data
let cards = [
  {
    name: "John Smith",
    company: "HSBC",
    max_credit: 3200.00,
    current_balance: 200,
    due_date: 20,
    grace_period: 20,
    minimum_fee: 10,
  },
  {
    name: "John Smith",
    company: "Natwest",
    max_credit: 5000.00,
    current_balance: 1200,
    due_date: 24,
    grace_period: 10,
    minimum_fee: 20,
  }
];

let info = {
  income: 32000,
  credit_score: [870, 0],
  credit_utilisation: 25,
  total_balance: 600,
  history_length: 50,
  cards: cards,
}

function genPrompt(info) {
  let prompt = "You are taking the role of a financial advisor. I will provide to you information about your client's income and their credit history, including information about their credit score and cards. You are to provide a paragraph analysing the effectiveness of their financial habits, and another paragraph giving suggestions and changing their habits as you think would improve it. Compare their habits to the average person within their income range. If no entries are provided in a section, don't comment on it. Don't use any kind of greetings, just get straight into it. Use concise wording, but provide the relevant details. Separate the paragraphs with two lines. You are talking directly to the client, so refer to them directly as 'you'. Instead of referring to amounts of money as 'x GBP', refer to them as '£x'.";

  prompt += `\nIncome: ${info.income} GBP/year
Credit score: ${info.credit_score[0]} using ${credit_providers[info.credit_score[1]]}
Credit utilisation: ${info.credit_utilisation}%
Total balance: ${info.total_balance} GBP
History length: ${info.history_length} months
Cards:`;

  for (let i = 0; i < cards.length; i++) {
    prompt += `\n\t - Card ${i+1}:`;
    prompt += `\n\t\t - Card name: ${cards[i].name}`;
    prompt += `\n\t\t - Company: ${cards[i].company}`;
    prompt += `\n\t\t - Max credit: ${cards[i].max_credit} GBP`;
    prompt += `\n\t\t - Current balance: ${cards[i].current_balance} GBP`;
    prompt += `\n\t\t - Due date: Day ${cards[i].due_date} of the month`;
    prompt += `\n\t\t - Grace period: ${cards[i].grace_period} days`;
    prompt += `\n\t\t - Minimum fee: ${cards[i].minimum_fee} GBP`
  }

  return prompt;
}

function AISection() {
  const [summary, setSummary] = useState(
    <Spinner animation="grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  useEffect(() => {
    async function genSummary() {
      let prompt = genPrompt(info);

      console.log(prompt);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
      });

      let [overall, suggestions] = response.text.split('\n\n');
      setSummary(<div>{overall}<br /><br />{suggestions}</div>);

      console.log(response.text);
    }

    genSummary();
  }, []);

  return (
    <div>
      <h1>AI Section</h1>

      {summary}
    </div>
  )
}

export default AISection
