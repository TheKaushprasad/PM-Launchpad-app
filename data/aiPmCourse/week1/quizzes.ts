import type { QuizQuestion } from '../levelTypes';

// Week 1 quizzes. Day 1, 2, 4 and 5 questions are the owner's own (from the "AI PM - 90 days" document);
// Day 1's explanations are the owner's too. Claude wrote the Day 0 and Day 3 quizzes, the correct answers for
// Day 2, 4 and 5, and their explanations. The owner should review those.

export const DAY0_QUIZ: QuizQuestion[] = [
  {
    q: 'Your team wants to send customer complaints to the right team. When is simple rule-based software the better choice than an AI classifier?',
    options: [
      { text: 'When complaints use predictable keywords and simple rules already route them well enough.', why: 'Right. Not every problem needs AI. If a rule works, the extra cost and uncertainty of AI are not justified.' },
      { text: 'Never. An AI classifier is always better because it understands meaning.', why: 'AI understands intent, but it adds cost, complexity and uncertainty. Sometimes a simple rule is better.' },
      { text: 'Whenever the company has a large AI budget.', why: 'Budget is not the test. The question is whether AI creates meaningful value over a simpler solution.' },
      { text: 'When you want the routing to give different answers each time.', why: 'Varying answers are a cost of AI, not a reason to choose it.' },
    ],
    answer: [0],
  },
  {
    q: 'An AI support assistant confidently tells customers an old refund policy. What should the AI PM check first?',
    options: [
      { text: 'Switch to the most powerful model available.', why: 'A bigger model will still repeat outdated documents. The problem may not be the model.' },
      { text: 'Whether the knowledge base the assistant uses has outdated policies.', why: "Right. Don't blame the model before investigating the data." },
      { text: 'Add a line to the prompt asking it to be more accurate.', why: 'A prompt cannot fix wrong source data. The assistant is repeating what it was given.' },
      { text: 'Turn off the assistant for good.', why: 'That skips the diagnosis. First find out whether the data, the retrieval or the model failed.' },
    ],
    answer: [1],
  },
  {
    q: 'Which of these is an AI quality metric, rather than a product metric or a system metric?',
    options: [
      { text: 'Customer satisfaction', why: 'This is a product metric.' },
      { text: 'Hallucination rate', why: 'Right. Answer accuracy, groundedness, hallucination rate and tool selection accuracy are AI quality metrics.' },
      { text: 'Cost per conversation', why: 'This is a system metric, along with latency, token usage and error rate.' },
      { text: 'Response latency', why: 'This is a system metric.' },
    ],
    answer: [1],
  },
];

export const DAY1_QUIZ: QuizQuestion[] = [
  {
    q: 'What primary characteristic distinguishes agentic AI from predictive AI and generative AI?',
    options: [
      { text: 'It outputs explicit actions to complete a given task independently.', why: "That's right! Agentic AI takes a task or destination as input and directly executes actions, such as navigating a vehicle or operating software applications." },
      { text: 'It relies on strict, hardcoded conditional statements written by human developers.', why: 'Following strict predefined rules characterizes legacy rules-based machines, whereas modern AI learns to process inputs independently.' },
      { text: 'It creates entirely new digital media such as text, images, or video.', why: 'Creating new media content like text or images is the defining feature of generative AI.' },
      { text: 'It labels and categorizes existing datasets based on historical patterns.', why: 'Labeling and categorizing based on prior data describes predictive AI rather than agentic AI.' },
    ],
    answer: [0],
  },
  {
    q: 'What major bottleneck regarding training data do researchers predict AI developers will encounter between 2026 and 2032?',
    options: [
      { text: 'Synthetic data will be legally banned across all commercial AI platforms.', why: 'Synthetic data is actively being explored as a key solution to data exhaustion rather than being prohibited.' },
      { text: 'Publicly available high-quality human-generated data will be completely exhausted.', why: "That's right! The rapid pace of AI development means companies will soon run out of usable public human data to train new models." },
      { text: 'Global server infrastructure will run out of physical digital storage space.', why: 'The critical issue highlighted by researchers is data availability and quality, not hardware storage limits.' },
      { text: 'Language models will become incapable of tokenizing natural human languages.', why: 'Tokenization is a fundamental mathematical representation of text and is unaffected by external data limits.' },
    ],
    answer: [1],
  },
  {
    q: 'How does a Large Language Model (LLM) generate response text when given a prompt?',
    options: [
      { text: 'By converting words into pixel grids and reversing random noise patterns.', why: 'Reversing noise in pixel grids is the core mechanism used by diffusion image generators.' },
      { text: 'By calculating and predicting the next numerical token in a sequence one at a time.', why: "That's right! LLMs apply mathematical parameters to input prompts to guess the most fitting sequence of tokens sequentially." },
      { text: 'By executing human-programmed decision trees to verify logical consistency.', why: 'LLMs rely on statistical token probabilities trained on massive text collections rather than human decision trees.' },
      { text: 'By searching a verified database of factual statements and retrieving matching answers.', why: 'LLMs are probabilistic text generators rather than truth lookup databases.' },
    ],
    answer: [1],
  },
];

