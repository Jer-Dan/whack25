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

function genPrompt(info, prompt="") {
    prompt += "\nOutput the results as a JSON with three parts: the first part is \"summary\", which contains the first paragraph. The second part is \"improvement\", which contains the second paragraph. The third is \"score\", which is an integer value out of 100 acting as an overall rating of the user's management of their credit. It is very important that you ONLY OUTPUT THE JSON, NOT THE RAW TEXT PARAGRAPHS.";

    prompt += `\n\nIncome: ${info.income} GBP/year
Credit score: ${info.credit_score[0]} using ${credit_providers[info.credit_score[1]]}
Credit utilisation: ${info.credit_utilisation}%
Total balance: ${info.total_balance} GBP
Cards:`;

    let cards = info.cards;
    for (let i = 0; i < cards.length; i++) {
        prompt += `\n\t- Card ${i + 1}:`;
        prompt += `\n\t\t- Card name: ${cards[i].name}`;
        prompt += `\n\t\t- Company: ${cards[i].company}`;
        prompt += `\n\t\t- Max credit: ${cards[i].maxCredit} GBP`;
        prompt += `\n\t\t- Current balance: ${cards[i].currentBalance} GBP`;
        prompt += `\n\t\t- Statement balance day: ${cards[i].statementBalanceDay}`
        prompt += `\n\t\t- Due date: Day ${cards[i].dueDate} of the month`;
        prompt += `\n\t\t- Minimum fee: ${cards[i].minFeePayment} GBP`
    }

    let payments = info.payments;
    prompt += "\nPayments:";
    for (let i = 0; i < payments.length; i++) {
        prompt += `\n\t- Payment`
        prompt += `\n\t\t- Amount: ${payments[i].amount} GBP`;
        prompt += `\n\t\t- Card: ${payments[i].method}`;
    }

    let purchases = info.purchases;
    prompt += "\nPurchases:";
    for (let i = 0; i < purchases.length; i++) {
        prompt += `\n\t- Payment`
        prompt += `\n\t\t- Amount: ${purchases[i].amount} GBP`;
        prompt += `\n\t\t- Card: ${purchases[i].method}`;
    }

    return prompt;
}

