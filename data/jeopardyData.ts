import { useState } from 'react';

export interface JeopardyItem {
  question: string;
  answer: string;
}

export interface JeopardyCategory {
  name: string;
  items: JeopardyItem[];
}

export const useJeopardyData = () => {
  const [jeopardyData, setJeopardyData] = useState<JeopardyCategory[]>([
    {
      name: "Category 1",
      items: [
        { question: "Question 1-100", answer: "Answer 1-100" },
        { question: "Question 1-200", answer: "Answer 1-200" },
        { question: "Question 1-300", answer: "Answer 1-300" },
        { question: "Question 1-400", answer: "Answer 1-400" },
        { question: "Question 1-500", answer: "Answer 1-500" },
        { question: "Question 1-600", answer: "Answer 1-600" },
        { question: "Question 1-700", answer: "Answer 1-700" },
      ]
    },
    // ... Repeat for 6 more categories
  ]);

  return { jeopardyData, setJeopardyData };
};

