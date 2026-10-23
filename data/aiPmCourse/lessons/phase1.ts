import type { AiPmLesson } from './types';

// Phase 1 (AI/ML foundations), Days 5–14. Days 1–4 are hand-built in content/aiPm/.

export const PHASE1_LESSONS: Record<number, AiPmLesson> = {
  5: {
    intro: 'On Day 3 you met classification and regression. Today you learn how their outputs become product decisions.',
    objectives: [
      'Tell whether a product problem needs a category or a number.',
      'Explain why most classifiers output a score, not a yes or no.',
      'Choose a decision threshold based on the cost of each kind of mistake.',
    ],
    parts: [
      {
        id: 'two-outputs',
        title: 'Two kinds of prediction',
        cards: [
          { title: 'Classification: predict a category', text: 'The answer is one of a fixed set of labels.', example: 'Is this email spam or not? Which of five categories does this ticket belong to?', note: 'What are the categories, and who decides the definitions?' },
          { title: 'Regression: predict a number', text: 'The answer is a quantity on a scale.', example: 'How many minutes until this food order arrives? How much will this customer spend next month?', note: 'How wrong can the number be before users stop trusting it?' },
        ],
        cardCols: 2,
        quote: 'The same business question can often be framed either way. “Will this user churn?” is classification; “How many days until this user churns?” is regression. Pick the framing that matches the decision you need to make.',
      },
      {
        id: 'scores',
        title: 'Scores, not answers',
        paragraphs: [
          'Most classifiers do not say “fraud” or “not fraud”. They give a score, usually between 0 and 1, that shows how confident the model is.',
          'Your product then turns that score into an action. That rule is called a threshold: for example, block the order if the fraud score is above 0.8.',
        ],
        table: {
          head: ['Fraud score', 'Threshold 0.5', 'Threshold 0.8'],
          rows: [
            ['0.92', 'Block', 'Block'],
            ['0.65', 'Block', 'Allow'],
            ['0.30', 'Allow', 'Allow'],
          ],
        },
        callout: { label: 'The PM owns the threshold', text: 'Engineers can build the model, but choosing where to draw the line is a product decision. It decides how many good customers get blocked and how much fraud gets through.' },
      },
      {
        id: 'threshold',
        title: 'Choosing a threshold',
        bullets: [
          { term: 'Lower threshold', text: 'Catches more real cases, but flags more innocent ones. Use it when missing a case is expensive, such as a medical warning.' },
          { term: 'Higher threshold', text: 'Flags fewer innocent cases, but misses more real ones. Use it when a false alarm is expensive, such as blocking a paying customer.' },
          { term: 'Middle band', text: 'Many products add a third path: auto-approve low scores, auto-block high scores, and send the uncertain middle to a human.' },
        ],
        quote: 'You will learn to measure these trade-offs with precision and recall on Day 7.',
      },
    ],
    quiz: {
      title: 'Category, number, or threshold?',
      questions: [
        { q: 'A food app wants to show “arriving in about 25 minutes”.', options: ['Classification', 'Regression'], answer: 1, why: 'The answer is a number of minutes, so it is regression.' },
        { q: 'A bank wants to tag each transaction as groceries, travel, bills, or shopping.', options: ['Classification', 'Regression'], answer: 0, why: 'The answer is one of a fixed set of categories, so it is classification.' },
        { q: 'A hospital alert flags patients at risk of a serious condition. Missing one is very dangerous.', options: ['Use a lower threshold', 'Use a higher threshold'], answer: 0, why: 'When missing a real case is expensive, flag more cases and accept more false alarms that a nurse can check.' },
        { q: 'An e-commerce site auto-cancels orders it thinks are fraudulent. Wrongly cancelling a loyal customer’s order loses them for good.', options: ['Use a lower threshold', 'Use a higher threshold'], answer: 1, why: 'When a false alarm is expensive, only act automatically on very confident scores, and send borderline cases for review.' },
      ],
    },
    exercise: {
      title: 'Frame two product problems',
      intro: 'Pick two AI features, one from your work or a product you use and one from your capstone. For each, define what the model predicts and how the product acts on it.',
      capstone: true,
      example: [
        { label: 'Feature', text: 'Spam filter in an email app.' },
        { label: 'Target', text: 'Is this email spam? Classification.' },
        { label: 'Action', text: 'Score above 0.9 goes to spam; 0.6–0.9 shows a warning banner; below 0.6 goes to the inbox.' },
        { label: 'Costlier mistake', text: 'Hiding a real email (a job offer in spam) is worse than letting one spam through.' },
      ],
      fields: [
        { key: 'feature1', label: 'Feature 1 and what it predicts (category or number?)', rows: 2 },
        { key: 'action1', label: 'How the product acts on the prediction (threshold or rule)', rows: 2 },
        { key: 'feature2', label: 'Capstone feature and what it predicts', placeholder: 'e.g. Does the assistant have enough evidence to answer this question?', rows: 2 },
        { key: 'action2', label: 'How the capstone acts on it, and which mistake is costlier', rows: 3 },
      ],
      rubric: 'Check that each target is clearly classification or regression and matches the decision; that the action turns a score into behaviour with a sensible threshold or middle band; and that they name which mistake costs more and set the threshold accordingly.',
      button: 'Review my framing',
    },
    completion: [
      'I can explain classification vs regression with a product example.',
      'I can explain why a model gives a score and the product sets a threshold.',
      'I completed the four questions.',
      'I framed two features, including one for my capstone.',
    ],
    takeaway: 'a model gives a score; the product decides what to do with it. Choosing the threshold is a product decision driven by which mistake costs more.',
  },

  6: {
    intro: 'Many of the AI features people use every day are not chatbots. They decide what to show first.',
    objectives: [
      'Explain ranking, retrieval, and recommendation in plain language.',
      'Identify the user value and the business value of a ranked feed or list.',
      'Spot the trade-offs a PM must set: relevance, diversity, freshness, and fairness.',
    ],
    parts: [
      {
        id: 'patterns',
        title: 'Four common patterns',
        cards: [
          { title: 'Retrieval', text: 'Find a short list of candidates from millions of items.', example: 'Search finds the 500 products that match “running shoes”.' },
          { title: 'Ranking', text: 'Order the candidates so the most useful appear first.', example: 'Those 500 shoes are sorted by how likely you are to buy.' },
          { title: 'Recommendation', text: 'Suggest items the user did not ask for, based on behaviour.', example: '“Customers who bought this also bought…”, or a home-screen feed.' },
          { title: 'Clustering (recap)', text: 'Group similar items or users without labels, as you saw on Day 3.', example: 'Grouping songs into moods so the app can build playlists.' },
        ],
        cardCols: 2,
      },
      {
        id: 'signals',
        title: 'What the system learns from',
        bullets: [
          { term: 'Explicit feedback', text: 'Ratings, likes, “not interested”. Clear, but rare.' },
          { term: 'Implicit feedback', text: 'Clicks, watch time, purchases, skips. Plentiful, but noisy: a click is not the same as satisfaction.' },
          { term: 'Item information', text: 'Category, price, text, images. Helps with new items that have no history.' },
          { term: 'Context', text: 'Time of day, device, location. Breakfast recipes at 8 a.m., not 11 p.m.' },
        ],
        callout: { tone: 'amber', label: 'The cold-start problem', text: 'A new user or a new item has no history, so the system has little to learn from. Products handle this with onboarding questions, popular items, or item information.' },
      },
      {
        id: 'tradeoffs',
        title: 'The trade-offs a PM sets',
        table: {
          head: ['Trade-off', 'If you push too far one way', 'PM question'],
          rows: [
            ['Relevance vs diversity', 'The feed shows the same kind of item again and again.', 'How much variety keeps users exploring?'],
            ['Engagement vs wellbeing', 'Clickbait and endless scrolling rise.', 'Which metric shows real user value, not just attention?'],
            ['Personal vs popular', 'New users see nothing useful, or everyone sees the same thing.', 'What do we show when we know little about a user?'],
            ['Fairness to sellers or creators', 'A few big sellers take all the visibility.', 'Do new sellers get a fair chance to be seen?'],
          ],
        },
        quote: 'What you optimise is what you get. If the ranking is trained on clicks, it will learn to get clicks, whether or not users are better off.',
      },
    ],
    quiz: {
      title: 'Which pattern is it?',
      options: ['Retrieval', 'Ranking', 'Recommendation', 'Clustering'],
      questions: [
        { q: 'Netflix’s “Because you watched…” row on the home screen.', answer: 2, why: 'It suggests titles you did not search for, based on your viewing behaviour.' },
        { q: 'A support tool finds the 20 help articles most related to a customer’s question, from a library of 10,000.', answer: 0, why: 'It narrows a huge collection down to a short list of candidates.' },
        { q: 'A job site decides the order of the 200 matching jobs on the first results page.', answer: 1, why: 'The candidates are already found; the system decides which appear first.' },
        { q: 'A music app groups its catalogue into moods such as “chill” and “workout” without predefined labels.', answer: 3, why: 'It finds groups of similar items without labels.' },
      ],
    },
    exercise: {
      title: 'Map a ranked feature',
      intro: 'Pick one ranked or recommended feature you use, such as a home feed, search results, or “you may also like”. Describe it as a PM would.',
      example: [
        { label: 'Feature', text: 'Swiggy’s restaurant list on the home screen.' },
        { label: 'Pattern', text: 'Retrieval (restaurants that deliver here) then ranking.' },
        { label: 'Signals', text: 'Past orders, ratings, delivery time, time of day.' },
        { label: 'User value', text: 'Find a good meal quickly without scrolling.' },
        { label: 'Metric', text: 'Orders per session, with repeat-order rate as a check on satisfaction.' },
        { label: 'Risk', text: 'Promoted restaurants crowd out better ones, and trust drops.' },
      ],
      fields: [
        { key: 'feature', label: 'Feature', rows: 1 },
        { key: 'pattern', label: 'Which pattern or patterns?', choices: ['Retrieval', 'Ranking', 'Recommendation', 'A combination'] },
        { key: 'signals', label: 'What signals does it likely learn from?', rows: 2 },
        { key: 'value', label: 'User value, and the metric that proves it', rows: 2 },
        { key: 'risk', label: 'One trade-off or risk you would watch', rows: 2 },
      ],
      rubric: 'Check that the pattern matches the feature, the signals are realistic (and note implicit vs explicit), the metric reflects real user value rather than only clicks, and the risk names a real trade-off such as diversity, cold start, wellbeing, or fairness.',
      button: 'Review my feature map',
    },
    completion: [
      'I can explain retrieval, ranking, and recommendation.',
      'I can name the cold-start problem and one fix.',
      'I completed the four questions.',
      'I mapped one ranked feature with its value, metric, and risk.',
    ],
    takeaway: 'ranking systems learn whatever you reward. The PM chooses the signals and metrics, and those choices shape what users see.',
  },

  7: {
    intro: 'On Day 5 you set a threshold. Today you learn how to measure what that threshold does.',
    objectives: [
      'Read a confusion matrix and name false positives and false negatives.',
      'Explain precision and recall in plain language.',
      'Choose which metric matters more for a product decision.',
    ],
    parts: [
      {
        id: 'matrix',
        title: 'Four outcomes of every prediction',
        paragraphs: ['Imagine a fraud model checks 1,000 orders. 50 are really fraud. The model flags 60 orders, and 40 of those are really fraud.'],
        table: {
          head: ['', 'Really fraud', 'Really fine'],
          rows: [
            ['Model flagged', '40 true positives', '20 false positives (good customers blocked)'],
            ['Model allowed', '10 false negatives (fraud missed)', '930 true negatives'],
          ],
        },
        callout: { label: 'Why accuracy misleads', text: 'This model is 97% accurate, but a model that flags nothing at all is 95% accurate. When the thing you are looking for is rare, accuracy hides the mistakes that matter.' },
      },
      {
        id: 'precision-recall',
        title: 'Precision and recall',
        cards: [
          { title: 'Precision: when we flag, are we right?', text: 'Of everything the model flagged, how much was really positive? Here: 40 of 60, so 67%.', note: 'How many innocent users are we bothering?', noteLabel: 'Ask' },
          { title: 'Recall: did we find them all?', text: 'Of all the real positives, how many did the model catch? Here: 40 of 50, so 80%.', note: 'How many real cases are we missing?', noteLabel: 'Ask' },
        ],
        cardCols: 2,
        quote: 'Precision and recall pull against each other. Raise the threshold and precision usually goes up while recall goes down. The PM decides which matters more.',
      },
      {
        id: 'choosing',
        title: 'Which one matters more?',
        table: {
          head: ['Product', 'Favour', 'Why'],
          rows: [
            ['Cancer screening', 'Recall', 'Missing a real case is far worse than an extra test.'],
            ['Spam filter', 'Precision', 'Hiding a real email is worse than letting one spam through.'],
            ['Fraud blocking', 'Balance, with review', 'Both mistakes cost money; send uncertain cases to a human.'],
            ['Knowledge assistant citing sources', 'Precision', 'A wrong cited answer destroys trust faster than saying “I don’t know”.'],
          ],
        },
      },
    ],
    quiz: {
      title: 'Precision or recall?',
      options: ['Precision matters more', 'Recall matters more'],
      questions: [
        { q: 'A tool flags job applicants for automatic rejection.', answer: 0, why: 'Wrongly rejecting a good candidate is costly and unfair, so when it flags, it must be right.' },
        { q: 'A child-safety filter detects harmful content before it reaches young users.', answer: 1, why: 'Missing harmful content is the worst outcome, so catch as much as possible and review the extra flags.' },
        { q: 'A bank’s app shows “Possible duplicate payment?” before you pay. The user can dismiss it in one tap.', answer: 1, why: 'A false alarm costs one tap, but a missed duplicate costs real money, so favour catching them.' },
        { q: 'A model picks which customers get an expensive retention offer.', answer: 0, why: 'Each offer costs money, so you want the people you target to really be at risk of leaving.' },
      ],
    },
    exercise: {
      title: 'Write a metric choice memo',
      intro: 'Pick a high-impact AI decision, from your work or your capstone. Write a short memo a stakeholder could approve.',
      capstone: true,
      fields: [
        { key: 'decision', label: 'The decision the model supports', rows: 2 },
        { key: 'fp', label: 'What a false positive costs, and who pays', rows: 2 },
        { key: 'fn', label: 'What a false negative costs, and who pays', rows: 2 },
        { key: 'choice', label: 'Which metric do you prioritise?', choices: ['Precision', 'Recall', 'A balance of both'] },
        { key: 'why', label: 'Your reasoning, the minimum acceptable level, and what happens to uncertain cases', rows: 3 },
      ],
      rubric: 'Check that false positive and false negative are correctly defined for their decision, the costs name who is affected, the chosen metric follows from the costlier mistake, a target level or guardrail is given, and uncertain cases have a fallback such as human review.',
      button: 'Review my memo',
    },
    completion: [
      'I can read a confusion matrix.',
      'I can explain precision and recall without jargon.',
      'I completed the four questions.',
      'I wrote a metric choice memo for one decision.',
    ],
    takeaway: 'accuracy alone hides the mistakes that matter. Name the cost of each mistake, then choose precision or recall on purpose.',
  },

  8: {
    intro: 'A model that scores well in testing can still fail with real users. Today you learn why.',
    objectives: [
      'Explain overfitting and underfitting with an everyday analogy.',
      'Explain why the test data must be kept separate from training data.',
      'Recognise when real-world data has drifted away from the training data.',
    ],
    parts: [
      {
        id: 'fit',
        title: 'Memorising vs understanding',
        cards: [
          { title: 'Underfitting', text: 'The model is too simple to capture the pattern. It does badly in testing and in real use.', example: 'A student who only learned “the answer is usually C”.' },
          { title: 'Good fit', text: 'The model learns the general pattern and handles new examples well.', example: 'A student who understands the concepts and can solve new problems.' },
          { title: 'Overfitting', text: 'The model memorises the training examples, including their noise. It looks great on familiar data and fails on new data.', example: 'A student who memorised last year’s paper and panics at new questions.' },
        ],
        cardCols: 3,
      },
      {
        id: 'held-out',
        title: 'Why test data must be kept apart',
        paragraphs: [
          'Teams train on one part of the data and test on a separate part the model has never seen. If the test data leaks into training, the score is meaningless, like giving students the exam in advance.',
          'You do not need to know how the split is done. You need to ask: “Was this score measured on data the model never saw, and does that data look like our real users?”',
        ],
        callout: { tone: 'amber', label: 'Red flag', text: 'A demo that works perfectly on hand-picked examples tells you almost nothing. Ask to see results on a fresh, realistic sample, including the failures.' },
      },
      {
        id: 'drift',
        title: 'When the world changes',
        bullets: [
          { term: 'Data drift', text: 'The inputs change. A new city launches, a new product category appears, or users start writing in a different language.' },
          { term: 'Concept drift', text: 'The meaning changes. What counted as fraud last year is different now because fraudsters adapted.' },
          { term: 'Seasonal shifts', text: 'Festive sales, exam season, or monsoon change behaviour for weeks at a time.' },
        ],
        quote: 'Generalisation is not a one-time test. A PM plans for monitoring, so the team notices when real-world performance starts to slip.',
      },
    ],
    quiz: {
      title: 'Diagnose the problem',
      options: ['Overfitting', 'Underfitting', 'Data drift', 'Test data leaked'],
      questions: [
        { q: 'A demand-forecast model is 98% accurate on last year’s data but badly wrong on this month’s orders, even though nothing changed in the business.', answer: 0, why: 'It memorised the training period instead of learning patterns that carry over.' },
        { q: 'A delivery-time model trained in Bengaluru gets worse after the app launches in hill towns.', answer: 2, why: 'The new inputs (roads, distances, weather) look different from the training data.' },
        { q: 'A simple model predicts the same delivery time for every order, and it is poor in both testing and production.', answer: 1, why: 'It is too simple to capture the pattern at all.' },
        { q: 'The team reports 99% accuracy, then you learn the test set contained the same customers as the training set.', answer: 3, why: 'The model was tested on examples it had effectively already seen, so the score is inflated.' },
      ],
    },
    exercise: {
      title: 'Build a model failure checklist',
      intro: 'Write the questions you would ask before trusting a model’s test results and after launch. Apply them to your capstone.',
      capstone: true,
      fields: [
        { key: 'testing', label: 'Before launch: three questions about how the model was tested', rows: 3 },
        { key: 'users', label: 'Which users or situations might be missing from the training data?', rows: 2 },
        { key: 'drift', label: 'What could change after launch and cause drift?', rows: 2 },
        { key: 'monitor', label: 'What would you monitor, and what would trigger a review?', rows: 3 },
      ],
      rubric: 'Check that testing questions cover held-out data, realistic samples, and failure examples; that missing users or situations are specific; that drift sources are realistic for their product; and that monitoring names a measurable signal with a trigger.',
      button: 'Review my checklist',
    },
    completion: [
      'I can explain overfitting and underfitting with an analogy.',
      'I know why test data must be kept separate.',
      'I completed the four questions.',
      'I wrote a model failure checklist for my capstone.',
    ],
    takeaway: 'a test score is only as good as the test. Ask what data it was measured on, and plan to watch for drift after launch.',
  },

  9: {
    intro: 'You don’t need to build a neural network, but you do need a mental model of one to work with ML teams.',
    objectives: [
      'Explain what a neural network does in five plain sentences.',
      'Describe layers, weights, and representations without maths.',
      'Explain why neural networks need lots of data and are hard to explain.',
    ],
    parts: [
      {
        id: 'mental-model',
        title: 'A useful mental model',
        paragraphs: [
          'A neural network is a large set of adjustable dials (weights) arranged in layers. Data goes in one end, passes through the layers, and a prediction comes out the other end.',
          'During training, the network adjusts its dials a tiny amount after each example, so its predictions get a little closer to the right answers.',
        ],
        cards: [
          { title: 'Input layer', text: 'Takes in the raw data: pixels of an image, words of a sentence, or numbers from a table.' },
          { title: 'Hidden layers', text: 'Each layer transforms the data into a more useful form. Early layers spot simple patterns; later layers combine them into complex ones.' },
          { title: 'Output layer', text: 'Produces the prediction: a category score, a number, or the next word.' },
        ],
        cardCols: 3,
      },
      {
        id: 'representations',
        title: 'Learning representations',
        paragraphs: [
          'In a photo model, early layers learn edges, middle layers learn shapes such as eyes and wheels, and later layers learn whole objects such as faces and cars. Nobody programs these steps; the network learns them from examples.',
          'This is why neural networks work so well on images, audio, and language, where writing the rules by hand is almost impossible.',
        ],
        callout: { tone: 'violet', label: 'Connection to LLMs', text: 'Large language models are very large neural networks trained on text. You will study them from Day 15.' },
      },
      {
        id: 'implications',
        title: 'What this means for a PM',
        table: {
          head: ['Property', 'Product implication'],
          rows: [
            ['Millions or billions of weights', 'Needs a lot of data and computing power to train; usually you use an existing model.'],
            ['Learns its own features', 'Works on messy inputs like photos and text, but you can’t easily see why it decided something.'],
            ['Hard to explain', 'Risky for decisions that must be justified, such as loans or hiring. You may need simpler models or human review.'],
            ['Confident when wrong', 'Can give a high score to a strange input it has never seen. Plan for checks and fallbacks.'],
          ],
        },
      },
    ],
    quiz: {
      title: 'Check your mental model',
      questions: [
        { q: 'What are “weights” in a neural network?', options: ['The labels in the training data', 'Adjustable numbers the network tunes during training', 'The size of the dataset'], answer: 1, why: 'Weights are the dials the network adjusts so its predictions improve.' },
        { q: 'Why do neural networks do well on photos and speech?', options: ['They follow hand-written rules', 'They learn useful patterns directly from raw data', 'They need very little data'], answer: 1, why: 'They learn layer by layer from examples, so nobody has to write rules for edges, shapes, or sounds.' },
        { q: 'A bank must explain to regulators why each loan was rejected. What is the main concern with a large neural network?', options: ['It is too slow to train', 'Its reasons are hard to explain', 'It cannot use numbers'], answer: 1, why: 'Its decision is spread across millions of weights, so a clear reason is hard to give. Simpler models or extra explanation tools may be needed.' },
        { q: 'For most product teams today, what is the usual way to use a large neural network?', options: ['Train one from scratch', 'Use or adapt an existing pretrained model', 'Write its layers by hand'], answer: 1, why: 'Training large models is very expensive; most teams use existing models, sometimes adapted to their data.' },
      ],
    },
    exercise: {
      title: 'Explain it in five sentences',
      intro: 'Write a five-sentence explanation of a neural network for a non-technical stakeholder, such as a sales head, then name one product implication.',
      fields: [
        { key: 'audience', label: 'Who is your audience?', rows: 1, placeholder: 'e.g. Our head of sales' },
        { key: 'explanation', label: 'Your five-sentence explanation', rows: 6 },
        { key: 'implication', label: 'One implication for a product you know', rows: 2 },
      ],
      rubric: 'Check that the explanation is accurate (layers, adjustable weights, learning from examples, prediction output), avoids jargon or explains it, fits the named audience, stays within about five sentences, and that the implication is a real product consequence such as data needs, explainability, or confident errors.',
      button: 'Review my explanation',
    },
    completion: [
      'I can describe layers and weights in plain language.',
      'I can explain why neural networks are hard to explain.',
      'I completed the four questions.',
      'I wrote a five-sentence explanation for a stakeholder.',
    ],
    takeaway: 'a neural network is layers of adjustable weights that learn patterns from examples. That power comes with big data needs and decisions that are hard to explain.',
  },

  10: {
    intro: 'Yesterday you saw what a neural network is. Today you see how it learns.',
    objectives: [
      'Explain what a loss function measures.',
      'Describe the train, evaluate, adjust loop in plain language.',
      'Explain why “what you measure is what you get” applies to model training.',
    ],
    parts: [
      {
        id: 'loss',
        title: 'Loss: a score for being wrong',
        paragraphs: [
          'Training needs a way to tell the model how wrong it is. That measurement is called the loss. A high loss means the predictions are far from the right answers; a low loss means they are close.',
          'Training is the process of changing the weights so the loss goes down.',
        ],
        callout: { label: 'Analogy', text: 'A loss function is like a coach’s scorecard. The player only improves at what the scorecard measures.' },
      },
      {
        id: 'descent',
        title: 'Gradient descent: walking downhill',
        paragraphs: [
          'Imagine standing on a foggy hill and trying to reach the valley. You can’t see far, so you feel which way the ground slopes and take a small step downhill. Repeat thousands of times and you reach low ground.',
          'Gradient descent does the same: after each batch of examples, it nudges every weight a little in the direction that reduces the loss. The size of each step is the learning rate.',
        ],
        bullets: [
          { term: 'Steps too big', text: 'Training jumps around and never settles.' },
          { term: 'Steps too small', text: 'Training takes far too long and costs more.' },
        ],
      },
      {
        id: 'loop',
        title: 'The training loop and what it means for PMs',
        table: {
          head: ['Step', 'What happens', 'PM implication'],
          rows: [
            ['1. Train', 'The model learns from training data and lowers its loss.', 'Costs compute time and money; big models can take weeks.'],
            ['2. Evaluate', 'The team checks results on held-out data.', 'Ask for metrics that match the product goal, not just loss.'],
            ['3. Adjust', 'They change data, settings, or the model, then train again.', 'Iteration takes time; plan milestones around experiments, not fixed dates.'],
          ],
        },
        quote: 'A model optimises exactly what its loss measures. If the loss rewards clicks, the model learns clicks. The PM’s job is to make sure the measured goal matches the real user goal.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'What does a loss function do?', options: ['Stores the training data', 'Measures how wrong the model’s predictions are', 'Decides the product threshold'], answer: 1, why: 'Loss is the score for being wrong; training tries to lower it.' },
        { q: 'In gradient descent, what is the learning rate?', options: ['How fast users adopt the feature', 'The size of each adjustment step', 'The model’s accuracy'], answer: 1, why: 'It controls how big each nudge to the weights is.' },
        { q: 'A video app trains its ranking model to maximise watch time. What is the main risk?', options: ['Training will be too fast', 'It learns to promote addictive content even if users feel worse', 'The model will ignore watch time'], answer: 1, why: 'The model optimises exactly what is measured, which may not match real user value.' },
        { q: 'An engineer says a new model will be ready “after a few training runs”. What is the best PM response?', options: ['Set a fixed launch date now', 'Agree on the evaluation metric and plan milestones around experiment results', 'Skip evaluation to save time'], answer: 1, why: 'Training is iterative; agree what “good enough” means and plan around results.' },
      ],
    },
    exercise: {
      title: 'Sketch the loop for your capstone',
      intro: 'Describe the train, evaluate, adjust loop for one model-driven part of your capstone, and the product implications at each step.',
      capstone: true,
      fields: [
        { key: 'goal', label: 'What should the model get good at? (the real user goal)', rows: 2 },
        { key: 'measure', label: 'What would you measure during evaluation?', rows: 2 },
        { key: 'mismatch', label: 'How could the measured goal drift from the real user goal?', rows: 2 },
        { key: 'plan', label: 'How would you plan milestones and decide “good enough”?', rows: 3 },
      ],
      rubric: 'Check that the user goal is concrete, the evaluation measure is observable and tied to that goal, they identify a realistic way the proxy could diverge from real value, and the plan uses experiment results and a clear “good enough” bar rather than fixed dates alone.',
      button: 'Review my loop',
    },
    completion: [
      'I can explain loss and gradient descent with an analogy.',
      'I can describe the train, evaluate, adjust loop.',
      'I completed the four questions.',
      'I sketched the loop and its risks for my capstone.',
    ],
    takeaway: 'training lowers whatever the loss measures. Make sure that measure matches what users actually need.',
  },

  11: {
    intro: 'Training happens once in a while; inference happens every time a user asks for something. They cost money in different ways.',
    objectives: [
      'Distinguish training (learning) from inference (making predictions).',
      'Explain where latency and cost come from in an AI feature.',
      'Make basic trade-offs between speed, cost, and quality.',
    ],
    parts: [
      {
        id: 'two-phases',
        title: 'Two phases in a model’s life',
        cards: [
          { title: 'Training (learning)', text: 'The model adjusts its weights using lots of examples. Backpropagation is the method that works out how to adjust each weight.', example: 'Done occasionally, by the team or the model provider. Can take hours to weeks.', note: 'Cost: a large, one-off bill per training run.', noteLabel: 'Cost' },
          { title: 'Inference (predicting)', text: 'The trained model, with weights fixed, takes a new input and produces an output.', example: 'Happens every time a user searches, asks a question, or loads a feed.', note: 'Cost: a small cost per request that grows with usage.', noteLabel: 'Cost' },
        ],
        cardCols: 2,
        callout: { label: 'Key point', text: 'The model does not learn from each user request during inference. If it seems to “remember”, that is the product storing data and sending it back in, not the model retraining.' },
      },
      {
        id: 'latency-cost',
        title: 'Where latency and cost come from',
        bullets: [
          { term: 'Model size', text: 'Bigger models are usually better, but slower and more expensive per request.' },
          { term: 'Input and output length', text: 'For LLMs, cost and time grow with the number of tokens in and out.' },
          { term: 'Extra steps', text: 'Retrieval, tool calls, and safety checks each add time.' },
          { term: 'Traffic', text: 'More users means more requests; costs scale with usage.' },
        ],
        table: {
          head: ['Feature', 'Latency users accept'],
          rows: [
            ['Search-as-you-type', 'Under about 200 milliseconds'],
            ['Chat reply', 'A first word within a second or two, then streaming'],
            ['Report or document generation', 'Tens of seconds, with a progress indicator'],
          ],
        },
      },
      {
        id: 'tradeoffs',
        title: 'Levers a PM can pull',
        bullets: [
          { text: 'Use a smaller, faster model for simple requests and a larger one only when needed.' },
          { text: 'Cache common answers so repeated questions are cheap and instant.' },
          { text: 'Stream output so users see progress while the rest is generated.' },
          { text: 'Run slow work in the background and notify users when it is ready.' },
        ],
        quote: 'Inference cost is a per-user cost. Before launch, estimate the cost per active user per month and check it against what the feature earns or saves.',
      },
    ],
    quiz: {
      title: 'Training or inference?',
      options: ['Training', 'Inference'],
      questions: [
        { q: 'A user asks a chatbot a question and gets a reply.', answer: 1, why: 'The trained model is producing an output for a new input.' },
        { q: 'The team updates the fraud model using the last three months of labelled transactions.', answer: 0, why: 'The model’s weights are being adjusted using examples.' },
        { q: 'Your monthly AI bill doubles after a marketing campaign doubles daily active users.', answer: 1, why: 'Inference costs scale with the number of requests.' },
        { q: 'A provider spends weeks and millions of dollars building a new version of its model.', answer: 0, why: 'This is a large, one-off training run.' },
      ],
    },
    exercise: {
      title: 'Explain latency and cost for a feature',
      intro: 'Write a short explainer for your team on where latency and cost appear in your capstone, and how you would control them.',
      capstone: true,
      fields: [
        { key: 'flow', label: 'What happens on each user request? (the inference steps)', rows: 3 },
        { key: 'latency', label: 'What latency would users accept, and which step is slowest?', rows: 2 },
        { key: 'cost', label: 'What drives cost per request, and a rough monthly estimate', rows: 2, placeholder: 'e.g. 500 employees × 10 questions a day × cost per question' },
        { key: 'levers', label: 'Two levers you would use to cut latency or cost', rows: 2 },
      ],
      rubric: 'Check that the request flow lists realistic steps (such as retrieval, model call, checks), the latency target fits the interaction, cost drivers are named with a usage-based estimate, and the levers (smaller model, caching, streaming, background work) fit the bottleneck they identified.',
      button: 'Review my explainer',
    },
    completion: [
      'I can explain training vs inference.',
      'I can name what drives latency and cost per request.',
      'I completed the four questions.',
      'I estimated latency and cost for my capstone.',
    ],
    takeaway: 'training is a one-off bill; inference is a per-request bill that grows with users. Design for both speed and cost from day one.',
  },

  12: {
    intro: 'Deep learning is powerful, but it is not always the right answer. Today you learn to compare it with a simple baseline.',
    objectives: [
      'Explain where deep learning works best and where it struggles.',
      'Build a simple rules or heuristic baseline before proposing ML.',
      'Compare options on quality, cost, explainability, and maintenance.',
    ],
    parts: [
      {
        id: 'strengths',
        title: 'Where deep learning shines',
        bullets: [
          { term: 'Unstructured data', text: 'Images, audio, video, and free text.' },
          { term: 'Huge amounts of data', text: 'Millions of examples with clear patterns.' },
          { term: 'Patterns too complex for rules', text: 'Recognising a face, transcribing speech, understanding a question.' },
        ],
      },
      {
        id: 'limits',
        title: 'Where it struggles',
        cards: [
          { title: 'Sparse data', text: 'Few examples, especially of rare cases, so it can’t learn reliably.', example: 'Predicting failures of a machine that has broken down only five times.' },
          { title: 'Biased data', text: 'It copies patterns in the data, including unfair ones.', example: 'A hiring model trained on past hires that favoured one group.' },
          { title: 'Changing data', text: 'The world shifts and yesterday’s patterns stop working.', example: 'Fraudsters change tactics after a new model launches.' },
          { title: 'Needs explanations', text: 'Its reasoning is hard to show to users or regulators.', example: 'Telling a customer exactly why their loan was declined.' },
        ],
        cardCols: 2,
      },
      {
        id: 'baseline',
        title: 'Always start with a baseline',
        paragraphs: [
          'A baseline is the simplest thing that could work: a rule, a sort order, or a heuristic. It sets the bar. If ML can’t clearly beat it, the extra cost and risk are not worth it.',
        ],
        table: {
          head: ['', 'Rules baseline', 'ML option'],
          rows: [
            ['Example', 'Flag orders over ₹50,000 from new accounts', 'Fraud model using 40 signals'],
            ['Quality', 'Catches obvious cases, misses clever ones', 'Catches more, if data is good'],
            ['Cost to build', 'Days', 'Weeks to months, plus data work'],
            ['Explainability', 'Clear', 'Harder'],
            ['Maintenance', 'Rules pile up over time', 'Needs monitoring and retraining'],
          ],
        },
        quote: 'A good PM can say: “Here is what a simple rule achieves, here is what ML would add, and here is whether that gain is worth the cost.”',
      },
    ],
    quiz: {
      title: 'Rules or deep learning?',
      options: ['Start with rules', 'Deep learning is a good fit'],
      questions: [
        { q: 'Detect whether an uploaded photo contains a person’s face.', answer: 1, why: 'Images are unstructured and face patterns are too complex for hand-written rules.' },
        { q: 'Give free delivery on orders above ₹499.', answer: 0, why: 'The logic is clear and fixed; a rule is exact and cheap.' },
        { q: 'Predict which of a factory’s 3 machines will fail, using 4 past failures.', answer: 0, why: 'There is far too little data for deep learning; start with maintenance rules and expert judgement.' },
        { q: 'Transcribe customer support calls into text.', answer: 1, why: 'Speech is unstructured audio; deep learning models do this well.' },
      ],
    },
    exercise: {
      title: 'Compare a baseline with ML',
      intro: 'Pick one problem in your capstone. Describe a simple baseline and an ML option, then make a recommendation.',
      capstone: true,
      example: [
        { label: 'Problem', text: 'Find the right document for an employee’s question.' },
        { label: 'Baseline', text: 'Keyword search over document titles and headings.' },
        { label: 'ML option', text: 'Semantic search with embeddings plus an LLM answer.' },
        { label: 'Recommendation', text: 'Launch keyword search first to collect real questions, then add semantic search where keyword search fails.' },
      ],
      fields: [
        { key: 'problem', label: 'The problem', rows: 1 },
        { key: 'baseline', label: 'A simple rules or heuristic baseline', rows: 2 },
        { key: 'ml', label: 'The ML option', rows: 2 },
        { key: 'compare', label: 'Compare them on quality, cost, explainability, and maintenance', rows: 3 },
        { key: 'recommend', label: 'Your recommendation and the evidence that would change it', rows: 2 },
      ],
      rubric: 'Check that the baseline is genuinely simple and workable, the ML option is realistic, the comparison covers quality, cost, explainability and maintenance, and the recommendation follows from it with a clear condition for switching approach.',
      button: 'Review my comparison',
    },
    completion: [
      'I can name where deep learning shines and where it struggles.',
      'I understand why a baseline comes first.',
      'I completed the four questions.',
      'I compared a baseline with an ML option for my capstone.',
    ],
    takeaway: 'deep learning earns its place only when it clearly beats a simple baseline by enough to justify its cost and risk.',
  },

  13: {
    intro: 'Every AI system fails sometimes. A PM’s job is to know how it will fail and plan for it before launch.',
    objectives: [
      'Recognise six common AI failure modes.',
      'Explain why silent failures are the most dangerous.',
      'Build a risk register with likelihood, impact, detection, and mitigation.',
    ],
    parts: [
      {
        id: 'failure-modes',
        title: 'Six common failure modes',
        cards: [
          { title: 'Bias', text: 'Performs worse for some groups because of skewed data or labels.', example: 'Voice recognition that struggles with regional accents.' },
          { title: 'Drift', text: 'Real-world data changes and performance slowly drops.', example: 'A pricing model trained before a market shift.' },
          { title: 'Poor calibration', text: 'Its confidence doesn’t match reality: it says 90% sure but is right 60% of the time.', example: 'An assistant that sounds certain while being wrong.' },
          { title: 'Data leakage', text: 'It saw the answer during training, so test scores were fake.', example: 'The churn model using “cancellation reason” from Day 4.' },
          { title: 'Brittleness', text: 'Small, unusual changes to the input break it.', example: 'A typo or a new product name confuses a classifier.' },
          { title: 'Silent failure', text: 'It is wrong, but nothing alerts anyone, so harm builds up.', example: 'A recommender quietly showing stale items for weeks.' },
        ],
        cardCols: 2,
      },
      {
        id: 'silent',
        title: 'Why silent failure is the worst',
        paragraphs: [
          'A crash is obvious and gets fixed. A model that is quietly wrong keeps running. Users lose trust, make bad decisions, or leave, and the team only notices when a metric drops weeks later.',
        ],
        callout: { tone: 'amber', label: 'PM habit', text: 'For every AI feature, ask: “If this started giving wrong answers tomorrow, how would we find out, and how fast?”' },
      },
      {
        id: 'register',
        title: 'The risk register',
        paragraphs: ['A risk register lists what could go wrong and what you will do about it. It is a simple table that stakeholders can review.'],
        table: {
          head: ['Risk', 'Likelihood', 'Impact', 'How we detect it', 'Mitigation'],
          rows: [
            ['Assistant cites an outdated policy', 'Medium', 'High', 'Weekly check of top questions; “report wrong answer” button', 'Show document dates; owners review documents quarterly'],
            ['Answers worse for non-English questions', 'Medium', 'Medium', 'Track ratings by language', 'Test with Hindi and Hinglish questions before launch'],
          ],
        },
      },
    ],
    quiz: {
      title: 'Name the failure mode',
      options: ['Bias', 'Drift', 'Poor calibration', 'Silent failure'],
      questions: [
        { q: 'A loan model approves applicants from one region far less often, even with similar finances.', answer: 0, why: 'It performs unfairly for a group, likely because of skewed historical data.' },
        { q: 'A model says it is 95% confident on most predictions, but is right only 70% of the time.', answer: 2, why: 'Its confidence doesn’t match reality.' },
        { q: 'A product-search model gets slowly worse as new brands are added to the catalogue.', answer: 1, why: 'The inputs have changed since training.' },
        { q: 'A tagging model has mislabelled 20% of tickets for a month, and nobody noticed until a quarterly review.', answer: 3, why: 'It was wrong, but nothing alerted anyone.' },
      ],
    },
    exercise: {
      title: 'Build a risk register for your capstone',
      intro: 'List the three most important risks for your capstone. For each, give likelihood, impact, how you would detect it, and how you would reduce it.',
      capstone: true,
      fields: [
        { key: 'risk1', label: 'Risk 1: what, likelihood, impact, detection, mitigation', rows: 3 },
        { key: 'risk2', label: 'Risk 2: what, likelihood, impact, detection, mitigation', rows: 3 },
        { key: 'risk3', label: 'Risk 3: what, likelihood, impact, detection, mitigation', rows: 3 },
        { key: 'silent', label: 'Which risk could fail silently, and what alert would catch it?', rows: 2 },
      ],
      rubric: 'Check that the risks are specific to their product and draw on real failure modes (bias, drift, calibration, leakage, brittleness, silent failure), that each has a likelihood, impact, a concrete detection method, and a practical mitigation, and that the silent-failure answer names a measurable alert.',
      button: 'Review my risk register',
    },
    completion: [
      'I can name six AI failure modes with examples.',
      'I can explain why silent failure is the most dangerous.',
      'I completed the four questions.',
      'I built a three-risk register for my capstone.',
    ],
    takeaway: 'plan for failure before launch. For every risk, know how you will detect it, not just how you will prevent it.',
  },

  14: {
    intro: 'This is Gate 1. Today you pull Phase 1 together and check you are ready for LLMs and generative AI.',
    objectives: [
      'Explain the core AI/ML concepts from Days 1–13 in your own words.',
      'Distinguish model training from inference.',
      'Defend an approach choice (rules, predictive ML, or GenAI) for a real problem.',
    ],
    parts: [
      {
        id: 'recap',
        title: 'Phase 1 in one page',
        table: {
          head: ['Concept', 'The PM version'],
          rows: [
            ['AI vs traditional software (Day 2)', 'Use rules when logic is clear; ML to predict from data; GenAI to understand or create language.'],
            ['Types of ML (Day 3)', 'Supervised needs labels, unsupervised finds patterns, reinforcement learns from rewards.'],
            ['Data and labels (Day 4)', 'Check data is enough, representative, fresh, and consistently labelled; watch for leakage.'],
            ['Scores and thresholds (Day 5)', 'The model scores; the product sets the threshold based on which mistake costs more.'],
            ['Ranking (Day 6)', 'What you optimise is what users see.'],
            ['Precision and recall (Day 7)', 'Choose based on the cost of false positives vs false negatives.'],
            ['Generalisation (Day 8)', 'Test on unseen, realistic data and monitor for drift.'],
            ['Neural networks and training (Days 9–10)', 'Layers of weights that learn by lowering a loss; they learn what you measure.'],
            ['Training vs inference (Day 11)', 'Training is a one-off bill; inference is per request and grows with users.'],
            ['Baselines and failure modes (Days 12–13)', 'Beat a simple baseline first; plan how you will detect failures.'],
          ],
        },
      },
      {
        id: 'gate',
        title: 'How the gate works',
        bullets: [
          { text: 'Take the self-check below. Aim for at least 5 of 6; revisit the days behind any you miss.' },
          { text: 'Submit your one-page AI landscape map, building on Day 1, with an approach rationale for each problem.' },
          { text: 'Tick the Phase 1 checklist at the bottom of the page only when every item is honestly true.' },
        ],
        callout: { label: 'Why gates matter', text: 'Phase 2 builds directly on these ideas. A gap here turns into confusion about LLMs, RAG, and evals later.' },
      },
    ],
    quiz: {
      title: 'Phase 1 self-check',
      questions: [
        { q: 'A store applies a fixed 10% discount to orders over ₹2,000. What should it use?', options: ['Traditional rules', 'Predictive ML', 'Generative AI'], answer: 0, why: 'The logic is fixed and known; a rule is exact and cheap (Day 2).' },
        { q: 'You want to group users by behaviour, with no predefined segments.', options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning'], answer: 1, why: 'There are no labels; you are finding structure (Day 3).' },
        { q: 'A churn model uses a field that is only filled in after a customer cancels.', options: ['Overfitting', 'Leakage', 'Underfitting'], answer: 1, why: 'The model sees information that won’t exist at prediction time (Day 4).' },
        { q: 'Wrongly blocking a paying customer is very costly. Which metric should you favour?', options: ['Precision', 'Recall'], answer: 0, why: 'When the model flags, it must be right (Day 7).' },
        { q: 'Your AI bill rises every month as users grow. Which phase drives this cost?', options: ['Training', 'Inference'], answer: 1, why: 'Inference costs scale with requests (Day 11).' },
        { q: 'A model has been quietly wrong for weeks with no alert. What is this called?', options: ['Silent failure', 'Calibration', 'Cold start'], answer: 0, why: 'It failed without anyone noticing (Day 13).' },
      ],
    },
    exercise: {
      title: 'Submit your AI landscape map',
      intro: 'Revisit the landscape map you started on Day 1. For three product problems, one of them from your capstone, state the approach and defend it with what you learned in Phase 1.',
      capstone: true,
      fields: [
        { key: 'problem1', label: 'Problem 1: approach (rules, predictive ML, or GenAI) and why', rows: 3 },
        { key: 'problem2', label: 'Problem 2: approach and why', rows: 3 },
        { key: 'problem3', label: 'Capstone problem: approach, data needed, and the metric that matters', rows: 3 },
        { key: 'risk', label: 'The biggest risk across the three, and how you would detect it', rows: 2 },
      ],
      rubric: 'This is a gate review. Check that each approach choice is justified by the problem and the data available, that the simplest workable approach is preferred, that the capstone answer names its data and a metric tied to the cost of mistakes, and that the risk has a concrete detection method. Say clearly whether they look ready for Phase 2, and which day to revisit if not.',
      button: 'Review my gate submission',
    },
    completion: [
      'I scored at least 5 of 6 on the self-check, or revisited the days I missed.',
      'I submitted my landscape map with an approach rationale for each problem.',
      'I can explain training vs inference without notes.',
      'I ticked the Phase 1 checklist honestly.',
    ],
    takeaway: 'Phase 1 is about judgement, not maths: choose the simplest approach that works, know your data, and know how it will fail.',
  },
};
