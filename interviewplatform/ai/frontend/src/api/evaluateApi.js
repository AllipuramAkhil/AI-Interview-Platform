export const evaluateAnswer = async (
  question,
  answer
) => {

  const userAnswer =
    answer.toLowerCase().trim();

  // ================= EMPTY =================

  if (
    !userAnswer ||
    userAnswer.length < 5
  ) {

    return {
      score: 0,
      communication: 0,
      technical: 0,
      fluency: 0,
      feedback:
        "No valid answer provided",
    };
  }

  // ================= IRRELEVANT PHRASES =================

  const irrelevantPhrases = [

    "i dont know",
    "don't know",
    "no idea",
    "skip",
    "later",
    "random",
    "nothing",
    "not sure",

  ];

  for (const phrase of irrelevantPhrases) {

    if (
      userAnswer.includes(phrase)
    ) {

      return {
        score: 0,
        communication: 0,
        technical: 0,
        fluency: 0,
        feedback:
          "Answer is irrelevant",
      };
    }
  }

  // ================= KEYWORD DATABASE =================

  const keywordsDatabase = {

    react: [
      "component",
      "jsx",
      "virtual dom",
      "state",
      "props",
      "hooks",
    ],

    java: [
      "class",
      "object",
      "inheritance",
      "polymorphism",
      "encapsulation",
      "oop",
    ],

    os: [
      "process",
      "thread",
      "kernel",
      "memory",
      "scheduling",
      "deadlock",
    ],

    backend: [
      "api",
      "jwt",
      "authentication",
      "database",
      "server",
      "spring",
    ],

    dbms: [
      "sql",
      "table",
      "database",
      "normalization",
      "query",
      "primary key",
    ],
  };

  // ================= DETECT CATEGORY =================

  let matchedKeywords = [];

  Object.keys(
    keywordsDatabase
  ).forEach((category) => {

    if (
      question
        .toLowerCase()
        .includes(category)
    ) {

      matchedKeywords =
        keywordsDatabase[category];
    }
  });

  // ================= TECHNICAL SCORE =================

  let keywordMatches = 0;

  matchedKeywords.forEach((word) => {

    if (
      userAnswer.includes(word)
    ) {

      keywordMatches++;
    }
  });

  let technicalScore =
    (
      keywordMatches /
      Math.max(
        matchedKeywords.length,
        1
      )
    ) * 50;

  // ================= COMMUNICATION SCORE =================

  let communicationScore = 0;

  const words =
    userAnswer
      .split(" ")
      .filter(Boolean);

  if (
    words.length >= 40
  ) {

    communicationScore = 25;

  } else if (
    words.length >= 20
  ) {

    communicationScore = 18;

  } else if (
    words.length >= 10
  ) {

    communicationScore = 10;
  }

  // ================= FLUENCY SCORE =================

  let fluencyScore = 0;

  const sentences =
    userAnswer
      .split(".")
      .filter(Boolean);

  if (
    sentences.length >= 3
  ) {

    fluencyScore = 25;

  } else if (
    sentences.length >= 2
  ) {

    fluencyScore = 18;

  } else if (
    sentences.length >= 1
  ) {

    fluencyScore = 10;
  }

  // ================= GRAMMAR APPROXIMATION =================

  let grammarScore = 0;

  if (
    userAnswer.includes(".") ||
    userAnswer.includes(",")
  ) {

    grammarScore += 10;
  }

  if (
    /^[A-Z]/.test(answer.trim())
  ) {

    grammarScore += 5;
  }

  // ================= FINAL SCORE =================

  let finalScore = Math.round(

    technicalScore +
    communicationScore +
    fluencyScore +
    grammarScore

  );

  if (finalScore > 100) {
    finalScore = 100;
  }

  // ================= STRICT RELEVANCE =================

  if (
    keywordMatches === 0
  ) {

    finalScore = 0;
  }

  // ================= FEEDBACK =================

  let feedback = "";

  if (
    finalScore >= 85
  ) {

    feedback =
      "Excellent answer with strong technical knowledge and communication skills";

  } else if (
    finalScore >= 70
  ) {

    feedback =
      "Good answer with decent technical explanation";

  } else if (
    finalScore >= 50
  ) {

    feedback =
      "Average answer. Improve explanation depth and fluency";

  } else {

    feedback =
      "Weak or irrelevant answer";
  }

  return {

    score: finalScore,

    communication:
      communicationScore,

    technical:
      technicalScore,

    fluency:
      fluencyScore,

    feedback,
  };
};