export const DAY2_QUIZ: QuizQuestion[] = [
  {
    q: 'A data scientist builds a K-Nearest Neighbors (K-NN) model to predict house values. They initially set K=1, but notice the model performs exceptionally well on the training data while making significant errors on new, unseen test data. Which adjustment should be made to improve model generalization, and why?',
    options: [
      { text: 'Increase K, because a very small K value causes overfitting by making the model sensitive to noise in the training set.', why: 'Right. With K=1 the model copies its single nearest neighbour, noise included. Averaging over more neighbours smooths the prediction.' },
      { text: 'Decrease K to zero, because removing parameters converts the model from a non-parametric to a parametric estimator.', why: 'K cannot be zero: with no neighbours there is nothing to predict from.' },
      { text: 'Switch to K-Means clustering, because non-parametric algorithms are incapable of performing regression tasks.', why: 'K-Means is an unsupervised clustering method, and K-NN can do regression. Neither part of this is true.' },
      { text: 'Increase K to an extremely large number such as 1,000, because larger values of K continuously increase accuracy across all datasets.', why: 'A very large K underfits: every prediction drifts towards the average of the whole dataset.' },
    ],
    answer: [0],
  },
  {
    q: 'Which of the following statements correctly highlight differences between boosted tree algorithms and random forests?',
    multi: true,
    options: [
      { text: 'Boosted trees generally achieve higher accuracy than random forests, but they train slower due to their sequential process.', why: 'Correct. Boosting usually wins on accuracy, but each tree must wait for the previous one.' },
      { text: 'Each sequential tree in boosting focuses on correcting errors made by previous trees, whereas random forests combine predictions through voting or averaging.', why: 'Correct. This is the core difference between the two methods.' },
      { text: 'Boosted trees are less susceptible to overfitting than random forests because they randomly drop features at each split.', why: 'Not correct. Random forests are the ones that pick random features at each split, and boosting overfits more easily.' },
      { text: 'Boosted trees build decision trees in sequence, whereas random forests train multiple trees in parallel.', why: 'Correct. Random forest trees are independent, so they can be trained at the same time.' },
    ],
    answer: [0, 1, 3],
  },
  {
    q: 'In deep learning, how do multiple hidden layers within an artificial neural network improve its ability to perform complex tasks like handwritten digit recognition?',
    options: [
      { text: 'They restrict the model to strict linear relationships between raw inputs and target classes to prevent underfitting.', why: 'Hidden layers with activation functions let the network learn non-linear patterns, not only linear ones.' },
      { text: 'They perform implicit feature engineering by building higher-level abstract features from simpler lower-layer inputs.', why: 'Right. Early layers find edges, later layers combine them into strokes and shapes. This is why deep learning needs less manual feature engineering.' },
      { text: 'They cluster pixels into K unspecified groups based on geometric distance before making predictions.', why: 'That describes K-Means clustering, not a neural network.' },
      { text: "They apply Bayes' theorem across pixel inputs under the assumption that all features are independent.", why: 'That describes a Naive Bayes classifier, not a neural network.' },
    ],
    answer: [1],
  },
];

