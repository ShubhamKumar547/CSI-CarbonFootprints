import React, { useState } from 'react';
import './Form.css';

const CarbonFootprintCalculator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(0);

  const questions = [
    {
      id: 'electricity',
      question: 'What is your average monthly electricity consumption?',
      description: 'Enter the amount in kWh (kilowatt-hours). The average household uses about 900 kWh per month.',
      options: [
        { value: 'low', label: 'Less than 500 kWh', footprint: 100 },
        { value: 'medium', label: '500-1000 kWh', footprint: 200 },
        { value: 'high', label: 'More than 1000 kWh', footprint: 300 }
      ],
      type: 'radio'
    },
    {
      id: 'transportation',
      question: 'How do you primarily commute?',
      description: 'Select your main mode of transportation for daily activities.',
      options: [
        { value: 'walking', label: 'Walking/Biking', footprint: 50 },
        { value: 'public', label: 'Public Transportation', footprint: 100 },
        { value: 'car', label: 'Personal Car', footprint: 300 },
        { value: 'hybrid', label: 'Hybrid/Electric Vehicle', footprint: 150 }
      ],
      type: 'radio'
    },
    {
      id: 'diet',
      question: 'What best describes your diet?',
      description: 'Diet significantly impacts your carbon footprint due to food production emissions.',
      options: [
        { value: 'vegan', label: 'Vegan', footprint: 100 },
        { value: 'vegetarian', label: 'Vegetarian', footprint: 150 },
        { value: 'meatOccasional', label: 'Meat occasionally', footprint: 200 },
        { value: 'meatDaily', label: 'Meat daily', footprint: 300 }
      ],
      type: 'radio'
    },
    {
      id: 'airTravel',
      question: 'How often do you travel by air?',
      description: 'Air travel is one of the most carbon-intensive activities.',
      options: [
        { value: 'never', label: 'Never', footprint: 0 },
        { value: 'rarely', label: '1-2 times per year', footprint: 200 },
        { value: 'occasionally', label: '3-5 times per year', footprint: 400 },
        { value: 'frequently', label: 'More than 5 times per year', footprint: 600 }
      ],
      type: 'radio'
    },
    {
      id: 'shopping',
      question: 'How would you describe your shopping habits?',
      description: 'Consider both online and physical shopping for non-essential items.',
      options: [
        { value: 'minimal', label: 'Minimal (only necessities)', footprint: 50 },
        { value: 'moderate', label: 'Moderate (occasional treats)', footprint: 100 },
        { value: 'frequent', label: 'Frequent (regular purchases)', footprint: 200 }
      ],
      type: 'radio'
    },
    {
      id: 'householdSize',
      question: 'How many people live in your household?',
      description: 'This helps us calculate per capita emissions.',
      options: [
        { value: '1', label: '1', footprint: 0 },
        { value: '2', label: '2', footprint: -50 },
        { value: '3', label: '3', footprint: -100 },
        { value: '4+', label: '4 or more', footprint: -150 }
      ],
      type: 'radio'
    },
    {
      id: 'heating',
      question: 'What is your primary home heating source?',
      description: 'Heating methods vary significantly in their carbon intensity.',
      options: [
        { value: 'renewable', label: 'Renewable (solar, geothermal)', footprint: 50 },
        { value: 'electric', label: 'Electric', footprint: 100 },
        { value: 'naturalGas', label: 'Natural Gas', footprint: 150 },
        { value: 'oil', label: 'Oil', footprint: 200 }
      ],
      type: 'radio'
    },
    {
      id: 'waste',
      question: 'How much waste does your household produce?',
      description: 'Consider both recycling and landfill waste.',
      options: [
        { value: 'zeroWaste', label: 'Minimal (composting, zero waste efforts)', footprint: 50 },
        { value: 'low', label: '1 bag per week', footprint: 100 },
        { value: 'medium', label: '2-3 bags per week', footprint: 150 },
        { value: 'high', label: 'More than 3 bags per week', footprint: 200 }
      ],
      type: 'radio'
    },
    {
      id: 'water',
      question: 'How would you describe your water usage?',
      description: 'Consider both consumption and heating of water.',
      options: [
        { value: 'conservative', label: 'Very conservative (low-flow fixtures, short showers)', footprint: 50 },
        { value: 'average', label: 'Average', footprint: 100 },
        { value: 'high', label: 'High (long showers, frequent baths)', footprint: 150 }
      ],
      type: 'radio'
    },
    {
      id: 'electronics',
      question: 'How often do you upgrade your electronic devices?',
      description: 'Frequent upgrades contribute to e-waste and manufacturing emissions.',
      options: [
        { value: 'rarely', label: 'Only when broken (5+ years)', footprint: 50 },
        { value: 'occasionally', label: 'Every 3-4 years', footprint: 100 },
        { value: 'frequently', label: 'Every 1-2 years', footprint: 200 }
      ],
      type: 'radio'
    }
  ];

  const handleAnswer = (questionId, value, footprint) => {
    setAnswers({
      ...answers,
      [questionId]: { value, footprint }
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateFootprint = () => {
    let total = 0;
    Object.values(answers).forEach(answer => {
      total += answer.footprint;
    });
    if (answers.householdSize) {
      total += answers.householdSize.footprint;
    }
    setCarbonFootprint(total);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setCarbonFootprint(0);
  };

  const getFootprintRating = (score) => {
    if (score < 500) return { text: 'Excellent', color: '#2ecc71' };
    if (score < 1000) return { text: 'Good', color: '#27ae60' };
    if (score < 1500) return { text: 'Average', color: '#f39c12' };
    if (score < 2000) return { text: 'High', color: '#e74c3c' };
    return { text: 'Very High', color: '#c0392b' };
  };

  const rating = getFootprintRating(carbonFootprint);

  return (
    <div className="carbonFootprintCalculator-container">
      <h1 className="carbonFootprintCalculator-title">CALCULATE YOUR CARBON FOOTPRINT</h1>

      {!showResults ? (
        <div className="carbonFootprintCalculator-questionContainer">
          <div className="carbonFootprintCalculator-progressBar">
            <div 
              className="carbonFootprintCalculator-progress" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`, backgroundColor: rating.color }}
            ></div>
          </div>

          <h2 className="carbonFootprintCalculator-question">{questions[currentQuestion].question}</h2>
          <p className="carbonFootprintCalculator-description">{questions[currentQuestion].description}</p>

          

          <div className="carbonFootprintCalculator-options">
            {questions[currentQuestion].options.map((option, index) => (
              <label 
                key={index}
                htmlFor={`${questions[currentQuestion].id}-${option.value}`}
                className={`carbonFootprintCalculator-option ${
                  answers[questions[currentQuestion].id]?.value === option.value ? 'selected' : ''
                }`}
              >
                <input
                  type={questions[currentQuestion].type}
                  id={`${questions[currentQuestion].id}-${option.value}`}
                  name={questions[currentQuestion].id}
                  value={option.value}
                  checked={answers[questions[currentQuestion].id]?.value === option.value}
                  onChange={() => handleAnswer(questions[currentQuestion].id, option.value, option.footprint)}
                  className="carbonFootprintCalculator-input"
                />
                <span className="carbonFootprintCalculator-label">{option.label}</span>
              </label>
            ))}
          </div>

          <div className="carbonFootprintCalculator-navigation">
            {currentQuestion > 0 && (
              <button 
                onClick={handlePrev}
                className="carbonFootprintCalculator-button carbonFootprintCalculator-buttonPrev"
              >
                Previous
              </button>
            )}

            {currentQuestion < questions.length - 1 ? (
              <button 
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
                className="carbonFootprintCalculator-button carbonFootprintCalculator-buttonNext"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={calculateFootprint}
                disabled={!answers[questions[currentQuestion].id]}
                className="carbonFootprintCalculator-button carbonFootprintCalculator-buttonSubmit"
              >
                Calculate My Footprint
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="carbonFootprintCalculator-results">
          <h2>Your Carbon Footprint Results</h2>
          <div className="carbonFootprintCalculator-score" style={{ color: rating.color }}>
            <span className="carbonFootprintCalculator-scoreValue">{carbonFootprint}</span>
            <span className="carbonFootprintCalculator-scoreUnit">kg CO₂/year</span>
          </div>
          <div className="carbonFootprintCalculator-rating" style={{ backgroundColor: rating.color }}>
            {rating.text}
          </div>
          <div className="carbonFootprintCalculator-comparison">
            <p>The average carbon footprint is about 1,500 kg CO₂/year.</p>
            {carbonFootprint < 1500 ? (
              <p>Your footprint is <strong>{Math.round((1 - carbonFootprint / 1500) * 100)}% lower</strong> than average!</p>
            ) : (
              <p>Your footprint is <strong>{Math.round((carbonFootprint / 1500 - 1) * 100)}% higher</strong> than average.</p>
            )}
          </div>
          
          <button 
            onClick={resetCalculator}
            className="carbonFootprintCalculator-button carbonFootprintCalculator-buttonReset"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
