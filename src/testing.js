const json = {
  "title": "Add Two Numbers",
  "description": "Write a program that takes two integers as input and returns their sum.",
  "difficulty": "easy",
  "tags": "array",
  "visibleTestCases": [
    {
      "input": "2 3",
      "output": "5",
      "explanation": "2 + 3 equals 5"
    },
    {
      "input": "-1 5",
      "output": "4",
      "explanation": "-1 + 5 equals 4"
    },
    {
      "input": "0 0",
      "output": "0",
      "explanation": "0 + 0 equals 0"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "10 20",
      "output": "30"
    },
    {
      "input": "100 250",
      "output": "350"
    }
  ],
  "startCode": [
    {
      "language": "C++",
      "initialCode": "#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Write your code here\n    return 0;\n}"
    },
    {
      "language": "Java",
      "initialCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        // Write your code here\n    }\n}"
    },
    {
      "language": "JavaScript",
      "initialCode": "const readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nlet input = [];\nrl.on('line', line => { input.push(...line.trim().split(' ')); }).on('close', () => {\n    const a = parseInt(input[0]);\n    const b = parseInt(input[1]);\n    // Write your code here\n});"
    }
  ],
  "referenceSolution": [
    {
      "language": "C++",
      "completeCode": "#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}"
    },
    {
      "language": "Java",
      "completeCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
    },
    {
      "language": "JavaScript",
      "completeCode": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(' ');\nconst a = parseInt(input[0]);\nconst b = parseInt(input[1]);\nconsole.log(a + b);"
    }
  ]
}