export const DAY3_QUIZ: QuizQuestion[] = [
  {
    q: 'At its core, what does an LLM do when it writes a reply?',
    options: [
      { text: 'It looks up the right answer in a stored database.', why: 'An LLM does not store a list of correct answers. Knowledge is spread across its parameters.' },
      { text: 'It predicts the next token, adds it to the text, and repeats.', why: 'Right. A chatbot is an LLM repeatedly predicting the next token within a conversation.' },
      { text: 'It follows rules that engineers wrote for each question.', why: 'LLMs learn patterns from data during training. Nobody writes a rule per question.' },
      { text: 'It copies whole sentences from its training data.', why: 'It generates text token by token from learned probabilities, not by copying sentences.' },
    ],
    answer: [1],
  },
  {
    q: 'Why can the same prompt produce different answers?',
    options: [
      { text: 'The model forgets its training between requests.', why: 'The parameters stay the same during normal use.' },
      { text: 'The model uses controlled randomness, so it sometimes picks a probable alternative instead of the top token.', why: 'Right. This makes replies more natural and less repetitive, and it is why answers vary.' },
      { text: 'The model retrains itself after every request.', why: 'Training happens before release, not during each request.' },
      { text: 'The model reads the prompt in a random order.', why: 'The model reads the prompt in order. The variation comes from how the next token is chosen.' },
    ],
    answer: [1],
  },
  {
    q: 'What is the main job of Reinforcement Learning from Human Feedback (RLHF)?',
    options: [
      { text: 'To make the model smaller and cheaper to run.', why: 'RLHF changes how the model behaves, not its size or cost.' },
      { text: 'To add new facts after the model is released.', why: 'New facts come from context, such as RAG or tools, not from RLHF.' },
      { text: 'To use human judgements of responses to make the model more helpful, accurate and safe.', why: 'Right. It moves the model from "what text is likely" towards "what response is most useful for this user".' },
      { text: 'To turn words into numbers called embeddings.', why: 'Embeddings come from the model itself, not from RLHF.' },
    ],
    answer: [2],
  },
];