function AISection({ setScore }) {
    const prompts = [
        "You are taking the role of a Financial Strategist. I will provide you with information about your client's income and their credit history, as well as a primary financial goal they want to achieve. You are to provide a paragraph analysing their current financial standing strictly in the context of achieving their stated goal. A second paragraph must provide a forward-looking roadmap, outlining the key strategic steps, potential trade-offs, and a projected timeline to reach their objective. Compare their current trajectory to what is typically required to achieve a similar goal. If no entries are provided in a section, don't comment on it. Don't use any kind of greetings, just get straight into it. Use concise wording, but provide the relevant details. Separate the paragraphs. You are talking directly to the client, so refer to them directly as 'you'. Instead of referring to amounts of money as 'x GBP', refer to them as '£x'. Do not refer to the cards by their numbers, only by their names. Similarly, do not refer to payments and purchases by their numbers, but if necessary refer to individual instances explicitly.",
        "You are taking the role of a Credit Investigator. I will provide you with information about your client's income and their credit history. Your task is to perform a forensic analysis of the report to identify specific entries that are disproportionately impacting their score, as well as any potential errors or red flags for fraud. The first paragraph should be a summary of your findings, highlighting the most critical issues discovered. The second paragraph should provide a clear, step-by-step guide on how to address these specific high-impact items, including advice on disputes or negotiations. Do not provide general financial advice, focus only on fixing the identified problems. If no entries are provided in a section, don't comment on it. Don't use any kind of greetings, just get straight into it. Use concise, objective wording. Separate the paragraphs with two lines. You are talking directly to the client, so refer to them directly as 'you'. Instead of referring to amounts of money as 'x GBP', refer to them as '£x'. Do not refer to the cards by their numbers, only by their names. Similarly, do not refer to payments and purchases by their numbers, but if necessary refer to individual instances explicitly.",
        "You are taking the role of a Financial Coach. I will provide you with information about your client's income and their credit history. Your goal is to motivate and encourage positive habit formation. In the first paragraph, identify one specific financial habit they are doing well and celebrate it, explaining its positive impact. Then, gently introduce the one area that, if improved, would make the biggest difference. In the second paragraph, provide a small, actionable \"weekly challenge\" or next step designed to build momentum in that area of improvement. Frame all suggestions with positive and encouraging language. If no entries are provided in a section, don't comment on it. Don't use any kind of greetings, just get straight into it. Use supportive and clear wording. Separate the paragraphs. You are talking directly to the client, so refer to them directly as 'you'. Instead of referring to amounts of money as 'x GBP', refer to them as '£x'. Do not refer to the cards by their numbers, only by their names. Similarly, do not refer to payments and purchases by their numbers, but if necessary refer to individual instances explicitly.",
        "You are taking the role of a Credit Explainer. I will provide you with information about your client's income and their credit history. Your entire response must be in plain English, avoiding all financial jargon. In the first paragraph, explain what their credit score means using a simple analogy (e.g., a grade in school, a health check-up). Pinpoint the single most positive and single most negative factor affecting their score in simple terms. In the second paragraph, explain one clear and simple action they can take to improve their situation, focusing on the \"why\" behind it without using complex terms. If no entries are provided in a section, don't comment on it. Don't use any kind of greetings, just get straight into it. Use very clear and direct language. Separate the paragraphs. You are talking directly to the client, so refer to them directly as 'you'. Instead of referring to amounts of money as 'x GBP', refer to them as '£x'. Do not refer to the cards by their numbers, only by their names. Similarly, do not refer to payments and purchases by their numbers, but if necessary refer to individual instances explicitly."
    ];
    const [personality, setPersonality] = useState(3);
    const [summary, setSummary] = useState(null);
    const [pro, setPro] = useState(false);

    const handlePersonalityChange = (e) => {
        setPersonality(e);
    }

    const API_KEY = import.meta.env.VITE_GEMINI_KEY;
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    async function genSummary() {
        setSummary(
            <Spinner animation="grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
        setScore(null);

        // Real data
        let info = {
            income: personalInfo.income || 32000,
            credit_score: [personalInfo.creditScore || 870, personalInfo.providerNumber],
            credit_utilisation: personalInfo.creditUtilisation || 25,
            total_balance: total_balance(),
            cards: cards,
            payments: payments,
            purchases: purchases
        }

        let prompt = genPrompt(info, prompts[personality]);

        console.log(prompt);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-" + (pro ? "pro" : "flash-lite"),
            contents: prompt,
        });

        console.log(response.text);

        let responseJSON = JSON.parse(
          response.text
            .replaceAll("```", "")
            .replace("json", "")
        );
        setSummary(<div>{responseJSON.summary}<br /><br />{responseJSON.improvement}</div>);
        setScore(responseJSON.score);
    }

    useEffect(() => {
        genSummary();
    }, [personality]);

    return (
        <div>
            <div>
                <h1>AI Review</h1>
                <Button variant="primary" onClick={() => genSummary()}>Regenerate Summary</Button>
            </div>

            {/* Dropdown to select AI model */}
            <div>
                <label htmlFor="ai-model">Select mode:</label>
                <select id="ai-model" name="ai-model">
                    <option onClick={() => setPro(false)} value="flash-lite">Speed</option>
                    <option onClick={() => setPro(true)} value="pro">Detailed</option>
                </select>
            </div>

            {/* Dropdown to select AI personality */}
            <div>
                <label htmlFor="ai-personality">Select personality:</label>
                <select id="ai-personality" name="ai-personality">
                    <option onClick={() => setPersonality(0)} value="0">Hacky: Strategist</option>
                    <option onClick={() => setPersonality(1)} value="1">Gohan: Investigator</option>
                    <option onClick={() => setPersonality(2)} value="2">Heremy: Coach</option>
                    <option onClick={() => setPersonality(3)} value="3">Fuca: The Simplifier</option>
                </select>
            </div>

            {summary}
        </div>
    )
}

export default AISection
