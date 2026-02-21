const fs = require("fs");
const path = require("path");

const mdxPath = path.join(process.cwd(), "app/content/posts/typescript-react-nodejs-interview-questions.mdx");
const content = fs.readFileSync(mdxPath, "utf-8");

// Split by frontmatter
const splitParts = content.split("---");
const frontmatter = splitParts[1];
const bodyRaw = splitParts.slice(2).join("---").trim();

let newBody = `import { QuestionTree, QuestionNode } from "~/components/QuestionTree";\n\n` + bodyRaw;

const lines = newBody.split("\n");
let outputLines = [];
let inTree = false;
let inQuestion = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Match <h2>Title</h2>
  const h2Match = line.match(/<h2>(.*?)<\/h2>/);
  if (h2Match) {
    if (inQuestion) {
      outputLines.push("</QuestionNode>");
      inQuestion = false;
    }
    if (inTree) {
      outputLines.push("</QuestionTree>");
    }
    outputLines.push(`\n<QuestionTree title="${h2Match[1].replace(/"/g, "&quot;")}">`);
    inTree = true;
    continue;
  }

  // Generic H3 match
  if (line.includes("<h3>")) {
    if (inQuestion) {
      outputLines.push("</QuestionNode>");
    }
    
    let titleAcc = line.replace("<h3>", "").trim();
    if (!line.includes("</h3>")) {
       let j = i + 1;
       while(j < lines.length && !lines[j].includes("</h3>")) {
         titleAcc += " " + lines[j].trim();
         j++;
       }
       if (j < lines.length) {
         titleAcc += " " + lines[j].replace("</h3>", "").trim();
         i = j;
       }
    } else {
       titleAcc = titleAcc.replace("</h3>", "").trim();
    }
    
    outputLines.push(`\n<QuestionNode title="${titleAcc.replace(/"/g, "&quot;")}">`);
    inQuestion = true;
    continue;
  }

  // Handle generic hr separators to ignore
  if (line.includes("<hr />")) {
    continue;
  }
  
  // Strip empty lines right after opening a node to keep it dense
  if (line.trim() === "" && outputLines.length > 0 && outputLines[outputLines.length - 1].startsWith("<QuestionNode")) {
      continue;
  }

  outputLines.push(line);
}

if (inQuestion) {
  outputLines.push("</QuestionNode>");
}
if (inTree) {
  outputLines.push("</QuestionTree>");
}

const finalContent = `---${frontmatter}---\n\n${outputLines.join("\n")}\n`;
fs.writeFileSync(mdxPath, finalContent);
console.log("Transformation complete.");
