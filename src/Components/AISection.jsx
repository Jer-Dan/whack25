import { React, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "../Styles/AISection.css";
import Button from 'react-bootstrap/Button';

import { GoogleGenAI } from '@google/genai';

const credit_providers = ["Experian", "Equifax", "TransUnion"];
const cards = JSON.parse(localStorage.getItem("cards"));

// Get personal info from local storage
const personalInfo = JSON.parse(localStorage.getItem("personalInfo")) || {};
const payments = JSON.parse(localStorage.getItem("payments")) || [];
const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

// get total balance from all cards
const total_balance = () => {
    let total = 0;
    for (let card of cards) {
        total += parseFloat(card.currentBalance);
    }

    return total;
}

// Real data
let info = {
  income: personalInfo.income || 32000,
  credit_score: [personalInfo.creditScore || 870, 0],
  credit_utilisation: personalInfo.creditUtilisation || 25,
  total_balance: total_balance(),
  history_length: 50,
  cards: cards,
  payments: payments,
  purchases: purchases
}

function genPrompt(info) {
  let prompt = `You are taking the role of a financial advisor. I will provide to you information about your client's income and their credit history, including information about their credit score and cards.
You are to provide a paragraph analysing the effectiveness of their financial habits, and another paragraph giving suggestions and changing their habits as you think would improve it.
Compare their habits to the average person within their income range.
If no entries are provided in a section, don't comment on it. Don't use any kind of greetings, just get straight into it.
Use concise wording, but provide the relevant details. Separate the paragraphs with two lines. You are talking directly to the client, so refer to them directly as 'you'.
Instead of referring to amounts of money as 'x GBP', refer to them as '£x'. Do not refer to the cards by their numbers (e.g. 'Card 1'), only refer to them by their names.`;

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
    prompt += `\n\t\t - Max credit: ${cards[i].maxCredit} GBP`;
    prompt += `\n\t\t - Current balance: ${cards[i].currentBalance} GBP`;
    prompt += `\n\t\t - Statement balance day: ${cards[i].statementBalanceDay}`
    prompt += `\n\t\t - Due date: Day ${cards[i].dueDate} of the month`;
    prompt += `\n\t\t - Minimum fee: ${cards[i].minFeePayment} GBP`
  }

  return prompt;
}

function AISection() {
  const [summary, setSummary] = useState(null);

  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  async function genSummary() {
    setSummary(
        <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

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

  useEffect(() => {
    
    genSummary();
  }, []);

  return (
    <div>
      <h1>AI Section</h1>

      <Button variant="primary" onClick={() => genSummary()}>Regenerate Summary</Button>
      {summary}
    </div>
  )
}

export default AISection
