import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const questions = [
  {
    question: "Do you enjoy designing user interfaces?",
    answers: [
      { text: "Yes, I love it!", type: "HCI" },
      { text: "No, not really.", type: "Other" },
    ],
  },
  {
    question: "Are you interested in working with embedded systems?",
    answers: [
      { text: "Yes, very much.", type: "CPS" },
      { text: "No, that's not for me.", type: "Other" },
    ],
  },
  {
    question: "Do you like managing networks and systems?",
    answers: [
      { text: "Yes, I enjoy it.", type: "SysAdmin" },
      { text: "No, I prefer other tasks.", type: "Other" },
    ],
  },
  {
    question: "Do you have a passion for analyzing data?",
    answers: [
      { text: "Yes, I love data science.", type: "DataScience" },
      { text: "No, it's not my thing.", type: "Other" },
    ],
  },
  {
    question: "Do you find yourself interested in human-centered design?",
    answers: [
      { text: "Yes, definitely.", type: "HCI" },
      { text: "No, not at all.", type: "Other" },
    ],
  },
  {
    question: "Are you fascinated by the Internet of Things (IoT)?",
    answers: [
      { text: "Yes, it's very interesting.", type: "CPS" },
      { text: "No, I don't find it appealing.", type: "Other" },
    ],
  },
  {
    question: "Do you enjoy solving technical issues in IT environments?",
    answers: [
      { text: "Yes, very much.", type: "SysAdmin" },
      { text: "No, I don't enjoy it.", type: "Other" },
    ],
  },
  {
    question: "Are you interested in machine learning and AI?",
    answers: [
      { text: "Yes, it's fascinating.", type: "DataScience" },
      { text: "No, I'm not interested.", type: "Other" },
    ],
  },
  {
    question: "Do you enjoy creating prototypes and testing them with users?",
    answers: [
      { text: "Yes, I love it.", type: "HCI" },
      { text: "No, it's not for me.", type: "Other" },
    ],
  },
  {
    question: "Are you interested in robotics?",
    answers: [
      { text: "Yes, it's very interesting.", type: "CPS" },
      { text: "No, I'm not interested.", type: "Other" },
    ],
  },
  {
    question: "Do you like setting up and configuring servers?",
    answers: [
      { text: "Yes, I enjoy it.", type: "SysAdmin" },
      { text: "No, I don't enjoy it.", type: "Other" },
    ],
  },
  {
    question: "Do you enjoy visualizing data and creating reports?",
    answers: [
      { text: "Yes, very much.", type: "DataScience" },
      { text: "No, it's not my thing.", type: "Other" },
    ],
  },
];

const careerPaths = {
  HCI: "Human Computer Interaction",
  CPS: "Cyber Physical Systems",
  SysAdmin: "System Administration",
  DataScience: "Data Science",
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ HCI: 0, CPS: 0, SysAdmin: 0, DataScience: 0 });
  const [showResults, setShowResults] = useState(false); 
  const handleAnswer = (type) => {
    if (type !== "Other") {
      setScores({ ...scores, [type]: scores[type] + 1 });
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setScores({ HCI: 0, CPS: 0, SysAdmin: 0, DataScience: 0 });
    setShowResults(false);
  };

  const getRecommendedCareer = () => {
    const highestScore = Math.max(...Object.values(scores));
    const recommendedCareer = Object.keys(scores).find(key => scores[key] === highestScore);
    return careerPaths[recommendedCareer];
  };

  return (
    <SafeAreaView className="bg-primary flex-1 justify-center items-center">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View className="w-full">
          {!showResults ? (
            <>
              <View className="mb-6">
                <Text className="text-white text-2xl font-psemibold text-center">
                  {questions[currentQuestion].question}
                </Text>
              </View>
              {questions[currentQuestion].answers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-secondary mt-4 py-4 px-6 rounded-lg"
                  onPress={() => handleAnswer(answer.type)}
                >
                  <Text className="text-white text-lg font-pregular text-center">{answer.text}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View className="items-center">
              <Text className="text-white text-3xl font-bold mb-4">Career Recommendation</Text>
              <Text className="text-white text-lg text-center">
                Electhinker thinks that the elective : 
              </Text>
              <Text className="text-secondary text-pextrabold text-2xl text-center">
                {getRecommendedCareer()}
              </Text>
              <Text className="text-white text-lg text-center mb-4">
                  is the best for you.
              </Text>
              <TouchableOpacity
                className="bg-secondary py-2 px-6 rounded-lg"
                onPress={handleRetakeQuiz}
              >
                <Text className="text-white text-lg">Retake Quiz</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;