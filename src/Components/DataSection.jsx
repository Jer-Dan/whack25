import React from 'react'
import { useState } from 'react'
import MoneyTypeForm from './MoneyTypeForm'
import '../Styles/DataSection.css'
import Dropdown from 'react-bootstrap/Dropdown';
import PersonalForm from './PersonalForm';

// function calcInterest(interest, days) {
//   return (interest / 365) * days;
// }

// function calcBalance() {
//   const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
//   let month = new Date().getMonth();
//   let day = new Date().getDay();
//   let monthPaymentCounter = {};
//
//   let lastDay = localStorage.getItem('lastDay') || day;
//   let lastMonth = JSON.parse(localStorage.getItem('lastMonth')) || month;
//   let monthBalance = localStorage.getItem('monthBalance') || 0;
//   let monthCardInfo = JSON.parse(localStorage.getItem('monthCardInfo')) || {};
//   let paymentsInMonth = localStorage.getItem('paymentsInMonth') || 0;
//   let pastMonthData = JSON.parse(localStorage.getItem('pastMonthData')) || [];
//   let cards = JSON.parse(localStorage.getItem('cards')) || {};
//   let duePayments = JSON.parse(localStorage.getItem('duePayments')) || {};
//
//   let cardNames = Object.keys(monthCardInfo);
//
//   if (month != lastMonth) {
//     let totalBalance = 0;
//     let avgUsage = 0;
//
//     for (let i = 0; i < cardNames.length; i++) {
//       let interest = 0;
//
//       monthCardInfo[cardNames[i]][0] += cards[cardNames[i]].currentBalance * (monthCardInfo[cardNames[i]][1] - monthDays[day]);
//       totalBalance += monthCardInfo[cardNames[i]][0];
//
//       if (duePayments[cardNames[i][0]] > monthPaymentCounter[cardNames[i]]) {
//         interest = calcInterest(cards[cardNames[i]].interest, monthCardInfo[cardNames[i]][0]);
//         totalBalance += interest;
//       }
//
//       avgUsage += monthCardInfo[cardNames[i]][0] / (monthDays[month]*cards[cardNames[i]].maxCredit);
//       // makeNewStatement(cardNames[i], cards[cardNames[i]].currentBalance); // Adds to duePayments
//       monthCardInfo[cardNames[i]] = [0, 0];
//     }
//     monthPaymentCounter[cardNames[i]] = 0;
//     pastMonthData.push(100*(avgUsage/cards.length));
//   } else {
//     for (let i = 0; i < cardNames.length; i++) {
//       monthCardInfo[cardNames[i]][0] += cards[cardNames[i]].currentBalance * (monthCardInfo[cardNames[i]][1] - monthDays[month]);
//       monthCardInfo[cardNames[i][1]] = day;
//     }
//   }
// }

function calcBalance() {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  let totalBalance = 0;
  for (let i = 0; i < cards.length; i++) {
    totalBalance += parseFloat(cards[i].currentBalance);
  }
  return totalBalance;
}

function DataSection({ isOnboarding, handleOnboardingComplete }) {

    const [FormType, setFormType] = useState("")

    return (
        <div>
            <h1 id='DataSectionTitle'>
                Your Data
            </h1>
        {/* if onboarding is set to default then set this z-index to 1000 */}
        <div style={{ zIndex: (isOnboarding === "Default" ? 5000 : 'auto') }}>
                <PersonalForm />
        </div>

            <hr></hr>

            <h2>
              Current Balance:
            </h2>
            {"£" + calcBalance().toLocaleString()}

            <MoneyTypeForm style={{marginTop: "1.5vh"}} type={FormType} />
        </div>
    )
}

export default DataSection
