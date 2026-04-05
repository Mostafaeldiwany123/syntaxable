import { FileData } from './types';
import { cppCompiler } from './cpp-compiler';
import { csharpCompiler } from './csharp-compiler';
import { pythonCompiler } from './python-compiler';
import { javaCompiler } from './java-compiler';
import { javascriptCompiler } from './javascript-compiler';
import { typescriptCompiler } from './typescript-compiler';

export type LanguageType = 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript';

export interface BatchTestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface BatchTestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  isHidden: boolean;
  error?: string;
}

// Number of lines in the C++ test harness before the user code
// This is used to adjust line numbers in compilation error messages
const CPP_HARNESS_LINE_OFFSET = 9;

/**
 * Adjust line numbers in C++ error messages to account for the test harness prefix
 * Handles two formats:
 * 1. "main.cpp:25:5: error" -> "main.cpp:16:5: error"
 * 2. "   28 |     int x;" -> "   19 |     int x;"
 */
function adjustCppErrorLines(error: string, offset: number): string {
  // First, adjust the header line numbers: main.cpp:25:5: -> main.cpp:16:5:
  let adjusted = error.replace(/(main\.cpp:)(\d+)(:\d+:)/g, (match, prefix, lineNum, suffix) => {
    const adjustedLine = Math.max(1, parseInt(lineNum) - offset);
    return `${prefix}${adjustedLine}${suffix}`;
  });

  // Second, adjust the snippet line numbers: "   28 |" -> "   19 |"
  // GCC shows source lines with format: "   28 |     code here"
  adjusted = adjusted.replace(/^(\s*)(\d+)(\s*\|)/gm, (match, spaces, lineNum, suffix) => {
    const adjustedLine = Math.max(1, parseInt(lineNum) - offset);
    return `${spaces}${adjustedLine}${suffix}`;
  });

  return adjusted;
}

/**
 * Extract all values (numbers, words, lines) from output
 * This is more robust than trying to filter prompts
 */
function extractValues(output: string): string[] {
  if (!output) return [];

  const values: string[] = [];

  // Split by newlines
  const lines = output.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Try to extract values from the line
    // Pattern 1: Lines that are just a number
    if (/^-?\d+\.?\d*$/.test(trimmed)) {
      values.push(trimmed);
      continue;
    }

    // Pattern 2: Lines that are just a word (no spaces, no special chars except letters)
    if (/^[A-Za-z]+$/.test(trimmed)) {
      values.push(trimmed);
      continue;
    }

    // Pattern 3: Extract values after common separators (: = ->)
    // "Value: 42" -> extract "42"
    // "Result = 100" -> extract "100"
    const separatorMatch = trimmed.match(/[:=->]\s*(-?\d+\.?\d*|[A-Za-z]+)\s*$/);
    if (separatorMatch) {
      values.push(separatorMatch[1]);
      continue;
    }

    // Pattern 4: Extract all numbers from the line
    const numbers = trimmed.match(/-?\d+\.?\d*/g);
    if (numbers && numbers.length > 0) {
      // If the line has numbers, add them
      values.push(...numbers);
    }
  }

  return values;
}

/**
 * Smart comparison that extracts and compares values
 */
function compareOutputs(actual: string, expected: string): { passed: boolean; reason: string } {
  // Normalize both
  const actualNorm = actual.trim().replace(/\r\n/g, '\n');
  const expectedNorm = expected.trim().replace(/\r\n/g, '\n');

  // Exact match - best case
  if (actualNorm === expectedNorm) {
    return { passed: true, reason: 'Exact match' };
  }

  // Extract values from both
  const actualValues = extractValues(actual);
  const expectedValues = extractValues(expected);

  // Compare extracted values
  if (actualValues.length === expectedValues.length) {
    let allMatch = true;
    for (let i = 0; i < actualValues.length; i++) {
      if (actualValues[i] !== expectedValues[i]) {
        allMatch = false;
        break;
      }
    }
    if (allMatch) {
      return { passed: true, reason: 'Values match' };
    }
  }

  // Try line-by-line comparison with value extraction
  const actualLines = actualNorm.split('\n').map(l => l.trim()).filter(l => l);
  const expectedLines = expectedNorm.split('\n').map(l => l.trim()).filter(l => l);

  // If expected has fewer lines, try to match values in order
  if (actualLines.length >= expectedLines.length) {
    const expectedVals = expectedLines.flatMap(l => {
      const nums = l.match(/-?\d+\.?\d*/g) || [];
      const words = l.match(/\b[A-Za-z]+\b/g) || [];
      return [...nums, ...words];
    });

    const actualVals = actualLines.flatMap(l => {
      const nums = l.match(/-?\d+\.?\d*/g) || [];
      const words = l.match(/\b[A-Za-z]+\b/g) || [];
      return [...nums, ...words];
    });

    // Check if expected values appear in order in actual values
    let valIndex = 0;
    for (const ev of expectedVals) {
      let found = false;
      while (valIndex < actualVals.length) {
        if (actualVals[valIndex] === ev) {
          found = true;
          valIndex++;
          break;
        }
        valIndex++;
      }
      if (!found) {
        return { passed: false, reason: 'Value mismatch' };
      }
    }

    return { passed: true, reason: 'Values found in output' };
  }

  return { passed: false, reason: 'Output mismatch' };
}

