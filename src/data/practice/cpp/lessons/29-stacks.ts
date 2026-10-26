import type { Lesson } from '../../types';

export const stacks: Lesson = {
  id: 'ds-stacks',
  title: 'Stacks',
  description: 'Implement a linked stack, then apply stacks to balanced delimiters, reversed strings, postfix expressions, large integer addition, and infix-to-postfix conversion. Based on Lecture 08 and Lab 5.',
  order: 29,
  topics: ['Stack', 'LIFO', 'Linked Stack', 'Balanced Delimiters', 'Postfix', 'Application of Stacks'],
  problems: [
    {
      id: 'ds-stack-push-top',
      title: '1. Linked Stack: Push and Top',
      difficulty: 'easy',
      description: `Complete both \`push(int value)\` and \`top(int& out) const\` in the linked stack.

\`push\` adds a new node at the front of the internal chain. \`top\` copies the top value into \`out\` and returns \`true\`, or returns \`false\` when the stack is empty without modifying \`out\`.

The driver pushes n values and prints the final top.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'First line: "Top: " followed by the top value, or "Top: none".',
      constraints: '0 <= n <= 1000',
      sampleInput: '3\n10 20 30',
      sampleOutput: 'Top: 30',
      testCases: [
        { input: '0', expectedOutput: 'Top: none' },
        { input: '1\n42', expectedOutput: 'Top: 42' },
        { input: '3\n10 20 30', expectedOutput: 'Top: 30' },
        { input: '5\n1 2 3 4 5', expectedOutput: 'Top: 5', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct StackNode {
    int value;
    StackNode* next;

    StackNode(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedStack {
public:
    StackNode* head;

    LinkedStack() {
        head = nullptr;
    }

    ~LinkedStack() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            StackNode* temp = head;
            head = head->next;
            delete temp;
        }
    }

    bool isEmpty() const {
        return head == nullptr;
    }

    void push(int value) {
        // TODO: add a new node on top
    }

    bool top(int& out) const {
        // TODO: copy the top value into out
        return false;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedStack stack;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        stack.push(value);
    }

    int value;
    if (stack.top(value)) {
        cout << "Top: " << value << endl;
    } else {
        cout << "Top: none" << endl;
    }

    return 0;
}`,
      hints: [
        'A linked stack only needs a head pointer.',
        'For push, set `node->next = head` and then `head = node`.',
        'For top, check `head == nullptr` before reading `head->value`.',
      ],
      topics: ['Stack', 'Linked Stack', 'Push', 'Top']
    },
    {
      id: 'ds-stack-pop-empty',
      title: '2. Linked Stack: Pop and IsEmpty',
      difficulty: 'easy',
      description: `Complete both \`bool pop(int& out)\` and \`bool isEmpty() const\`.

\`pop\` removes the top node, copies its value into \`out\`, and returns \`true\`. If the stack is empty, return \`false\`.

The driver performs q pops and prints each removed value.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q.',
      outputFormat: 'q lines with the popped values or "Empty". Final line: "Is empty: yes/no".',
      constraints: '0 <= n <= 1000, 0 <= q <= 1000',
      sampleInput: '3\n1 2 3\n4',
      sampleOutput: '3\n2\n1\nEmpty\nIs empty: yes',
      testCases: [
        { input: '3\n1 2 3\n4', expectedOutput: '3\n2\n1\nEmpty\nIs empty: yes' },
        { input: '0\n1', expectedOutput: 'Empty\nIs empty: yes' },
        { input: '2\n5 6\n1', expectedOutput: '6\nIs empty: no' },
        { input: '5\n10 20 30 40 50\n5', expectedOutput: '50\n40\n30\n20\n10\nIs empty: yes', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct StackNode {
    int value;
    StackNode* next;

    StackNode(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedStack {
public:
    StackNode* head;

    LinkedStack() {
        head = nullptr;
    }

    ~LinkedStack() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            StackNode* temp = head;
            head = head->next;
            delete temp;
        }
    }

    void push(int value) {
        StackNode* node = new StackNode(value);
        node->next = head;
        head = node;
    }

    bool isEmpty() const {
        // TODO: report whether the stack has no nodes
        return false;
    }

    bool pop(int& out) {
        // TODO: remove the top node and copy its value into out
        return false;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedStack stack;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        stack.push(value);
    }

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int value;
        if (stack.pop(value)) {
            cout << value << endl;
        } else {
            cout << "Empty" << endl;
        }
    }

    cout << "Is empty: " << (stack.isEmpty() ? "yes" : "no") << endl;
    return 0;
}`,
      hints: [
        '`isEmpty` is a single comparison with nullptr.',
        'In pop, save the top node, copy its value, advance head, then delete the saved node.',
        'Never dereference head when the stack is empty.',
      ],
      topics: ['Stack', 'Linked Stack', 'Pop', 'isEmpty']
    },
    {
      id: 'ds-stack-clear',
      title: '3. Linked Stack: Clear',
      difficulty: 'easy',
      description: `Complete only \`void clear()\`.

Delete every node and leave the stack empty. The destructor already calls \`clear()\`, so a correct implementation also releases all remaining nodes.

The driver pushes n values, clears the stack, and checks it.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'First line: "Is empty: yes/no". Second line: "Top: none" or the remaining top value.',
      constraints: '0 <= n <= 1000',
      sampleInput: '3\n10 20 30',
      sampleOutput: 'Is empty: yes\nTop: none',
      testCases: [
        { input: '3\n10 20 30', expectedOutput: 'Is empty: yes\nTop: none' },
        { input: '0', expectedOutput: 'Is empty: yes\nTop: none' },
        { input: '1\n5', expectedOutput: 'Is empty: yes\nTop: none' },
        { input: '5\n1 2 3 4 5', expectedOutput: 'Is empty: yes\nTop: none', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct StackNode {
    int value;
    StackNode* next;

    StackNode(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedStack {
public:
    StackNode* head;

    LinkedStack() {
        head = nullptr;
    }

    ~LinkedStack() {
        clear();
    }

    void clear() {
        // TODO: delete every node in the stack
    }

    void push(int value) {
        StackNode* node = new StackNode(value);
        node->next = head;
        head = node;
    }

    bool isEmpty() const {
        return head == nullptr;
    }

    bool top(int& out) const {
        if (head == nullptr) {
            return false;
        }
        out = head->value;
        return true;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedStack stack;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        stack.push(value);
    }

    stack.clear();
    cout << "Is empty: " << (stack.isEmpty() ? "yes" : "no") << endl;

    int value;
    if (stack.top(value)) {
        cout << "Top: " << value << endl;
    } else {
        cout << "Top: none" << endl;
    }

    return 0;
}`,
      hints: [
        'Save `head->next` before deleting `head`.',
        'Stop when head becomes null.',
      ],
      topics: ['Stack', 'Linked Stack', 'Memory Management']
    },
    {
      id: 'ds-stack-multipop',
      title: '4. Multipop',
      difficulty: 'medium',
      description: `Complete only \`int multipop(int k)\`.

Popular the top up to \`k\` values and return how many were actually removed. If the stack has fewer than k nodes, remove all of them. If k is 0 or negative, remove nothing.

The driver prints the removal count and the remaining top.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: k.',
      outputFormat: 'First line: "Popped: " followed by the count. Second line: "Top: " followed by the remaining top or "none".',
      constraints: '0 <= n <= 1000, -10 <= k <= 1000',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: 'Popped: 3\nTop: 2',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: 'Popped: 3\nTop: 2' },
        { input: '5\n1 2 3 4 5\n5', expectedOutput: 'Popped: 5\nTop: none' },
        { input: '5\n1 2 3 4 5\n10', expectedOutput: 'Popped: 5\nTop: none' },
        { input: '5\n1 2 3 4 5\n0', expectedOutput: 'Popped: 0\nTop: 5' },
        { input: '0\n2', expectedOutput: 'Popped: 0\nTop: none', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct StackNode {
    int value;
    StackNode* next;

    StackNode(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedStack {
public:
    StackNode* head;

    LinkedStack() {
        head = nullptr;
    }

    ~LinkedStack() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            StackNode* temp = head;
            head = head->next;
            delete temp;
        }
    }

    void push(int value) {
        StackNode* node = new StackNode(value);
        node->next = head;
        head = node;
    }

    bool isEmpty() const {
        return head == nullptr;
    }

    bool top(int& out) const {
        if (head == nullptr) {
            return false;
        }
        out = head->value;
        return true;
    }

    bool pop(int& out) {
        if (head == nullptr) {
            return false;
        }
        out = head->value;
        StackNode* temp = head;
        head = head->next;
        delete temp;
        return true;
    }

    int multipop(int k) {
        // TODO: pop up to k values and return the number removed
        return 0;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedStack stack;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        stack.push(value);
    }

    int k;
    cin >> k;

    cout << "Popped: " << stack.multipop(k) << endl;

    int value;
    if (stack.top(value)) {
        cout << "Top: " << value << endl;
    } else {
        cout << "Top: none" << endl;
    }

    return 0;
}`,
      hints: [
        'Loop while `k > 0` and the stack is not empty.',
        'Call `pop` inside the loop and count successful removals.',
        'Do not enter the loop for k <= 0.',
      ],
      topics: ['Stack', 'Multipop', 'LIFO']
    },
    {
      id: 'ds-stack-balanced',
      title: '5. Balanced Delimiters',
      difficulty: 'medium',
      description: `Complete only \`bool isBalanced(const string& text)\`.

Use a \`stack<char>\` to check that every \`(\`, \`[\`, and \`{\` is closed by the matching delimiter in the correct order. Ignore all other characters.

A closing delimiter with no matching opener, or an opener left unclosed, makes the text unbalanced.`,
      inputFormat: 'First line: a string with no spaces.',
      outputFormat: '"Balanced" or "Not balanced".',
      constraints: '1 <= text length <= 1000',
      sampleInput: '()[]{}',
      sampleOutput: 'Balanced',
      testCases: [
        { input: '()[]{}', expectedOutput: 'Balanced' },
        { input: '([{}])', expectedOutput: 'Balanced' },
        { input: '(]', expectedOutput: 'Not balanced' },
        { input: '((', expectedOutput: 'Not balanced' },
        { input: 'abc', expectedOutput: 'Balanced' },
        { input: ')(', expectedOutput: 'Not balanced', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isBalanced(const string& text) {
    // TODO: use a stack to match every opening delimiter
    return false;
}

int main() {
    string text;
    cin >> text;
    cout << (isBalanced(text) ? "Balanced" : "Not balanced") << endl;
    return 0;
}`,
      hints: [
        'Push each opening delimiter.',
        'For a closing delimiter, the stack must be non-empty and the top must match.',
        'At the end, the stack must be empty.',
        'Return false immediately on a mismatch.',
      ],
      topics: ['Stack', 'Balanced Delimiters', 'Validation']
    },
    {
      id: 'ds-stack-reverse-string',
      title: '6. Reverse a String',
      difficulty: 'medium',
      description: `Complete only \`string reverseString(const string& text)\`.

Push every character onto a \`stack<char>\`, then pop them into a result string. The last character pushed must come out first.`,
      inputFormat: 'First line: a string with no spaces.',
      outputFormat: 'The reversed string.',
      constraints: '1 <= text length <= 1000',
      sampleInput: 'hello',
      sampleOutput: 'olleh',
      testCases: [
        { input: 'hello', expectedOutput: 'olleh' },
        { input: 'a', expectedOutput: 'a' },
        { input: 'abcdef', expectedOutput: 'fedcba' },
        { input: 'racecar', expectedOutput: 'racecar', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

string reverseString(const string& text) {
    // TODO: push every character, then pop into the result
    return "";
}

int main() {
    string text;
    cin >> text;
    cout << reverseString(text) << endl;
    return 0;
}`,
      hints: [
        'Loop over the string and `push` each character.',
        'While the stack is not empty, append `st.top()` and `st.pop()`.',
      ],
      topics: ['Stack', 'Strings', 'LIFO']
    },
    {
      id: 'ds-stack-postfix',
      title: '7. Evaluate Postfix',
      difficulty: 'medium',
      description: `Evaluate a postfix expression made of single-digit operands and the operators \`+\`, \`-\`, \`*\`, \`/\`.

Complete only \`int evaluatePostfix(const string& expr)\`.

Rules:
- A digit pushes its integer value.
- An operator pops the right operand, then the left operand, computes \`left op right\`, and pushes the result.
- The expression is valid, uses integer division, and has one final value.

Use a \`stack<int>\`.`,
      inputFormat: 'First line: a postfix expression with no spaces.',
      outputFormat: 'The evaluated integer result.',
      constraints: '1 <= expression length <= 1000, operands are digits 0-9, valid postfix',
      sampleInput: '34+2*',
      sampleOutput: '14',
      testCases: [
        { input: '34+2*', expectedOutput: '14' },
        { input: '52-', expectedOutput: '3' },
        { input: '23*4+', expectedOutput: '10' },
        { input: '82/', expectedOutput: '4' },
        { input: '123*+4-', expectedOutput: '3', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int evaluatePostfix(const string& expr) {
    // TODO: push digits, and apply operators to the top two values
    return 0;
}

int main() {
    string expr;
    cin >> expr;
    cout << evaluatePostfix(expr) << endl;
    return 0;
}`,
      hints: [
        'For a character c, `c - \'0\'` converts a digit to its integer value.',
        'Pop `right` first because the stack is LIFO, then pop `left`.',
        'Switch on the operator and push the result.',
        'The answer is the only value left on the stack.',
      ],
      topics: ['Stack', 'Postfix', 'Expression Evaluation']
    },
    {
      id: 'ds-stack-postfix-multidigit',
      title: '8. Postfix with Multi-Digit Operands',
      difficulty: 'medium',
      description: `Evaluate a postfix expression whose operands are full integers, including negatives. Tokens are separated by spaces.

Complete only \`int evaluatePostfix(const vector<string>& tokens)\`.

If a token is one of \`+\`, \`-\`, \`*\`, or \`/\`, pop two values and push the result. Otherwise convert the token with \`stoi\` and push it.

The expression is valid and uses integer division.

The driver reads the token count and then the tokens.`,
      inputFormat: 'First line: n. Second line: n tokens separated by spaces.',
      outputFormat: 'The evaluated integer result.',
      constraints: '1 <= n <= 1000, valid postfix expression',
      sampleInput: '5\n3 4 + 2 *',
      sampleOutput: '14',
      testCases: [
        { input: '5\n3 4 + 2 *', expectedOutput: '14' },
        { input: '3\n10 2 -', expectedOutput: '8' },
        { input: '5\n2 3 * 4 +', expectedOutput: '10' },
        { input: '3\n20 4 /', expectedOutput: '5' },
        { input: '5\n5 -3 + 4 *', expectedOutput: '8', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <stack>
using namespace std;

int evaluatePostfix(const vector<string>& tokens) {
    // TODO: push numbers and apply operators to the top two values
    return 0;
}

int main() {
    int n;
    cin >> n;

    vector<string> tokens(n);
    for (int i = 0; i < n; i++) {
        cin >> tokens[i];
    }

    cout << evaluatePostfix(tokens) << endl;
    return 0;
}`,
      hints: [
        'Check the four operator strings before calling `stoi`.',
        'A negative number such as `-3` is longer than one character, so it is still an operand.',
        'Pop the right operand first, then the left operand.',
        'Push the computed result back onto the stack.',
      ],
      topics: ['Stack', 'Postfix', 'Tokenization', 'stoi']
    },
    {
      id: 'ds-stack-add-large',
      title: '9. Challenge: Add Large Numbers',
      difficulty: 'hard',
      description: `Add two non-negative integers too large for built-in integer types. Each number is given as a string of digits.

Complete only \`string addLarge(const string& a, const string& b)\`.

Use two \`stack<int>\` objects to store the digits from right to left. Pop one digit from each stack, add them with the carry, push the result digit, and continue until both stacks and the carry are exhausted.

Return the sum without leading zeros. Return \`"0"\` when the sum is zero.`,
      inputFormat: 'First line: two non-negative integers separated by a space.',
      outputFormat: 'Their sum without leading zeros.',
      constraints: '1 <= each length <= 10000, no leading zeros except the number 0',
      sampleInput: '123 456',
      sampleOutput: '579',
      testCases: [
        { input: '123 456', expectedOutput: '579' },
        { input: '999 1', expectedOutput: '1000' },
        { input: '0 0', expectedOutput: '0' },
        { input: '123456789123456789 987654321987654321', expectedOutput: '1111111111111111110' },
        { input: '1 999999999999999999999', expectedOutput: '1000000000000000000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

string addLarge(const string& a, const string& b) {
    // TODO: push the digits, add with carry, and build the result
    return "0";
}

int main() {
    string a, b;
    cin >> a >> b;
    cout << addLarge(a, b) << endl;
    return 0;
}`,
      hints: [
        'Push the characters of each string; convert with `c - \'0\'` when popping.',
        'A stack that becomes empty contributes 0 to the sum.',
        'Push each result digit onto a third stack, then pop it to build the answer string left to right.',
        'Continue while either digit stack is non-empty or the carry is nonzero.',
      ],
      topics: ['Stack', 'Big Integers', 'Carry']
    },
    {
      id: 'ds-stack-infix-to-postfix',
      title: '10. Challenge: Infix to Postfix',
      difficulty: 'hard',
      description: `Convert a valid infix expression to postfix.

Complete only \`string infixToPostfix(const string& expr)\`.

The expression contains single-digit operands, the operators \`+\`, \`-\`, \`*\`, \`/\`, and parentheses, with no spaces. \`*\` and \`/\` bind tighter than \`+\` and \`-\`, and operators of equal precedence are left-associative.

Use a \`stack<char>\` for pending operators and a result string for the output.

Rules:
- A digit goes directly to the result.
- \`(\` is pushed.
- On \`)\`, pop and append until \`(\`, then discard the \`(\`.
- For any other operator, first pop and append while the top has greater or equal precedence, then push the operator.
- At the end, pop and append every remaining operator.`,
      inputFormat: 'First line: a valid infix expression with no spaces.',
      outputFormat: 'The equivalent postfix expression.',
      constraints: '1 <= expression length <= 1000, single-digit operands, valid infix',
      sampleInput: '3+4*2',
      sampleOutput: '342*+',
      testCases: [
        { input: '3+4*2', expectedOutput: '342*+' },
        { input: '(3+4)*2', expectedOutput: '34+2*' },
        { input: '5', expectedOutput: '5' },
        { input: '8/2-3', expectedOutput: '82/3-' },
        { input: '3+4*2/(1-5)', expectedOutput: '342*15-/+', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int precedence(char op) {
    if (op == '+' || op == '-') {
        return 1;
    }
    if (op == '*' || op == '/') {
        return 2;
    }
    return 0;
}

string infixToPostfix(const string& expr) {
    // TODO: convert using an operator stack
    return "";
}

int main() {
    string expr;
    cin >> expr;
    cout << infixToPostfix(expr) << endl;
    return 0;
}`,
      hints: [
        'Use `isdigit(c)` or compare against `\'0\'` and `\'9\'` to identify operands.',
        'Before pushing an operator, pop while the stack top is not `(` and has precedence >= the new operator.',
        'Parentheses are never written to the result.',
        'Drain the stack after processing the input.',
      ],
      topics: ['Stack', 'Infix', 'Postfix', 'Operator Precedence']
    }
  ]
};