export const DAY4_QUIZ: QuizQuestion[] = [
  {
    q: 'Why do production large language models rely on tokenization algorithms like Byte Pair Encoding (BPE) rather than directly feeding raw bit or byte sequences into the neural network?',
    options: [
      { text: 'It reduces the self-attention matrix calculation complexity from quadratic to linear relative to context window size.', why: 'Attention cost is still quadratic in the number of tokens. Tokenization only makes the sequence shorter.' },
      { text: 'It compresses the input text into a shorter sequence of symbols, balancing sequence length constraints with vocabulary size.', why: 'Right. Raw bytes would make sequences very long. BPE merges frequent pieces into tokens, trading a bigger vocabulary for shorter sequences.' },
      { text: 'It guarantees that the model will never produce out-of-vocabulary terms or misspellings during inference.', why: 'Models can still misspell. Tokenization is one reason spelling tasks can be hard for them.' },
      { text: 'It converts discreet symbolic representations into continuous vectors before any linear layer processing occurs.', why: 'That is what the embedding step does, after tokenization.' },
    ],
    answer: [1],
  },
  {
    q: 'In standard Transformer architectures, why are positional encodings added to the input representations of tokens?',
    options: [
      { text: 'They enforce orthogonality between query and key vectors during multi-head attention projections.', why: 'Positional encodings carry order information. They do not force queries and keys apart.' },
      { text: 'They prevent hidden layer activations from vanishing or exploding as networks grow deeper.', why: 'That is the job of residual connections and layer normalization.' },
      { text: 'Self-attention operations and feed-forward layers are inherently permutation invariant, so without positional information, word order would be ignored.', why: 'Right. "Dog bites man" and "Man bites dog" would look the same without position information.' },
      { text: 'They dynamically restrict self-attention attention scores so tokens cannot look ahead to future steps.', why: 'That is causal masking, used in decoder-only models.' },
    ],
    answer: [2],
  },
  {
    q: 'What is a primary limitation associated with Reinforcement Learning from Human Feedback (RLHF) when optimizing language models?',
    options: [
      { text: 'The argmax token selection step prevents backpropagation during policy network gradient updates.', why: 'RL methods are used exactly because they can learn from sampled outputs. This is not the main limitation.' },
      { text: 'It requires human annotators to write complete, high-quality responses manually for every optimization step.', why: 'In RLHF people compare and rank responses. Writing full answers is what supervised fine-tuning needs.' },
      { text: 'It eliminates the need for supervised fine-tuning by allowing models to learn dialogue formatting directly from internet text.', why: 'RLHF usually comes after supervised fine-tuning, not instead of it.' },
      { text: 'The reward model acts as a lossy surrogate for human preference, allowing long RL optimization runs to discover adversarial outputs that game the reward function.', why: 'Right. The reward model only approximates what people want, so long optimization can find outputs that score well but are not actually better.' },
    ],
    answer: [3],
  },
];

export const DAY5_QUIZ: QuizQuestion[] = [
  {
    q: 'What is the recommended order for structuring a prompt when using the API?',
    options: [
      { text: 'Few-shot examples first, followed by strict guidelines, background documentation, and task context at the end.', why: 'The model should know the task before it reads examples and documents.' },
      { text: 'Dynamic content first, followed by few-shot examples, task description, and XML tag definitions.', why: 'Leaving the task description until late makes the earlier content harder to interpret.' },
      { text: 'Task description up front, context/content, detailed instructions, examples, and final reinforcement.', why: 'Right. Say what the task is, give the material, explain how to do it, show examples, then repeat the key rules.' },
      { text: 'Detailed step-by-step instructions first, followed by task summary, image payload, and response pre-fills.', why: 'Instructions make more sense after the task and the content are clear.' },
    ],
    answer: [2],
  },
  {
    q: 'When applying few-shot prompting, how are examples best incorporated to handle edge cases or complex scenarios?',
    options: [
      { text: 'Include multimodal inputs alongside step-by-step breakdown descriptions inside system prompt XML tags.', why: 'Right. Examples that show the input (including images) and walk through how to handle it, clearly tagged, teach edge cases best.' },
      { text: 'Replace the task description entirely with unannotated output examples.', why: 'Examples add to the task description. They do not replace it, and unexplained outputs are easy to misread.' },
      { text: 'Limit examples strictly to plain text statements while omitting visual data representations.', why: 'If the real inputs include images or tables, the examples should include them too.' },
      { text: 'Append user queries directly to the pre-filled response buffer.', why: 'The pre-filled response is for starting the answer, not for holding user queries.' },
    ],
    answer: [0],
  },
  {
    q: "What is the primary purpose of using 'pre-filled responses' in prompt design?",
    options: [
      { text: "To increase the model's maximum output token ceiling.", why: 'Pre-filling does not change output limits.' },
      { text: "To directly dictate the starting format of Claude's output and eliminate unwanted introductory preamble.", why: 'Right. Starting the reply yourself, for example with "{", forces the format and skips filler such as "Sure, here is...".' },
      { text: 'To override default safety guardrails during complex data processing.', why: 'Pre-filling is a formatting tool. It is not a way around safety rules.' },
      { text: 'To cache static system context across repeated user sessions.', why: 'That is prompt caching, a different feature.' },
    ],
    answer: [1],
  },
];