// ========== C++ BATCH TEST HARNESS ==========

function getCppTestHarness(code: string, testCases: BatchTestCase[]): string {
  const testInputs = testCases.map(tc => tc.input.replace(/"/g, '\\"').replace(/\n/g, '\\n')).join('","');
  return `
// === TEST HARNESS ===
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

// User code (original main renamed)
#define main user_main
${code}
#undef main

// Test runner main
int main() {
    const char* testInputs[] = {"${testInputs}"};
    const int numTests = ${testCases.length};
    
    cout << "===TEST_RESULTS_START===" << endl;
    
    for (int i = 0; i < numTests; i++) {
        // Reset input/output for each test
        istringstream testInput(testInputs[i]);
        streambuf* origCin = cin.rdbuf();
        cin.rdbuf(testInput.rdbuf());
        
        ostringstream testOutput;
        ostringstream testError;
        streambuf* origCout = cout.rdbuf();
        streambuf* origCerr = cerr.rdbuf();
        cout.rdbuf(testOutput.rdbuf());
        cerr.rdbuf(testError.rdbuf());
        
        // Run user code
        try {
            user_main();
        } catch (const exception& e) {
            testError << "Runtime Error: " << e.what() << endl;
        } catch (...) {
            testError << "Runtime Error: Unknown exception" << endl;
        }
        
        // Restore cout/cerr and output result
        cout.rdbuf(origCout);
        cerr.rdbuf(origCerr);
        cin.rdbuf(origCin);
        
        string output = testOutput.str();
        string errorOutput = testError.str();
        // Remove trailing whitespace/newlines
        while (!output.empty() && (output.back() == '\\n' || output.back() == ' ' || output.back() == '\\r')) {
            output.pop_back();
        }
        
        cout << "===OUTPUT_START===" << endl;
        cout << output << endl;
        if (!errorOutput.empty()) {
            cout << "===ERROR_START===" << endl;
            cout << errorOutput << endl;
            cout << "===ERROR_END===" << endl;
        }
        cout << "===OUTPUT_END===" << endl;
    }
    
    cout << "===TEST_RESULTS_END===" << endl;
    return 0;
}
`;
}

// ========== INDIVIDUAL TEST RUNNER FOR C# AND PYTHON ==========

async function runSingleTest(
  code: string,
  testCase: BatchTestCase,
  language: 'csharp' | 'python' | 'java' | 'javascript' | 'typescript'
): Promise<BatchTestResult> {
  const compiler = language === 'csharp'
    ? csharpCompiler
    : language === 'python'
      ? pythonCompiler
      : language === 'java'
        ? javaCompiler
        : language === 'javascript'
          ? javascriptCompiler
          : typescriptCompiler;
  const entryFile = language === 'csharp'
    ? 'Program.cs'
    : language === 'python'
      ? 'main.py'
      : language === 'java'
        ? 'Main.java'
        : language === 'javascript'
          ? 'main.js'
          : 'main.ts';

  try {
    const result = await compiler.compileWithStdin!(
      [{ name: entryFile, content: code }],
      entryFile,
      testCase.input
    );

    if (result.error) {
      return {
        passed: false,
        input: testCase.input || '(empty)',
        expectedOutput: testCase.expectedOutput.trim(),
        actualOutput: '',
        isHidden: testCase.isHidden || false,
        error: result.error
      };
    }

    const actualOutput = (result.output || '').trim();
    const expectedOutput = testCase.expectedOutput.trim();
    const comparison = compareOutputs(actualOutput, expectedOutput);

    return {
      passed: comparison.passed,
      input: testCase.input || '(empty)',
      expectedOutput: expectedOutput,
      actualOutput: actualOutput,
      isHidden: testCase.isHidden || false,
      error: comparison.passed ? undefined : comparison.reason
    };
  } catch (error) {
    return {
      passed: false,
      input: testCase.input || '(empty)',
      expectedOutput: testCase.expectedOutput.trim(),
      actualOutput: '',
      isHidden: testCase.isHidden || false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function runIndividualTests(
  code: string,
  testCases: BatchTestCase[],
  language: 'csharp' | 'python' | 'java' | 'javascript' | 'typescript'
): Promise<BatchTestResult[]> {
  // Run all tests in parallel
  const results = await Promise.all(
    testCases.map(tc => runSingleTest(code, tc, language))
  );
  return results;
}

// ========== BATCH TEST RUNNER FOR C++ ==========

async function runCppBatchTests(
  code: string,
  testCases: BatchTestCase[]
): Promise<BatchTestResult[]> {
  const testHarness = getCppTestHarness(code, testCases);
  const entryFile = 'main.cpp';

  try {
    const result = await cppCompiler.compileWithStdin(
      [{ name: entryFile, content: testHarness }],
      entryFile,
      ''
    );

    if (result.error) {
      // Compilation error - all tests fail
      // Adjust line numbers in error message to show correct user code lines
      const adjustedError = adjustCppErrorLines(result.error, CPP_HARNESS_LINE_OFFSET);
      return testCases.map(tc => ({
        passed: false,
        input: tc.input || '(empty)',
        expectedOutput: tc.expectedOutput.trim(),
        actualOutput: '',
        isHidden: tc.isHidden || false,
        error: adjustedError
      }));
    }

    // Parse outputs and errors from the result
    const output = result.output || '';
    const results: BatchTestResult[] = [];

    // Parse each test case block
    const testBlockRegex = /===OUTPUT_START===\n([\s\S]*?)(?:===ERROR_START===\n([\s\S]*?)\n===ERROR_END===)?\n===OUTPUT_END===/g;
    let match;
    let testIndex = 0;

    while ((match = testBlockRegex.exec(output)) !== null && testIndex < testCases.length) {
      const tc = testCases[testIndex];
      let actualOutput = match[1] || '';
      const errorOutput = match[2] || '';

      // Normalize whitespace
      actualOutput = actualOutput.replace(/\r\n/g, '\n').trim();
      const expectedOutput = tc.expectedOutput.trim();

      // Use smart comparison
      const comparison = compareOutputs(actualOutput, expectedOutput);

      // If there's an error, the test failed regardless of output
      const passed = !errorOutput && comparison.passed;

      results.push({
        passed,
        input: tc.input || '(empty)',
        expectedOutput: expectedOutput,
        actualOutput: errorOutput ? `${actualOutput}\n${errorOutput}`.trim() : actualOutput,
        isHidden: tc.isHidden || false,
        error: errorOutput || undefined
      });

      testIndex++;
    }

    // Handle case where parsing failed
    if (results.length === 0) {
      return testCases.map(tc => ({
        passed: false,
        input: tc.input || '(empty)',
        expectedOutput: tc.expectedOutput.trim(),
        actualOutput: '',
        isHidden: tc.isHidden || false,
        error: 'Test execution failed - no output captured'
      }));
    }

    return results;
  } catch (error) {
    // Runtime error - all tests fail
    return testCases.map(tc => ({
      passed: false,
      input: tc.input || '(empty)',
      expectedOutput: tc.expectedOutput.trim(),
      actualOutput: '',
      isHidden: tc.isHidden || false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }));
  }
}

// ========== MAIN EXPORT ==========

/**
 * Run multiple test cases
 * - C++: Uses batch approach (single compilation, multiple tests)
 * - C#/Python: Uses individual calls (one API call per test case)
 */
export async function runBatchTests(
  code: string,
  testCases: BatchTestCase[],
  language: LanguageType = 'cpp'
): Promise<BatchTestResult[]> {
  switch (language) {
    case 'cpp':
      return runCppBatchTests(code, testCases);
    case 'csharp':
    case 'python':
    case 'java':
    case 'javascript':
    case 'typescript':
      return runIndividualTests(code, testCases, language);
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}